
import React from "react";
import { Navigation } from "@/components/Navigation";
import { CarList } from "@/components/CarList";
import { useToast } from "@/hooks/use-toast";
import { useCars } from "@/hooks/useCars";
import type { Filters } from "@/types/car";

const Favorites = () => {
  const { toast } = useToast();
  const [likedCars, setLikedCars] = React.useState<Set<number>>(new Set());
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const filters: Filters = {
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
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCars(filters);

  const filteredCars = data?.pages.flatMap(page => 
    page.cars.filter(car => likedCars.has(car.id))
  ) ?? [];

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
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Избранные автомобили
          </h1>
          
          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                У вас пока нет избранных автомобилей
              </p>
            </div>
          ) : (
            <CarList
              cars={filteredCars}
              likedCars={likedCars}
              onLike={handleLike}
              isLoading={isLoading}
              loadMoreRef={loadMoreRef}
            />
          )}
          
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

export default Favorites;
