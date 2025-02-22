
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
  return (
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
  );
};
