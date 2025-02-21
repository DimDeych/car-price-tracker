
import { Navigation } from "@/components/Navigation";
import { Heart } from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Listing = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  // В реальном приложении эти данные будут загружаться с сервера
  const listing = {
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 75000,
    mileage: 15000,
    location: "Берлин",
    engine: {
      type: "Бензин",
      power: "245 л.с.",
      volume: "2.0 л"
    },
    transmission: "Автоматическая",
    color: "Серебристый металлик",
    description: "Автомобиль в идеальном состоянии, один владелец, полная история обслуживания у официального дилера. Комплектация AMG Line, панорамная крыша, адаптивный круиз-контроль, подогрев всех сидений.",
    features: [
      "Панорамная крыша",
      "Адаптивный круиз-контроль",
      "Подогрев сидений",
      "Камеры 360°",
      "Светодиодная оптика",
      "Кожаный салон"
    ],
    seller: {
      name: "Автосалон Premium Cars",
      phone: "+49 123 456789",
      rating: 4.8
    }
  };

  // Примерные данные для графиков
  const priceHistoryData = [
    { month: "Янв", price: 78000 },
    { month: "Фев", price: 77000 },
    { month: "Мар", price: 76000 },
    { month: "Апр", price: 75000 },
    { month: "Май", price: 75000 },
    { month: "Июн", price: 75000 },
  ];

  const similarListingsData = [
    { price: 70000, count: 3 },
    { price: 75000, count: 5 },
    { price: 80000, count: 4 },
    { price: 85000, count: 2 },
    { price: 90000, count: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Галерея изображений */}
          <div className="aspect-[16/9] bg-gray-100 rounded-2xl mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md 
                ${isFavorite ? 'bg-primary/90 text-white' : 'bg-white/90 text-gray-600'}`}
            >
              <Heart className={isFavorite ? 'fill-current' : ''} size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основная информация */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {listing.brand} {listing.model} {listing.year}
                </h1>
                <div className="text-2xl text-primary font-semibold">
                  €{listing.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border">
                  <div className="text-sm text-gray-500">Пробег</div>
                  <div className="font-medium">{listing.mileage.toLocaleString()} км</div>
                </div>
                <div className="bg-white p-4 rounded-xl border">
                  <div className="text-sm text-gray-500">Двигатель</div>
                  <div className="font-medium">{listing.engine.power}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border">
                  <div className="text-sm text-gray-500">Коробка</div>
                  <div className="font-medium">{listing.transmission}</div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Описание</h2>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Комплектация</h2>
                <div className="grid grid-cols-2 gap-2">
                  {listing.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Аналитика */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">История цены</h2>
                  <div className="bg-white p-4 rounded-xl border h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#4F46E5"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Похожие предложения</h2>
                  <div className="bg-white p-4 rounded-xl border h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={similarListingsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="price" tickFormatter={(value) => `€${value.toLocaleString()}`} />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "count" ? `${value} объявл.` : `€${value.toLocaleString()}`,
                            name === "count" ? "Количество" : "Цена"
                          ]}
                        />
                        <Bar dataKey="count" fill="#4F46E5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Сайдбар с контактами */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl border sticky top-24">
                <div className="text-xl font-semibold mb-4">{listing.seller.name}</div>
                <div className="flex items-center mb-4">
                  <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Рейтинг: {listing.seller.rating}/5
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-gray-600">
                    <div className="text-sm mb-1">Телефон</div>
                    <div className="font-medium">{listing.seller.phone}</div>
                  </div>
                  <div className="text-gray-600">
                    <div className="text-sm mb-1">Местоположение</div>
                    <div className="font-medium">{listing.location}</div>
                  </div>
                  <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                    Связаться с продавцом
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Listing;
