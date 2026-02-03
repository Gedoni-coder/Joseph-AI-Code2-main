import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

interface KPIMetric {
  label: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  color: string;
}

interface KPIDashboardProps {
  totalRevenue?: number;
  totalTarget?: number;
  leadsGenerated?: number;
  winRate?: number;
  avgDealSize?: number;
  salesCycle?: number;
}

const KPIDashboard = ({
  totalRevenue = 0,
  totalTarget = 0,
  leadsGenerated = 0,
  winRate = 0,
  avgDealSize = 0,
  salesCycle = 0,
}: KPIDashboardProps) => {
  const { format } = useCurrency();

  // Calculate revenue gap
  const revenueGap = totalRevenue - totalTarget;

  // Calculate deal closed (estimate based on revenue and average deal size)
  const dealsClosed = avgDealSize > 0 ? Math.round(totalRevenue / avgDealSize) : 0;

  const topLineKPIs: KPIMetric[] = [
    {
      label: "Total Revenue",
      value: totalRevenue > 0 ? format(totalRevenue) : format(0),
      change: 12.5,
      isPositive: true,
      color: "text-green-600",
    },
    {
      label: "Sales Target",
      value: totalTarget > 0 ? format(totalTarget) : format(0),
      change: 0,
      isPositive: true,
      color: "text-blue-600",
    },
    {
      label: "Revenue Gap",
      value: revenueGap > 0 ? format(revenueGap) : format(revenueGap),
      change: totalTarget > 0 ? ((revenueGap / totalTarget) * 100).toFixed(1) as any : 0,
      isPositive: revenueGap >= 0,
      color: revenueGap >= 0 ? "text-green-600" : "text-orange-600",
    },
    {
      label: "Deals Closed",
      value: dealsClosed,
      change: 25,
      isPositive: true,
      color: "text-purple-600",
    },
    {
      label: "Leads Generated",
      value: leadsGenerated,
      change: 8.5,
      isPositive: true,
      color: "text-indigo-600",
    },
    {
      label: "Win Rate",
      value: `${Math.round(winRate)}%`,
      change: 5,
      isPositive: true,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top-Line KPIs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Top-Line Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topLineKPIs.map((metric, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      {metric.isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {metric.isPositive ? "+" : ""}
                        {metric.change.toFixed(1)}% vs last month
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Visual Charts Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Revenue Trend (Last 6 Months)
              </CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">Chart visualization area</p>
                  <p className="text-xs text-gray-400 mt-2">
                    📈 Revenue trending data would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leads vs Deals Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Leads vs Deals Conversion
              </CardTitle>
              <CardDescription>Conversion funnel analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">Chart visualization area</p>
                  <p className="text-xs text-gray-400 mt-2">
                    📊 Conversion funnel data would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Cycle Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sales Cycle Trend</CardTitle>
              <CardDescription>Average days to close over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">Chart visualization area</p>
                  <p className="text-xs text-gray-400 mt-2">
                    📉 Sales cycle trend data would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline vs Target */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pipeline vs Target</CardTitle>
              <CardDescription>
                Current pipeline vs sales targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">Chart visualization area</p>
                  <p className="text-xs text-gray-400 mt-2">
                    📊 Pipeline vs target comparison would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
