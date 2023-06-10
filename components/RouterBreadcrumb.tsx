import { Breadcrumb } from 'antd';
import { FC } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LuCat } from 'react-icons/lu';
import { useState } from 'react';

export interface RouterBreadcrumbModel {
  paths: { name: string; path: string; current?: boolean }[];
}

export const RouterBreadcrumb: FC<RouterBreadcrumbModel> = ({ paths }) => {
  const [value, setValue] = useState<any[]>([]);

  const switchIcon = (string: string) => {
    switch (string) {
      case 'Home':
        return <HomeOutlined rev={undefined} />;
        break;
      case 'Cat List':
        return <UnorderedListOutlined rev={undefined} />;
        break;
    }
  };

  useEffect(() => {
    if (paths) {
      paths.map(e => {
        setValue(v => [
          ...v,
          {
            title: (
              <Link href={e.path}>
                <div
                  className={`flex items-center gap-1 ${
                    e.current ? 'font-bold text-black' : ''
                  }`}
                >
                  {switchIcon(e.name)}
                  <div className={''}>{e.name}</div>
                </div>
              </Link>
            ),
          },
        ]);
      });
    }
  }, []);

  return <Breadcrumb items={value} />;
};
