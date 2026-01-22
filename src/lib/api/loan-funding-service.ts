/**
 * Loan & Funding Service
 * Handles all API requests for loan and funding research
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface LoanFundingData {
  id: number;
  created_at: string;
  account_id: number;
  funding_required: number;
  total_opportunities: number;
  qualified_opportunities: number;
  approval_probability: number;
  average_interest_rate: number;
  funding_sources: string[];
  loan_options: string[];
  grant_opportunities: string[];
  investor_match_scores: string[];
  application_requirements: string[];
  success_factors: string[];
  risk_assessment: string[];
  recommended_strategy: string[];
}

export type LoanFundingCreateData = Omit<LoanFundingData, "id" | "created_at">;
export type LoanFundingUpdateData = Partial<LoanFundingCreateData>;

/**
 * Get all loan and funding records
 */
export async function getLoanFundingRecords(): Promise<LoanFundingData[]> {
  return xanoGet<LoanFundingData[]>("/loan_funding");
}

/**
 * Get a specific loan and funding record by ID
 */
export async function getLoanFunding(id: number): Promise<LoanFundingData> {
  return xanoGet<LoanFundingData>(`/loan_funding/${id}`);
}

/**
 * Create a new loan and funding record
 */
export async function createLoanFunding(data: LoanFundingCreateData): Promise<LoanFundingData> {
  return xanoPost<LoanFundingData>("/loan_funding", data);
}

/**
 * Update an existing loan and funding record
 */
export async function updateLoanFunding(id: number, data: LoanFundingUpdateData): Promise<LoanFundingData> {
  return xanoPatch<LoanFundingData>(`/loan_funding/${id}`, data);
}

/**
 * Delete a loan and funding record
 */
export async function deleteLoanFunding(id: number): Promise<void> {
  return xanoDelete(`/loan_funding/${id}`);
}
