
import React from 'react';
import type { Filters } from '@/types/car';
import { SortDropdown } from './filters/SortDropdown';
import { SelectFilter } from './filters/SelectFilter';
import { RangeFilter } from './filters/RangeFilter';
import { useMetadata } from '@/hooks/useMetadata';
import { bodyTypes, colors, fuelTypes } from '@/utils/filterData';

interface CarFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ filters, onFilterChange }) => {
  // Fetch metadata from API
  const { cities, brands, getModelsByBrand, isLoadingCities, isLoadingBrands } = useMetadata();
  const modelsQuery = getModelsByBrand(filters.brand);
  
  React.useEffect(() => {
    const savedFilters = localStorage.getItem('carSearchFilters');
    if (savedFilters) {
      onFilterChange(JSON.parse(savedFilters));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('carSearchFilters', JSON.stringify(filters));
  }, [filters]);

  const handleBrandChange = (newFilters: Partial<Filters>) => {
    onFilterChange({ 
      ...newFilters,
      model: "" 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SortDropdown 
          sortBy={filters.sortBy} 
          onFilterChange={onFilterChange} 
        />

        <SelectFilter
          label="Бренд"
          value={filters.brand}
          options={brands}
          filterKey="brand"
          onFilterChange={handleBrandChange}
          placeholder="Все бренды"
          disabled={isLoadingBrands}
        />

        <SelectFilter
          label="Модель"
          value={filters.model}
          options={modelsQuery.data || []}
          filterKey="model"
          onFilterChange={onFilterChange}
          disabled={!filters.brand || modelsQuery.isLoading}
          placeholder="Все модели"
        />

        <SelectFilter
          label="Город"
          value={filters.city}
          options={cities}
          filterKey="city"
          onFilterChange={onFilterChange}
          placeholder="Все города"
          disabled={isLoadingCities}
        />

        <SelectFilter
          label="Тип кузова"
          value={filters.bodyType}
          options={bodyTypes}
          filterKey="bodyType"
          onFilterChange={onFilterChange}
          placeholder="Все типы"
        />

        <SelectFilter
          label="Цвет"
          value={filters.color}
          options={colors}
          filterKey="color"
          onFilterChange={onFilterChange}
          placeholder="Все цвета"
        />

        <SelectFilter
          label="Тип топлива"
          value={filters.fuelType}
          options={fuelTypes}
          filterKey="fuelType"
          onFilterChange={onFilterChange}
          placeholder="Все типы"
        />

        <RangeFilter
          label="Цена (₽)"
          minValue={typeof filters.priceMin === 'string' ? 
            filters.priceMin === '' ? undefined : parseInt(filters.priceMin) : 
            filters.priceMin}
          maxValue={typeof filters.priceMax === 'string' ? 
            filters.priceMax === '' ? undefined : parseInt(filters.priceMax) : 
            filters.priceMax}
          minKey="priceMin"
          maxKey="priceMax"
          onFilterChange={onFilterChange}
        />

        <RangeFilter
          label="Пробег (км)"
          minValue={typeof filters.mileageMin === 'string' ? 
            filters.mileageMin === '' ? undefined : parseInt(filters.mileageMin) : 
            filters.mileageMin}
          maxValue={typeof filters.mileageMax === 'string' ? 
            filters.mileageMax === '' ? undefined : parseInt(filters.mileageMax) : 
            filters.mileageMax}
          minKey="mileageMin"
          maxKey="mileageMax"
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
};
