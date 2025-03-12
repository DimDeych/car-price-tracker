
import { useQuery } from "@tanstack/react-query";
import { carService } from "@/services/carService";

export const useMetadata = () => {
  const citiesQuery = useQuery({
    queryKey: ['cities'],
    queryFn: carService.getCities,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: carService.getBrands,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const getModelsByBrand = (brand: string) => {
    return useQuery({
      queryKey: ['models', brand],
      queryFn: () => carService.getModelsByBrand(brand),
      staleTime: 1000 * 60 * 60, // 1 hour
      enabled: !!brand, // Only run if brand is provided
    });
  };

  return {
    cities: citiesQuery.data || [],
    brands: brandsQuery.data || [],
    getModelsByBrand,
    isLoadingCities: citiesQuery.isLoading,
    isLoadingBrands: brandsQuery.isLoading,
  };
};
