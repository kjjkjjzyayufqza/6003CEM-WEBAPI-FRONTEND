'use client';
import { Button } from 'antd';
import React from 'react';

export default function page () {
  return (
    <div>
      <h1 className='mb-5 text-center text-2xl'>News</h1>
      <div className='mx-auto max-w-md overflow-hidden rounded-xl border bg-white shadow-md md:max-w-2xl'>
        <div className='md:flex'>
          <div className='md:shrink-0'>
            <img
              className='h-48 w-full object-cover md:h-full md:w-48'
              src='/card_cat1.jpg'
              alt='Modern building architecture'
            />
          </div>
          <div className='p-8'>
            <div className='text-sm font-semibold uppercase tracking-wide text-indigo-500 mb-2'>
            New Cat have joined us
            </div>
            <a
              href='#'
              className='mt-1 block text-lg font-medium leading-tight text-black hover:underline'
            >
              Hello, I`&apos;`m jojo
            </a>
            <p className='mt-2 text-slate-500'>
              Welcome to our new cat, jojo, who we found in Kwun Tong ......
            </p>
            <div className='flex w-full items-end justify-end'>
              <Button type={'text'} className='text-blue-500'>
                Read more...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
