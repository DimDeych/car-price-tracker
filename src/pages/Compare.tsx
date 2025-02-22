
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Compare = () => {
  const { toast } = useToast();
  const [cars, setCars] = React.useState<Car[]>(() => {
    const saved = localStorage.getItem("comparisonList");
    return saved ? JSON.parse(saved) : [];
  });

  const removeCar = (carId: number) => {
    setCars(prev => {
      const newCars = prev.filter(car => car.id !== carId);
      localStorage.setItem("comparisonList", JSON.stringify(newCars));
      toast({
        description: "Автомобиль удален из сравнения",
      });
      return newCars;
    });
  };

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <main className="pt-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Сравнение автомобилей</h1>
            <p className="text-gray-600 mb-8">
              Нет автомобилей для сравнения. Добавьте автомобили из карточек объявлений.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="pt-24 container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Сравнение автомобилей</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 border-b sticky left-0 z-10">
                    Характеристики
                  </th>
                  {cars.map((car) => (
                    <th key={car.id} className="p-4 bg-gray-50 border-b min-w-[300px]">
                      <div className="flex items-center justify-between">
                        <span>{car.brand} {car.model}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCar(car.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b sticky left-0 bg-white">Цена</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-4 border-b">
                      €{car.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b sticky left-0 bg-white">Год выпуска</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-4 border-b">{car.year}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b sticky left-0 bg-white">Местоположение</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-4 border-b">{car.location}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compare;
