'use client';
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Layout,
  Tag,
  theme,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  BookingModel,
  CatBreedEnum,
  CatsModel,
  CentreEnum,
  GenderEnum,
} from 'Model';
import Link from 'next/link';
import { CatDetailDrawer } from '../../../../components/CatDetailDrawer';
import { CreateCatDetailDrawer } from '@/components/CreateCatDetailDrawer';
import enUS from 'antd/locale/en_US';
import { StaffHeader } from '@/components/StaffHeader';
import jwt_decode from 'jwt-decode';
import { getAllUserBooking, getCats } from 'API/staff';
import dayjs from 'dayjs';
type GithubIssueItem = BookingModel;

export default function Page () {
  const actionRef = useRef<ActionType>();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [createCatOpen, setCreateCatOpen] = useState(false);
  const [selectId, setSelectId] = useState<string>('');
  const [staffCentre, setStaffCentre] = useState<CentreEnum>();

  useEffect(() => {
    const at = localStorage.getItem('access_token');
    if (at) {
      const data: any = jwt_decode(at);
      setStaffCentre(data.centre);
    }
  }, []);

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
      hideInSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Booking Time',
      dataIndex: 'bookingTime',
      hideInSearch: true,
      render: (_, e) => {
        return <>{dayjs(e.bookingTime).format('YYYY-MM-DD')}</>;
      },
    },
    {
      title: 'Centre',
      dataIndex: 'centre',
      hideInSearch: true,
    },

    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button
          key={'a'}
          onClick={() => {
            setSelectId(record.catId);
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
            <StaffHeader />
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
                  staffCentre={staffCentre!}
                />
                <CreateCatDetailDrawer
                  id={selectId}
                  _open={createCatOpen}
                  _onClose={() => setCreateCatOpen(false)}
                  staffCentre={staffCentre!}
                />
                <ProTable<GithubIssueItem>
                  columns={columns}
                  actionRef={actionRef}
                  cardBordered
                  rowKey='_id'
                  request={async (params, sort, filter) => {
                    // console.log(params);
                    let data: any[] = [];
                    await getAllUserBooking({
                      mobile: params.phone,
                      centre: staffCentre,
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
                  headerTitle='Booking List'
                  toolBarRender={() => []}
                />
              </div>
            </div>

            <Footer style={{ textAlign: 'center' }}>
              The Pet Shelter ©2023 Created by Moovoo
            </Footer>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
}
