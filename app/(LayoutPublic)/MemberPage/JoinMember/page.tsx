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
import { useRef, useState } from 'react';
import enUS from 'antd/locale/en_US';
import { RegisterPublic, SignInPublic } from 'API/auth';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

export default function Page () {
  const formRef = useRef<ProFormInstance>(null);
  const router = useRouter();
  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <h2 className='mb-5 text-4xl font-bold'>Registered Members</h2>
        <Alert
          message='Warning'
          description='Please make sure the personal information you enter is correct.'
          type='warning'
          showIcon
        />
        <div className='mt-5'>
          <ProForm
            title='新建表单'
            formRef={formRef}
            submitter={{}}
            onFinish={async values => {
              // console.log(values);
              if (values.rePassword != values.password) {
                message.warning('Inconsistent passwords');
              } else {
                let password = CryptoJS.SHA256(values.password).toString();
                await RegisterPublic({
                  name: values.name,
                  photo: '',
                  email: values.email,
                  phone: values.phone,
                  birthday: values.birthday,
                  password: password,
                  gender: values.gender,
                })
                  .then(res => {
                    message.success('Register Done');
                    SignInPublic({ email: values.email, password: password })
                      .then(res => {
                        message.success('Login Done');
                        localStorage.setItem(
                          'access_token',
                          res.data.accessToken,
                        );
                        localStorage.setItem(
                          'refresh_token',
                          res.data.refreshToken,
                        );
                        const expire_date: any = jwt_decode(
                          res.data.accessToken,
                        );
                        localStorage.setItem(
                          'expire_date',
                          String(expire_date.exp * 1000),
                        );
                        localStorage.setItem('isServerLogin', 'True');
                        router.push('/');
                      })
                      .catch(err => {
                        message.success('Login Fail');
                      });
                  })
                  .catch(err => {
                    let err_message = '';
                    if (err.response) {
                      if (err.response.data.message) {
                        err_message = `, ` + err.response.data.message;
                      }
                    }
                    message.warning('Register Fail' + err_message);
                  });
              }

              return true;
            }}
          >
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
            <ProFormText
              width='md'
              name='phone'
              label='Phone'
              placeholder='Please input your Phone'
              rules={[
                {
                  max: 8,
                },
                {
                  min: 8,
                },
                {
                  required: true,
                  message: 'Please input your Phone!',
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
                  max: 8,
                },
                {
                  min: 8,
                },
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
                  max: 8,
                },
                {
                  min: 8,
                },
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
