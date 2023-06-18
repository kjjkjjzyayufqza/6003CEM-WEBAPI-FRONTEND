'use client';
import { getCatsPublic } from 'API/noAuth';
import { getCurrentBooking } from 'API/publicUser';
import { BookingModel, CatsModel, CentreEnum } from 'Model';
import { Button } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

export default function Page () {
  const [data, setData] = useState<BookingModel[]>();
  useEffect(() => {
    getCurrentBooking()
      .then(res => {
        setData(res.data);
      })
      .catch(err => {});
  }, []);
  return (
    <div>
      <p className='mb-5 text-center text-2xl font-bold'>Booking List</p>
      {data?.map((e, i) => {
        return (
          <NewsCard
            key={i}
            name={e.name}
            catId={e.catId}
            time={e.bookingTime}
            centre={e.centre}
          />
        );
      })}
    </div>
  );
}

const NewsCard: FC<{
  name: string;
  centre: CentreEnum;
  catId: string;
  time: Date;
}> = ({ name, centre, catId, time }) => {
  const [cat, setCat] = useState<CatsModel>();
  useEffect(() => {
    getCatsPublic({ id: catId })
      .then(res => {
        setCat(res.data.data[0]);
      })
      .catch(err => {});
  }, []);

  return (
    <div className='mx-auto mb-5 max-w-md overflow-hidden rounded-xl border bg-white shadow-md md:max-w-2xl'>
      <div className='md:flex'>
        <div className='md:shrink-0'>
          <img
            className='h-48 w-full object-cover md:h-full md:w-48'
            src={cat?.photo}
            alt='Modern building architecture'
          />
        </div>
        <div className='p-8'>
          <div className='mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-500'>
            {name}
          </div>
          <a
            href='#'
            className='mt-1 block text-lg font-medium leading-tight text-black hover:underline'
          >
            Centre : {centre}
          </a>
          {/* <p className='mt-2 text-slate-500'>{name}</p> */}
          <div className='mt-5 flex w-full items-center justify-between'>
            <p className='text-xs'>{dayjs(time).format('YYYY-MM-DD')}</p>
            <Link href={'CatDetailPage/' + cat?._id}>
              <Button type={'text'} className='text-blue-500'>
                Read more...
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
