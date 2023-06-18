'use client';
import { HomeCard, HomeCardModel } from '@/components/home/card';
import { Badge } from 'antd';
import Image from 'next/image';
import { useEffect } from 'react';
import { LuCat } from 'react-icons/lu';
import Balancer from 'react-wrap-balancer';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HomePage () {
  const SwiperStyle: any = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className='z-10 w-full max-w-xl px-5 xl:px-0'>
        <a
          href='https://github.com/kjjkjjzyayufqza'
          target='_blank'
          rel='noreferrer'
          className='animate-fade-up mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200'
        >
          {/* <Twitter className='h-5 w-5 text-[#1d9bf0]' /> */}
          <LuCat className='h-5 w-5 text-[#1d9bf0]' />
          <p className='text-sm font-semibold text-[#1d9bf0]'>
            The Pet Shelter
          </p>
        </a>
        <h1
          className='animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]'
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
        >
          <Balancer>Cat for Adoption</Balancer>
        </h1>
        <p
          className='animate-fade-up mt-6 text-center text-gray-500 opacity-0 md:text-xl'
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          <Balancer>
            One adoption saves two lives. Every time a lucky animal leaves our
            adoption center, a place will be vacated so that another animal can
            wait in the center to find a new home!
          </Balancer>
        </p>
      </div>
      {/* <div className='z-10 mt-24 w-full px-5 md:max-w-7xl xl:px-0'> */}
      <div className='md:max-w-8xl z-10 mt-24 w-full px-5 xl:px-0'>
        <Swiper
          style={SwiperStyle}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          <SwiperSlide>
            <img className='w-full' alt={''} src='/cat1.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={'/cat2.jpg'} alt={''} className='w-full'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={'/cat3.jpg'} alt={''} className='w-full'></img>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='z-10 w-full max-w-xl px-5 xl:px-0'>
        <p
          className='animate-fade-up mt-20 text-center text-gray-500 opacity-0 md:text-xl'
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          <Balancer>
            One adoption saves two lives. Every time a lucky animal leaves our
            adoption center, a place will be vacated so that another animal can
            wait in the center to find a new home!
          </Balancer>
        </p>
        <div
          className='animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0'
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <a
            className='flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800'
            href='https://www.spca.org.hk/ch/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LuCat className='h-5 w-5 text-[#000000]' />
            <p>
              <span className='hidden sm:inline-block'>More Information</span>
            </p>
          </a>
        </div>
      </div>
      <div className='animate-fade-up my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-4 xl:px-0'>
        {features.map(({ title, description, demo, large, path }) => (
          <HomeCard
            key={title}
            title={title}
            description={description}
            demo={title === 'Beautiful, reusable components' ? <></> : demo}
            large={large}
            path={path}
          />
        ))}
      </div>
    </>
  );
}

const features: HomeCardModel[] = [
  {
    title: 'Cat for adoption',
    description: 'These cats need your [HELP]()',
    demo: (
      <>
        <Image
          src='/card_cat1.jpg'
          width={250}
          height={250}
          alt=''
          className='rounded-2xl'
        ></Image>
      </>
    ),
    large: true,
    path: 'ListCatPage',
  },

  {
    title: 'All Cat',
    description: 'View all Cats or Find Cats',
    demo: (
      <>
        <Image
          src='/fake_cats.jpg'
          width={250}
          height={250}
          alt=''
          className='rounded-lg'
        ></Image>
      </>
    ),
    large: true,
    path: 'ListCatPage',
  },
  {
    title: 'News',
    description: 'Get the latest `Adoption Information`',
    demo: (
      <>
        <Badge count={25}>
          <Image
            src='/Grin2B_icon_NEWS.png'
            width={150}
            height={250}
            alt=''
            className='rounded-lg'
          ></Image>
        </Badge>
      </>
    ),
    large: true,
    path: 'NewsPage',
  },
  {
    title: 'Join Us',
    description: 'Become a `Member` of the Association',
    demo: (
      <>
        <Image
          src='/join-us-banner-free-vector.jpg'
          width={500}
          height={500}
          alt=''
          className='rounded-lg'
        ></Image>
      </>
    ),
    path: 'MemberPage',
  },
  {
    title: 'About Us',
    description: 'Who We Are ?',
    demo: (
      <>
        <Image
          src='/logo.png'
          width={100}
          height={250}
          alt=''
          className='rounded-lg'
        ></Image>
      </>
    ),
    path: 'About',
  },
];
