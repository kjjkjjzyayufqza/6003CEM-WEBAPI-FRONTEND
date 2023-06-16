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

type GithubIssueItem = CatsModel;

export default function Page () {
  const actionRef = useRef<ActionType>();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
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

const CatDetailDrawer: FC<{
  id: string;
  _open: boolean;
  _onClose: () => void;
}> = ({ id, _open = false, _onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  const onClose = () => {
    setOpen(false);
    _onClose();
  };
  return (
    <Drawer
      width={640}
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
    >
      <p
        className='site-description-item-profile-p'
        style={{ marginBottom: 24 }}
      >
        ID : <Tag color='blue'>{id}</Tag>
      </p>
      <p
        className='site-description-item-profile-p'
        style={{ marginBottom: 24 }}
      >
        Cat Profile
      </p>
      <CatDetailForm id={id} onStart={open} />
    </Drawer>
  );
};

interface CatOption {
  value: string;
  label: string;
}

interface CatFormData {
  name: string;
  breed: CatBreedEnum;
  gender: GenderEnum;
  birthday: string;
  photo: string;
  about: string;
  centre: CentreEnum;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const CatDetailForm: FC<{ id: string; onStart: boolean }> = ({
  id,
  onStart,
}) => {
  const formRef = useRef<ProFormInstance>();
  const breedOptions: CatOption[] = Object.keys(CatBreedEnum).map(key => {
    return {
      value: key,
      label: key,
    };
  });

  const centreOptions: CatOption[] = Object.keys(CentreEnum).map(key => {
    return {
      value: key,
      label: key,
    };
  });
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
    if (onStart) {
      getCats({ id: id })
        .then(res => {
          setFileList([
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: res.data[0].photo,
            },
          ]);
          formRef?.current?.setFieldsValue({
            name: res.data[0].name,
            breed: res.data[0].breed,
            gender: res.data[0].gender,
            birthday: res.data[0].birthday,
            photo: res.data[0].photo,
            about: res.data[0].about,
            centre: res.data[0].centre,
            addedTime: res.data[0].addedTime,
            adopted: res.data[0].adopted,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [onStart]);
  return (
    <ProForm
      title='Cat Form'
      formRef={formRef}
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: 'Update',
        },
      }}
      onFinish={async values => {
        console.log(values);
        updateCats(id, {
          ...values,
          updatedTime: dayjs(),
          photo: uploadImageUrl ?? uploadImageUrl,
        })
          .then(res => {
            message.success('Update successful');
            console.log(res);
          })
          .catch(err => {
            message.warning('Update failed');
          });
        return true;
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label='Cat Name'
        placeholder='Please input Cat Name'
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        width='md'
        name='breed'
        label='Cat Breed'
        options={breedOptions}
        placeholder='Please input Cat Breed'
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        width='md'
        name='gender'
        label='Cat Gender'
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
        placeholder='Please input Cat Gender'
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormDatePicker
        name='birthday'
        label='Birthday'
        initialValue={dayjs()}
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

      <ProFormTextArea
        name='about'
        label='About'
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormTextArea>
      <ProFormSelect
        width='md'
        name='centre'
        label='Cat Centre'
        options={centreOptions}
        placeholder='Please input Cat Breed'
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormDateTimePicker
        width='md'
        name='addedTime'
        label='Added Time'
        placeholder='Please input Added Time'
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormDateTimePicker>

      <ProFormRadio.Group
        width='md'
        name='adopted'
        label='Cat Adoption'
        options={[
          {
            label: 'Yes',
            value: true,
          },
          {
            label: 'No',
            value: false,
          },
        ]}
        radioType='button'
        placeholder='Please input Cat Adoption'
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormRadio.Group>
      {/* <ProFormDateTimePicker
        disabled
        width='md'
        name='updatedTime'
        label='Update Time'
        placeholder='Please input Update Time'
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormDateTimePicker> */}
    </ProForm>
  );
};
