import {
  BookingModel,
  CatsModel,
  CentreEnum,
  CreateUserModel,
  NewsModel,
  StaffUserModel,
  UpdateStaffUserModel,
  createCatsModel,
  customListRes,
  customRes,
  getCatsFilter,
  updateCatsModel,
} from 'Model';
import axios from 'axios';
import { getTokenStaff, refreshToken, refreshTokenStaff } from './auth';

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
    config.headers.Authorization = (await getTokenStaff()) as any;
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
      if (await refreshTokenStaff()) {
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
  centre?: CentreEnum;
}): Promise<customRes<customListRes<BookingModel[]>>> {
  return instance.get('userBooking', { params: args });
}

export function getCurrentUser (): Promise<customRes<StaffUserModel>> {
  return instance.get('staff-user');
}

export function Logout (): Promise<customRes<any>> {
  return instance.get('auth/logout');
}

export function CreateAccount (args: CreateUserModel): Promise<customRes<any>> {
  return instance.post('auth/SignUp', args);
}

export function CreateNews (args: NewsModel): Promise<customRes<any>> {
  return instance.post('news', args);
}

export function createCats (
  args: createCatsModel[],
): Promise<customRes<CatsModel[]>> {
  return instance.post('cats', args);
}

export function updateCats (
  id: string,
  args: updateCatsModel,
): Promise<customRes<CatsModel>> {
  return instance.put('cats/' + id, args);
}

export function deleteCats (id: string): Promise<customRes<any>> {
  return instance.delete('cats/' + id);
}

export function updateStaff (
  args: UpdateStaffUserModel,
): Promise<customRes<StaffUserModel>> {
  return instance.put('staff-user', args);
}
