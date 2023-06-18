import { Button, Drawer, Select } from 'antd';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface valueModel {
  value: string;
  label: string;
}

export const BreedDrawer: FC<{ _open: boolean; _onClose: () => void }> = ({
  _open,
  _onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<valueModel[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState<any>();

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  useEffect(() => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(res => {
        const value: valueModel[] = res.data.map((e: any) => {
          return { value: e.id, label: e.name };
        });
        setAllData(res.data);
        setSelectValue(value);
      })
      .catch(err => {});
  }, []);

  const onClose = () => {
    setOpen(false);
    _onClose();
  };

  const SwiperStyle: any = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  };

  return (
    <Drawer
      width={600}
      title='Cat Breed classification'
      placement='right'
      onClose={onClose}
      open={open}
    >
      <p className='mb-10 text-xl'>
        If you want to know what breed cat is, you can try the following tools.
      </p>
      <p className='mb-2 text-xl'>Select Breed:</p>
      <Select
        defaultValue={selectValue[0]}
        style={{ width: 300 }}
        onChange={(_, e) => {
          setImageList([]);
          //console.log(e);
          axios
            .get(
              'https://api.thecatapi.com/v1/images/search?breed_ids=' +
                _ +
                '&limit=5',
            )
            .then(res => {
              const data: string[] = res.data.map((x: any) => {
                return x.url;
              });
              const des: string = allData.filter(e => e.id == _)[0].description;
              setDescription(des);
              setImageList(data);
            })
            .catch(err => {});
        }}
        options={selectValue}
      />
      <Swiper
        className='mt-8'
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
        {imageList.map((e, i) => {
          return (
            <SwiperSlide key={i}>
              <img alt={''} className='h-80 w-full object-cover' src={e}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <p className='my-1 text-lg'>{description}</p>
    </Drawer>
  );
};
