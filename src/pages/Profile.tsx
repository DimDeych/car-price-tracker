
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Heart, 
  Search, 
  Lock, 
  Car, 
  Bell, 
  LogOut, 
  Settings,
  Key
} from "lucide-react";
import { Link } from "react-router-dom";

interface UserProfile {
  name: string;
  email: string;
  favoriteCount: number;
  searchCount: number;
  recentSearches: {
    id: string;
    query: string;
    date: string;
  }[];
  recentViews: {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    price: number;
  }[];
  notifications: {
    id: string;
    message: string;
    date: string;
    read: boolean;
  }[];
  memberSince: string;
  lastLogin: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Здесь будет запрос к вашему API
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Тестовые данные
        const mockData: UserProfile = {
          name: "Александр Петров",
          email: "alex@example.com",
          favoriteCount: 12,
          searchCount: 45,
          memberSince: "15.03.2023",
          lastLogin: "Сегодня, 14:32",
          recentSearches: [
            { id: "s1", query: "BMW X5 2020-2023", date: "14.06.2023" },
            { id: "s2", query: "Mercedes GLE от 2021", date: "10.06.2023" },
            { id: "s3", query: "Toyota Camry до 2 млн", date: "05.06.2023" },
          ],
          recentViews: [
            { 
              id: "v1", 
              title: "BMW X5 2022", 
              date: "Вчера", 
              imageUrl: "/placeholder.svg", 
              price: 5750000 
            },
            { 
              id: "v2", 
              title: "Mercedes GLE 2021", 
              date: "12.06.2023", 
              imageUrl: "/placeholder.svg", 
              price: 6240000 
            },
            { 
              id: "v3", 
              title: "Audi Q7 2022", 
              date: "08.06.2023", 
              imageUrl: "/placeholder.svg", 
              price: 7100000 
            },
          ],
          notifications: [
            { 
              id: "n1", 
              message: "Цена на BMW X5 2020 снизилась на 300 000 ₽", 
              date: "Сегодня", 
              read: false 
            },
            { 
              id: "n2", 
              message: "5 новых объявлений по вашему поисковому запросу", 
              date: "Вчера", 
              read: true 
            },
            { 
              id: "n3", 
              message: "Объект из избранного снят с продажи", 
              date: "10.06.2023", 
              read: true 
            },
          ]
        };
        
        setProfile(mockData);
        setName(mockData.name);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Ошибка при загрузке профиля",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handleUpdateProfile = async () => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfile(prev => prev ? { ...prev, name } : null);
      setIsEditing(false);
      toast({
        description: "Профиль обновлен",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Ошибка при обновлении профиля",
      });
    }
  };

  const handleLogout = () => {
    toast({
      description: "Вы вышли из аккаунта",
    });
    // Здесь должен быть код для выхода из аккаунта
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <main className="container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mt-12">
              <div className="animate-pulse flex flex-col items-center space-y-8 w-full">
                <div className="h-12 w-64 bg-gray-200 rounded-lg"></div>
                <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={18} /> Выйти
            </Button>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-6">
            {/* Сайдбар профиля */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="bg-primary/10 rounded-full p-6">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  {isEditing ? (
                    <div className="w-full space-y-2">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className="text-center"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateProfile} size="sm" className="flex-1">Сохранить</Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditing(false);
                            setName(profile?.name || "");
                          }}
                          className="flex-1"
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-xl font-semibold">{profile?.name}</div>
                      <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                        Изменить имя
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{profile?.email}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Дата регистрации</div>
                    <div>{profile?.memberSince}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Последний вход</div>
                    <div>{profile?.lastLogin}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold">Настройки</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold">Уведомления</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold">Безопасность</span>
                </div>
              </div>
            </div>
            
            {/* Основной контент */}
            <div>
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="mb-6 bg-white/40">
                  <TabsTrigger value="activity" className="gap-2">
                    <Car size={16} /> Активность
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="gap-2">
                    <Heart size={16} /> Избранное
                  </TabsTrigger>
                  <TabsTrigger value="searches" className="gap-2">
                    <Search size={16} /> Поиски
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="gap-2">
                    <Bell size={16} /> Уведомления
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="activity" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Недавно просмотренные</h3>
                    <div className="space-y-4">
                      {profile?.recentViews.map(item => (
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
                          <p className="text-gray-600">{profile?.favoriteCount} автомобилей</p>
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
                          <p className="text-gray-600">{profile?.searchCount} запросов</p>
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link to="/search">Новый поиск</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="favorites">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Избранные автомобили</h3>
                      <Button asChild>
                        <Link to="/favorites">Просмотреть все</Link>
                      </Button>
                    </div>
                    
                    {profile?.recentViews.length ? (
                      <div className="space-y-4">
                        {profile?.recentViews.map(item => (
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
                </TabsContent>
                
                <TabsContent value="searches">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Сохраненные поиски</h3>
                    
                    {profile?.recentSearches.length ? (
                      <div className="space-y-4">
                        {profile?.recentSearches.map(search => (
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
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
                    
                    {profile?.notifications.length ? (
                      <div className="space-y-4">
                        {profile?.notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0 ${!notification.read ? 'bg-primary/5 -mx-4 px-4 py-3 rounded-md' : ''}`}
                          >
                            <div className="bg-primary/10 rounded-full p-2 mt-1">
                              <Bell className={`w-5 h-5 ${!notification.read ? 'text-primary' : 'text-gray-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                                {notification.message}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {notification.date}
                              </div>
                            </div>
                            {!notification.read && (
                              <Button variant="ghost" size="sm">
                                Отметить прочитанным
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p>У вас пока нет уведомлений</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
