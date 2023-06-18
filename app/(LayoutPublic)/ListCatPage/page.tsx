'use client';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { CatCard } from '@/components/CatCard';
import { FilterBox, FilterBoxOption } from './FilterBox';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
import { CatsModel } from 'Model';
import Balancer from 'react-wrap-balancer';
import { getCatsPublic } from 'API/noAuth';

interface filterModel extends FilterBoxOption {
  page?: number;
  pageSize?: number;
}

export default function ListCatPage () {
  const [filter, setFilter] = useState<filterModel>({
    pageSize: 8,
  });
  const [data, setData] = useState<CatsModel[]>([]);
  const [total, setTotal] = useState<number>(1);
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
        // console.log(res.data);
        setData(res.data.data);
        setTotal(res.data.totalNumber);
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
      <h1 className='mb-20 text-center text-5xl font-bold'>Cat for Adoption</h1>
      <Balancer className='mb-5 text-center'>
        One adoption saves two lives. Every time a lucky animal leaves our
        adoption center, a place will be vacated so that another animal can wait
        in the center to find a new home!
      </Balancer>
      <div className='w-full'>
        <FilterBox
          onFilter={(value: FilterBoxOption) => {
            setFilter({
              ...filter,
              ...value,
              adopted: value.adopted ?? false,
            });
          }}
        />
      </div>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-4 xl:px-0'>
        {data.map((e, i) => {
          return (
            <CatCard
              key={i}
              id={e._id}
              name={e.name}
              birthday={e.birthday}
              centre={e.centre}
              breed={e.breed}
              photo={e.photo}
            />
          );
        })}
      </div>
      <div className='hero-content'>
        <Pagination
          onChange={(page: number, pageSize: number) => {
            setFilter({ page: page, pageSize: pageSize });
          }}
          defaultCurrent={1}
          total={total}
          pageSize={filter?.pageSize}
          pageSizeOptions={[8, 16, 32, 64]}
        />
      </div>
    </div>
  );
}
