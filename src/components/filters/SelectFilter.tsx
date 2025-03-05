
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from 'lucide-react';
import type { Filters } from '@/types/car';

interface SelectFilterProps {
  label: string;
  value: string;
  options: string[];
  filterKey: keyof Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  value,
  options,
  filterKey,
  onFilterChange,
  disabled = false,
  placeholder = "Все"
}) => {
  const getCurrentValue = () => {
    return value || placeholder;
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-2">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="w-full justify-between bg-white hover:bg-gray-50"
          >
            {getCurrentValue()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-full min-w-[200px] bg-white shadow-lg border border-gray-200 rounded-md z-50"
        >
          <DropdownMenuItem
            onClick={() => onFilterChange({ [filterKey]: "" })}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
            {placeholder}
            {!value && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onFilterChange({ [filterKey]: option })}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              {option}
              {value === option && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
