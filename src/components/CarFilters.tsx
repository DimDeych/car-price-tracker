
import React from 'react';
import type { Filters } from '@/types/car';

interface CarFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ filters, onFilterChange }) => {
  const carBrands = ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Toyota", "Honda"];
  const cities = ["Берлин", "Мюнхен", "Гамбург", "Франкфурт", "Штутгарт", "Кёльн"];
  const models = {
    "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS"],
    "Audi": ["A4", "A6", "A8", "Q5", "Q7"],
    "Volkswagen": ["Golf", "Passat", "Tiguan", "Touareg", "ID.4"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Highlander"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"]
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Бренд</label>
          <select
            value={filters.brand}
            onChange={(e) => {
              onFilterChange({ 
                brand: e.target.value,
                model: "" 
              });
            }}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="">Все бренды</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Модель</label>
          <select
            value={filters.model}
            onChange={(e) => onFilterChange({ model: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            disabled={!filters.brand}
          >
            <option value="">Все модели</option>
            {filters.brand && models[filters.brand]?.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Город</label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange({ city: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="">Все города</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Цена (€)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="От"
              value={filters.priceMin}
              onChange={(e) => onFilterChange({ priceMin: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.priceMax}
              onChange={(e) => onFilterChange({ priceMax: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Пробег (км)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="От"
              value={filters.mileageMin}
              onChange={(e) => onFilterChange({ mileageMin: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.mileageMax}
              onChange={(e) => onFilterChange({ mileageMax: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
