'use client';
import { Button, Col, Image, Row, message } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import { HiOutlineIdentification } from 'react-icons/hi';
import { FaBirthdayCake } from 'react-icons/fa';
import { LuCat } from 'react-icons/lu';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { StyleProvider } from '@ant-design/cssinjs';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
import Link from 'next/link';
import { CatsModel } from 'Model';
import dayjs from 'dayjs';
import { getCatsPublic } from 'API/noAuth';
import Balancer from 'react-wrap-balancer';
import { useRouter } from 'next/navigation';
export default function CatDetailPage ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [data, setData] = useState<CatsModel>();
  const router = useRouter();
  useEffect(() => {
    // console.log(params);
    if (params.slug) {
      // console.log(params.slug);
      getCatsPublic({ id: params.slug[0] })
        .then(res => {
          setData(res.data.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <StyleProvider hashPriority='high'>
      <div className='w-full px-5 xl:px-0'>
        <div className='mb-2 flex max-w-md items-center justify-center md:mx-auto'>
          <RouterBreadcrumb
            paths={[
              { name: 'Home', path: '' },
              { name: 'Cat List', path: 'ListCatPage' },
              { name: 'jojo', path: 'CatDetailPage', current: true },
            ]}
          />
        </div>
        <div className='card card-side mx-auto max-w-md overflow-hidden rounded-xl border bg-white shadow-xl md:max-w-4xl'>
          <div className=''>
            <div className='p-8'>
              <div className='hero '>
                {/* <Avatar size={200} src='/card_cat1.jpg' className='' /> */}
                <Image
                  width={200}
                  src={data?.photo}
                  className='rounded-xl'
                  alt=''
                />
              </div>

              <h2 className='card-title mb-5 text-2xl'>
                Hello I&apos;m{' '}
                <span className='text-3xl text-indigo-500'>{data?.name}</span> !
              </h2>
              <h2 className='card-title mb-1'>About Me</h2>
              <Balancer className='mt-1 block font-medium leading-tight text-slate-500'>
                {data?.about}
              </Balancer>
              <Row className='py-5' gutter={[20, 20]}>
                <Col span={12}>
                  <ColBox icon={'ID'} title={'No.'} text={data?._id ?? ''} />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Birthday'}
                    title={'Birthday'}
                    text={dayjs(data?.birthday).format('YYYY-MM-DD') ?? ''}
                  />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Breed'}
                    title={'Breed'}
                    text={data?.breed ?? ''}
                  />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Centre'}
                    title={'Centre'}
                    text={data?.centre ?? ''}
                  />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Gender'}
                    title={'Gender'}
                    text={data?.gender ?? ''}
                  />
                </Col>
              </Row>
              <div className='rounded-lg bg-[#FAB115] p-8'>
                <h2 className='card-title mb-5 text-white'>
                  CONSIDERING ADOPTION?
                </h2>
                <p className='my-2 text-white'>
                  If you are interested in a cat, please make an appointment and
                  come to the shelter to meet the cat.
                </p>
                <p className='my-2 text-white'>
                  Visit our Adoption Center or call our attribution department
                  at 2232 5529 for more information!
                </p>
                <Button
                  type={'primary'}
                  className='mt-4'
                  style={{ backgroundColor: '#ffffff' }}
                  onClick={() => {
                    if (!localStorage.getItem('access_token')) {
                      message.warning('You are not login');
                      return;
                    }
                    router.push('AppointmentPage/' + params.slug);
                  }}
                >
                  <div className=' text-black'>Make an appointment</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyleProvider>
  );
}

interface ColBoxModel {
  icon: ReactNode | string;
  title: string;
  text: string;
}

const ColBox: FC<ColBoxModel> = ({ icon, title, text }) => {
  let _icon = null;
  if (typeof icon == 'string') {
    switch (icon) {
      case 'ID':
        _icon = <HiOutlineIdentification color='#03A9F4' size={40} />;
        break;
      case 'Birthday':
        _icon = <FaBirthdayCake color='#03A9F4' size={40} />;
        break;
      case 'Breed':
        _icon = <LuCat color='#03A9F4' size={40} />;
        break;
      case 'Centre':
        _icon = <HiOutlineBuildingOffice2 color='#03A9F4' size={40} />;
        break;
      case 'Gender':
        _icon = <BsGenderAmbiguous color='#03A9F4' size={40} />;
        break;
    }
  } else {
    _icon = icon;
  }

  return (
    <div className='flex gap-4'>
      <div className='mt-1'>{_icon}</div>
      <div>
        <div className='card-title'>{title}</div>
        <Balancer>{text}</Balancer>
      </div>
    </div>
  );
};
