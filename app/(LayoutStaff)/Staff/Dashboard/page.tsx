'use client';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Menu,
  MenuProps,
  theme,
} from 'antd';
import { useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', 'Staff/', <PieChartOutlined />),
  getItem('Dashboard', 'Staff/Dashboard', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Files', '3', <FileOutlined />),
];

export default function Page () {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
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
            <Menu
              theme='dark'
              defaultSelectedKeys={['Staff/Dashboard']}
              mode='inline'
              items={items}
              onClick={e => {
                console.log(e.keyPath);
                router.push(e.keyPath[0]);
              }}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <div>hello</div>
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
