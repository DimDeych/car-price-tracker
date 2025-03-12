import { useInfiniteQuery } from "@tanstack/react-query";
import type { Filters } from "@/types/car";
import { AdvertisementShortInfoModel } from "@/types/api";
import { carService, AdvertisementSource } from "@/services/carService";

const mapFiltersToApiParams = (filters: Filters, pageParam: number) => {
  return {
    brand: filters.brand || undefined,
    model: filters.model || undefined,
    city: filters.city || undefined,
    limit: 6,
    offset: pageParam * 6
  };
};

export const useCars = (filters: Filters) => {
  const fetchCars = async ({ pageParam = 0 }) => {
    const params = mapFiltersToApiParams(filters, pageParam);
    
    try {
      // Use the real API endpoint
      const cars = await carService.getCarsList(params);
      
      // Map API response to our Car type
      const mappedCars = cars.map(car => ({
        id: car.externalId,
        brand: car.brand || "Unknown",
        model: car.model || "Unknown",
        year: car.year,
        price: car.cost,
        mileage: car.mileage,
        location: car.location || "Unknown",
        bodyType: "Unknown", // These fields aren't in the API, using defaults
        color: "Unknown",
        fuelType: "Unknown"
      }));
      
      // Apply sorting locally since the API doesn't support it
      if (filters.sortBy) {
        mappedCars.sort((a, b) => {
          switch (filters.sortBy) {
            case "price-asc":
              return a.price - b.price;
            case "price-desc":
              return b.price - a.price;
            case "mileage-asc":
              return a.mileage - b.mileage;
            case "mileage-desc":
              return b.mileage - a.mileage;
            case "year-desc":
              return b.year - a.year;
            case "year-asc":
              return a.year - b.year;
            default:
              return 0;
          }
        });
      }
      
      return {
        cars: mappedCars,
        nextPage: pageParam + 1,
        hasMore: cars.length === 6 // If we got as many cars as we requested, there might be more
      };
    } catch (error) {
      console.error("Error fetching cars:", error);
      // Fallback to mock data in case of API error
      return fallbackFetchCars(pageParam, filters);
    }
  };

  const fallbackFetchCars = async (pageParam: number, filters: Filters) => {
    // This is the original mock data function as fallback
    await new Promise(resolve => setTimeout(resolve, 1000));

    const bodyTypes = ["Седан", "Хэтчбек", "Универсал", "Внедорожник", "Купе"];
    const colors = ["Белый", "Черный", "Серебристый", "Красный", "Синий"];
    const fuelTypes = ["Бензин", "Дизель", "Электро", "Гибрид"];

    const itemsPerPage = 6;
    let mockData = Array.from({ length: itemsPerPage }, (_, i) => ({
      id: pageParam * itemsPerPage + i + 1,
      brand: filters.brand || "Mercedes-Benz",
      model: filters.model || "E-Class",
      year: 2023,
      price: Math.floor(Math.random() * 50000) + 30000,
      mileage: Math.floor(Math.random() * 50000),
      location: filters.city || "Берлин",
      bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)]
    }));

    // Apply sorting
    if (filters.sortBy) {
      mockData = mockData.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "mileage-asc":
            return a.mileage - b.mileage;
          case "mileage-desc":
            return b.mileage - a.mileage;
          case "year-desc":
            return b.year - a.year;
          case "year-asc":
            return a.year - b.year;
          default:
            return 0;
        }
      });
    }

    return {
      cars: mockData,
      nextPage: pageParam + 1,
      hasMore: pageParam < 5
    };
  };

  return useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: fetchCars,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0
  });
};
