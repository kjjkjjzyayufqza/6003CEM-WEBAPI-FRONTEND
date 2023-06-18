'use client';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Card, ConfigProvider, message } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Meta from 'antd/es/card/Meta';
import { CatBreedEnum, CentreEnum, GenderEnum } from 'Model';
import { FC } from 'react';
interface CatOption {
  value: string;
  label: string;
}

export interface FilterBoxOption {
  name?: string;
  breed?: CatBreedEnum;
  gender?: GenderEnum;
  centre?: CentreEnum;
  adopted?: boolean;
}

export const FilterBox: FC<{
  onFilter: (args: FilterBoxOption) => void;
}> = ({ onFilter }) => {
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

  const adoptedOptions: CatOption[] = ['true', 'false'].map(key => {
    return {
      value: key,
      label: key == 'true' ? 'Yes' : 'No',
    };
  });

  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Card
          className='animate-fade-up w-full max-w-screen-xl'
          style={{ background: '#FAFAFA' }}
        >
          <Meta title='Filter'></Meta>
          <QueryFilter<FilterBoxOption>
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
              onFilter(values);
              // //console.log(values.name);
            }}
            onReset={async (values: any) => {
              const emptyData: FilterBoxOption = {
                name: undefined,
                centre: undefined,
                breed: undefined,
                gender: undefined,
                adopted: undefined,
              };
              onFilter(emptyData);
              // //console.log(values.name);
            }}
          >
            <ProFormText
              width='md'
              name='name'
              label='Cat Name'
              placeholder='Please input Cat Name'
            />
            <ProFormSelect
              width='md'
              name='breed'
              label='Cat Breed'
              options={breedOptions}
              placeholder='Please input Cat Breed'
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
            />
            {/* <ProFormDatePicker name='birthday' label='Birthday' /> */}
            <ProFormSelect
              width='md'
              name='centre'
              label='Centre'
              options={centreOptions}
              placeholder='Please input Cat Breed'
            />

            <ProFormSelect
              width='md'
              name='adopted'
              label='Adoption'
              options={adoptedOptions}
              placeholder='Please input Cat Adoption'
            ></ProFormSelect>
          </QueryFilter>
        </Card>
      </StyleProvider>
    </ConfigProvider>
  );
};
