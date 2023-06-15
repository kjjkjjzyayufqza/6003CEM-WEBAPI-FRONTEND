'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Popover from '@/components/shared/popover';
import Image from 'next/image';
import { Session } from 'next-auth';
import Link from 'next/link';
import { Button, message } from 'antd';
import jwt_decode from 'jwt-decode';
export default function UserDropdown ({ session }: { session: any }) {
  const { email, image } = session?.user || {};
  useEffect(() => {
    // console.log(session);
    if (email) {
      // messageApi.success('Login successful');
      if (
        session?.access_token &&
        session?.refresh_token &&
        session?.expire_date
      ) {
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
        localStorage.setItem('expire_date', session.expire_date);
      }
    }
  }, [email, session]);
  if (!email) return null;
  const [openPopover, setOpenPopover] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className='relative inline-block text-left'>
      {contextHolder}
      <Popover
        content={
          <div className='w-full rounded-md bg-white p-2 sm:w-56'>
            <Link
              href={'MemberPage/Dashboard'}
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
            >
              <LayoutDashboard className='h-4 w-4' />
              <p className='text-sm'>Dashboard</p>
            </Link>
            <Button
              onClick={() => {
                console.log(session);
              }}
            >
              test
            </Button>
            <button
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              onClick={() => {
                localStorage.clear();
                signOut();
              }}
            >
              <LogOut className='h-4 w-4' />
              <p className='text-sm'>Logout</p>
            </button>
          </div>
        }
        align='end'
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className='flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9'
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
