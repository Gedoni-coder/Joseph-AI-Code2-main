/**
 * Economic Indicators Service
 * Handles all API requests for economic indicators data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface EconomicIndicatorData {
  id: number;
  created_at: string;
  account_id: number;
  gdp_growth_rate: number;
  inflation_rate: number;
  unemployment_rate: number;
  interest_rates: number;
  exchange_rates: number;
  consumer_confidence: number;
  stock_market_index: number;
  commodity_prices: number;
  housing_index: number;
  trade_balance: number;
  economic_news: string[];
  forecasts: string[];
  trends: string[];
  impact_analysis: string[];
  alerts: string[];
}

export type EconomicIndicatorCreateData = Omit<EconomicIndicatorData, "id" | "created_at">;
export type EconomicIndicatorUpdateData = Partial<EconomicIndicatorCreateData>;

/**
 * Get all economic indicator records
 */
export async function getEconomicIndicatorRecords(): Promise<EconomicIndicatorData[]> {
  return xanoGet<EconomicIndicatorData[]>("/economic_indicators");
}

/**
 * Get a specific economic indicator record by ID
 */
export async function getEconomicIndicator(id: number): Promise<EconomicIndicatorData> {
  return xanoGet<EconomicIndicatorData>(`/economic_indicators/${id}`);
}

/**
 * Create a new economic indicator record
 */
export async function createEconomicIndicator(data: EconomicIndicatorCreateData): Promise<EconomicIndicatorData> {
  return xanoPost<EconomicIndicatorData>("/economic_indicators", data);
}

/**
 * Update an existing economic indicator record
 */
export async function updateEconomicIndicator(id: number, data: EconomicIndicatorUpdateData): Promise<EconomicIndicatorData> {
  return xanoPatch<EconomicIndicatorData>(`/economic_indicators/${id}`, data);
}

/**
 * Delete an economic indicator record
 */
export async function deleteEconomicIndicator(id: number): Promise<void> {
  return xanoDelete(`/economic_indicators/${id}`);
}
