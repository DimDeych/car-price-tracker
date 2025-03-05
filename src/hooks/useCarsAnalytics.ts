
import { useQuery } from "@tanstack/react-query";
import { Filters } from "@/types/car";

interface PriceHistoryData {
  month: string;
  price: number;
}

interface SimilarListingsData {
  price: number;
  count: number;
}

export interface AnalyticsData {
  priceHistory: PriceHistoryData[];
  similarListings: SimilarListingsData[];
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  priceDistribution: {
    range: string;
    count: number;
  }[];
}

export const useCarsAnalytics = (filters: Filters) => {
  const fetchAnalytics = async () => {
    // Имитация задержки запроса
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Имитируем получение данных с сервера
    const priceHistory: PriceHistoryData[] = [
      { month: "Янв", price: 78000 },
      { month: "Фев", price: 77000 },
      { month: "Мар", price: 76000 },
      { month: "Апр", price: 75000 },
      { month: "Май", price: 75000 },
      { month: "Июн", price: 75000 },
    ];

    const similarListings: SimilarListingsData[] = [
      { price: 70000, count: 3 },
      { price: 75000, count: 5 },
      { price: 80000, count: 4 },
      { price: 85000, count: 2 },
      { price: 90000, count: 1 },
    ];

    // Дополнительные данные для расширенной аналитики
    const priceRange = {
      min: 70000,
      max: 90000,
      average: 78500
    };

    const priceDistribution = [
      { range: "60k-70k", count: 2 },
      { range: "70k-80k", count: 12 },
      { range: "80k-90k", count: 6 },
      { range: "90k-100k", count: 3 },
      { range: "100k+", count: 1 }
    ];

    // Фильтр по бренду, если он указан
    if (filters.brand) {
      // Имитируем разные данные в зависимости от выбранного бренда
      const brandMultiplier = {
        "BMW": 1.2,
        "Mercedes-Benz": 1.3,
        "Audi": 1.1,
        "Volkswagen": 0.9,
        "Toyota": 0.8,
        "Honda": 0.85
      }[filters.brand] || 1;

      return {
        priceHistory: priceHistory.map(item => ({
          ...item,
          price: Math.round(item.price * brandMultiplier)
        })),
        similarListings: similarListings.map(item => ({
          ...item,
          price: Math.round(item.price * brandMultiplier)
        })),
        priceRange: {
          min: Math.round(priceRange.min * brandMultiplier),
          max: Math.round(priceRange.max * brandMultiplier),
          average: Math.round(priceRange.average * brandMultiplier)
        },
        priceDistribution
      };
    }

    return {
      priceHistory,
      similarListings,
      priceRange,
      priceDistribution
    };
  };

  return useQuery({
    queryKey: ['carsAnalytics', filters],
    queryFn: fetchAnalytics
  });
};
