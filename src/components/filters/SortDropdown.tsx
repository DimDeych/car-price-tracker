
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

interface SortDropdownProps {
  sortBy: string;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

const sortOptions = [
  { value: "price-asc", label: "Цена: по возрастанию", icon: <ArrowUp className="mr-2 h-4 w-4" /> },
  { value: "price-desc", label: "Цена: по убыванию", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
  { value: "mileage-asc", label: "Пробег: по возрастанию", icon: <ArrowUp className="mr-2 h-4 w-4" /> },
  { value: "mileage-desc", label: "Пробег: по убыванию", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
  { value: "year-desc", label: "Год: сначала новые", icon: <ArrowDown className="mr-2 h-4 w-4" /> },
  { value: "year-asc", label: "Год: сначала старые", icon: <ArrowUp className="mr-2 h-4 w-4" /> }
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, onFilterChange }) => {
  const getCurrentSortIcon = () => {
    const currentSort = sortOptions.find(option => option.value === sortBy);
    return currentSort?.icon || <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.value === sortBy);
    return currentSort?.label || "Сортировка";
  };

  return (
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
  );
};

