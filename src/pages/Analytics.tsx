import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCarsAnalytics } from "@/hooks/useCarsAnalytics";
import type { Filters } from "@/types/car";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { formatCompactNumber } from "@/utils/comparison";

const CHART_COLORS = [
  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#9333ea",
  "#c026d3",
  "#db2777",
  "#e11d48",
  "#f97316",
  "#eab308",
  "#16a34a",
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year">("month");
  
  const filters: Filters = {
    brand: "",
    model: "",
    city: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
    bodyType: "",
    color: "",
    fuelType: "",
    sortBy: ""
  };
  
  const { data: analytics, isLoading } = useCarsAnalytics(filters, timeRange);

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <main className="container mx-auto px-4 pt-24">
          <div className="max-w-5xl mx-auto">
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

  const topBrandsData = Object.entries(analytics.topBrands).map(([name, value]) => ({
    name,
    value,
  }));

  const topModelsData = Object.entries(analytics.topModels).map(([name, value]) => ({
    name,
    value,
  }));

  const priceDistributionData = Object.entries(analytics.priceDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const mileageDistributionData = Object.entries(analytics.mileageDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const bodyTypeDistributionData = Object.entries(analytics.bodyTypeDistribution).map(([name, value]) => ({
    name,
    nameRu:
      name === "sedan"
        ? "Седан"
        : name === "suv"
        ? "Внедорожник"
        : name === "hatchback"
        ? "Хэтчбек"
        : name === "wagon"
        ? "Универсал"
        : name === "minivan"
        ? "Минивэн"
        : name === "coupe"
        ? "Купе"
        : name === "convertible"
        ? "Кабриолет"
        : name === "pickup"
        ? "Пикап"
        : "Другой",
    value,
  }));

  const cityDistributionData = Object.entries(analytics.cityDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyListingsData = analytics.monthlyListings.map((item) => ({
    month: item.month,
    listings: item.listings,
  }));

  const renderCustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border rounded-md shadow-md p-2">
          <p className="font-semibold">{data.name}</p>
          <p className="text-gray-600">
            {payload[0].value} объявлений
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Аналитика автомобилей</h1>

          <div className="flex space-x-4 mb-8">
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              onClick={() => setTimeRange("month")}
            >
              Месяц
            </Button>
            <Button
              variant={timeRange === "quarter" ? "default" : "outline"}
              onClick={() => setTimeRange("quarter")}
            >
              Квартал
            </Button>
            <Button
              variant={timeRange === "year" ? "default" : "outline"}
              onClick={() => setTimeRange("year")}
            >
              Год
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Топ брендов
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topBrandsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {topBrandsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Топ модели
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topModelsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    >
                      {topModelsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Распределение цен
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCompactNumber(value as number)
                      }
                    />
                    <Tooltip
                      formatter={(value: any) =>
                        new Intl.NumberFormat("ru-RU").format(value)
                      }
                    />
                    <Bar dataKey="value" fill="#8884d8">
                      {priceDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Распределение пробега
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mileageDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCompactNumber(value as number)
                      }
                    />
                    <Tooltip
                      formatter={(value: any) =>
                        new Intl.NumberFormat("ru-RU").format(value)
                      }
                    />
                    <Bar dataKey="value" fill="#82ca9d">
                      {mileageDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Распределение по типу кузова
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bodyTypeDistributionData}
                      dataKey="value"
                      nameKey="nameRu"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#ffc658"
                      label
                    >
                      {bodyTypeDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-white">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4">
                  Распределение по городам
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCompactNumber(value as number)
                      }
                    />
                    <Tooltip
                      formatter={(value: any) =>
                        new Intl.NumberFormat("ru-RU").format(value)
                      }
                    />
                    <Bar dataKey="value" fill="#f47560">
                      {cityDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Separator className="my-8" />

          <Card className="bg-white">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold mb-4">
                Ежемесячное количество объявлений
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyListingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      formatCompactNumber(value as number)
                    }
                  />
                  <Tooltip
                    formatter={(value: any) =>
                      new Intl.NumberFormat("ru-RU").format(value)
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="listings"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
