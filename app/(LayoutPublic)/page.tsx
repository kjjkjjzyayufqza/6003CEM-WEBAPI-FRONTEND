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

    let WarningMessage = (msg: any, data: any) => {
      messageApi.warning(data);
    };
    let warningMessage = PubSub.subscribe('WarningMessage', WarningMessage);

    return () => {
      PubSub.unsubscribe(successMessage);
      
      PubSub.unsubscribe(warningMessage);
    };
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      <HomePage />
    </>
  );
}
