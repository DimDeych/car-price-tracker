
import React from 'react';
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  isLiked: boolean;
  onLike: (carId: number) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, isLiked, onLike }) => {
  return (
    <div className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={(e) => {
            e.preventDefault();
            onLike(car.id);
          }}
        >
          <Heart className={isLiked ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </Button>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500">{car.brand}</div>
        <div className="font-semibold mt-1">{car.model} {car.year}</div>
        <div className="text-primary font-medium mt-2">€{car.price.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-2">{car.location}</div>
      </div>
    </div>
  );
};
