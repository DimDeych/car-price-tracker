
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentSearch {
  id: string;
  query: string;
  date: string;
}

interface SearchesTabProps {
  recentSearches: RecentSearch[];
}

export const SearchesTab = ({ recentSearches }: SearchesTabProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Сохраненные поиски</h3>
      
      {recentSearches.length ? (
        <div className="space-y-4">
          {recentSearches.map(search => (
            <div key={search.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{search.query}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Сохранено: {search.date}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/search?q=${encodeURIComponent(search.query)}`}>
                    Показать результаты
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>У вас пока нет сохраненных поисков</p>
          <Button className="mt-4" asChild>
            <Link to="/search">Начать поиск</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
