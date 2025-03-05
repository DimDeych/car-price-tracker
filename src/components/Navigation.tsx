
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, BarChart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Временные данные - в реальном приложении получались бы из API или хранилища
const mockNotifications = [
  { id: 1, message: "Цена на BMW X5 2020 снизилась на 300 000 ₽", read: false },
  { id: 2, message: "5 новых объявлений по вашему поисковому запросу", read: false },
  { id: 3, message: "Объект из избранного снят с продажи", read: true },
];

export const Navigation = () => {
  // В реальном приложении этот стейт должен управляться через контекст или стейт-менеджер
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Временная функция для демонстрации
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
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
            
            {isLoggedIn ? (
              <div className="ml-4 flex items-center space-x-4">
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell size={20} />
                        {unreadCount > 0 && (
                          <Badge 
                            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {notifications.length === 0 ? (
                        <div className="py-2 px-4 text-center text-sm text-gray-500">
                          У вас нет новых уведомлений
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                            <div className="flex items-start space-x-2">
                              {!notification.read && (
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                              )}
                              <div className={`flex-1 ${!notification.read ? 'font-medium' : ''}`}>
                                {notification.message}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile?tab=notifications" className="w-full text-center cursor-pointer">
                          Все уведомления
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10" aria-label="Меню пользователя">
                      <Avatar>
                        <AvatarFallback>АП</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Профиль</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">Избранное</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile?tab=searches">Сохраненные поиски</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile?tab=notifications">Уведомления</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleAuth}>
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Войти</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Регистрация</Link>
                </Button>
                {/* Временная кнопка только для демонстрации */}
                <Button variant="ghost" size="icon" onClick={toggleAuth} className="ml-2">
                  <User size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
