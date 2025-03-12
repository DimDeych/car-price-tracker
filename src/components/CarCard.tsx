import React from 'react';
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "./ImageGallery";
import type { Car } from '@/types/car';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
  isLiked: boolean;
  onLike: (carId: number) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, isLiked, onLike }) => {
  // Здесь мы используем временные изображения для демонстрации
  const demoImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link 
      to={`/listing/${car.id}`} 
      className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <ImageGallery images={demoImages} aspectRatio={16/9} />
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
        <div className="text-primary font-medium mt-2">{formatPrice(car.price)}</div>
        <div className="text-sm text-gray-500 mt-2">{car.location}</div>
      </div>
    </Link>
  );
};
