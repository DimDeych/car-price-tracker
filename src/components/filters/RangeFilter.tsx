
import React from 'react';
import type { Filters } from '@/types/car';

interface RangeFilterProps {
  label: string;
  minValue: string;
  maxValue: string;
  minKey: keyof Filters;
  maxKey: keyof Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  placeholder?: { min: string; max: string };
}

export const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  minValue,
  maxValue,
  minKey,
  maxKey,
  onFilterChange,
  placeholder = { min: "От", max: "До" }
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-2">{label}</label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder={placeholder.min}
          value={minValue}
          onChange={(e) => onFilterChange({ [minKey]: e.target.value })}
          className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
        <input
          type="number"
          placeholder={placeholder.max}
          value={maxValue}
          onChange={(e) => onFilterChange({ [maxKey]: e.target.value })}
          className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
      </div>
    </div>
  );
};

