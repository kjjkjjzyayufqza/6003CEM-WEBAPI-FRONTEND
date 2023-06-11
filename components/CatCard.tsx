'use client';

import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
export interface CatCardModel {
  width?: number;
}

export const CatCard: FC<CatCardModel> = ({ width }) => {
  return (
    <Link href={'CatDetailPage'}>
      <Card
        style={{ width: width }}
        className='card bg-base-100 overflow-hidden shadow-md'
        hoverable
        cover={
          <div className='overflow-hidden'>
            <img
              alt='example'
              src='https://cdn2.thecatapi.com/images/MTU3Njg1Mg.jpg'
              className='transition delay-150 duration-300 ease-in-out hover:-translate-y-0 hover:scale-110 hover:bg-indigo-500'
            />
          </div>
        }
        actions={[<HeartTwoTone key='setting' rev={undefined} />]}
      >
        <Meta
          title={
            <div>
              <Row>
                <Col span={8}>Name:</Col>
                <Col span={16}>jojo</Col>
              </Row>
            </div>
          }
          description={
            <div>
              <Row>
                <Col span={8}>ID:</Col>
                <Col span={16}>225669</Col>
                <Col span={8}>出生日期:</Col>
                <Col span={16}>19/11/2009</Col>
                <Col span={8}>中心:</Col>
                <Col span={16}>香港領養中心特殊需要</Col>
                <Col span={8}>品種:</Col>
                <Col span={16}>唐狗</Col>
              </Row>
            </div>
          }
          className=''
        />
      </Card>
    </Link>
  );
};
