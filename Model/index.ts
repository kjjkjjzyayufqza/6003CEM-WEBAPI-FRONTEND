export enum CentreEnum {
  KwunTong = 'KwunTong',
  Central = 'Central',
  CausewayBay = 'CausewayBay',
  MongKok = 'MongKok',
  WanChai = 'WanChai',
  SheungWan = 'SheungWan',
  Admiralty = 'Admiralty',
  NorthPoint = 'NorthPoint',
  QuarryBay = 'QuarryBay',
  YauMaTei = 'YauMaTei',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export interface customRes<T> {
  data: T;
  message: boolean;
  statusCode: number;
}

export interface SignInModel {
  email: string;
  password: string;
}

export interface SignInResponseModel {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpModel {
  name: string;
  email: string;
  password: string;
  role: 'Staff';
}

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserModel {
  name: string;
  photo: string;
  email: string;
  password: string;
}

export interface CreateStaffModel {
  code: string;
  name: string;
  email: string;
  password: string;
  role: 'Staff';
}
