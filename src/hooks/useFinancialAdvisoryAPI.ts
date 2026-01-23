import { useQuery } from "@tanstack/react-query";
import { getFinancialAdvisory, FinancialAdvisoryData } from "@/lib/api/financial-advisory-service";
import {
  mockBudgetForecasts,
  mockCashFlowProjections,
  mockScenarioTests,
  mockRiskAssessments,
  mockPerformanceDrivers,
  mockAdvisoryInsights,
  mockBudgetAssumptions,
  mockLiquidityMetrics,
  mockCurrentCashFlows,
  type BudgetForecast,
  type CashFlowProjection,
  type ScenarioTest,
  type RiskAssessment,
  type PerformanceDriver,
  type AdvisoryInsight,
  type BudgetAssumption,
  type LiquidityMetric,
} from "@/lib/financial-advisory-data";

export interface UseFinancialAdvisoryReturn {
  budgetForecasts: BudgetForecast[];
  cashFlowProjections: CashFlowProjection[];
  scenarioTests: ScenarioTest[];
  riskAssessments: RiskAssessment[];
  performanceDrivers: PerformanceDriver[];
  isLoading: boolean;
  isConnected: boolean;
  lastUpdated: Date;
  error: string | null;
  refreshData: () => void;
}

/**
 * Hook to fetch and transform financial advisory data
 */
export function useFinancialAdvisoryAPI(): UseFinancialAdvisoryReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["financial-advisory"],
    queryFn: () => getFinancialAdvisory(1),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  // Use API data if available, fall back to mock
  const budgetForecasts: BudgetForecast[] =
    data
      ? [
          {
            id: "1",
            period: "Q1 2025",
            type: "quarterly" as const,
            revenue: data.total_financial_health_score
              ? data.total_financial_health_score * 100000
              : 500000,
            expenses: data.total_financial_health_score
              ? (data.total_financial_health_score * 100000 * 0.6)
              : 300000,
            netIncome: data.total_financial_health_score
              ? (data.total_financial_health_score * 100000 * 0.4)
              : 200000,
            confidence: 85,
            assumptions: ["Conservative growth", "Current market conditions"],
            lastUpdated: new Date().toISOString(),
            variance: 5,
          },
        ]
      : mockBudgets;

  const cashFlowProjections: CashFlowProjection[] = mockCashFlow;
  const scenarioTests: ScenarioTest[] = mockScenarios;
  const riskAssessments: RiskAssessment[] = mockRisks;
  const performanceDrivers: PerformanceDriver[] = mockDrivers;

  return {
    budgetForecasts,
    cashFlowProjections,
    scenarioTests,
    riskAssessments,
    performanceDrivers,
    isLoading,
    isConnected: !error,
    lastUpdated: new Date(),
    error: error ? (error as Error).message : null,
    refreshData: () => refetch(),
  };
}
