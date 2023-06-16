import { MenuProps, theme, Breadcrumb, Dropdown, Avatar } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import React, { FC } from 'react';

export const StaffHeader: FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href='/Staff'>Account</Link>,
    },
    {
      key: '2',
      label: (
        <a
          target='_blank'
          onClick={()=>{
            console.log("Logout")
          }}
        >
          Logout
        </a>
      ),
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      <div>
        <Dropdown menu={{ items }} placement='bottomRight' arrow>
          <Avatar src={'/card_cat1.jpg'} size={'large'}></Avatar>
        </Dropdown>
      </div>
    </Header>
  );
};
