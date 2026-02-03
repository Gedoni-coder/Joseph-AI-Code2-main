/**
 * Revenue Strategy Service
 * Handles all API requests for revenue strategy data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface RevenueStrategyData {
  id: number;
  created_at: string;
  account_id: number;
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
}

export type RevenueStrategyCreateData = Omit<RevenueStrategyData, "id" | "created_at">;
export type RevenueStrategyUpdateData = Partial<RevenueStrategyCreateData>;

/**
 * Get all revenue strategies
 */
export async function getRevenueStrategies(): Promise<RevenueStrategyData[]> {
  return xanoGet<RevenueStrategyData[]>("/revenue_strategy");
}

/**
 * Get a specific revenue strategy by ID
 */
export async function getRevenueStrategy(id: number): Promise<RevenueStrategyData> {
  return xanoGet<RevenueStrategyData>(`/revenue_strategy/${id}`);
}

/**
 * Create a new revenue strategy
 */
export async function createRevenueStrategy(data: RevenueStrategyCreateData): Promise<RevenueStrategyData> {
  return xanoPost<RevenueStrategyData>("/revenue_strategy", data);
}

/**
 * Update an existing revenue strategy
 */
export async function updateRevenueStrategy(id: number, data: RevenueStrategyUpdateData): Promise<RevenueStrategyData> {
  return xanoPatch<RevenueStrategyData>(`/revenue_strategy/${id}`, data);
}

/**
 * Delete a revenue strategy
 */
export async function deleteRevenueStrategy(id: number): Promise<void> {
  return xanoDelete(`/revenue_strategy/${id}`);
}
