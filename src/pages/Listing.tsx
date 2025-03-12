import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ListingDetails } from "@/components/listing/ListingDetails";
import { ListingFeatures } from "@/components/listing/ListingFeatures";
import { ListingAnalytics } from "@/components/listing/ListingAnalytics";
import { ListingSidebar } from "@/components/listing/ListingSidebar";
import { useComparisonList, type ListingItem } from "@/utils/comparison";

const Listing = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);
  const { toast } = useToast();

  // Demo images for gallery
  const demoImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1494905998402-395d579af36f",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a",
  ];

  // Demo listing with Russian location and rubles
  const listing: ListingItem = {
    id: 1,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 6500000, // Updated to rubles
    mileage: 15000,
    location: "Москва",
    engine: {
      type: "Бензин",
      power: "245 л.с.",
      volume: "2.0 л"
    },
    transmission: "Автоматическая",
    color: "Серебристый металлик",
    description: "Автомобиль в идеальном состоянии, один владелец, полная история обслуживания у официального дилера. Комплектация AMG Line, панорамная крыша, адаптивный круиз-контроль, подогрев всех сидений.",
    features: [
      "Панорамная крыша",
      "Адаптивный круиз-контроль",
      "Подогрев сидений",
      "Камеры 360°",
      "Светодиодная оптика",
      "Кожаный салон"
    ],
    seller: {
      name: "Автосалон Premium Cars",
      phone: "+7 123 456-78-90",
      rating: 4.8
    }
  };

  const { isInComparison: checkComparison, toggleComparison: toggleComparisonUtil } = useComparisonList(listing.id);

  useEffect(() => {
    setIsInComparison(checkComparison());
  }, [listing.id]);

  const toggleComparison = () => {
    toggleComparisonUtil(listing, (isInList) => {
      setIsInComparison(isInList);
      toast({
        description: isInList ? "Автомобиль добавлен в сравнение" : "Автомобиль удален из сравнения",
      });
    });
  };

  // Example data for charts with prices in rubles
  const priceHistoryData = [
    { month: "Янв", price: 6800000 },
    { month: "Фев", price: 6700000 },
    { month: "Мар", price: 6600000 },
    { month: "Апр", price: 6500000 },
    { month: "Май", price: 6500000 },
    { month: "Июн", price: 6500000 },
  ];

  const similarListingsData = [
    { price: 6000000, count: 3 },
    { price: 6500000, count: 5 },
    { price: 7000000, count: 4 },
    { price: 7500000, count: 2 },
    { price: 8000000, count: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <ListingHeader
            images={demoImages}
            isFavorite={isFavorite}
            isInComparison={isInComparison}
            onFavoriteToggle={() => setIsFavorite(!isFavorite)}
            onComparisonToggle={toggleComparison}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ListingDetails {...listing} />
              <ListingFeatures description={listing.description} features={listing.features} />
              <ListingAnalytics
                priceHistoryData={priceHistoryData}
                similarListingsData={similarListingsData}
              />
            </div>

            <ListingSidebar seller={{ ...listing.seller, location: listing.location }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Listing;
