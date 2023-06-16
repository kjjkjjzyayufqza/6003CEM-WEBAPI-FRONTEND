'use client';
import { Breadcrumb, ConfigProvider, Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import Sider from 'antd/es/layout/Sider';
import { Header, Footer } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import WebMenu from '@/components/WebMenu';
import { StaffHeader } from '@/components/StaffHeader';
import ReactECharts from 'echarts-for-react';
export default function Page () {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {}, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const option = {
    title: {
      text: 'Number of shelter cats',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Total Cats'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '2023-06-11',
          '2023-06-12',
          '2023-06-13',
          '2023-06-14',
          '2023-06-15',
          '2023-06-16',
          '2023-06-17',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Total Cats',
        type: 'line',
        stack: 'Number',
        areaStyle: { normal: {} },
        data: [0, 10, 10, 12, 14, 16, 22],
      },
    ],
  };

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
              <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <ReactECharts
                  option={option}
                  style={{ height: 400, width: '80%' }}
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
