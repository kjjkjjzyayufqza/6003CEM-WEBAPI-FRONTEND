'use client';
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
  message,
  theme,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { StaffHeader } from '@/components/StaffHeader';
import {
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { getCurrentUser, updateStaff } from 'API/staff';
import { StaffUserModel } from 'Model';
import * as CryptoJS from 'crypto-js';

export default function Page () {
  const [collapsed, setCollapsed] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();
  const path = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getCurrentUser().then(res => {
      formRef?.current?.setFieldsValue({
        name: res.data.name,
        email: res.data.email,
        centre: res.data.centre,
      });
    });
  }, []);

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div className='demo-logo-vertical' />
            <WebMenu path={path} />
          </Sider>
          <Layout>
            <StaffHeader />
            <div style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ProForm<StaffUserModel | any>
                  title='Staff Profile'
                  formRef={formRef}
                  submitter={{
                    resetButtonProps: false,
                    searchConfig: {
                      submitText: 'Update',
                    },
                    render: props => {
                      return [
                        <Button
                          key={0}
                          type='primary'
                          onClick={() => props.submit()}
                        >
                          Update
                        </Button>,
                      ];
                    },
                  }}
                  onFinish={async values => {
                    console.log(values);
                    const updateValue = {
                      name: values.name ?? undefined,
                      password:
                        (values.password &&
                          CryptoJS.SHA256(values.password).toString()) ??
                        undefined,
                    };
                    updateStaff(updateValue)
                      .then(res => {
                        console.log(res);
                        message.success('Update Done');
                      })
                      .catch(err => {
                        message.warning('Update Fail');
                        console.log(err);
                      });
                    return true;
                  }}
                >
                  <ProFormText
                    width='md'
                    name='name'
                    label='Staff Name'
                    placeholder='Please input Staff Name'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                  <ProFormText
                    disabled
                    width='md'
                    name='email'
                    label='Staff Email'
                    placeholder='Please input Staff Email'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                  <ProFormText.Password
                    width='md'
                    name='password'
                    label='New Password (Option)'
                    placeholder='Please input Password'
                    rules={[
                      {
                        min: 8,
                      },
                    ]}
                  />
                  <ProFormText
                    disabled
                    width='md'
                    name='centre'
                    label='Centre'
                    placeholder='Please input Centre'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                </ProForm>
              </div>
            </div>
            <Footer style={{ textAlign: 'center' }}>
              The Pet Shelter ©2023 Created by Moovoo
            </Footer>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
}
