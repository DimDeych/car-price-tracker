
import { Search } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";

const Index = () => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Примерные данные для фильтров
  const carBrands = ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Toyota", "Honda"];
  const cities = ["Берлин", "Мюнхен", "Гамбург", "Франкфурт", "Штутгарт", "Кёльн"];
  const models = {
    "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLS"],
    "Audi": ["A4", "A6", "A8", "Q5", "Q7"],
    "Volkswagen": ["Golf", "Passat", "Tiguan", "Touareg", "ID.4"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Highlander"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6">
            Найдите идеальный автомобиль
          </h1>
          <p className="text-gray-600 mb-8">
            Отслеживайте цены и находите лучшие предложения на рынке
          </p>
          
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Бренд</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel(""); // Сброс модели при смене бренда
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                >
                  <option value="">Все бренды</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Модель</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  disabled={!selectedBrand}
                >
                  <option value="">Все модели</option>
                  {selectedBrand && models[selectedBrand]?.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Город</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                >
                  <option value="">Все города</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Цена (€)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Пробег (км)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={mileageRange.min}
                    onChange={(e) => setMileageRange({ ...mileageRange, min: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={mileageRange.max}
                    onChange={(e) => setMileageRange({ ...mileageRange, max: e.target.value })}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>
            </div>
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
