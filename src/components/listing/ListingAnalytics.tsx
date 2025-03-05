
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
  Legend,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RefreshCw, ArrowUpDown, Calendar } from "lucide-react";

interface AnalyticsProps {
  priceHistoryData: Array<{
    month: string;
    price: number;
  }>;
  similarListingsData: Array<{
    price: number;
    count: number;
  }>;
}

export const ListingAnalytics = ({ priceHistoryData, similarListingsData }: AnalyticsProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [priceChartView, setPriceChartView] = useState<"month" | "year">("month");
  const [activeTimeframe, setActiveTimeframe] = useState<"1m" | "3m" | "6m" | "1y" | "all">("6m");

  // Данные для разных временных периодов (для демонстрации)
  const timeframeData = {
    "1m": priceHistoryData.slice(-1),
    "3m": priceHistoryData.slice(-3),
    "6m": priceHistoryData,
    "1y": [
      ...priceHistoryData,
      { month: "Июл", price: 74500 },
      { month: "Авг", price: 74000 },
      { month: "Сен", price: 73000 },
      { month: "Окт", price: 72000 },
      { month: "Ноя", price: 72500 },
      { month: "Дек", price: 73000 },
    ],
    "all": [
      { month: "Янв '23", price: 80000 },
      { month: "Фев '23", price: 79000 },
      { month: "Мар '23", price: 78500 },
      { month: "Апр '23", price: 78000 },
      ...priceHistoryData.map(item => ({ ...item, month: `${item.month} '24` })),
    ],
  };

  const currentData = timeframeData[activeTimeframe];
  
  // Вычисляем среднюю цену для похожих предложений
  const averagePrice = similarListingsData.reduce((sum, item) => sum + item.price * item.count, 0) / 
                      similarListingsData.reduce((sum, item) => sum + item.count, 0);

  // Находим минимальную и максимальную цену в данных
  const minPrice = Math.min(...currentData.map(item => item.price)) * 0.95;
  const maxPrice = Math.max(...currentData.map(item => item.price)) * 1.05;

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleTimeframeChange = (timeframe: "1m" | "3m" | "6m" | "1y" | "all") => {
    setActiveTimeframe(timeframe);
  };

  const handleRefresh = () => {
    // Здесь можно было бы обновить данные
    console.log("Refreshing data...");
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">История цены</h2>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="month" className="w-[200px]">
              <TabsList>
                <TabsTrigger 
                  value="month" 
                  onClick={() => setPriceChartView("month")}
                  className="flex items-center gap-1"
                >
                  <Calendar className="w-4 h-4" />
                  Месяцы
                </TabsTrigger>
                <TabsTrigger 
                  value="year" 
                  onClick={() => setPriceChartView("year")}
                  className="flex items-center gap-1"
                >
                  <Calendar className="w-4 h-4" />
                  Годы
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleZoomToggle}
              className="rounded-full"
            >
              {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefresh}
              className="rounded-full"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border">
          <div className="flex gap-2 mb-2">
            {(["1m", "3m", "6m", "1y", "all"] as const).map((timeframe) => (
              <Button 
                key={timeframe}
                variant={activeTimeframe === timeframe ? "default" : "outline"} 
                size="sm"
                onClick={() => handleTimeframeChange(timeframe)}
                className="text-xs"
              >
                {timeframe === "1m" ? "1 месяц" : 
                 timeframe === "3m" ? "3 месяца" : 
                 timeframe === "6m" ? "6 месяцев" : 
                 timeframe === "1y" ? "1 год" : "Все время"}
              </Button>
            ))}
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentData}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  domain={isZoomed ? [minPrice, maxPrice] : ["auto", "auto"]}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`€${value.toLocaleString()}`, "Цена"]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <ReferenceLine 
                  y={averagePrice} 
                  stroke="#ff7300" 
                  strokeDasharray="3 3" 
                  label={{
                    value: "Средняя цена", 
                    position: "insideBottomRight", 
                    fill: "#ff7300",
                    fontSize: 12
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  name="Цена"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Похожие предложения</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <ArrowUpDown className="h-4 w-4" />
            Сортировать
          </Button>
        </div>
        <div className="bg-white p-4 rounded-xl border h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={similarListingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="price" tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "count" ? `${value} объявл.` : `€${value.toLocaleString()}`,
                  name === "count" ? "Количество" : "Цена"
                ]}
                labelFormatter={(value) => `€${Number(value).toLocaleString()}`}
              />
              <Bar 
                dataKey="count" 
                fill="#4F46E5"
                name="Количество объявлений"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
