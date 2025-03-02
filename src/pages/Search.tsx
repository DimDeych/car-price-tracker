
import React from "react";
import { Navigation } from "@/components/Navigation";
import { CarFilters } from "@/components/CarFilters";
import { CarList } from "@/components/CarList";
import { useToast } from "@/components/ui/use-toast";
import { useCars } from "@/hooks/useCars";
import type { Filters } from "@/types/car";

const Search = () => {
  const { toast } = useToast();
  const [filters, setFilters] = React.useState<Filters>({
    brand: "",
    model: "",
    city: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
    bodyType: "",
    color: "",
    fuelType: "",
    sortBy: ""
  });
  const [likedCars, setLikedCars] = React.useState<Set<number>>(new Set());
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCars(filters);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleLike = (carId: number) => {
    setLikedCars(prev => {
      const newLikedCars = new Set(prev);
      if (newLikedCars.has(carId)) {
        newLikedCars.delete(carId);
        toast({
          description: "Автомобиль удален из избранного",
        });
      } else {
        newLikedCars.add(carId);
        toast({
          description: "Автомобиль добавлен в избранное",
        });
      }
      return newLikedCars;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Поиск автомобилей
          </h1>
          
          <CarFilters filters={filters} onFilterChange={handleFilterChange} />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Результаты поиска</h2>
          <CarList
            cars={data?.pages.flatMap(page => page.cars) ?? []}
            likedCars={likedCars}
            onLike={handleLike}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
          />
          
          {(isFetchingNextPage) && (
            <div className="mt-8 text-center p-4">
              <div className="animate-pulse text-gray-500">Загрузка...</div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
