/**
 * Pricing Strategy Service
 * Handles all API requests for pricing strategy data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface PricingStrategyData {
  id: number;
  created_at: string;
  account_id: number;
  average_selling_price: number;
  price_elasticity: number;
  competitive_position_score: number;
  price_acceptance_rate: number;
  active_pricing_strategies: string[];
  running_price_tests: string[];
  pricing_strategy_summary: string;
  key_metrics_insights: string[];
  pricing_recommendations: string[];
  action_items: string[];
  next_steps: string[];
  pricing_strategies_details: string[];
  competitive_analysis: string[];
  price_testing_optimization: string[];
  dynamic_pricing: string[];
}

export type PricingStrategyCreateData = Omit<PricingStrategyData, "id" | "created_at">;
export type PricingStrategyUpdateData = Partial<PricingStrategyCreateData>;

/**
 * Get all pricing strategies
 */
export async function getPricingStrategies(): Promise<PricingStrategyData[]> {
  return xanoGet<PricingStrategyData[]>("/pricing_strategy");
}

/**
 * Get a specific pricing strategy by ID
 */
export async function getPricingStrategy(id: number): Promise<PricingStrategyData> {
  return xanoGet<PricingStrategyData>(`/pricing_strategy/${id}`);
}

/**
 * Create a new pricing strategy
 */
export async function createPricingStrategy(data: PricingStrategyCreateData): Promise<PricingStrategyData> {
  return xanoPost<PricingStrategyData>("/pricing_strategy", data);
}

/**
 * Update an existing pricing strategy
 */
export async function updatePricingStrategy(id: number, data: PricingStrategyUpdateData): Promise<PricingStrategyData> {
  return xanoPatch<PricingStrategyData>(`/pricing_strategy/${id}`, data);
}

/**
 * Delete a pricing strategy
 */
export async function deletePricingStrategy(id: number): Promise<void> {
  return xanoDelete(`/pricing_strategy/${id}`);
}
