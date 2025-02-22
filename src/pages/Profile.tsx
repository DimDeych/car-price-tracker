
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { User, heart, search, Lock } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  favoriteCount: number;
  searchCount: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Здесь будет запрос к вашему API
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setName(data.name);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Ошибка при загрузке профиля",
        });
      }
    };

    fetchProfile();
  }, [toast]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setProfile(prev => prev ? { ...prev, name } : null);
        setIsEditing(false);
        toast({
          description: "Профиль обновлен",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Ошибка при обновлении профиля",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 rounded-full p-3">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Профиль</h2>
                <p className="text-gray-600">Управление личными данными</p>
              </div>
            </div>

            {profile && (
              <div className="space-y-4">
                <div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                      />
                      <Button onClick={handleUpdateProfile}>Сохранить</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setName(profile.name);
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Имя</div>
                        <div>{profile.name}</div>
                      </div>
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Изменить
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div>{profile.email}</div>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 rounded-full p-3">
                  <heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Избранное</h2>
                  <p className="text-gray-600">{profile?.favoriteCount || 0} автомобилей</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 rounded-full p-3">
                  <search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Поиски</h2>
                  <p className="text-gray-600">{profile?.searchCount || 0} запросов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

