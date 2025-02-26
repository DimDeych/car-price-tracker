
import React from 'react';
import type { Filters } from '@/types/car';
import { SortDropdown } from './filters/SortDropdown';
import { SelectFilter } from './filters/SelectFilter';
import { RangeFilter } from './filters/RangeFilter';
import { carBrands, cities, models, bodyTypes, colors, fuelTypes } from '@/utils/filterData';

interface CarFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ filters, onFilterChange }) => {
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
          options={carBrands}
          filterKey="brand"
          onFilterChange={handleBrandChange}
          placeholder="Все бренды"
        />

        <SelectFilter
          label="Модель"
          value={filters.model}
          options={filters.brand ? models[filters.brand] : []}
          filterKey="model"
          onFilterChange={onFilterChange}
          disabled={!filters.brand}
          placeholder="Все модели"
        />

        <SelectFilter
          label="Город"
          value={filters.city}
          options={cities}
          filterKey="city"
          onFilterChange={onFilterChange}
          placeholder="Все города"
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
          label="Цена (€)"
          minValue={filters.priceMin}
          maxValue={filters.priceMax}
          minKey="priceMin"
          maxKey="priceMax"
          onFilterChange={onFilterChange}
        />

        <RangeFilter
          label="Пробег (км)"
          minValue={filters.mileageMin}
          maxValue={filters.mileageMax}
          minKey="mileageMin"
          maxKey="mileageMax"
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
};

