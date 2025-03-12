
import api from './api';
import { AdvertisementShortInfoModel, ItemsModel } from '@/types/api';

export enum AdvertisementSource {
  Source0 = 0,
  Source1 = 1
}

export interface CarListParams {
  brand?: string;
  model?: string;
  city?: string;
  source?: AdvertisementSource;
  limit?: number;
  offset?: number;
}

export const carService = {
  async getCarsList(params: CarListParams): Promise<AdvertisementShortInfoModel[]> {
    const response = await api.get('/api/ads/list', { params });
    return response.data;
  },

  async getCities(): Promise<string[]> {
    const response = await api.get<ItemsModel>('/api/metadata/cities');
    return response.data.items || [];
  },

  async getBrands(): Promise<string[]> {
    const response = await api.get<ItemsModel>('/api/metadata/brands');
    return response.data.items || [];
  },

  async getModelsByBrand(brand: string): Promise<string[]> {
    if (!brand) return [];
    const response = await api.get<ItemsModel>(`/api/metadata/models/${brand}`);
    return response.data.items || [];
  }
};
