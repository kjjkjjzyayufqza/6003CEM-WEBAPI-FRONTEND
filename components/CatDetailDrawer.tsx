import { PlusOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import {
  ProFormInstance,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormRadio,
} from '@ant-design/pro-components';
import { getCatsPublic } from 'API/noAuth';
import { deleteCats, updateCats } from 'API/staff';
import { CatBreedEnum, CentreEnum } from 'Model';
import {
  Drawer,
  Tag,
  UploadFile,
  UploadProps,
  message,
  Form,
  Upload,
  Divider,
  Button,
  Modal,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { FC, useState, useEffect, useRef } from 'react';
import { BreedDrawer } from './BreedDrawer';

export const CatDetailDrawer: FC<{
  id: string;
  _open: boolean;
  _onClose: () => void;
  staffCentre: CentreEnum;
}> = ({ id, _open = false, _onClose, staffCentre }) => {
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
      <CatDetailForm
        id={id}
        onStart={open}
        _onClose={() => {
          onClose();
        }}
        staffCentre={staffCentre}
      />
    </Drawer>
  );
};

interface CatOption {
  value: string;
  label: string;
}

const CatDetailForm: FC<{
  id: string;
  onStart: boolean;
  _onClose: () => void;
  staffCentre: CentreEnum;
}> = ({ id, onStart, _onClose, staffCentre }) => {
  const formRef = useRef<ProFormInstance>();
  const breedOptions: CatOption[] = Object.keys(CatBreedEnum).map(key => {
    return {
      value: key.replace(/([A-Z])/g, ' $1').trim(),
      label: key.replace(/([A-Z])/g, ' $1').trim(),
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
  const [breedDrawer, setBreedDrawer] = useState(false);
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
      //console.log('server res: ', res.data.data.link);
      setUploadImageUrl(res.data.data.link);
      message.success('Image uploaded successfully');
    } catch (err) {
      //console.log('Eroor: ', err);
      const error = new Error('Some error');
      message.warning('Image uploaded Fail' + (err && err));
      onError({ err });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deleteCat = () => {
    deleteCats(id)
      .then(res => {
        message.success('Delete Done');
        setIsModalOpen(false);
      })
      .catch(err => {
        message.success('Delete Fail');
      });
    _onClose();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (onStart) {
      getCatsPublic({ id: id })
        .then(res => {
          setFileList([
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: res.data.data[0].photo,
            },
          ]);
          formRef?.current?.setFieldsValue({
            name: res.data.data[0].name,
            breed: res.data.data[0].breed,
            gender: res.data.data[0].gender,
            birthday: res.data.data[0].birthday,
            photo: res.data.data[0].photo,
            about: res.data.data[0].about,
            centre: staffCentre,
            addedTime: res.data.data[0].addedTime,
            adopted: res.data.data[0].adopted,
          });
        })
        .catch(err => {
          //console.log(err);
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
        render: props => {
          return [
            <Button key={0} type='primary' onClick={() => props.submit()}>
              Update
            </Button>,
            <Button key={1} type='primary' onClick={showModal} danger>
              Delete
            </Button>,
          ];
        },
      }}
      onFinish={async values => {
        //console.log(values);
        updateCats(id, {
          ...values,
          updatedTime: dayjs(),
          photo: uploadImageUrl ?? uploadImageUrl,
        })
          .then(res => {
            message.success('Update successful');
            //console.log(res);
          })
          .catch(err => {
            message.warning('Update failed');
          });
        return true;
      }}
    >
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={deleteCat}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this cat?</p>
      </Modal>
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
      <div className='flex items-center'>
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
        <Button
          className='ml-3'
          shape={'round'}
          icon={<QuestionCircleTwoTone />}
          onClick={() => {
            setBreedDrawer(true);
          }}
        >
          What Breed ?
        </Button>
      </div>
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
        disabled
        width='md'
        name='centre'
        label='Cat Centre'
        options={centreOptions}
        placeholder='Please input Cat Centre'
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
      <Divider />
      <BreedDrawer
        _open={breedDrawer}
        _onClose={() => {
          setBreedDrawer(false);
        }}
      />
    </ProForm>
  );
};
