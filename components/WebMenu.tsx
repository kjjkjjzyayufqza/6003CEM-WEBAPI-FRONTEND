'use client';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

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
  getItem('Home', '/Staff', <HomeOutlined />),
  getItem('Dashboard', '/Staff/Dashboard', <PieChartOutlined />),
  getItem('Cat Management', '/Staff/CatManagement', <OrderedListOutlined />),
  getItem('Account', '/Staff/Account', <UserOutlined />),
];

export default function WebMenu ({ path }: { path: string }) {
  const router = useRouter();
  return (
    <Menu
      theme='dark'
      defaultSelectedKeys={[path]}
      mode='inline'
      items={items}
      onClick={e => {
        router.push(e.keyPath[0]);
      }}
    />
  );
}
