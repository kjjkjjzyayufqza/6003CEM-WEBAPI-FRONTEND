'use client';
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  Space,
  Tag,
  theme,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { CatBreedEnum, CatsModel, CentreEnum, GenderEnum } from 'Model';
import { getCats } from 'API/cats';

type GithubIssueItem = CatsModel;

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
  },

  {
    title: 'Action',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [<Button>View</Button>],
  },
];

export default function Page () {
  const actionRef = useRef<ActionType>();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {}, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div className='demo-logo-vertical' />
            <WebMenu path={path} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <div>{path}</div>
            </Header>
            <div style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <ProTable<GithubIssueItem>
                  columns={columns}
                  actionRef={actionRef}
                  cardBordered
                  rowKey='_id'
                  request={async (params, sort, filter) => {
                    console.log(params);
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
                      //   console.log('value: ', value);
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
                  headerTitle='高级表格'
                  toolBarRender={() => [
                    <Button
                      key='button'
                      icon={<PlusOutlined />}
                      onClick={() => {
                        actionRef.current?.reload();
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
