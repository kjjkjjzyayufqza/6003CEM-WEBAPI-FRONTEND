import { PlusOutlined } from '@ant-design/icons';
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
import { createCats, getCats, updateCats } from 'API/cats';
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
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { FC, useState, useEffect, useRef } from 'react';

export const CreateCatDetailDrawer: FC<{
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
      <h1
        className='site-description-item-profile-p'
        style={{ marginBottom: 24 }}
      >
        Create Cat Profile
      </h1>
      <CatDetailForm id={id} onStart={open} />
    </Drawer>
  );
};

interface CatOption {
  value: string;
  label: string;
}

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
      // getCats({ id: id })
      //   .then(res => {
      //     setFileList([
      //       {
      //         uid: '-1',
      //         name: 'image.png',
      //         status: 'done',
      //         url: res.data[0].photo,
      //       },
      //     ]);
      //     formRef?.current?.setFieldsValue({
      //       name: res.data[0].name,
      //       breed: res.data[0].breed,
      //       gender: res.data[0].gender,
      //       birthday: res.data[0].birthday,
      //       photo: res.data[0].photo,
      //       about: res.data[0].about,
      //       centre: res.data[0].centre,
      //       addedTime: res.data[0].addedTime,
      //       adopted: res.data[0].adopted,
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }, [onStart]);
  return (
    <ProForm
      title='Cat Form'
      formRef={formRef}
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: 'Create',
        },
      }}
      onFinish={async values => {
        if (!uploadImageUrl) {
          message.warning('Photo Can not be null');
          return false;
        }
        console.log(values);
        createCats([{
          ...values,
          updatedTime: dayjs(),
          photo: uploadImageUrl,
        }])
          .then(res => {
            message.success('Create successful');
            console.log(res);
          })
          .catch(err => {
            message.warning('Create failed');
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
      <Divider />
    </ProForm>
  );
};
