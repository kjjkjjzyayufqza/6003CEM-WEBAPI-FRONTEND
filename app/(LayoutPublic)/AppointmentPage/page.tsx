'use client';
import { StyleProvider } from '@ant-design/cssinjs';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { ConfigProvider, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import enUS from 'antd/locale/en_US';
import Balancer from 'react-wrap-balancer';
import { CatCard } from '@/components/CatCard';
import {
  BookingModel,
  CatsModel,
  CentreEnum,
  GenderEnum,
  PublicUserModel,
} from 'Model';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
import { getCurrentUserPublic } from 'API/publicUser';
import { createBooking, getCatsPublic } from 'API/noAuth';
import { useRouter } from 'next/navigation';
export default function AppointmentPage ({ params }: { params: any }) {
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();
  const [catData, setCatData] = useState<CatsModel>();
  const [userData, setUserData] = useState<PublicUserModel>();

  useEffect(() => {
    getCatsPublic({ id: params })
      .then(res => {
        if (res.data.data.length >= 1) {
          setCatData(res.data.data[0]);
        } else {
          router.push('/');
        }
      })
      .catch(err => {
        // //console.log(err);
        router.push('/');
      });
    getCurrentUserPublic()
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        // //console.log(err);
      });
  }, []);

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <RouterBreadcrumb
          paths={[
            { name: 'Home', path: '' },
            { name: 'Appointment', path: 'AppointmentPage', current: true },
          ]}
        />
        <div className=' w-full max-w-6xl px-5 xl:px-0'>
          <h1 className='mb-5 text-center text-5xl font-bold'>
            Make an appointment
          </h1>
          <h1 className='mb-20 text-center text-2xl font-bold'>
            Meet the cats
          </h1>
          <ProCard>
            <StepsForm<BookingModel>
              formRef={formRef}
              onFinish={async values => {
                // //console.log(values);
                values.userId = userData?._id!;
                values.catId = catData?._id!;
                createBooking(values)
                  .then(res => {
                    // //console.log('Done');
                    message.success('Create Done');
                    router.push('/');
                  })
                  .catch(err => {
                    //console.log(err);
                    message.warning('Create Fail');
                  });
              }}
              formProps={{
                validateMessages: {
                  required: '此项为必填项',
                },
              }}
              submitter={{}}
            >
              <StepsForm.StepForm<{}>
                name='init'
                title='Confirm cat information'
                stepProps={{
                  description:
                    'Confirmation of basic information about the cat to be met',
                }}
                onFinish={async () => {
                  //console.log(formRef.current?.getFieldsValue());
                  return true;
                }}
              >
                <Balancer className='animate-fade-up my-10 flex w-full items-center justify-center md:max-w-4xl xl:px-0'>
                  <div className='rounded-lg bg-white p-4 shadow-md'>
                    <h2 className='mb-2 text-lg font-medium'>
                      Before making an appointment
                    </h2>
                    <p className='mb-1 text-gray-600'>
                      Please pay attention to the following:
                    </p>
                    <ol className='mb-4 list-inside list-decimal text-gray-600'>
                      <li>
                        Appointment time: Please make an appointment in advance
                        before going to the shelter to ensure that you have
                        enough time to choose the cats you like and interact
                        with them.
                      </li>
                      <li>
                        Health condition: Please make sure that you are in good
                        health without colds, flu and other diseases to protect
                        the health of the cats.
                      </li>
                      <li>
                        Cat preferences: When choosing cats, please pay
                        attention to their preferences and personalities to
                        ensure a pleasant interaction with them.
                      </li>
                      <li>
                        Safety measures: Please pay attention to safety when
                        interacting with cats to avoid harming them or yourself.
                        If you have any questions, please seek help from the
                        shelter staff in a timely manner.
                      </li>
                    </ol>
                    <p className='text-gray-600'>
                      Hope the above tips will help you have a pleasant
                      experience meeting cats.
                    </p>
                  </div>
                </Balancer>
              </StepsForm.StepForm>
              <StepsForm.StepForm<{}>
                name='base'
                title='Confirm cat information'
                stepProps={{
                  description:
                    'Confirmation of basic information about the cat to be met',
                }}
                onFinish={async () => {
                  // //console.log(formRef.current?.getFieldsValue());
                  return true;
                }}
              >
                {/* <div className='animate-fade-up my-10 w-1/2 items-center justify-center xl:px-0'>
                <CatCard />
              </div> */}
                <div className='animate-fade-up my-10 flex w-full max-w-xl items-center justify-center xl:px-0'>
                  <CatCard
                    width={300}
                    name={catData?.name}
                    photo={catData?.photo}
                    birthday={catData?.birthday}
                    centre={catData?.centre}
                    breed={catData?.breed}
                    disableAction
                  />
                </div>
                <p className=' mb-5 text-center text-lg'>
                  Please confirm that the information is correct and proceed to
                  the next step.
                </p>
              </StepsForm.StepForm>
              <StepsForm.StepForm<{}>
                name='checkbox'
                title='Select date and confirmation center'
                stepProps={{
                  description:
                    'Please select the date you want to make an appointment, and please confirm the appointment center',
                }}
                onFinish={async value => {
                  // //console.log(formRef.current?.getFieldsValue());
                  return true;
                }}
              >
                <ProFormSelect<BookingModel>
                  name='centre'
                  label='Centre'
                  width={'md'}
                  valueEnum={CentreEnum}
                  initialValue={CentreEnum.KwunTong}
                  placeholder='Please select a centre'
                  rules={[
                    { required: true, message: 'Please select your centre!' },
                  ]}
                  disabled
                ></ProFormSelect>
                <ProFormDatePicker
                  name='bookingTime'
                  label='Appointment Time'
                  width='lg'
                  rules={[
                    {
                      required: true,
                      message: 'Please select Appointment Time!',
                    },
                  ]}
                />
              </StepsForm.StepForm>
              <StepsForm.StepForm
                name='time'
                title='Personal data'
                stepProps={{
                  description:
                    'Please make sure your personal information is correct',
                }}
              >
                <ProFormText
                  name={'name'}
                  label='Name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Name',
                    },
                  ]}
                />
                <ProFormText
                  name={'email'}
                  label='Email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Email',
                    },
                    {
                      type: 'email',
                    },
                  ]}
                />

                <ProFormRadio.Group
                  name='gender'
                  label='Gender'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Gender',
                    },
                  ]}
                  options={Object.values(GenderEnum)}
                />
                <ProFormText
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Phone',
                      pattern: new RegExp('[0-9]'),
                    },
                    {
                      min: 8,
                    },
                    {
                      max: 8,
                    },
                  ]}
                />
              </StepsForm.StepForm>
            </StepsForm>
          </ProCard>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}
