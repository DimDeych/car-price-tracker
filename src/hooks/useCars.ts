
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Car, Filters } from "@/types/car";

const bodyTypes = ["Седан", "Хэтчбек", "Универсал", "Внедорожник", "Купе"];
const colors = ["Белый", "Черный", "Серебристый", "Красный", "Синий"];
const fuelTypes = ["Бензин", "Дизель", "Электро", "Гибрид"];

export const useCars = (filters: Filters) => {
  const fetchCars = async ({ pageParam = 0 }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const itemsPerPage = 6;
    let mockData: Car[] = Array.from({ length: itemsPerPage }, (_, i) => ({
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

    // Применяем сортировку
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
