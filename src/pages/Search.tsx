import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CarFilters } from "@/components/CarFilters";
import { CarList } from "@/components/CarList";
import { useToast } from "@/components/ui/use-toast";
import { useCars } from "@/hooks/useCars";
import type { Filters } from "@/types/car";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

interface SavedSearch {
  id: string;
  name: string;
  filters: Filters;
  createdAt: string;
}

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
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
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

  const handleSaveSearch = () => {
    if (!searchName.trim()) {
      toast({
        variant: "destructive",
        description: "Введите название для поиска",
      });
      return;
    }

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchName,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
    };

    setSavedSearches(prev => [...prev, newSearch]);
    setIsDialogOpen(false);
    setSearchName("");

    toast({
      description: "Поиск сохранен в избранное",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-4xl mx-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">
              Поиск автомобилей
            </h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <BookmarkPlus size={16} />
                  Сохранить поиск
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Сохранить поиск</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="Название поиска"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleSaveSearch}>
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <CarFilters filters={filters} onFilterChange={handleFilterChange} />
          
          {savedSearches.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {savedSearches.map(search => (
                <Button 
                  key={search.id} 
                  variant="outline" 
                  size="sm"
                  className="gap-2"
                  onClick={() => setFilters(search.filters)}
                >
                  <Bookmark size={14} />
                  {search.name}
                </Button>
              ))}
            </div>
          )}
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
