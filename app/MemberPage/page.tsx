'use client';
import { HomeCard, HomeCardModel } from '@/components/home/card';
import React from 'react';
import Image from 'next/image';
export default function page () {
  return (
    <div>
      <h1 className='text-2xl text-center'>Please select</h1>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-2 xl:px-0'>
        {features.map(({ title, description, demo, large, path }) => (
          <HomeCard
            key={title}
            title={title}
            description={description}
            demo={title === 'Beautiful, reusable components' ? <></> : demo}
            large={large}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}
const features: HomeCardModel[] = [
  {
    title: 'Join as a member',
    description:
      'Get more information about cats, adopt cats, and make appointments to meet cats.',
    demo: (
      <>
        <Image
          src='/team-member.png'
          width={250}
          height={250}
          alt=''
          className='rounded-2xl'
        ></Image>
      </>
    ),
    path: 'MemberPage/JoinMember',
  },

  {
    title: 'Join as a Staff ',
    description: 'Join our company and save more cats.',
    demo: (
      <>
        <Image
          src='/team-staff.png'
          width={150}
          height={150}
          alt=''
          className='rounded-lg'
        ></Image>
      </>
    ),
    path: 'MemberPage/JoinStaff',
  },
];
