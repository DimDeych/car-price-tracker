
import { Search } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-3xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6">
            Найдите идеальный автомобиль
          </h1>
          <p className="text-gray-600 mb-8">
            Отслеживайте цены и находите лучшие предложения на рынке
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по марке, модели или городу..."
              className="w-full px-6 py-4 text-lg rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow pr-12"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search size={24} />
            </button>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Рекомендуемые объявления</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500">Mercedes-Benz</div>
                  <div className="font-semibold mt-1">E-Class 2023</div>
                  <div className="text-primary font-medium mt-2">€75,000</div>
                  <div className="text-sm text-gray-500 mt-2">Берлин</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
