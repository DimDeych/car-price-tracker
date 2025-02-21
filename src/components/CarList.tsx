
import React from 'react';
import { CarCard } from './CarCard';
import { Skeleton } from "@/components/ui/skeleton";
import type { Car } from '@/types/car';

interface CarListProps {
  cars: Car[];
  likedCars: Set<number>;
  onLike: (carId: number) => void;
  isLoading: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

export const CarList: React.FC<CarListProps> = ({ cars, likedCars, onLike, isLoading, loadMoreRef }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <Skeleton className="aspect-video" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isLiked={likedCars.has(car.id)}
          onLike={onLike}
        />
      ))}
      <div ref={loadMoreRef} />
    </div>
  );
};
