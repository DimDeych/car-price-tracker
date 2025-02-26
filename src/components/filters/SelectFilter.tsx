
import React from 'react';
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
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onFilterChange({ [filterKey]: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

