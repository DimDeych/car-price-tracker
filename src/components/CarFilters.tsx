
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
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
  const bodyTypes = ["Седан", "Хэтчбек", "Универсал", "Внедорожник", "Купе"];
  const colors = ["Белый", "Черный", "Серебристый", "Красный", "Синий"];
  const fuelTypes = ["Бензин", "Дизель", "Электро", "Гибрид"];
  const sortOptions = [
    { value: "price-asc", label: "Цена: по возрастанию", icon: <ArrowUp className="mr-2 h-4 w-4" /> },
    { value: "price-desc", label: "Цена: по убыванию", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
    { value: "mileage-asc", label: "Пробег: по возрастанию", icon: <ArrowUp className="mr-2 h-4 w-4" /> },
    { value: "mileage-desc", label: "Пробег: по убыванию", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
    { value: "year-desc", label: "Год: сначала новые", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
    { value: "year-asc", label: "Год: сначала старые", icon: <ArrowUp className="mr-2 h-4 w-4" /> }
  ];

  const getCurrentSortIcon = () => {
    const currentSort = sortOptions.find(option => option.value === filters.sortBy);
    return currentSort?.icon || <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.value === filters.sortBy);
    return currentSort?.label || "Сортировка";
  };

  React.useEffect(() => {
    const savedFilters = localStorage.getItem('carSearchFilters');
    if (savedFilters) {
      onFilterChange(JSON.parse(savedFilters));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('carSearchFilters', JSON.stringify(filters));
  }, [filters]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Сортировка</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-white hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  {getCurrentSortIcon()}
                  {getCurrentSortLabel()}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onFilterChange({ sortBy: option.value })}
                  className="flex items-center cursor-pointer"
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
          <label className="text-sm text-gray-600 mb-2">Тип кузова</label>
          <select
            value={filters.bodyType}
            onChange={(e) => onFilterChange({ bodyType: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="">Все типы</option>
            {bodyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Цвет</label>
          <select
            value={filters.color}
            onChange={(e) => onFilterChange({ color: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="">Все цвета</option>
            {colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Тип топлива</label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFilterChange({ fuelType: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="">Все типы</option>
            {fuelTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
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
