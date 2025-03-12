
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RangeFilterProps {
  label: string;
  minValue?: number;
  maxValue?: number;
  minKey: string;
  maxKey: string;
  onFilterChange: (filters: Record<string, any>) => void;
}

export const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  minValue,
  maxValue,
  minKey,
  maxKey,
  onFilterChange,
}) => {
  const formatValue = (value: number | undefined) => {
    if (value === undefined) return '';
    if (minKey === 'priceMin' || maxKey === 'priceMax') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
      }).format(value).replace('₽', '').trim();
    }
    return value.toString();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="От"
          value={formatValue(minValue)}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d]/g, '');
            onFilterChange({ [minKey]: value ? parseInt(value) : undefined });
          }}
        />
        <Input
          type="text"
          placeholder="До"
          value={formatValue(maxValue)}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d]/g, '');
            onFilterChange({ [maxKey]: value ? parseInt(value) : undefined });
          }}
        />
      </div>
    </div>
  );
};
