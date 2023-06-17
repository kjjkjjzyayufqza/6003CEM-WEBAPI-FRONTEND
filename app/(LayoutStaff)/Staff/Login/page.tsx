'use client';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, ConfigProvider, Divider, message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import enUS from 'antd/locale/en_US';
import { StyleProvider } from '@ant-design/cssinjs';
import { SignInStaff } from 'API/auth';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

export default function Page () {
  const router = useRouter();

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <div
          style={{
            backgroundColor: 'white',
            height: 'calc(100vh)',
          }}
        >
          <LoginFormPage
            backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
            logo='/logo.png'
            title='The Pet Shelter'
            subTitle='Staff Platform'
            onFinish={async value => {
              console.log(value);
              SignInStaff({
                email: value.email,
                password: CryptoJS.SHA256(value.password).toString(),
              })
                .then(res => {
                  console.log(res);
                  message.success('Login Done');
                  localStorage.setItem('access_token', res.data.accessToken);
                  localStorage.setItem('refresh_token', res.data.refreshToken);
                  const expire_date: any = jwt_decode(res.data.accessToken);
                  localStorage.setItem(
                    'expire_date',
                    String(expire_date.exp * 1000),
                  );
                  localStorage.setItem('centre', expire_date.centre);
                  router.push('/Staff');
                })
                .catch(err => {
                  console.log(err);
                  message.warning('Login Fail');
                });
              return true;
            }}
          >
            <>
              <ProFormText
                name='email'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Email'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText.Password
                name='password'
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Password'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
            </>
          </LoginFormPage>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}
