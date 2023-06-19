'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { addfavouritesCat, getfavouritesCat } from 'API/catsPublic';
import { getCatsPublic } from 'API/noAuth';
import { CatsModel } from 'Model';
import { Button, ConfigProvider, Modal, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import enUS from 'antd/locale/en_US';
import Balancer from 'react-wrap-balancer';
import Link from 'next/link';

interface dataSourceModel extends CatsModel {
  title: string;
}

export default function Page () {
  const [dataSource, setDataSource] = useState<dataSourceModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getfavouritesCat()
      .then(async res => {
        console.log(res.data.Favourites.length);
        if (res.data) {
          if (res.data.Favourites.length >= 1) {
            const promises = res.data.Favourites.map(id =>
              getCatsPublic({ id: id }),
            );
            const results = await Promise.all(promises);
            const dataResults: dataSourceModel[] = results
              .filter(result => result.data.data.length > 0)
              .map(result => {
                return {
                  title: result.data.data[0].name,
                  ...result.data.data[0],
                };
              });
            console.log(
              results.map(e => {
                return e;
              }),
            );
            console.log('here');
            setDataSource(dataResults);
            //   return dataResults;
          } else {
            setDataSource([]);
          }
        }
      })

      .catch(err => {
        //console.log(err);
      });
    // getCatsPublic({id:})
  }, [refresh]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='card bg-base-100 w-full max-w-4xl border  px-5 shadow-xl xl:px-0'>
      <h1
        className='animate-fade-up font-display my-8 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]'
        style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
      >
        <Balancer>Favorites</Balancer>
      </h1>
      <ConfigProvider locale={enUS}>
        <StyleProvider hashPriority='high'>
          <Modal
            title='Warning'
            open={isModalOpen}
            onOk={() => {
              // addfavouritesCat()
              const result: string[] = dataSource
                .filter(e => e._id !== selectId)
                .map(e => e._id);

              const output = Array.from(new Set(result));
              addfavouritesCat(output)
                .then(res => {
                  //console.log(res);
                  message.success('Remove Done');
                  setRefresh(e => !e);
                  setIsModalOpen(false);
                })
                .catch(err => {
                  message.success('Remove Fail');
                  //console.log(err);
                });
            }}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to delete this cat from your favorites?</p>
          </Modal>
          <ProList<dataSourceModel>
            toolBarRender={() => {
              return [];
            }}
            itemLayout='vertical'
            rowKey='_id'
            // headerTitle='Favorites'
            dataSource={dataSource}
            metas={{
              title: {
                render: (_, e) => (
                  <h1 className='text-2xl font-bold'>{e.name}</h1>
                ),
              },
              //   description: {
              //     render: (_, e) => (
              //       <>
              //         <Tag color=''>{e.title}</Tag>
              //       </>
              //     ),
              //   },
              actions: {
                render: (_, e) => [
                  <Link key={'0'} href={'CatDetailPage/' + e._id}>
                    <Button>View</Button>
                  </Link>,
                  <Button
                    key={'1'}
                    danger
                    onClick={() => {
                      setSelectId(e._id);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>,
                ],
              },
              extra: {
                render: (_: any, e: any) => (
                  <img
                    className='h-48 w-60 object-cover'
                    alt='logo'
                    src={e.photo}
                  />
                ),
              },
              content: {
                render: (_, e) => {
                  return <div className='h-32 overflow-clip'>{e.about}</div>;
                },
              },
            }}
          />
        </StyleProvider>
      </ConfigProvider>
    </div>
  );
}
