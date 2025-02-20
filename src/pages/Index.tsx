
import { Search } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  imageUrl?: string;
}

interface Filters {
  brand: string;
  model: string;
  city: string;
  priceMin: string;
  priceMax: string;
  mileageMin: string;
  mileageMax: string;
}

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    brand: "",
    model: "",
    city: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Примерные данные для фильтров
  const carBrands = ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Toyota", "Honda"];
  const cities = ["Берлин", "Мюнхен", "Гамбург", "Франкфурт", "Штутгарт", "Кёльн"];
  const models = {
    "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS"],
    "Audi": ["A4", "A6", "A8", "Q5", "Q7"],
    "Volkswagen": ["Golf", "Passat", "Tiguan", "Touareg", "ID.4"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Highlander"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"]
  };

  // Имитация загрузки данных с сервера
  const fetchCars = async ({ pageParam = 0 }) => {
    // В реальном приложении здесь был бы API запрос с фильтрами
    await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки сети

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
      hasMore: pageParam < 5 // Ограничим количество страниц для демо
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: fetchCars,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0
  });

  // Наблюдатель для бесконечной прокрутки
  useEffect(() => {
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

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6">
            Найдите идеальный автомобиль
          </h1>
          <p className="text-gray-600 mb-8">
            Отслеживайте цены и находите лучшие предложения на рынке
          </p>
          
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Бренд</label>
                <select
                  value={filters.brand}
                  onChange={(e) => {
                    handleFilterChange({ 
                      brand: e.target.value,
                      model: "" // Сброс модели при смене бренда
                    });
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                >
                  <option value="">Все бренды</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Модель</label>
                <select
                  value={filters.model}
                  onChange={(e) => handleFilterChange({ model: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  disabled={!filters.brand}
                >
                  <option value="">Все модели</option>
                  {filters.brand && models[filters.brand]?.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Город</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange({ city: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                >
                  <option value="">Все города</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Цена (€)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange({ priceMin: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange({ priceMax: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Пробег (км)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.mileageMin}
                    onChange={(e) => handleFilterChange({ mileageMin: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.mileageMax}
                    onChange={(e) => handleFilterChange({ mileageMax: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Найденные автомобили</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Скелетон загрузки
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))
            ) : (
              data?.pages.map((page) =>
                page.cars.map((car) => (
                  <div
                    key={car.id}
                    className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500">{car.brand}</div>
                      <div className="font-semibold mt-1">{car.model} {car.year}</div>
                      <div className="text-primary font-medium mt-2">€{car.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mt-2">{car.location}</div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
          
          {/* Индикатор загрузки следующей страницы */}
          {(isFetchingNextPage || hasNextPage) && (
            <div 
              ref={loadMoreRef}
              className="mt-8 text-center p-4"
            >
              {isFetchingNextPage && (
                <div className="animate-pulse text-gray-500">Загрузка...</div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
