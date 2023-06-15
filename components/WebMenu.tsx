'use client';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
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
  getItem('Home', '/Staff', <PieChartOutlined />),
  getItem('Dashboard', '/Staff/Dashboard', <PieChartOutlined />),
  getItem('Cat Management', '2', <DesktopOutlined />),
  getItem('Account', '3', <FileOutlined />),
];

export default function WebMenu ({ path }: { path: string }) {
  const router = useRouter();
  console.log(path)
  return (
    <Menu
      theme='dark'
      defaultSelectedKeys={[path]}
      mode='inline'
      items={items}
      onClick={e => {
        console.log(e.keyPath);
        router.push(e.keyPath[0]);
      }}
    />
  );
}
