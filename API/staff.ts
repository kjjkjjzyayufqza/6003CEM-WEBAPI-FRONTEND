import {
  CreateUserModel,
  SignInModel,
  SignInResponseModel,
  UserModel,
  customRes,
} from 'Model';
import axios, { AxiosResponse } from 'axios';
import { getToken, refreshToken } from './auth';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000/'
      : 'https://6003cem-webapi-backend.azurewebsites.net/',
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

export function createUserBooking (data: any) {
  return instance.post('userBooking', { encryptedData: data });
}

export function getAllUserBooking (args: {
  mobile?: string;
}): Promise<customRes<any[]>> {
  return instance.get('userBooking', { params: args });
}

export function getCurrentUser (): Promise<customRes<UserModel>> {
  return instance.get('users');
}

export function Logout (): Promise<customRes<any>> {
  return instance.get('auth/logout');
}

export function CreateAccount (args: CreateUserModel): Promise<customRes<any>> {
  return instance.post('auth/SignUp', args);
}
