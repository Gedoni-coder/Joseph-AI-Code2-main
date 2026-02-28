/**
 * Business Forecasting Service
 * Calls /api/business/forecasts on the Node.js/Express backend.
 */
import { apiGet, apiPost, apiPatch, apiDelete } from "./apiClient";

export interface BusinessForecastingData {
  id: string;
  user_id: string;
  annual_revenue_target: number;
  customer_segments_count: number;
  kpis_tracked_count: number;
  scenarios_modeled_count: number;
  total_demand_units: number;
  average_order_value: number;
  total_revenue_target: number;
  avg_confidence: number;
  potential_upside: number;
  total_market_opportunity: number;
  weighted_avg_growth: number;
  overall_retention: number;
  enterprise_units: number;
  enterprise_growth_rate: number;
  enterprise_retention: number;
  enterprise_avg_order: number;
  enterprise_seasonality: number;
  enterprise_revenue_potential: number;
  smb_units: number;
  smb_growth_rate: number;
  smb_retention: number;
  smb_avg_order: number;
  smb_seasonality: number;
  smb_revenue_potential: number;
  q1_2025_projected_revenue: number;
  q1_2025_actual_to_date: number;
  q1_2025_scenario_range_min: number;
  q1_2025_scenario_range_max: number;
  q1_2025_confidence: string;
  q2_2025_projected_revenue: number;
  q2_2025_actual_to_date: number;
  q2_2025_scenario_range_min: number;
  q2_2025_scenario_range_max: number;
  q2_2025_confidence: string;
  q3_2025_projected_revenue: number;
  q3_2025_actual_to_date: number;
  q3_2025_scenario_range_min: number;
  q3_2025_scenario_range_max: number;
  q3_2025_confidence: string;
  q4_2025_projected_revenue: number;
  q4_2025_actual_to_date: number;
  q4_2025_scenario_range_min: number;
  q4_2025_scenario_range_max: number;
  q4_2025_confidence: string;
  kpis: string[];
  forecast_scenarios: string[];
  documents: string[];
  created_at: string;
  updated_at: string;
}

export type BusinessForecastingCreateData = Omit<
  BusinessForecastingData,
  "id" | "user_id" | "created_at" | "updated_at"
>;
export type BusinessForecastingUpdateData = Partial<BusinessForecastingCreateData>;

const BASE = "/api/business/forecasts";

export async function getBusinessForecasts(): Promise<BusinessForecastingData[]> {
  return apiGet<BusinessForecastingData[]>(BASE);
}

export async function getBusinessForecast(id: string): Promise<BusinessForecastingData> {
  return apiGet<BusinessForecastingData>(`${BASE}/${id}`);
}

export async function createBusinessForecast(
  data: BusinessForecastingCreateData,
): Promise<BusinessForecastingData> {
  return apiPost<BusinessForecastingData>(BASE, data);
}

export async function updateBusinessForecast(
  id: string,
  data: BusinessForecastingUpdateData,
): Promise<BusinessForecastingData> {
  return apiPatch<BusinessForecastingData>(`${BASE}/${id}`, data);
}

export async function updateBusinessForecastKPI(
  forecastId: string,
  kpiId: string,
  newValue: number,
): Promise<BusinessForecastingData> {
  return apiPatch<BusinessForecastingData>(`${BASE}/${forecastId}/kpi`, { kpiId, newValue });
}

export async function updateBusinessForecastScenario(
  forecastId: string,
  scenarioId: string,
  updates: Record<string, unknown>,
): Promise<BusinessForecastingData> {
  return apiPatch<BusinessForecastingData>(`${BASE}/${forecastId}/scenario`, {
    scenarioId,
    updates,
  });
}

export async function deleteBusinessForecast(id: string): Promise<void> {
  return apiDelete(`${BASE}/${id}`);
}
