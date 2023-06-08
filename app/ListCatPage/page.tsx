'use client';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect } from 'react';

export default function ListCatPage () {
  useEffect(() => {
    // console.log(session)
  }, []);
  return (
    <>
      <div className='w-full max-w-xl px-5 xl:px-0'>
        <div className='w-full max-w-xl px-5 xl:px-0'>
          <Card
            className='card bg-base-100 w-96 shadow-xl'
            hoverable
            cover={
              <img
                alt='example'
                src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
              />
            }
          >
            <Meta title='Europe Street beat' description='www.instagram.com' />
          </Card>
        </div>
      </div>
    </>
  );
}
