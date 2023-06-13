'use client';
import { message } from 'antd';
import HomePage from './Home/page';
import PubSub from 'pubsub-js';
import { useEffect } from 'react';
export default async function Home () {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    let SuccessMessage = (msg: any, data: any) => {
      messageApi.success(data);
    };
    let successMessage = PubSub.subscribe('SuccessMessage', SuccessMessage);
    return () => {
      PubSub.unsubscribe(successMessage);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <HomePage />
    </>
  );
}
