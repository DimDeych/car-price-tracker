
import { Link } from "react-router-dom";
import { Search, User, Heart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold hover:opacity-80 transition-opacity">
            CarPrice
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/search" className="nav-link">
              <Search size={20} />
            </Link>
            <Link to="/favorites" className="nav-link">
              <Heart size={20} />
            </Link>
            <Link to="/analytics" className="nav-link">
              <BarChart size={20} />
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Войти</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Регистрация</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
