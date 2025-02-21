
import React from "react";
import { Navigation } from "@/components/Navigation";
import { useCars } from "@/hooks/useCars";
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
} from "recharts";
import { Car } from "@/types/car";

const Analytics = () => {
  const { data } = useCars({
    brand: "",
    model: "",
    city: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
  });

  const allCars = data?.pages.flatMap((page) => page.cars) ?? [];

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
      { min: 0, max: 500000, label: "До 500K" },
      { min: 500000, max: 1000000, label: "500K-1M" },
      { min: 1000000, max: 2000000, label: "1M-2M" },
      { min: 2000000, max: 3000000, label: "2M-3M" },
      { min: 3000000, max: Infinity, label: "От 3M" },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="pt-24 container mx-auto px-4">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Аналитика</h1>

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
                    <Tooltip />
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
                    <Tooltip />
                    <Bar dataKey="count" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
