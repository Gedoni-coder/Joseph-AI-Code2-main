/**
 * Economic Indicators Service
 * Calls /api/economic/indicators on the Node.js/Express backend.
 */
import { apiGet, apiPost, apiPatch, apiDelete } from "./apiClient";

export interface EconomicIndicatorData {
  id: string;
  user_id: string;
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
  created_at: string;
  updated_at: string;
}

export type EconomicIndicatorCreateData = Omit<EconomicIndicatorData, "id" | "user_id" | "created_at" | "updated_at">;
export type EconomicIndicatorUpdateData = Partial<EconomicIndicatorCreateData>;

const BASE = "/api/economic/indicators";

export async function getEconomicIndicatorRecords(): Promise<EconomicIndicatorData[]> {
  return apiGet<EconomicIndicatorData[]>(BASE);
}

export async function getEconomicIndicator(id: string): Promise<EconomicIndicatorData> {
  return apiGet<EconomicIndicatorData>(`${BASE}/${id}`);
}

export async function createEconomicIndicator(
  data: EconomicIndicatorCreateData,
): Promise<EconomicIndicatorData> {
  return apiPost<EconomicIndicatorData>(BASE, data);
}

export async function updateEconomicIndicator(
  id: string,
  data: EconomicIndicatorUpdateData,
): Promise<EconomicIndicatorData> {
  return apiPatch<EconomicIndicatorData>(`${BASE}/${id}`, data);
}

export async function deleteEconomicIndicator(id: string): Promise<void> {
  return apiDelete(`${BASE}/${id}`);
}
