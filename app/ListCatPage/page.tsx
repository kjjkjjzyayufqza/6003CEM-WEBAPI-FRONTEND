'use client';
import { Card, Col, Pagination, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import FilterBox from './FilterBox';
import { CatCard } from '@/components/CatCard';
export default function ListCatPage () {
  const a = [1, 2, 3, 4, 5, 6, 7, 8,];
  useEffect(() => {}, []);
  return (
    <div>
      <h1 className='mb-20 text-center text-5xl font-bold'>待領養動物</h1>
      <p className='mb-5 text-center'>
        一次領養，拯救兩個生命。
        每有一隻幸運的動物離開我們的領養中心，便能空出一個位置，讓另一隻動物可以在中心等待尋找新家！
      </p>
      <div className='w-full'>
        <FilterBox />
      </div>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-4 xl:px-0'>
        {a.map((e, i) => {
          return <CatCard key={i} />;
        })}
      </div>
      <div className='hero-content'>
        <Pagination
          onChange={(page: number, pageSize: number) => {}}
          defaultCurrent={1}
          total={500}
          pageSize={8}
          pageSizeOptions={[16, 32, 64]}
        />
      </div>
    </div>
  );
}
