
import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useCars } from "@/hooks/useCars";
import { useCarsAnalytics } from "@/hooks/useCarsAnalytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { Car } from "@/types/car";
import { SelectFilter } from "@/components/filters/SelectFilter";
import { carBrands, cities, models, bodyTypes } from "@/utils/filterData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ChevronDown, TrendingUp, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";

const Analytics = () => {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    city: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
  });

  const { data: carsData } = useCars(filters);
  const { data: analyticsData, isLoading } = useCarsAnalytics(filters);

  const allCars = carsData?.pages.flatMap((page) => page.cars) ?? [];

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const getBrandStats = (cars: Car[]) => {
    const brandCount = cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(brandCount)
      .map(([brand, count]) => ({
        name: brand,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const getPriceRangeStats = (cars: Car[]) => {
    const ranges = [
      { min: 0, max: 50000, label: "До 50K" },
      { min: 50000, max: 60000, label: "50K-60K" },
      { min: 60000, max: 70000, label: "60K-70K" },
      { min: 70000, max: 80000, label: "70K-80K" },
      { min: 80000, max: 90000, label: "80K-90K" },
      { min: 90000, max: Infinity, label: "От 90K" },
    ];

    return ranges.map((range) => ({
      name: range.label,
      count: cars.filter(
        (car) => car.price >= range.min && car.price < range.max
      ).length,
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const brandStats = getBrandStats(allCars);
  const priceRangeStats = getPriceRangeStats(allCars);

  const getBodyTypeStats = (cars: Car[]) => {
    const bodyTypeCount = cars.reduce((acc, car) => {
      acc[car.bodyType] = (acc[car.bodyType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(bodyTypeCount)
      .map(([bodyType, count]) => ({
        name: bodyType,
        value: count,
      }))
      .sort((a, b) => b.value - a.value);
  };

  const bodyTypeStats = getBodyTypeStats(allCars);

  // Интерактивные временные периоды для графика цен
  const getPriceOverTime = () => {
    const months = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];
    
    return months.map((month, index) => ({
      name: month,
      "2023": 65000 + Math.random() * 5000,
      "2024": 70000 + Math.random() * 10000,
    }));
  };

  const priceOverTime = getPriceOverTime();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="pt-24 container mx-auto px-4 pb-16">
        <section className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-4xl font-bold">Аналитика</h1>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <SelectFilter
                label="Марка"
                value={filters.brand}
                options={carBrands}
                filterKey="brand"
                onFilterChange={handleFilterChange}
                placeholder="Все марки"
              />
              <SelectFilter
                label="Модель"
                value={filters.model}
                options={filters.brand ? models[filters.brand as keyof typeof models] || [] : []}
                filterKey="model"
                onFilterChange={handleFilterChange}
                disabled={!filters.brand}
                placeholder="Все модели"
              />
              <SelectFilter
                label="Город"
                value={filters.city}
                options={cities}
                filterKey="city"
                onFilterChange={handleFilterChange}
                placeholder="Все города"
              />
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Динамика цен
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Распределение
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Популярные марки автомобилей
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={brandStats}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={(entry) => entry.name}
                        >
                          {brandStats.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} объявлений`, 'Количество']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Распределение по ценовым диапазонам
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceRangeStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} автомобилей`, 'Количество']} />
                        <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Типы кузова
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={bodyTypeStats} 
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip formatter={(value) => [`${value} автомобилей`, 'Количество']} />
                        <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Средние цены по маркам
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={brandStats.map(brand => ({ 
                          name: brand.name, 
                          price: 60000 + Math.random() * 30000 
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                        <Tooltip 
                          formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Средняя цена']}
                        />
                        <Bar dataKey="price" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="price" className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Динамика цен по годам
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      Период
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <LineChartIcon className="h-4 w-4" />
                      Тип графика
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={priceOverTime}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="2023" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="2024" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {analyticsData && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Средняя цена по месяцам
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={analyticsData.priceHistory}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Цена']} />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#4F46E5" 
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="distribution" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {analyticsData?.priceDistribution && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                      Распределение по ценовым диапазонам
                    </h2>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.priceDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} объявлений`, 'Количество']} />
                          <Bar 
                            dataKey="count" 
                            fill="#4F46E5" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Распределение по типу топлива
                  </h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Бензин", value: 25 },
                            { name: "Дизель", value: 18 },
                            { name: "Электро", value: 12 },
                            { name: "Гибрид", value: 15 }
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} автомобилей`, 'Количество']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Соотношение цены и пробега
                </h2>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={allCars.map(car => ({ price: car.price, mileage: car.mileage }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="mileage" 
                        tickFormatter={(value) => `${(value/1000).toFixed(0)}k км`}
                      />
                      <YAxis 
                        dataKey="price"
                        tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === "price" 
                            ? `€${Number(value).toLocaleString()}` 
                            : `${Number(value).toLocaleString()} км`,
                          name === "price" ? "Цена" : "Пробег"
                        ]}
                      />
                      <Bar dataKey="price" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
