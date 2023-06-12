'use client';

import {
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { ConfigProvider, message } from 'antd';
import React, { useRef } from 'react';
import dayjs from 'dayjs';
import enUS from 'antd/locale/en_US';
import { StyleProvider } from '@ant-design/cssinjs';
export default function page () {
  const formRef = useRef<ProFormInstance>();

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <div className='flex min-h-screen items-center justify-center p-6'>
          <div className='container mx-auto max-w-screen-lg'>
            <div>
              <div className='mb-6 rounded-xl border bg-white p-4 px-4 shadow-lg md:p-8'>
                <div className='grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3'>
                  <div className='text-gray-600'>
                    <p className='text-lg font-medium'>Personal Details</p>
                    <p>Here is your profile, which you can edit and update</p>
                  </div>
                  <ProForm
                    title='新建表单'
                    formRef={formRef}
                    submitter={{
                      searchConfig: {
                        submitText: 'Update',
                      },
                    }}
                    onFinish={async values => {
                      console.log(values);
                      message.success('提交成功');
                      return true;
                    }}
                  >
                    <div className='lg:col-span-2'>
                      <div className='grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5'>
                        <div className='md:col-span-5'>
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
                        </div>
                        <div className='md:col-span-5'>
                          <ProFormText
                            disabled
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
                        </div>
                        <div className='md:col-span-5'>
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
                        </div>
                        <div className='md:col-span-5'>
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
                        </div>
                      </div>
                    </div>
                  </ProForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}
