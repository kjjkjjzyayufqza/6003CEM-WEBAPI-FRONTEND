import {
  CreateStaffModel,
  CreateUserModel,
  SignInModel,
  SignInResponseModel,
  customRes,
} from 'Model';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000/'
      : 'https://6003cem-webapi-backend.azurewebsites.net/',
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  async (config: any) => {
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

let _isRefeshingToken = false;
let _pendingRefresh: any = [];

export async function getToken () {
  return new Promise(async (solved, reject) => {
    // console.log(localStorage.getItem('expire_date'), ' ', new Date().valueOf())
    if (
      parseInt(localStorage.getItem('expire_date') || '0') >
      new Date().valueOf()
    ) {
      solved('Bearer' + ' ' + localStorage.getItem('access_token'));
    } else if (
      !localStorage.getItem('access_token') &&
      !localStorage.getItem('refresh_token')
    ) {
      solved('null');
      window.location.href = '/';
    } else {
      if (!_isRefeshingToken) {
        _isRefeshingToken = true;
        if (await refreshToken()) {
          _isRefeshingToken = false;
          getToken()
            .then(token => {
              solved(token);
              _pendingRefresh.forEach((element: any) => {
                element(token);
              });
              _pendingRefresh = [];
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          localStorage.clear();
        }
      } else {
        _pendingRefresh.push(solved);
      }
    }
  });
}

export async function refreshToken () {
  var ischeck = false;
  if (localStorage.getItem('refresh_token')) {
    await instance
      .post<SignInResponseModel>('auth/RefreshPublic', {
        refreshToken: localStorage.getItem('refresh_token'),
      })
      .then(res => {
        const expire_date: any = jwt_decode(res.data.accessToken);
        localStorage.setItem('expire_date', String(expire_date.exp * 1000));
        localStorage.setItem('access_token', res.data.accessToken);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        ischeck = true;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return ischeck;
}

//----------------------------------------------------------------

let _isRefeshingToken_Staff = false;
let _pendingRefresh_Staff: any = [];

export async function getTokenStaff () {
  return new Promise(async (solved, reject) => {
    // console.log(localStorage.getItem('expire_date'), ' ', new Date().valueOf())
    if (
      parseInt(localStorage.getItem('expire_date') || '0') >
      new Date().valueOf()
    ) {
      solved('Bearer' + ' ' + localStorage.getItem('access_token'));
    } else if (
      !localStorage.getItem('access_token') &&
      !localStorage.getItem('refresh_token')
    ) {
      solved('null');
      window.location.href = '/Staff/Login';
    } else {
      if (!_isRefeshingToken_Staff) {
        _isRefeshingToken_Staff = true;
        if (await refreshTokenStaff()) {
          _isRefeshingToken_Staff = false;
          getTokenStaff()
            .then(token => {
              solved(token);
              _pendingRefresh_Staff.forEach((element: any) => {
                element(token);
              });
              _pendingRefresh_Staff = [];
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          localStorage.clear();
        }
      } else {
        _pendingRefresh_Staff.push(solved);
      }
    }
  });
}

export async function refreshTokenStaff () {
  var ischeck = false;
  if (localStorage.getItem('refresh_token')) {
    await instance
      .post<SignInResponseModel>('auth/RefreshStaff', {
        refreshToken: localStorage.getItem('refresh_token'),
      })
      .then(res => {
        const expire_date: any = jwt_decode(res.data.accessToken);
        localStorage.setItem('expire_date', String(expire_date.exp * 1000));
        localStorage.setItem('access_token', res.data.accessToken);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        ischeck = true;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return ischeck;
}

export function SignInPublic (
  args: SignInModel,
): Promise<customRes<SignInResponseModel>> {
  return instance.post('auth/SignInPublic', args);
}

export function SignInStaff (
  args: SignInModel,
): Promise<customRes<SignInResponseModel>> {
  return instance.post('auth/SignInStaff', args);
}

export function RegisterPublic (
  args: CreateUserModel,
): Promise<customRes<SignInResponseModel>> {
  console.log(args);
  return instance.post('auth/RegisterPublic', args);
}

export function RegisterStaff (
  centerCode: string,
  args: CreateStaffModel,
): Promise<customRes<SignInResponseModel>> {
  const data = {
    ...args,
    role: 'Staff',
  };
  return instance.post('auth/RegisterStaff/' + centerCode, data);
}
