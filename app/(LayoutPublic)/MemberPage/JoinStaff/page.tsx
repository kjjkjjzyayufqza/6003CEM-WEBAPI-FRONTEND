'use client';
import { StyleProvider } from '@ant-design/cssinjs';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, Button, ConfigProvider, message } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import enUS from 'antd/locale/en_US';
import { CreateStaffModel, GenderEnum } from 'Model';
import { RegisterStaff, SignInStaff } from 'API/auth';
import * as CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

interface FormModel extends CreateStaffModel {
  rePassword: string;
}

export default function Page () {
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();
  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <h2 className='mb-5 text-4xl font-bold'>Registered Members</h2>
        <Alert
          message='Warning'
          description='Please make sure you have the center code and that your information is correct before you register as an employee.'
          type='warning'
          showIcon
        />
        <div className='mt-5'>
          <ProForm<FormModel>
            title='Register'
            formRef={formRef}
            submitter={{}}
            onFinish={async values => {
              console.log(values);
              if (values.password != values.rePassword) {
                message.warning('Inconsistent passwords');
                return false;
              }
              let password = CryptoJS.SHA256(values.password).toString();
              RegisterStaff(values.code, { ...values, password })
                .then(res => {
                  message.success('Register Done');
                  // console.log(res.data);
                  SignInStaff({ email: values.email, password: password })
                    .then(siRes => {
                      console.log(siRes.data);
                      const expire_date: any = jwt_decode(res.data.accessToken);
                      localStorage.setItem(
                        'expire_date',
                        String(expire_date.exp * 1000),
                      );
                      localStorage.setItem(
                        'access_token',
                        res.data.accessToken,
                      );
                      localStorage.setItem(
                        'refresh_token',
                        res.data.refreshToken,
                      );
                      router.push('/Staff');
                    })
                    .catch(siRes => {});
                })
                .catch(err => {
                  let messages = '';
                  if (err.response) {
                    if (err.response.data.message) {
                      messages = ', ' + err.response.data.message;
                    }
                  }
                  message.warning('Register Fail' + (messages && messages));

                  console.log(err);
                });
              return true;
            }}
          >
            <ProFormText
              width='md'
              name='code'
              label='Center Code'
              placeholder='Please input your Code'
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormText
              width='md'
              name='name'
              label='Name'
              placeholder='Please input your Name'
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormText
              width='md'
              name='email'
              label='Email'
              placeholder='Please input your Email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid Email!',
                },
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            />
            <ProFormSelect
              width='md'
              name='gender'
              label='Gender'
              options={[
                {
                  value: 'Male',
                  label: 'Male',
                },
                {
                  value: 'Female',
                  label: 'Female',
                },
              ]}
              placeholder='Please input Gender'
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormText.Password
              width='md'
              name='password'
              label='Password'
              placeholder='Please input your Password'
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormText.Password
              width='md'
              name='rePassword'
              label='Re-Password'
              placeholder='Please input your Re-Password'
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormDatePicker
              name='birthday'
              initialValue={dayjs()}
              label='Birthday'
              placeholder='Please select your Birthday'
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </ProForm>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}
