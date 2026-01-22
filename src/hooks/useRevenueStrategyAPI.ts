import { useQuery } from "@tanstack/react-query";
import {
  getRevenueStrategies,
  RevenueStrategyData,
} from "@/lib/api/revenue-strategy-service";

interface TransformedRevenueData {
  totalRevenueTarget: number;
  revenueGrowthRate: number;
  customerLifetimeValue: number;
  churnRate: number;
  streams: string[];
  scenarios: string[];
  upsellOpportunities: string[];
  recommendations: string[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  lastUpdated: Date;
}

/**
 * Transform Xano API response to component-ready data structures
 */
function transformRevenueStrategyData(
  data: RevenueStrategyData[]
): TransformedRevenueData {
  if (!data || data.length === 0) {
    return {
      totalRevenueTarget: 0,
      revenueGrowthRate: 0,
      customerLifetimeValue: 0,
      churnRate: 0,
      streams: [],
      scenarios: [],
      upsellOpportunities: [],
      recommendations: [],
      isLoading: false,
      error: null,
      isConnected: true,
      lastUpdated: new Date(),
    };
  }

  const record = data[0];

  return {
    totalRevenueTarget: record.total_revenue_target,
    revenueGrowthRate: record.revenue_growth_rate,
    customerLifetimeValue: record.customer_lifetime_value,
    churnRate: record.churn_rate,
    streams: record.revenue_streams || [],
    scenarios: record.scenario_planning || [],
    upsellOpportunities: record.upsell_opportunities || [],
    recommendations: record.revenue_recommendations || [],
    isLoading: false,
    error: null,
    isConnected: true,
    lastUpdated: new Date(),
  };
}

/**
 * Hook to fetch and transform revenue strategy data
 */
export function useRevenueStrategyAPI() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["revenue-strategy"],
    queryFn: () => getRevenueStrategies(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  const transformed = transformRevenueStrategyData(data || []);

  return {
    ...transformed,
    isLoading,
    error: error ? (error as Error).message : null,
    refreshData: () => refetch(),
    reconnect: () => refetch(),
  };
}
