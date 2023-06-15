'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Popover from '@/components/shared/popover';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';
export default function UserDropdownServer () {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className='relative inline-block text-left'>
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
            <Button onClick={() => {}}>test</Button>
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
          <img alt={'email'} src={'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'} width={40} height={40} />
        </button>
      </Popover>
    </div>
  );
}
