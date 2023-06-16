'use client';
import { Card, Col, Pagination, Progress, Row, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import { CatCard } from '@/components/CatCard';
import { FilterBox, FilterBoxOption } from './FilterBox';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
import { ProList } from '@ant-design/pro-components';
import { getCats } from 'API/cats';
import { getCatsPublic } from 'API/catsPublic';
import { CatsModel } from 'Model';

interface filterModel extends FilterBoxOption {
  page: number;
  pageSize: number;
}

export default function ListCatPage () {
  const [filter, setFilter] = useState<filterModel>();
  const [data, setData] = useState<CatsModel[]>([]);
  useEffect(() => {
    getCatsPublic({
      page: filter?.page,
      pageSize: filter?.pageSize,
      name: filter?.name,
      breed: filter?.breed,
      gender: filter?.gender,
      adopted: filter?.adopted,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [filter]);

  return (
    <div>
      <div className='mb-2 flex max-w-md items-center justify-center md:mx-auto'>
        <RouterBreadcrumb
          paths={[
            { name: 'Home', path: '' },
            { name: 'Cat List', path: 'ListCatPage', current: true },
          ]}
        />
      </div>
      <h1 className='mb-20 text-center text-5xl font-bold'>待領養動物</h1>
      <p className='mb-5 text-center'>
        一次領養，拯救兩個生命。
        每有一隻幸運的動物離開我們的領養中心，便能空出一個位置，讓另一隻動物可以在中心等待尋找新家！
      </p>
      <div className='w-full'>
        <FilterBox
          onFilter={(value: FilterBoxOption) => {
            console.log(value);
          }}
        />
      </div>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-4 xl:px-0'>
        {data.map((e, i) => {
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
