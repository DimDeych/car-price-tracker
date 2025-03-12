
export enum AdvertisementSource {
  Source0 = 0,
  Source1 = 1
}

export interface AdvertisementShortInfoModel {
  externalId: number;
  cost: number;
  location: string | null;
  year: number;
  brand: string | null;
  model: string | null;
  mileage: number;
  updatedAt: string | null;
  source: AdvertisementSource;
}

export interface ItemsModel {
  items: string[] | null;
}

export interface ProblemDetails {
  type: string | null;
  title: string | null;
  status: number | null;
  detail: string | null;
  instance: string | null;
  [key: string]: any;
}

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface RegisterRequest {
  email: string | null;
  password: string | null;
}

export interface TokenRefreshRequest {
  email: string | null;
  refreshToken: string | null;
}
