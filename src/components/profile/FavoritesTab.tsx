
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentView {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  price: number;
}

interface FavoritesTabProps {
  recentViews: RecentView[];
  formatPrice: (price: number) => string;
}

export const FavoritesTab = ({ recentViews, formatPrice }: FavoritesTabProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Избранные автомобили</h3>
        <Button asChild>
          <Link to="/favorites">Просмотреть все</Link>
        </Button>
      </div>
      
      {recentViews.length ? (
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
                  Добавлено: {item.date}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/listing/${item.id}`}>Открыть</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 fill-primary text-primary" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>У вас пока нет избранных автомобилей</p>
          <Button className="mt-4" asChild>
            <Link to="/search">Начать поиск</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
