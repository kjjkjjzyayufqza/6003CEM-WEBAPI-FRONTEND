'use client';
import { StyleProvider } from '@ant-design/cssinjs';
import {
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import enUS from 'antd/locale/en_US';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import Balancer from 'react-wrap-balancer';
import { getCurrentUserPublic, updateUserPublic } from 'API/publicUser';
import { updateCats } from 'API/cats';
import * as CryptoJS from 'crypto-js';

export default function Page () {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [progress, setProgress] = useState(0);
  const [uploadImageUrl, setUploadImageUrl] = useState<string>();
  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Client-ID a4f4d99066cdcc7',
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('image', file);
    try {
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        // 当前 URL 是 localhost 或 127.0.0.1
        throw 'Imgur Not Support localhost,来自提醒 ';
      }
      const res = await axios.post(
        'https://api.imgur.com/3/upload',
        fmData,
        config,
      );

      onSuccess('Ok');
      console.log('server res: ', res.data.data.link);
      setUploadImageUrl(res.data.data.link);
      message.success('Image uploaded successfully');
    } catch (err) {
      console.log('Eroor: ', err);
      const error = new Error('Some error');
      message.warning('Image uploaded Fail' + (err && err));
      onError({ err });
    }
  };

  useEffect(() => {
    getCurrentUserPublic()
      .then(res => {
        if (res.data.photo) {
          setFileList([
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: res.data.photo,
            },
          ]);
        }
        formRef?.current?.setFieldsValue({
          name: res.data.name,
          email: res.data.email,
          gender: res.data.gender,
          birthday: res.data.birthday,
          phone: res.data.phone,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <h1 className='my-8 text-2xl font-bold'>
          <Balancer>User Profile</Balancer>
        </h1>
        <ProForm
          title='Cat Form'
          formRef={formRef}
          submitter={{
            resetButtonProps: false,
            searchConfig: {
              submitText: 'Update',
            },
            render: props => {
              return [
                <Button key={0} type='primary' onClick={() => props.submit()}>
                  Update
                </Button>,
              ];
            },
          }}
          onFinish={async values => {
            console.log(values);
            values.email = undefined;
            if (values.password) {
              values.password = CryptoJS.SHA256(values.password).toString();
            } else {
              values.password = undefined;
            }

            if (uploadImageUrl) {
              values.photo = uploadImageUrl;
            } else {
              values.photo = undefined;
            }
            updateUserPublic(values)
              .then(res => {
                message.success("Update Done")
                console.log(res.data);
              })
              .catch(err => {
                message.success("Update Fail")
                console.log(err);
              });
            return true;
          }}
        >
          <ProFormText
            disabled
            width='md'
            name='email'
            label='Email'
            placeholder='Please input Email'
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            width='md'
            name='name'
            label='Name'
            placeholder='Please input Name'
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText.Password
            width='md'
            name='password'
            label='New Passowrd (Option) '
            placeholder='Please input Passowrd'
            rules={[
              {
                min: 8,
                message: 'Password must more then 8',
              },
            ]}
          />
          <ProFormSelect
            width='md'
            name='gender'
            label='Gender'
            options={[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
            ]}
            placeholder='Please input Gender'
            rules={[
              {
                required: true,
              },
            ]}
          />

          <ProFormDatePicker
            name='birthday'
            label='Birthday'
            rules={[
              {
                required: true,
              },
            ]}
          />
          <Form.Item name='photo' label='Photo'>
            <Upload
              listType='picture-card'
              fileList={fileList}
              customRequest={uploadImage}
              onChange={handleChange}
              accept='image/png, image/jpeg'
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Divider />
        </ProForm>
      </StyleProvider>
    </ConfigProvider>
  );
}
