'use client';
import { Avatar, Breadcrumb, Button, Card, Col, Image, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { HiOutlineIdentification } from 'react-icons/hi';
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
    <div className='w-full px-5 xl:px-0'>
      <div className='mb-2 max-w-md md:mx-auto'>
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href=''>Application Center</a>,
            },
            {
              title: <a href=''>Application List</a>,
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </div>
      <div className='card card-side mx-auto max-w-md overflow-hidden rounded-xl border bg-white shadow-xl md:max-w-4xl'>
        <div className=''>
          <div className='p-8'>
            <div className='hero'>
              <Avatar size={200} src='/card_cat1.jpg' className='' />
            </div>

            <h2 className='card-title mb-5 text-2xl'>
              Hello I'm <span className='text-3xl text-indigo-500'>jojo</span> !
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
              vet also discovered a lipoma near Bella's stomach area. Therefore,
              we recommend a financially stable family to adopt her. If you are
              interested in Bella, you are welcome to visit her at the centre.
              Date Posted: Jun 11, 2022
            </p>
            <Row className='py-5' gutter={[20, 20]}>
              <Col span={12}>
                <div className='flex gap-4'>
                  <HiOutlineIdentification size={40} />
                  <div>
                    <div>No.</div>
                    <div>225669</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className='flex gap-4'>
                  <HiOutlineIdentification size={40} />
                  <div>
                    <div>No.</div>
                    <div>225669</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className='flex gap-4'>
                  <HiOutlineIdentification size={40} />
                  <div>
                    <div>No.</div>
                    <div>225669</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className='flex gap-4'>
                  <HiOutlineIdentification size={40} />
                  <div>
                    <div>No.</div>
                    <div>225669</div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className='bg-[#FAB115] p-8'>
              <h2 className='card-title mb-5 text-white'>
                CONSIDERING ADOPTION?
              </h2>
              <p className='text-white'>
                Visit our adoption centres or call our Homing Department at 2232
                5529 for more info!
              </p>
              <Button type={'primary'} className='bg-black'>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
