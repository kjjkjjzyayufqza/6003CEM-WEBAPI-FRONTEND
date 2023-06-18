'use client';
import { getNews } from 'API/noAuth';
import { NewsModel } from 'Model';
import { Button } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

export default function page () {
  const [data, setData] = useState<NewsModel[]>([]);
  useEffect(() => {
    getNews()
      .then(res => {
        //console.log(res);
        setData(res.data);
      })
      .catch(err => {
        //console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className='mb-5 text-center text-2xl'>News</h1>
      {data.map((e, i) => {
        return (
          <NewsCard
            key={i}
            id={e.catId}
            name={e.catName}
            about={e.catAbout}
            photo={e.catPhoto}
            time={e.time}
          ></NewsCard>
        );
      })}
    </div>
  );
}

const NewsCard: FC<{
  id: string;
  name: string;
  about: string;
  photo: string;
  time: string;
}> = ({ id, name, about, photo, time }) => {
  return (
    <div className='mx-auto mb-5 max-w-md overflow-hidden rounded-xl border bg-white shadow-md md:max-w-2xl'>
      <div className='md:flex'>
        <div className='md:shrink-0'>
          <img
            className='h-48 w-full object-cover md:h-full md:w-48'
            src={photo}
            alt='Modern building architecture'
          />
        </div>
        <div className='p-8'>
          <div className='mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-500'>
            New Cat have joined us
          </div>
          <a
            href='#'
            className='mt-1 block text-lg font-medium leading-tight text-black hover:underline'
          >
            Hello, I&apos;m {name}
          </a>
          <p className='mt-2 text-slate-500'>{about}</p>
          <div className='mt-5 flex w-full items-center justify-between'>
            <p className='text-xs'>
              {dayjs(time).format('YYYY-MM-DD hh:mm:ss')}
            </p>
            <Link href={'CatDetailPage/' + id}>
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
