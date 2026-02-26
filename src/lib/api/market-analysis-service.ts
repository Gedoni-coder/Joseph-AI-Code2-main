/**
 * Market Analysis Service
 * Calls /api/market on the Node.js/Express backend.
 */
import { apiGet, apiPost, apiPatch, apiDelete } from "./apiClient";

// ─── Market Analysis ──────────────────────────────────────────────────────────

export interface MarketAnalysisData {
  id: string;
  user_id: string;
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
  created_at: string;
  updated_at: string;
}

export type MarketAnalysisCreateData = Omit<MarketAnalysisData, "id" | "user_id" | "created_at" | "updated_at">;
export type MarketAnalysisUpdateData = Partial<MarketAnalysisCreateData>;

const MARKET_BASE = "/api/market/analyses";

export async function getMarketAnalyses(): Promise<MarketAnalysisData[]> {
  return apiGet<MarketAnalysisData[]>(MARKET_BASE);
}

export async function getMarketAnalysis(id: string): Promise<MarketAnalysisData> {
  return apiGet<MarketAnalysisData>(`${MARKET_BASE}/${id}`);
}

export async function createMarketAnalysis(data: MarketAnalysisCreateData): Promise<MarketAnalysisData> {
  return apiPost<MarketAnalysisData>(MARKET_BASE, data);
}

export async function updateMarketAnalysis(id: string, data: MarketAnalysisUpdateData): Promise<MarketAnalysisData> {
  return apiPatch<MarketAnalysisData>(`${MARKET_BASE}/${id}`, data);
}

export async function deleteMarketAnalysis(id: string): Promise<void> {
  return apiDelete(`${MARKET_BASE}/${id}`);
}

// ─── Competitive Analysis ─────────────────────────────────────────────────────

export interface CompetitiveAnalysisData {
  id: string;
  user_id: string;
  competitor_name: string;
  competitor_type: string;
  market_share: number;
  revenue: number;
  employees: number;
  founded: number;
  headquarters: string;
  website: string;
  description: string;
  key_products: string[];
  target_markets: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  strategy_recommendations: string[];
  overall_score: number;
  funding_stage: string;
  last_funding_year: number;
  created_at: string;
  updated_at: string;
}

export type CompetitiveAnalysisCreateData = Omit<CompetitiveAnalysisData, "id" | "user_id" | "created_at" | "updated_at">;
export type CompetitiveAnalysisUpdateData = Partial<CompetitiveAnalysisCreateData>;

const COMPETITIVE_BASE = "/api/market/competitive";

export async function getCompetitiveAnalyses(): Promise<CompetitiveAnalysisData[]> {
  return apiGet<CompetitiveAnalysisData[]>(COMPETITIVE_BASE);
}

export async function getCompetitiveAnalysis(id: string): Promise<CompetitiveAnalysisData> {
  return apiGet<CompetitiveAnalysisData>(`${COMPETITIVE_BASE}/${id}`);
}

export async function createCompetitiveAnalysis(data: CompetitiveAnalysisCreateData): Promise<CompetitiveAnalysisData> {
  return apiPost<CompetitiveAnalysisData>(COMPETITIVE_BASE, data);
}

export async function updateCompetitiveAnalysis(id: string, data: CompetitiveAnalysisUpdateData): Promise<CompetitiveAnalysisData> {
  return apiPatch<CompetitiveAnalysisData>(`${COMPETITIVE_BASE}/${id}`, data);
}

export async function deleteCompetitiveAnalysis(id: string): Promise<void> {
  return apiDelete(`${COMPETITIVE_BASE}/${id}`);
}
