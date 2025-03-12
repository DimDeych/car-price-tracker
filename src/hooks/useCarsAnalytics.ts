
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
  priceDistribution: Record<string, number>;
  mileageDistribution: Record<string, number>;
  bodyTypeDistribution: Record<string, number>;
  cityDistribution: Record<string, number>;
  topBrands: Record<string, number>;
  topModels: Record<string, number>;
  monthlyListings: Array<{ month: string; listings: number }>;
}

export const useCarsAnalytics = (filters: Filters, timeRange: "month" | "quarter" | "year" = "month") => {
  const fetchAnalytics = async (): Promise<AnalyticsData> => {
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

    const priceDistribution = {
      "60k-70k": 2,
      "70k-80k": 12,
      "80k-90k": 6,
      "90k-100k": 3,
      "100k+": 1
    };

    const topBrands = {
      "BMW": 25,
      "Mercedes-Benz": 18,
      "Audi": 15,
      "Volkswagen": 12,
      "Toyota": 10,
      "Honda": 8
    };

    const topModels = {
      "BMW 3 Series": 12,
      "Mercedes-Benz C-Class": 10,
      "Audi A4": 8,
      "Volkswagen Golf": 7,
      "Toyota Camry": 6
    };

    const mileageDistribution = {
      "0-10000 км": 5,
      "10000-50000 км": 18,
      "50000-100000 км": 25,
      "100000-150000 км": 15,
      "150000+ км": 7
    };

    const bodyTypeDistribution = {
      "Седан": 30,
      "Внедорожник": 25,
      "Хэтчбек": 15,
      "Универсал": 10,
      "Купе": 5
    };

    const cityDistribution = {
      "Москва": 35,
      "Санкт-Петербург": 25,
      "Екатеринбург": 15,
      "Казань": 10,
      "Новосибирск": 8,
      "Краснодар": 7
    };

    const monthlyListings = [
      { month: "Янв", listings: 120 },
      { month: "Фев", listings: 135 },
      { month: "Мар", listings: 140 },
      { month: "Апр", listings: 150 },
      { month: "Май", listings: 160 },
      { month: "Июн", listings: 175 },
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
        priceDistribution,
        topBrands,
        topModels,
        mileageDistribution,
        bodyTypeDistribution,
        cityDistribution,
        monthlyListings
      };
    }

    return {
      priceHistory,
      similarListings,
      priceRange,
      priceDistribution,
      topBrands,
      topModels,
      mileageDistribution,
      bodyTypeDistribution,
      cityDistribution,
      monthlyListings
    };
  };

  return useQuery({
    queryKey: ['carsAnalytics', filters, timeRange],
    queryFn: fetchAnalytics
  });
};
