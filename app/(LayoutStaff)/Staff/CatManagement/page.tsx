'use client';
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Layout,
  Progress,
  Tag,
  Upload,
  UploadFile,
  message,
  theme,
} from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { CatBreedEnum, CatsModel, CentreEnum, GenderEnum } from 'Model';
import { getCats, updateCats } from 'API/cats';
import Link from 'next/link';
import dayjs from 'dayjs';
import { RcFile, UploadProps } from 'antd/es/upload';
import axios from 'axios';
import { CatDetailDrawer } from '../../../../components/CatDetailDrawer';
import { CreateCatDetailDrawer } from '@/components/CreateCatDetailDrawer';

type GithubIssueItem = CatsModel;

export default function Page () {
  const actionRef = useRef<ActionType>();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [createCatOpen, setCreateCatOpen] = useState(false);
  const [selectId, setSelectId] = useState<string>('');

  useEffect(() => {}, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: '_id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'photo',
      valueType: 'text',
      hideInSearch: true,
      width: 120,
      editable: false,
      render: (_, value) => {
        return (
          <div>
            <Avatar
              key={'a'}
              src={value.photo}
              size={'large'}
              style={{ width: '80px', height: '80px' }}
            ></Avatar>
          </div>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: GenderEnum,
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: CatBreedEnum,
    },
    {
      title: 'Centre',
      dataIndex: 'centre',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: CentreEnum,
    },
    {
      title: 'Adopted',
      dataIndex: 'adopted',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        true: { text: 'Yes' },
        false: { text: 'No' },
      },
      render: (_, e) => {
        let color = e.adopted ? '#87d068' : '#2db7f5';
        let text = e.adopted ? 'Yes' : 'No';
        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button
          key={'a'}
          onClick={() => {
            setSelectId(record._id);
            setOpen(true);
          }}
        >
          View
        </Button>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div className='demo-logo-vertical' />
            <WebMenu path={path} />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: '0 2em',
                background: colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className=''>
                <Breadcrumb
                  items={[
                    {
                      title: <Link href={'/Staff'}>Home</Link>,
                    },
                    {
                      title: 'Cat Manage',
                    },
                  ]}
                />
              </div>
              <div>
                <Avatar src={'/card_cat1.jpg'} size={'large'}></Avatar>
              </div>
            </Header>
            <div style={{ margin: '0 16px' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <CatDetailDrawer
                  id={selectId}
                  _open={open}
                  _onClose={() => setOpen(false)}
                />
                <CreateCatDetailDrawer
                  id={selectId}
                  _open={createCatOpen}
                  _onClose={() => setCreateCatOpen(false)}
                />
                <ProTable<GithubIssueItem>
                  columns={columns}
                  actionRef={actionRef}
                  cardBordered
                  rowKey='_id'
                  request={async (params, sort, filter) => {
                    // console.log(params);
                    let data: GithubIssueItem[] = [];
                    await getCats({
                      name: params?.name,
                      gender: params?.gender,
                      breed: params?.breed,
                      centre: params?.centre,
                      adopted: params?.adopted,
                      page: params.current,
                      pageSize: params.pageSize,
                    })
                      .then(res => {
                        data = res.data;
                      })
                      .catch(err => {});

                    return {
                      data: data,
                      success: true,
                      total: 100,
                    };
                  }}
                  editable={{
                    type: 'multiple',
                  }}
                  columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange (value) {
                      // console.log('value: ', value);
                    },
                  }}
                  search={{
                    labelWidth: 'auto',
                  }}
                  options={{
                    setting: {
                      listsHeight: 400,
                    },
                  }}
                  form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                      if (type === 'get') {
                        return {
                          ...values,
                          created_at: [values.startTime, values.endTime],
                        };
                      }
                      return values;
                    },
                  }}
                  pagination={{
                    pageSize: 10,
                    onChange: (page: number, pageSize: number) => {},
                  }}
                  dateFormatter='string'
                  headerTitle='Cat List'
                  toolBarRender={() => [
                    <Button
                      key='button'
                      icon={<PlusOutlined />}
                      onClick={() => {
                        // actionRef.current?.reload();
                        setCreateCatOpen(true)
                      }}
                      type='primary'
                    >
                      Add Cat
                    </Button>,
                  ]}
                />
              </div>
            </div>

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
}
