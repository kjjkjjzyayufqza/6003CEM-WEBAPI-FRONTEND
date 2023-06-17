'use client';
import { StyleProvider } from '@ant-design/cssinjs';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { ConfigProvider, Form, message } from 'antd';
import { useEffect, useRef } from 'react';
import enUS from 'antd/locale/en_US';
import Balancer from 'react-wrap-balancer';
import { CatCard } from '@/components/CatCard';
import { Image } from 'antd';
import { CentreEnum, GenderEnum } from 'Model';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
export default function AppointmentPage ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    console.log(params.slug);
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
        <h1 className='mb-5 text-center text-5xl font-bold'>
          Make an appointment
        </h1>
        <h1 className='mb-20 text-center text-2xl font-bold'>Meet the cats</h1>
        <ProCard>
          <StepsForm<{
            name: string;
          }>
            formRef={formRef}
            onFinish={async values => {
              console.log(values);
              message.success('提交成功');
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
                console.log(formRef.current?.getFieldsValue());
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
                      before going to the shelter to ensure that you have enough
                      time to choose the cats you like and interact with them.
                    </li>
                    <li>
                      Health condition: Please make sure that you are in good
                      health without colds, flu and other diseases to protect
                      the health of the cats.
                    </li>
                    <li>
                      Cat preferences: When choosing cats, please pay attention
                      to their preferences and personalities to ensure a
                      pleasant interaction with them.
                    </li>
                    <li>
                      Safety measures: Please pay attention to safety when
                      interacting with cats to avoid harming them or yourself.
                      If you have any questions, please seek help from the
                      shelter staff in a timely manner.
                    </li>
                  </ol>
                  <p className='text-gray-600'>
                    Hope the above tips will help you have a pleasant experience
                    meeting cats.
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
                console.log(formRef.current?.getFieldsValue());
                return true;
              }}
            >
              {/* <div className='animate-fade-up my-10 w-1/2 items-center justify-center xl:px-0'>
                <CatCard />
              </div> */}
              <div className='animate-fade-up my-10 flex w-full items-center justify-center xl:px-0'>
                <CatCard width={400} />
              </div>
              <p className=' mb-5 text-center text-lg'>
                Please confirm that the information is correct and proceed to
                the next step.
              </p>
            </StepsForm.StepForm>
            <StepsForm.StepForm<{
              checkbox: string;
            }>
              name='checkbox'
              title='Select date and confirmation center'
              stepProps={{
                description:
                  'Please select the date you want to make an appointment, and please confirm the appointment center',
              }}
              onFinish={async () => {
                console.log(formRef.current?.getFieldsValue());
                return true;
              }}
            >
              <ProFormSelect
                name='centre'
                label='Centre'
                width={'md'}
                valueEnum={CentreEnum}
                initialValue={CentreEnum.KwunTong}
                placeholder='Please select a country'
                rules={[
                  { required: true, message: 'Please select your country!' },
                ]}
                disabled
              ></ProFormSelect>
              <ProFormDatePicker
                name='bookingDateTime'
                label='Appointment Time'
                width='lg'
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
                name={'userName'}
                label='Name'
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText
                name={'email'}
                label='Email'
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormDigit
                label='Age'
                name='age'
                min={1}
                max={200}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormCheckbox.Group
                name='gender'
                label='Gender'
                rules={[
                  {
                    required: true,
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
                  },
                ]}
              />
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </StyleProvider>
    </ConfigProvider>
  );
}
