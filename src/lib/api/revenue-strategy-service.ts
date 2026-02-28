/**
 * Revenue Strategy Service
 * Calls /api/revenue on the Node.js/Express backend.
 */
import { apiGet, apiPost, apiPatch, apiDelete } from "./apiClient";

// ─── Revenue Strategy Summary ─────────────────────────────────────────────────

export interface RevenueStrategyData {
  id: string;
  user_id: string;
  monthly_recurring_revenue: number;
  annual_contract_value: number;
  customer_lifetime_value: number;
  revenue_per_customer: number;
  gross_revenue_retention: number;
  net_revenue_retention: number;
  top_revenue_streams: string[];
  churn_risk_summary: string[];
  top_upsell_opportunities: string[];
  channel_performance: string[];
  revenue_strategy_summary: string;
  key_metrics_insights: string[];
  revenue_strategy_recommendations: string[];
  action_items: string[];
  next_steps: string[];
  revenue_streams_details: string[];
  revenue_forecasting: string[];
  churn_analysis: string[];
  upsell_opportunities: string[];
  created_at: string;
  updated_at: string;
}

export type RevenueStrategyCreateData = Omit<RevenueStrategyData, "id" | "user_id" | "created_at" | "updated_at">;
export type RevenueStrategyUpdateData = Partial<RevenueStrategyCreateData>;

const STRATEGY_BASE = "/api/revenue/strategies";

export async function getRevenueStrategies(): Promise<RevenueStrategyData[]> {
  return apiGet<RevenueStrategyData[]>(STRATEGY_BASE);
}

export async function getRevenueStrategy(id: string): Promise<RevenueStrategyData> {
  return apiGet<RevenueStrategyData>(`${STRATEGY_BASE}/${id}`);
}

export async function createRevenueStrategy(data: RevenueStrategyCreateData): Promise<RevenueStrategyData> {
  return apiPost<RevenueStrategyData>(STRATEGY_BASE, data);
}

export async function updateRevenueStrategy(id: string, data: RevenueStrategyUpdateData): Promise<RevenueStrategyData> {
  return apiPatch<RevenueStrategyData>(`${STRATEGY_BASE}/${id}`, data);
}

// ─── Revenue Streams ──────────────────────────────────────────────────────────

export interface RevenueStreamData {
  id: string;
  user_id: string;
  name: string;
  type: string;
  current_revenue: number;
  projected_growth: number;
  margin: number;
  status: string;
  description: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export type RevenueStreamCreateData = Omit<RevenueStreamData, "id" | "user_id" | "created_at" | "updated_at">;
export type RevenueStreamUpdateData = Partial<RevenueStreamCreateData>;

const STREAM_BASE = "/api/revenue/streams";

export async function getRevenueStreams(): Promise<RevenueStreamData[]> {
  return apiGet<RevenueStreamData[]>(STREAM_BASE);
}

export async function addRevenueStream(data: RevenueStreamCreateData): Promise<RevenueStreamData> {
  return apiPost<RevenueStreamData>(STREAM_BASE, data);
}

export async function updateRevenueStream(id: string, data: RevenueStreamUpdateData): Promise<RevenueStreamData> {
  return apiPatch<RevenueStreamData>(`${STREAM_BASE}/${id}`, data);
}

export async function deleteRevenueStream(id: string): Promise<void> {
  return apiDelete(`${STREAM_BASE}/${id}`);
}
