
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Car, Heart, Search, Bell } from "lucide-react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ActivityTab } from "@/components/profile/ActivityTab";
import { FavoritesTab } from "@/components/profile/FavoritesTab";
import { SearchesTab } from "@/components/profile/SearchesTab";
import { NotificationsTab } from "@/components/profile/NotificationsTab";
import type { UserProfile } from "@/types/profile";

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
            {profile && (
              <ProfileSidebar
                name={profile.name}
                email={profile.email}
                memberSince={profile.memberSince}
                lastLogin={profile.lastLogin}
                isEditing={isEditing}
                editableName={name}
                onNameChange={setName}
                onSave={handleUpdateProfile}
                onCancelEdit={() => {
                  setIsEditing(false);
                  setName(profile.name);
                }}
                onStartEdit={() => setIsEditing(true)}
              />
            )}
            
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
                
                {profile && (
                  <>
                    <TabsContent value="activity">
                      <ActivityTab
                        recentViews={profile.recentViews}
                        favoriteCount={profile.favoriteCount}
                        searchCount={profile.searchCount}
                        formatPrice={formatPrice}
                      />
                    </TabsContent>
                    
                    <TabsContent value="favorites">
                      <FavoritesTab
                        recentViews={profile.recentViews}
                        formatPrice={formatPrice}
                      />
                    </TabsContent>
                    
                    <TabsContent value="searches">
                      <SearchesTab
                        recentSearches={profile.recentSearches}
                      />
                    </TabsContent>
                    
                    <TabsContent value="notifications">
                      <NotificationsTab
                        notifications={profile.notifications}
                      />
                    </TabsContent>
                  </>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
