'use client';
import { Breadcrumb, ConfigProvider, Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';

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
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
          >
            <div className='demo-logo-vertical' />
            <WebMenu path={path} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <div>{path}</div>
            </Header>
            <div style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                Bill is a cat.
              </div>
            </div>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
}
