'use client';
import { StyleProvider } from '@ant-design/cssinjs';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, Button, ConfigProvider, message } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import enUS from 'antd/locale/en_US';

export default function page () {
  const formRef = useRef<ProFormInstance>();

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
          <ProForm
            title='新建表单'
            formRef={formRef}
            submitter={{}}
            onFinish={async values => {
              console.log(values);
              message.success('提交成功');
              return true;
            }}
          >
            <ProFormText
              width='md'
              name='centerCode'
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
