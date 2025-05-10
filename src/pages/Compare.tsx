
import React from "react";
import { Navigation } from "@/components/Navigation";
import { ListingItem } from "@/utils/comparison";
import { Button } from "@/components/ui/button";
import { X, Car, ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { ImageGallery } from "@/components/ImageGallery";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber } from "@/utils/comparison";

const Compare = () => {
  const { toast } = useToast();
  const [cars, setCars] = React.useState<ListingItem[]>(() => {
    const saved = localStorage.getItem("comparisonList");
    return saved ? JSON.parse(saved) : [];
  });

  // Демонстрационные изображения
  const demoImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  ];

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

  const removeAllCars = () => {
    setCars([]);
    localStorage.setItem("comparisonList", JSON.stringify([]));
    toast({
      description: "Все автомобили удалены из сравнения",
      variant: "destructive",
    });
  };

  // Сгруппированные характеристики для более структурированного отображения
  const groupedFeatures = [
    {
      title: "Основная информация",
      items: [
        { key: "price", label: "Цена", formatter: (val: number) => `${val.toLocaleString()} ₽` },
        { key: "year", label: "Год выпуска", formatter: (val: number) => val.toString() },
        { key: "mileage", label: "Пробег", formatter: (val: number) => `${val.toLocaleString()} км` },
        { key: "location", label: "Местоположение", formatter: (val: string) => val },
      ]
    },
    {
      title: "Двигатель и трансмиссия",
      items: [
        { key: "engine.type", label: "Тип двигателя", formatter: (val: string) => val },
        { key: "engine.power", label: "Мощность", formatter: (val: string) => val },
        { key: "engine.volume", label: "Объем", formatter: (val: string) => val },
        { key: "transmission", label: "Трансмиссия", formatter: (val: string) => val },
      ]
    },
    {
      title: "Дополнительно",
      items: [
        { key: "color", label: "Цвет", formatter: (val: string) => val },
      ]
    }
  ];

  // Получение значения по ключу с поддержкой вложенности (например "engine.type")
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
  };

  // Подсветка лучшего значения в таблице
  const determineBest = (key: string, cars: ListingItem[]) => {
    if (cars.length < 2) return null;
    
    // Для разных характеристик разная логика "лучшего"
    if (key === 'price') {
      // Для цены - лучшая наименьшая
      const minPrice = Math.min(...cars.map(car => car.price));
      return cars.findIndex(car => car.price === minPrice);
    } else if (key === 'year') {
      // Для года - новее лучше
      const maxYear = Math.max(...cars.map(car => car.year));
      return cars.findIndex(car => car.year === maxYear);
    } else if (key === 'mileage') {
      // Для пробега - меньше лучше
      const minMileage = Math.min(...cars.map(car => car.mileage));
      return cars.findIndex(car => car.mileage === minMileage);
    } else if (key === 'engine.power') {
      // Для мощности - больше лучше, но нужно извлечь числа из строки
      const powers = cars.map(car => {
        const powerStr = getNestedValue(car, 'engine.power') || '';
        const match = powerStr.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
      });
      const maxPower = Math.max(...powers);
      return powers.indexOf(maxPower);
    }
    
    return null;
  };

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <main className="pt-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="flex justify-center mb-6">
              <Car size={64} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Сравнение автомобилей</h1>
            <p className="text-gray-600 mb-8">
              В списке сравнения пока нет автомобилей. Добавьте их из карточек объявлений.
            </p>
            <Button asChild variant="outline">
              <Link to="/search" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Перейти к объявлениям
              </Link>
            </Button>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Сравнение автомобилей</h1>
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={removeAllCars}
            >
              <Trash2 size={16} className="mr-2" />
              Очистить список
            </Button>
          </div>
          
          <div className="overflow-x-auto rounded-lg border bg-white shadow mb-8">
            {/* Заголовки таблицы с изображениями */}
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 bg-gray-50 border-b font-medium text-gray-700">
                Изображения
              </div>
              {cars.map((car) => (
                <div key={`image-${car.id}`} className="p-4 bg-gray-50 border-b border-l">
                  <div className="relative">
                    <ImageGallery images={demoImages} aspectRatio={16/9} className="rounded-md overflow-hidden" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-sm"
                      onClick={() => removeCar(car.id)}
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Заголовок автомобилей */}
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 bg-gray-50 border-b font-medium text-gray-700">
                Модель
              </div>
              {cars.map((car) => (
                <div key={`title-${car.id}`} className="p-4 bg-gray-50 border-b border-l">
                  <div className="font-semibold text-lg">{car.brand} {car.model}</div>
                  <div className="text-primary font-medium mt-1">{car.price.toLocaleString()} ₽</div>
                </div>
              ))}
            </div>
            
            {/* Рейтинг продавца */}
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 bg-gray-50 border-b font-medium text-gray-700">
                Продавец
              </div>
              {cars.map((car) => (
                <div key={`seller-${car.id}`} className="p-4 border-b border-l flex items-center">
                  <div>
                    <div className="font-medium">{car.seller.name}</div>
                    <div className="text-sm text-gray-500">Рейтинг: {car.seller.rating}/5</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Группы характеристик */}
            {groupedFeatures.map((group, groupIndex) => (
              <React.Fragment key={`group-${groupIndex}`}>
                <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
                  <div className="p-4 bg-primary/5 font-semibold text-gray-800 border-t">
                    {group.title}
                  </div>
                  {cars.map((car) => (
                    <div key={`group-header-${car.id}-${groupIndex}`} className="p-4 bg-primary/5 border-t border-l"></div>
                  ))}
                </div>
                
                {group.items.map((item) => {
                  const bestIndex = determineBest(item.key, cars);
                  
                  return (
                    <div key={`feature-${item.key}`} className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
                      <div className="p-4 border-b sticky left-0 bg-white font-medium">
                        {item.label}
                      </div>
                      {cars.map((car, carIndex) => {
                        const value = getNestedValue(car, item.key);
                        const isBest = bestIndex === carIndex && value !== undefined;
                        
                        return (
                          <div 
                            key={`${car.id}-${item.key}`} 
                            className={`p-4 border-b border-l flex items-center ${isBest ? 'bg-green-50' : ''}`}
                          >
                            <div>
                              {value !== undefined ? item.formatter(value) : 'н/д'}
                              {isBest && (
                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                                  Лучший
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
            
            {/* Комплектация */}
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 bg-primary/5 font-semibold text-gray-800 border-t">
                Комплектация
              </div>
              {cars.map((car) => (
                <div key={`features-header-${car.id}`} className="p-4 bg-primary/5 border-t border-l"></div>
              ))}
            </div>
            
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 border-b sticky left-0 bg-white font-medium">
                Особенности
              </div>
              {cars.map((car) => (
                <div key={`features-${car.id}`} className="p-4 border-b border-l">
                  <div className="flex flex-wrap gap-1">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="mb-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Описание */}
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 bg-primary/5 font-semibold text-gray-800 border-t">
                Описание
              </div>
              {cars.map((car) => (
                <div key={`description-header-${car.id}`} className="p-4 bg-primary/5 border-t border-l"></div>
              ))}
            </div>
            
            <div className="grid" style={{ gridTemplateColumns: `250px repeat(${cars.length}, minmax(280px, 1fr))` }}>
              <div className="p-4 border-b sticky left-0 bg-white font-medium">
                От продавца
              </div>
              {cars.map((car) => (
                <div key={`description-${car.id}`} className="p-4 border-b border-l">
                  <p className="text-sm text-gray-600">{car.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compare;
