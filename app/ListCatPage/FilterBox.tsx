'use client';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Card, ConfigProvider, message } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Meta from 'antd/es/card/Meta';

export default () => {
  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Card
          className='animate-fade-up w-full max-w-screen-xl  p-5 '
          style={{ background: '#FAFAFA' }}
        >
          <Meta title="Filter"></Meta>
          <QueryFilter<{
            name: string;
          }>
            showHiddenNum={true}
            searchText='Search'
            resetText='Reset'
            submitter={{
              searchConfig: {
                resetText: 'Reset',
                submitText: 'Search',
              },
            }}
            onFinish={async values => {
              console.log(values.name);
            }}
          >
            <ProFormText
              name='name'
              label='应用名称'
              rules={[{ required: true }]}
            />
            <ProFormText name='creater' label='创建人' />
            <ProFormSelect
              name='sex'
              label='性别'
              showSearch
              valueEnum={{
                man: '男',
                woman: '女',
              }}
            />
            <ProFormText name='status' label='应用状态' />
            <ProFormDatePicker name='startdate' label='响应日期' />
            <ProFormDateRangePicker
              name='create'
              label='创建时间'
              colSize={3}
            />
          </QueryFilter>
        </Card>
      </StyleProvider>
    </ConfigProvider>
  );
};
