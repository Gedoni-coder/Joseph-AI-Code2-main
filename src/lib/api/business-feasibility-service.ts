/**
 * Business Feasibility Service
 * Handles all API requests for business feasibility analysis
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface BusinessFeasibilityData {
  id: number;
  created_at: string;
  account_id: number;
  business_idea_name: string;
  feasibility_score: number;
  market_feasibility: number;
  technical_feasibility: number;
  financial_feasibility: number;
  operational_feasibility: number;
  feasibility_status: string;
  executive_summary: string;
  market_analysis: string;
  competitive_analysis: string;
  technical_requirements: string[];
  financial_requirements: string[];
  operational_requirements: string[];
  risk_assessment: string;
  recommendations: string[];
  next_steps: string[];
  supporting_documents: string[];
}

export type BusinessFeasibilityCreateData = Omit<BusinessFeasibilityData, "id" | "created_at">;
export type BusinessFeasibilityUpdateData = Partial<BusinessFeasibilityCreateData>;

/**
 * Get all business feasibility records
 */
export async function getBusinessFeasibilities(): Promise<BusinessFeasibilityData[]> {
  return xanoGet<BusinessFeasibilityData[]>("/business_feasibility");
}

/**
 * Get a specific business feasibility record by ID
 */
export async function getBusinessFeasibility(id: number): Promise<BusinessFeasibilityData> {
  return xanoGet<BusinessFeasibilityData>(`/business_feasibility/${id}`);
}

/**
 * Create a new business feasibility record
 */
export async function createBusinessFeasibility(data: BusinessFeasibilityCreateData): Promise<BusinessFeasibilityData> {
  return xanoPost<BusinessFeasibilityData>("/business_feasibility", data);
}

/**
 * Update an existing business feasibility record
 */
export async function updateBusinessFeasibility(id: number, data: BusinessFeasibilityUpdateData): Promise<BusinessFeasibilityData> {
  return xanoPatch<BusinessFeasibilityData>(`/business_feasibility/${id}`, data);
}

/**
 * Delete a business feasibility record
 */
export async function deleteBusinessFeasibility(id: number): Promise<void> {
  return xanoDelete(`/business_feasibility/${id}`);
}
