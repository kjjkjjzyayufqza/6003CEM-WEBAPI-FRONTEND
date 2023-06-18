'use client';

import { Card, Col, Row, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { EyeOutlined, EyeTwoTone, HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import { CatBreedEnum, CentreEnum } from 'Model';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { addfavouritesCat, getfavouritesCat } from 'API/catsPublic';
export interface CatCardModel {
  id?: string;
  name?: string;
  birthday?: string;
  centre?: CentreEnum;
  breed?: CatBreedEnum;
  photo?: string;
  width?: number;
  disableAction?: boolean;
}

export const CatCard: FC<CatCardModel> = ({
  id,
  name,
  birthday,
  centre,
  breed,
  photo,
  width,
  disableAction,
}) => {
  const router = useRouter();
  return (
    <Card
      style={{ width: width }}
      className='card bg-base-100 overflow-hidden shadow-md'
      hoverable
      cover={
        <div className='overflow-hidden '>
          <img
            alt='example'
            src={photo}
            className='h-48 w-96 object-cover transition delay-150 duration-300 ease-in-out hover:-translate-y-0 hover:scale-110 hover:bg-indigo-500'
          />
        </div>
      }
      actions={
        !disableAction
          ? [
              <HeartTwoTone
                key='setting'
                onClick={() => {
                  if(!localStorage.getItem('access_token')){
                    message.warning('You are not login')
                    return
                  }
                  getfavouritesCat()
                    .then(res => {
                      //console.log(res);
                      if (res.data) {
                        if (!res.data?.Favourites?.includes(id!)) {
                          const oldItem: string[] = [
                            id!,
                            ...res.data?.Favourites,
                          ];
                          addfavouritesCat(oldItem)
                            .then(adRes => {
                              message.success(
                                'Cats have been added to the Favorites list',
                              );
                              //console.log(adRes);
                            })
                            .catch(adErr => {
                              //console.log(adErr);
                            });
                        } else {
                          message.warning(
                            'Cats are already on the Favorites list',
                          );
                        }
                      } else {
                        addfavouritesCat([id!])
                          .then(adRes => {
                            message.success(
                              'Cats have been added to the Favorites list',
                            );
                            //console.log(adRes);
                          })
                          .catch(adErr => {
                            //console.log(adErr);
                          });
                      }
                    })
                    .catch(err => {
                      //console.log(err);
                    });
                }}
              />,
              <EyeTwoTone
                key='eye'
                onClick={() => {
                  router.push('CatDetailPage/' + id);
                }}
              />,
            ]
          : []
      }
    >
      <Meta
        title={
          <div>
            <Row>
              <Col span={8}>Name:</Col>
              <Col span={16}>{name}</Col>
            </Row>
          </div>
        }
        description={
          <div>
            <Row>
              {/* <Col span={8}>ID:</Col>
                <Col span={16}>225669</Col> */}
              <Col span={8}>Birthday:</Col>
              <Col span={16}>{dayjs(birthday).format('YYYY-MM-DD')}</Col>
              <Col span={8}>Centre:</Col>
              <Col span={16}>{centre}</Col>
              <Col span={8}>Breed:</Col>
              <Col span={16}>{breed}</Col>
            </Row>
          </div>
        }
        className=''
      />
    </Card>
  );
};
