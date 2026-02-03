/**
 * Market Analysis Service
 * Handles all API requests for market competitive analysis data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface MarketAnalysisData {
  id: number;
  created_at: string;
  account_id: number;
  total_addressable_market: number;
  serviceable_addressable_market: number;
  market_growth_rate: number;
  market_segments_count: number;
  competitors_tracked: number;
  competitive_position_score: number;
  market_share_estimate: number;
  market_trends: string[];
  competitive_threats: string[];
  market_opportunities: string[];
  competitor_analysis: string[];
  swot_analysis: string[];
  market_dynamics: string[];
  regulatory_environment: string[];
  customer_preferences: string[];
}

export type MarketAnalysisCreateData = Omit<MarketAnalysisData, "id" | "created_at">;
export type MarketAnalysisUpdateData = Partial<MarketAnalysisCreateData>;

/**
 * Get all market analysis records
 */
export async function getMarketAnalyses(): Promise<MarketAnalysisData[]> {
  return xanoGet<MarketAnalysisData[]>("/market_analysis");
}

/**
 * Get a specific market analysis record by ID
 */
export async function getMarketAnalysis(id: number): Promise<MarketAnalysisData> {
  return xanoGet<MarketAnalysisData>(`/market_analysis/${id}`);
}

/**
 * Create a new market analysis record
 */
export async function createMarketAnalysis(data: MarketAnalysisCreateData): Promise<MarketAnalysisData> {
  return xanoPost<MarketAnalysisData>("/market_analysis", data);
}

/**
 * Update an existing market analysis record
 */
export async function updateMarketAnalysis(id: number, data: MarketAnalysisUpdateData): Promise<MarketAnalysisData> {
  return xanoPatch<MarketAnalysisData>(`/market_analysis/${id}`, data);
}

/**
 * Delete a market analysis record
 */
export async function deleteMarketAnalysis(id: number): Promise<void> {
  return xanoDelete(`/market_analysis/${id}`);
}
