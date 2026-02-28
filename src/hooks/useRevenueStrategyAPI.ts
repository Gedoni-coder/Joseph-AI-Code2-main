import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRevenueStrategies,
  addRevenueStream,
  updateRevenueStream,
  deleteRevenueStream,
  RevenueStrategyData,
} from "@/lib/api/revenue-strategy-service";

interface TransformedRevenueData {
  monthlyRecurringRevenue: number;
  annualContractValue: number;
  customerLifetimeValue: number;
  revenuePerCustomer: number;
  netRevenueRetention: number;
  streams: string[];
  churnAnalysis: string[];
  upsellOpportunities: string[];
  recommendations: string[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  lastUpdated: Date;
}

function transformRevenueStrategyData(data: RevenueStrategyData[]): TransformedRevenueData {
  if (!data || data.length === 0) {
    return {
      monthlyRecurringRevenue: 0,
      annualContractValue: 0,
      customerLifetimeValue: 0,
      revenuePerCustomer: 0,
      netRevenueRetention: 0,
      streams: [],
      churnAnalysis: [],
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
    monthlyRecurringRevenue: record.monthly_recurring_revenue,
    annualContractValue: record.annual_contract_value,
    customerLifetimeValue: record.customer_lifetime_value,
    revenuePerCustomer: record.revenue_per_customer,
    netRevenueRetention: record.net_revenue_retention,
    streams: record.top_revenue_streams || [],
    churnAnalysis: record.churn_analysis || [],
    upsellOpportunities: record.top_upsell_opportunities || [],
    recommendations: record.revenue_strategy_recommendations || [],
    isLoading: false,
    error: null,
    isConnected: true,
    lastUpdated: new Date(),
  };
}

export function useRevenueStrategyAPI() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["revenue-strategy"],
    queryFn: () => getRevenueStrategies(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  const transformed = transformRevenueStrategyData(data || []);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["revenue-strategy"] });

  return {
    ...transformed,
    isLoading,
    error: error ? (error as Error).message : null,
    refreshData: () => refetch(),
    reconnect: () => refetch(),

    /** Add a new revenue stream via the API (replaces local-state-only mutation) */
    onAddStream: async (streamData: {
      name: string;
      type?: string;
      currentRevenue?: number;
      projectedGrowth?: number;
      margin?: number;
      status?: string;
      description?: string;
    }) => {
      await addRevenueStream({
        name: streamData.name,
        type: streamData.type ?? "subscription",
        current_revenue: streamData.currentRevenue ?? 0,
        projected_growth: streamData.projectedGrowth ?? 0,
        margin: streamData.margin ?? 0,
        status: streamData.status ?? "active",
        description: streamData.description ?? "",
        tags: [],
      });
      invalidate();
    },

    /** Update an existing revenue stream */
    onUpdateStream: async (
      id: string,
      updates: { name?: string; status?: string; current_revenue?: number },
    ) => {
      await updateRevenueStream(id, updates);
      invalidate();
    },

    /** Remove a revenue stream */
    onDeleteStream: async (id: string) => {
      await deleteRevenueStream(id);
      invalidate();
    },
  };
}
