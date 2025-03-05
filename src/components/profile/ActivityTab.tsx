
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentView {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  price: number;
}

interface ActivityTabProps {
  recentViews: RecentView[];
  favoriteCount: number;
  searchCount: number;
  formatPrice: (price: number) => string;
}

export const ActivityTab = ({ 
  recentViews, 
  favoriteCount, 
  searchCount, 
  formatPrice 
}: ActivityTabProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Недавно просмотренные</h3>
        <div className="space-y-4">
          {recentViews.map(item => (
            <div key={item.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded-md bg-gray-100"
              />
              <div className="flex-1">
                <Link to={`/listing/${item.id}`} className="font-medium hover:text-primary">
                  {item.title}
                </Link>
                <div className="text-lg font-semibold mt-1">
                  {formatPrice(item.price)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Просмотрено: {item.date}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/listing/${item.id}`}>Открыть</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">В избранном</h3>
              <p className="text-gray-600">{favoriteCount} автомобилей</p>
            </div>
          </div>
          <Button asChild className="w-full">
            <Link to="/favorites">Просмотреть все</Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Сохраненные поиски</h3>
              <p className="text-gray-600">{searchCount} запросов</p>
            </div>
          </div>
          <Button asChild className="w-full">
            <Link to="/search">Новый поиск</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
