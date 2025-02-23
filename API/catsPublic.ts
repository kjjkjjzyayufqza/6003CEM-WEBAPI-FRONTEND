import {
  FavouritesModel,
  customRes,
} from 'Model';
import axios from 'axios';
import { getToken, refreshToken } from './auth';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000/'
      : 'https://6003cem-webapi-backend-production.up.railway.app/',
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  async config => {
    // 在发送请求之前做些什么
    config.headers.Authorization = (await getToken()) as any;
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
    if (error.response.status === 401) {
      if (await refreshToken()) {
      } else {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  },
);

export function getfavouritesCat (): Promise<customRes<FavouritesModel>> {
  return instance.get('/users/Favourites');
}

export function addfavouritesCat (id: string[]): Promise<customRes<any[]>> {
  const data = {
    Favourites: id,
  };
  return instance.post('/users/Favourites', data);
}
