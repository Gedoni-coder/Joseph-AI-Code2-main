/**
 * Business Forecasting Service
 * XANO DISCONNECTED - All API calls have been disabled
 * Functions return empty data only
 */

export interface BusinessForecastingData {
  id: number;
  created_at: string;
  account_id: number;
  annual_revenue_target: number;
  customer_segments_count: number;
  kpis_tracked_count: number;
  scenarios_modeled_count: number;
  total_demand_units: number;
  average_order_value: number;
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
  total_market_opportunity: number;
  weighted_avg_growth: number;
  overall_retention: number;
  q1_2025_projected_revenue: number;
  q1_2025_actual_to_date: number;
  q1_2025_scenario_range_min: number;
  q1_2025_scenario_range_max: number;
  q1_2025_confidence: string;
  q2_2025_projected_revenue: number;
  q2_2025_actual_to_date?: number;
  q2_2025_scenario_range_min: number;
  q2_2025_scenario_range_max: number;
  q2_2025_confidence: string;
  q3_2025_projected_revenue?: number;
  q3_2025_actual_to_date?: number;
  q3_2025_scenario_range_min?: number;
  q3_2025_scenario_range_max?: number;
  q3_2025_confidence?: string;
  q4_2025_projected_revenue?: number;
  q4_2025_actual_to_date?: number;
  q4_2025_scenario_range_min?: number;
  q4_2025_scenario_range_max?: number;
  q4_2025_confidence?: string;
  total_revenue_target: number;
  avg_confidence: number;
  potential_upside: number;
  kpis: string[];
  forecast_scenarios: string[];
  documents: string[];
}

export type BusinessForecastingCreateData = Omit<
  BusinessForecastingData,
  "id" | "created_at"
>;
export type BusinessForecastingUpdateData =
  Partial<BusinessForecastingCreateData>;

/**
 * Get all business forecasting records
 * XANO DISCONNECTED - Returns empty array
 */
export async function getBusinessForecasts(): Promise<
  BusinessForecastingData[]
> {
  console.debug("[XANO DISCONNECTED] getBusinessForecasts blocked");
  return [];
}

/**
 * Get a specific business forecasting record by ID
 * XANO DISCONNECTED - Returns empty object
 */
export async function getBusinessForecast(
  id: number,
): Promise<BusinessForecastingData> {
  console.debug(`[XANO DISCONNECTED] getBusinessForecast blocked for ID: ${id}`);
  return {} as BusinessForecastingData;
}

/**
 * Create a new business forecasting record
 * XANO DISCONNECTED - Returns empty object
 */
export async function createBusinessForecast(
  data: BusinessForecastingCreateData,
): Promise<BusinessForecastingData> {
  console.debug("[XANO DISCONNECTED] createBusinessForecast blocked");
  return {} as BusinessForecastingData;
}

/**
 * Update an existing business forecasting record
 * XANO DISCONNECTED - Returns empty object
 */
export async function updateBusinessForecast(
  id: number,
  data: BusinessForecastingUpdateData,
): Promise<BusinessForecastingData> {
  console.debug(`[XANO DISCONNECTED] updateBusinessForecast blocked for ID: ${id}`);
  return {} as BusinessForecastingData;
}

/**
 * Delete a business forecasting record
 * XANO DISCONNECTED - Does nothing
 */
export async function deleteBusinessForecast(id: number): Promise<void> {
  console.debug(`[XANO DISCONNECTED] deleteBusinessForecast blocked for ID: ${id}`);
}
