'use client';
import { useState } from 'react';
import { IntercomProvider } from 'react-use-intercom';
import HomePage from './Home/page';
export default async function Home () {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const onHide = () => console.log('Intercom did hide the Messenger');
  const onShow = () => console.log('Intercom did show the Messenger');
  const onUnreadCountChange = (amount: number) => {
    //console.log('Intercom has a new unread message');
    setUnreadMessagesCount(amount);
  };
  const onUserEmailSupplied = () => {
    //console.log('Visitor has entered email');
  };
  return (
    <>
      <IntercomProvider
        appId={'kcelkytk'}
        onHide={onHide}
        onShow={onShow}
        onUnreadCountChange={onUnreadCountChange}
        onUserEmailSupplied={onUserEmailSupplied}
        autoBoot
      >
        <HomePage />
      </IntercomProvider>
    </>
  );
}
