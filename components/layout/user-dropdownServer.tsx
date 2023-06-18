'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Popover from '@/components/shared/popover';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';
import {
  HeartOutlined,
  HeartTwoTone,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { getCurrentUserPublic } from 'API/publicUser';
export default function UserDropdownServer () {
  const [openPopover, setOpenPopover] = useState(false);
  const [icon, setIcon] = useState<string>();
  useEffect(() => {
    getCurrentUserPublic()
      .then(res => {
        // //console.log(res.data);
        if (res.data.photo) {
          setIcon(res.data.photo);
        }
      })
      .catch(err => {
        //console.log(err);
      });
  }, []);

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
            <Link
              href={'MemberPage/Favourites'}
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
            >
              <HeartOutlined className='h-4 w-4' />
              <p className='text-sm'>Favourites</p>
            </Link>
            <Link
              href={'MemberPage/Booking'}
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
            >
              <UnorderedListOutlined className='h-4 w-4' />
              <p className='text-sm'>Booking</p>
            </Link>
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
          <div className='overflow-hidden rounded-full object-cover'>
            <img
              alt={'email'}
              src={
                icon ??
                'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
              }
              width={100}
              height={100}
            />
          </div>
        </button>
      </Popover>
    </div>
  );
}
