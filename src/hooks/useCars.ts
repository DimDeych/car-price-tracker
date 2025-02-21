
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Car, Filters } from "@/types/car";

export const useCars = (filters: Filters) => {
  const fetchCars = async ({ pageParam = 0 }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const itemsPerPage = 6;
    const mockData: Car[] = Array.from({ length: itemsPerPage }, (_, i) => ({
      id: pageParam * itemsPerPage + i + 1,
      brand: filters.brand || "Mercedes-Benz",
      model: filters.model || "E-Class",
      year: 2023,
      price: Math.floor(Math.random() * 50000) + 30000,
      mileage: Math.floor(Math.random() * 50000),
      location: filters.city || "Берлин"
    }));

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
