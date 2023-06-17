import { UserOutlined } from '@ant-design/icons';
import { getCurrentUser } from 'API/staff';
import { MenuProps, theme, Breadcrumb, Dropdown, Avatar, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

export const StaffHeader: FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href='/Staff'>Account</Link>,
    },
    {
      key: '2',
      label: (
        <Link
          href={'/Staff/Login'}
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </Link>
      ),
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [name, setName] = useState<string>();

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        // console.log(res.data);
        setName(res.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Header
      style={{
        padding: '0 2em',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className=''>
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
          ]}
        />
      </div>
      <div className='flex items-center justify-center'>
        <p className='text-xl'>{name}</p>
        <Dropdown menu={{ items }} placement='bottomRight' arrow>
          <div className='ml-5'>
            <Button
              shape='circle'
              icon={
                // <Avatar
                //   src={
                //     'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
                //   }
                //   size={'large'}
                // ></Avatar>
                <UserOutlined />
              }
            ></Button>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
