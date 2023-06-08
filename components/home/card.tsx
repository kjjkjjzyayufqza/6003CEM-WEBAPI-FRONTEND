import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import Balancer from 'react-wrap-balancer';

export interface HomeCardModel {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}

export const HomeCard: FC<HomeCardModel> = ({
  title,
  description,
  demo,
  large,
}) => {
  return (
    <Card
      hoverable
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <Link href='ListCatPage'>
        <div className='flex h-60 items-center justify-center'>{demo}</div>
        <div className='mx-auto max-w-md text-center'>
          <h2 className='font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl font-bold text-transparent md:text-3xl md:font-normal'>
            <Balancer>{title}</Balancer>
          </h2>
          <div className='prose-sm md:prose -mt-2 leading-normal text-gray-500'>
            <Balancer>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      {...props}
                      className='font-medium text-gray-800 underline transition-colors'
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      {...props}
                      // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                      inline='true'
                      className='rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800'
                    />
                  ),
                }}
              >
                {description}
              </ReactMarkdown>
            </Balancer>
          </div>
        </div>
      </Link>
    </Card>
  );
};
