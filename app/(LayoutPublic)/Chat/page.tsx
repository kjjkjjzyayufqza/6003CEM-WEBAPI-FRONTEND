'use client';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import { IntercomProvider } from 'react-use-intercom';
import { io } from 'socket.io-client';

export default function Page () {
  const [unreadMessagesCount, setUnreadMessagesCount] = React.useState(0);

  const onHide = () => console.log('Intercom did hide the Messenger');
  const onShow = () => console.log('Intercom did show the Messenger');
  const onUnreadCountChange = (amount: number) => {
    console.log('Intercom has a new unread message');
    setUnreadMessagesCount(amount);
  };
  const onUserEmailSupplied = () => {
    console.log('Visitor has entered email');
  };

  return (
    <IntercomProvider
      appId={'kcelkytk'}
      onHide={onHide}
      onShow={onShow}
      onUnreadCountChange={onUnreadCountChange}
      onUserEmailSupplied={onUserEmailSupplied}
      autoBoot
    >
      <p>Hi there, I am a child of the IntercomProvider</p>
    </IntercomProvider>
  );
}

// export default function Page () {
//     const [roomName, setRoomName] = useState('');
//     const [messages, setMessages] = useState<any[]>([]);
//     const socketRef = useRef(null);
//     useEffect(() => {}, []);
//     const connectRoom = (id: string) => {
//       const socket = io('http://localhost:3000?roomid=' + id);
//       socket.on('connect', function () {
//         console.log('链接成功');
//         // 发射
//         socket.emit('Chat', {
//           name: 'client',
//         });
//       });
//       // 监听
//       socket.on('Chat', data => {
//         console.log('收到服务端信息 : ', data);
//         setMessages(e => [...e, data]);
//       });
//     };

//     const handleRoomNameChange = (event: any) => {
//       setRoomName(event.target.value);
//     };
//     return (
//       <div>
//         <input
//           type='text'
//           placeholder='Room'
//           value={roomName}
//           onChange={handleRoomNameChange}
//           className='text-input-field'
//         />
//         <Button
//           onClick={() => {
//             connectRoom(roomName);
//           }}
//         >
//           Connect
//         </Button>
//         <div className='my-10'></div>

//         <TextArea></TextArea>
//         <Button>Send</Button>
//       </div>
//     );
//   }
