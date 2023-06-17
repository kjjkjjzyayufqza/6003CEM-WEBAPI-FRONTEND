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

export enum CatBreedEnum {
  Abyssinian = 'Abyssinian',
  AmericanBobtail = 'American Bobtail',
  AmericanCurl = 'American Curl',
  AmericanShorthair = 'American Shorthair',
  AmericanWirehair = 'American Wirehair',
  Balinese = 'Balinese',
  Bengal = 'Bengal',
  Birman = 'Birman',
  Bombay = 'Bombay',
  BritishShorthair = 'British Shorthair',
  Burmese = 'Burmese',
  Burmilla = 'Burmilla',
  Chartreux = 'Chartreux',
  ColorpointShorthair = 'Colorpoint Shorthair',
  CornishRex = 'Cornish Rex',
  Cymric = 'Cymric',
  DevonRex = 'Devon Rex',
  DomesticLonghair = 'Domestic Longhair',
  DomesticMediumHair = 'Domestic Medium Hair',
  DomesticShorthair = 'Domestic Shorthair',
  EgyptianMau = 'Egyptian Mau',
  ExoticShorthair = 'Exotic Shorthair',
  HavanaBrown = 'Havana Brown',
  Himalayan = 'Himalayan',
  JapaneseBobtail = 'Japanese Bobtail',
  Javanese = 'Javanese',
  Korat = 'Korat',
  LaPerm = 'LaPerm',
  MaineCoon = 'Maine Coon',
  Manx = 'Manx',
  NorwegianForestCat = 'Norwegian Forest Cat',
  Ocicat = 'Ocicat',
  Oriental = 'Oriental',
  Persian = 'Persian',
  RagaMuffin = 'RagaMuffin',
  Ragdoll = 'Ragdoll',
  RussianBlue = 'Russian Blue',
  ScottishFold = 'Scottish Fold',
  SelkirkRex = 'Selkirk Rex',
  Siamese = 'Siamese',
  Siberian = 'Siberian',
  Singapura = 'Singapura',
  Somali = 'Somali',
  Sphynx = 'Sphynx',
  Tonkinese = 'Tonkinese',
  TurkishAngora = 'Turkish Angora',
  TurkishVan = 'Turkish Van',
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
  phone: string;
  birthday: Date;
  password: string;
}

export interface CreateStaffModel {
  code: string;
  name: string;
  email: string;
  password: string;
  role: 'Staff';
}

export interface getCatsFilter {
  id?: string;
  name?: string;
  adopted?: boolean;
  gender?: GenderEnum;
  breed?: CatBreedEnum;
  centre?: CentreEnum;
  page?: number;
  pageSize?: number;
}

export interface createCatsModel {
  name: string;
  birthday: string;
  gender: GenderEnum;
  breed: CatBreedEnum;
  photo: string;
  about: string;
  centre: CentreEnum;
  adopted: string;
  addedTime: string;
  updatedTime: string;
}

export interface updateCatsModel {
  name: string;
  birthday: string;
  gender: GenderEnum;
  breed: CatBreedEnum;
  photo: string;
  about: string;
  centre: CentreEnum;
  adopted: string;
  addedTime: string;
  updatedTime: string;
}

export interface CatsModel {
  _id: string;
  name: string;
  birthday: string;
  gender: GenderEnum;
  breed: CatBreedEnum;
  photo: string;
  about: string;
  centre: CentreEnum;
  adopted: string;
  addedTime: string;
  updatedTime: string;
}

export interface FavouritesModel {
  _id: string;
  userId: string;
  Favourites: string[];
}
