'use client';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import FilterBox from './FilterBox';
export default function ListCatPage () {
  useEffect(() => {}, []);
  return (
    <>
      <div className='w-full max-w-xl px-5 xl:px-0 '>
        <FilterBox />
      </div>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-4 xl:px-0'>
        <Card
          className='card bg-base-100 overflow-hidden shadow-md'
          hoverable
          cover={
            <img
              alt='example'
              src='https://cdn2.thecatapi.com/images/MTU3Njg1Mg.jpg'
              className='transition delay-150 duration-300 ease-in-out hover:-translate-y-0 hover:scale-110 hover:bg-indigo-500'
            />
          }
          actions={[<HeartTwoTone key='setting'/>]}
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
                  <Col span={8}>Id:</Col>
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
      </div>
    </>
  );
}
