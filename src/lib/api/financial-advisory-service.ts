/**
 * Financial Advisory Service
 * Calls /api/financial on the Node.js/Express backend.
 */
import { apiGet, apiPost, apiPatch } from "./apiClient";

// ─── Main Advisory Record ─────────────────────────────────────────────────────

export interface FinancialAdvisoryData {
  id: string;
  user_id: string;
  total_financial_health_score: number;
  profitability_trend: string;
  liquidity_score: number;
  debt_to_equity_ratio: number;
  cash_flow_health: string;
  financial_forecasts: string[];
  budget_recommendations: string[];
  cost_optimization_opportunities: string[];
  investment_opportunities: string[];
  financial_risk_assessment: string[];
  tax_optimization_strategies: string[];
  working_capital_management: string[];
  financial_planning_roadmap: string[];
  created_at: string;
  updated_at: string;
}

export type FinancialAdvisoryCreateData = Omit<FinancialAdvisoryData, "id" | "user_id" | "created_at" | "updated_at">;
export type FinancialAdvisoryUpdateData = Partial<FinancialAdvisoryCreateData>;

export async function getFinancialAdvisoryRecords(): Promise<FinancialAdvisoryData[]> {
  return apiGet<FinancialAdvisoryData[]>("/api/financial");
}

export async function getFinancialAdvisory(id: string): Promise<FinancialAdvisoryData> {
  return apiGet<FinancialAdvisoryData>(`/api/financial/${id}`);
}

export async function createFinancialAdvisory(data: FinancialAdvisoryCreateData): Promise<FinancialAdvisoryData> {
  return apiPost<FinancialAdvisoryData>("/api/financial", data);
}

export async function updateFinancialAdvisory(id: string, data: FinancialAdvisoryUpdateData): Promise<FinancialAdvisoryData> {
  return apiPatch<FinancialAdvisoryData>(`/api/financial/${id}`, data);
}

// ─── Budget Forecasts ─────────────────────────────────────────────────────────

export interface BudgetForecastAPIData {
  id: string;
  period: string;
  type: string;
  revenue: number;
  expenses: number;
  net_income: number;
  confidence: number;
  variance: number;
  assumptions: string[];
  created_at: string;
  updated_at: string;
}

export async function getBudgetForecasts(): Promise<BudgetForecastAPIData[]> {
  return apiGet<BudgetForecastAPIData[]>("/api/financial/budgets");
}

export async function createBudgetForecastAPI(data: Omit<BudgetForecastAPIData, "id" | "created_at" | "updated_at">): Promise<BudgetForecastAPIData> {
  return apiPost<BudgetForecastAPIData>("/api/financial/budgets", data);
}

export async function updateBudgetForecastAPI(id: string, data: Partial<Omit<BudgetForecastAPIData, "id" | "created_at" | "updated_at">>): Promise<BudgetForecastAPIData> {
  return apiPatch<BudgetForecastAPIData>(`/api/financial/budgets/${id}`, data);
}

// ─── Cash Flow Projections ────────────────────────────────────────────────────

export interface CashFlowAPIData {
  id: string;
  period: string;
  inflows: number;
  outflows: number;
  net_cash: number;
  cumulative: number;
  category: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export async function getCashFlows(): Promise<CashFlowAPIData[]> {
  return apiGet<CashFlowAPIData[]>("/api/financial/cashflows");
}

export async function createCashFlowAPI(data: Omit<CashFlowAPIData, "id" | "created_at" | "updated_at">): Promise<CashFlowAPIData> {
  return apiPost<CashFlowAPIData>("/api/financial/cashflows", data);
}

// ─── Scenario Tests ───────────────────────────────────────────────────────────

export interface ScenarioTestAPIData {
  id: string;
  name: string;
  description: string;
  status: string;
  impact: string;
  probability: number;
  assumptions: string[];
  results: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export async function getScenarioTests(): Promise<ScenarioTestAPIData[]> {
  return apiGet<ScenarioTestAPIData[]>("/api/financial/scenarios");
}

export async function createScenarioTestAPI(data: Omit<ScenarioTestAPIData, "id" | "created_at" | "updated_at">): Promise<ScenarioTestAPIData> {
  return apiPost<ScenarioTestAPIData>("/api/financial/scenarios", data);
}

export async function updateScenarioTestAPI(id: string, data: Partial<Omit<ScenarioTestAPIData, "id" | "created_at" | "updated_at">>): Promise<ScenarioTestAPIData> {
  return apiPatch<ScenarioTestAPIData>(`/api/financial/scenarios/${id}`, data);
}

// ─── Risk Assessments ─────────────────────────────────────────────────────────

export interface RiskAPIData {
  id: string;
  title: string;
  category: string;
  severity: string;
  probability: number;
  impact: string;
  status: string;
  description: string;
  mitigation: string;
  created_at: string;
  updated_at: string;
}

export async function getRisks(): Promise<RiskAPIData[]> {
  return apiGet<RiskAPIData[]>("/api/financial/risks");
}

export async function createRiskAPI(data: Omit<RiskAPIData, "id" | "created_at" | "updated_at">): Promise<RiskAPIData> {
  return apiPost<RiskAPIData>("/api/financial/risks", data);
}

export async function updateRiskAPI(id: string, data: Partial<Omit<RiskAPIData, "id" | "created_at" | "updated_at">>): Promise<RiskAPIData> {
  return apiPatch<RiskAPIData>(`/api/financial/risks/${id}`, data);
}

// ─── Advisory Insights ────────────────────────────────────────────────────────

export interface InsightAPIData {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  action_items: string[];
  created_at: string;
  updated_at: string;
}

export async function getInsights(): Promise<InsightAPIData[]> {
  return apiGet<InsightAPIData[]>("/api/financial/insights");
}

export async function createInsightAPI(data: Omit<InsightAPIData, "id" | "created_at" | "updated_at">): Promise<InsightAPIData> {
  return apiPost<InsightAPIData>("/api/financial/insights", data);
}

export async function updateInsightAPI(id: string, data: Partial<Omit<InsightAPIData, "id" | "created_at" | "updated_at">>): Promise<InsightAPIData> {
  return apiPatch<InsightAPIData>(`/api/financial/insights/${id}`, data);
}

// ─── Performance Drivers ──────────────────────────────────────────────────────

export interface DriverAPIData {
  id: string;
  name: string;
  category: string;
  current: number;
  target: number;
  unit: string;
  trend: string;
  impact: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export async function getDrivers(): Promise<DriverAPIData[]> {
  return apiGet<DriverAPIData[]>("/api/financial/drivers");
}

export async function createDriverAPI(data: Omit<DriverAPIData, "id" | "created_at" | "updated_at">): Promise<DriverAPIData> {
  return apiPost<DriverAPIData>("/api/financial/drivers", data);
}

export async function updateDriverAPI(id: string, data: Partial<Omit<DriverAPIData, "id" | "created_at" | "updated_at">>): Promise<DriverAPIData> {
  return apiPatch<DriverAPIData>(`/api/financial/drivers/${id}`, data);
}
