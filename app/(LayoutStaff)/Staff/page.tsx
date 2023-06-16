'use client';
import {
  Avatar,
  Breadcrumb,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { StaffHeader } from '@/components/StaffHeader';

export default function Page () {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {}, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                }}
              >
                <div className='hero h-96'>
                  <div className='hero-content text-center'>
                    <div className='max-w-md'>
                      <h1 className='text-5xl font-bold'>Hello Staff</h1>
                    </div>
                  </div>
                </div>
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
