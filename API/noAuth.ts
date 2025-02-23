import {
  BookingModel,
  CatsModel,
  NewsModel,
  customListRes,
  customRes,
  getCatsFilter,
} from 'Model';
import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV != 'development'
      ? 'http://localhost:3000/'
      : 'https://6003cem-webapi-backend-production.up.railway.app/',
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  async config => {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  async error => {
    return Promise.reject(error);
  },
);

export function getCatsPublic (
  args: getCatsFilter,
): Promise<customRes<customListRes<CatsModel[]>>> {
  return instance.get('cats', { params: args });
}

export function getNews (): Promise<customRes<NewsModel[]>> {
  return instance.get('news');
}

export function createBooking (
  args: BookingModel,
): Promise<customRes<BookingModel>> {
  return instance.post('userBooking', args);
}
