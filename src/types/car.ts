
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  imageUrl?: string;
  bodyType: string;
  color: string;
  fuelType: string;
}

export interface Filters {
  brand: string;
  model: string;
  city: string;
  priceMin: string;
  priceMax: string;
  mileageMin: string;
  mileageMax: string;
  bodyType: string;
  color: string;
  fuelType: string;
  sortBy: string;
}
