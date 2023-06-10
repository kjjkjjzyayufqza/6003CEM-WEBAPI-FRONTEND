'use client';
import { Avatar, Breadcrumb, Button, Card, Col, Image, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { HiOutlineIdentification } from 'react-icons/hi';
import { FaBirthdayCake } from 'react-icons/fa';
import { LuCat } from 'react-icons/lu';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { StyleProvider } from '@ant-design/cssinjs';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
export default function CatDetailPage ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  useEffect(() => {
    // console.log(params);
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
                  src='/card_cat1.jpg'
                  className='rounded-xl'
                />
              </div>

              <h2 className='card-title mb-5 text-2xl'>
                Hello I'm <span className='text-3xl text-indigo-500'>jojo</span>{' '}
                !
              </h2>
              <h2 className='card-title mb-1'>About Me</h2>
              <p className='mt-1 block font-medium leading-tight text-slate-500'>
                Bella, now 12-year-old, has been waiting for her destined true
                love for quite some time. As you can tell from the pictures, she
                is a sweet and friendly senior dog who likes to be around people
                and be petted. Surprisingly, a mature lady like her is still
                pretty talkative! Whenever people pass by her room, she will let
                out a few barks to get your attention, hoping you can be her
                company. Besides, Bella is a very spoiled furkid who loves wet
                food handfed by our staff. At this age, she has developed some
                joint pain problems and needs to take medication regularly. The
                vet also discovered a lipoma near Bella's stomach area.
                Therefore, we recommend a financially stable family to adopt
                her. If you are interested in Bella, you are welcome to visit
                her at the centre. Date Posted: Jun 11, 2022
              </p>
              <Row className='py-5' gutter={[20, 20]}>
                <Col span={12}>
                  <ColBox icon={'ID'} title={'No.'} text={'225669'} />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Birthday'}
                    title={'Birthday'}
                    text={'2009-10-10'}
                  />
                </Col>
                <Col span={12}>
                  <ColBox icon={'Breed'} title={'Breed'} text={'Mongrel'} />
                </Col>
                <Col span={12}>
                  <ColBox
                    icon={'Centre'}
                    title={'Centre'}
                    text={'HK Homing Special Case'}
                  />
                </Col>
                <Col span={12}>
                  <ColBox icon={'Gender'} title={'Gender'} text={'Female'} />
                </Col>
              </Row>
              <div className='rounded-lg bg-[#FAB115] p-8'>
                <h2 className='card-title mb-5 text-white'>
                  CONSIDERING ADOPTION?
                </h2>
                <p className='text-white'>
                  Visit our adoption centres or call our Homing Department at
                  2232 5529 for more info!
                </p>
                <Button
                  type={'primary'}
                  className='mt-4'
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <div className=' text-black'>Contact Us</div>
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
        <div>{text}</div>
      </div>
    </div>
  );
};
