import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFinancialAdvisoryRecords,
  createBudgetForecastAPI,
  updateBudgetForecastAPI,
  createScenarioTestAPI,
  updateScenarioTestAPI,
  createRiskAPI,
  updateRiskAPI,
  createInsightAPI,
  updateInsightAPI,
  createCashFlowAPI,
  createDriverAPI,
} from "@/lib/api/financial-advisory-service";
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
  currentCashFlows: CashFlowProjection[];
  scenarioTests: ScenarioTest[];
  riskAssessments: RiskAssessment[];
  performanceDrivers: PerformanceDriver[];
  advisoryInsights: AdvisoryInsight[];
  budgetAssumptions: BudgetAssumption[];
  liquidityMetrics: LiquidityMetric[];
  isLoading: boolean;
  isConnected: boolean;
  lastUpdated: Date;
  error: string | null;
  refreshData: () => void;
  createBudgetForecast: (forecast: BudgetForecast) => Promise<void>;
  updateBudgetAssumption: (id: string, data: Partial<BudgetAssumption>) => Promise<void>;
  runScenarioTest: (test: ScenarioTest) => Promise<void>;
  updateRiskStatus: (id: string, status: string) => Promise<void>;
  updateInsightStatus: (id: string, status: string) => Promise<void>;
  addCashFlowProjection: (projection: CashFlowProjection) => Promise<void>;
  addRisk: (risk: RiskAssessment) => Promise<void>;
  addPerformanceDriver: (driver: PerformanceDriver) => Promise<void>;
}

export function useFinancialAdvisoryAPI(): UseFinancialAdvisoryReturn {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["financial-advisory"],
    queryFn: () => getFinancialAdvisoryRecords(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["financial-advisory"] });

  // Use API data for the top-level health score to drive budget forecasts;
  // fall back to mock data for all sub-collections until the DB is seeded.
  const apiRecord = data?.[0];
  const budgetForecasts: BudgetForecast[] = apiRecord
    ? [
        {
          id: "1",
          period: "Q1 2025",
          type: "quarterly" as const,
          revenue: apiRecord.total_financial_health_score * 100_000,
          expenses: apiRecord.total_financial_health_score * 100_000 * 0.6,
          netIncome: apiRecord.total_financial_health_score * 100_000 * 0.4,
          confidence: 85,
          assumptions: ["Conservative growth", "Current market conditions"],
          lastUpdated: new Date().toISOString(),
          variance: 5,
        },
      ]
    : mockBudgetForecasts;

  return {
    budgetForecasts,
    cashFlowProjections: mockCashFlowProjections,
    currentCashFlows: mockCurrentCashFlows,
    scenarioTests: mockScenarioTests,
    riskAssessments: mockRiskAssessments,
    performanceDrivers: mockPerformanceDrivers,
    advisoryInsights: mockAdvisoryInsights,
    budgetAssumptions: mockBudgetAssumptions,
    liquidityMetrics: mockLiquidityMetrics,
    isLoading,
    isConnected: !error,
    lastUpdated: new Date(),
    error: error ? (error as Error).message : null,
    refreshData: () => refetch(),

    // ── Real API mutations (replaced console.log stubs) ──────────────────────

    createBudgetForecast: async (forecast: BudgetForecast) => {
      await createBudgetForecastAPI({
        period: forecast.period,
        type: forecast.type,
        revenue: forecast.revenue,
        expenses: forecast.expenses,
        net_income: forecast.netIncome,
        confidence: forecast.confidence,
        variance: forecast.variance ?? 0,
        assumptions: forecast.assumptions ?? [],
      });
      invalidate();
    },

    updateBudgetAssumption: async (id: string, updates: Partial<BudgetAssumption>) => {
      await updateBudgetForecastAPI(id, updates as Record<string, unknown>);
      invalidate();
    },

    runScenarioTest: async (test: ScenarioTest) => {
      await createScenarioTestAPI({
        name: test.name,
        description: test.description ?? "",
        status: "running",
        impact: test.impact ?? "medium",
        probability: test.probability ?? 0,
        assumptions: test.assumptions ?? [],
        results: {},
      });
      invalidate();
    },

    updateRiskStatus: async (id: string, status: string) => {
      await updateRiskAPI(id, { status });
      invalidate();
    },

    updateInsightStatus: async (id: string, status: string) => {
      await updateInsightAPI(id, { status });
      invalidate();
    },

    addCashFlowProjection: async (projection: CashFlowProjection) => {
      await createCashFlowAPI({
        period: projection.period,
        inflows: projection.inflows ?? 0,
        outflows: projection.outflows ?? 0,
        net_cash: projection.netCash ?? 0,
        cumulative: projection.cumulative ?? 0,
        category: projection.category ?? "",
        notes: projection.notes ?? "",
      });
      invalidate();
    },

    addRisk: async (risk: RiskAssessment) => {
      await createRiskAPI({
        title: risk.title,
        category: risk.category ?? "",
        severity: risk.severity ?? "medium",
        probability: risk.probability ?? 0,
        impact: risk.impact ?? "medium",
        status: risk.status ?? "identified",
        description: risk.description ?? "",
        mitigation: risk.mitigation ?? "",
      });
      invalidate();
    },

    addPerformanceDriver: async (driver: PerformanceDriver) => {
      await createDriverAPI({
        name: driver.name,
        category: driver.category ?? "",
        current: driver.current ?? 0,
        target: driver.target ?? 0,
        unit: driver.unit ?? "",
        trend: driver.trend ?? "stable",
        impact: driver.impact ?? "medium",
        description: driver.description ?? "",
      });
      invalidate();
    },
  };
}
