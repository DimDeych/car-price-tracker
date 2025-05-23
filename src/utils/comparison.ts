
export interface ListingItem {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  engine: {
    type: string;
    power: string;
    volume: string;
  };
  transmission: string;
  color: string;
  description: string;
  features: string[];
  seller: {
    name: string;
    phone: string;
    rating: number;
  };
}

export const useComparisonList = (listingId: number) => {
  const isInComparison = () => {
    const comparisonList = JSON.parse(localStorage.getItem("comparisonList") || "[]");
    return comparisonList.some((car: ListingItem) => car.id === listingId);
  };

  const toggleComparison = (listing: ListingItem, onToggle: (isInList: boolean) => void) => {
    const comparisonList = JSON.parse(localStorage.getItem("comparisonList") || "[]");
    
    if (isInComparison()) {
      const newList = comparisonList.filter((car: ListingItem) => car.id !== listing.id);
      localStorage.setItem("comparisonList", JSON.stringify(newList));
      onToggle(false);
    } else {
      const newList = [...comparisonList, listing];
      localStorage.setItem("comparisonList", JSON.stringify(newList));
      onToggle(true);
    }
  };

  return { isInComparison, toggleComparison };
};

// Функция для форматирования чисел в компактный формат (1000 -> 1K)
export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};
