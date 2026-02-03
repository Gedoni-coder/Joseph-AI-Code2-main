/**
 * Policy & Compliance Service
 * Handles all API requests for policy and compliance data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface PolicyComplianceData {
  id: number;
  created_at: string;
  account_id: number;
  external_policies_count: number;
  internal_policies_count: number;
  compliance_score: number;
  gap_analysis_score: number;
  impact_assessment_score: number;
  external_policies: string[];
  internal_policies: string[];
  compliance_reports: string[];
  gap_analyses: string[];
  impact_assessments: string[];
  recommendations: string[];
  action_items: string[];
  next_steps: string[];
  risk_assessment: string[];
}

export type PolicyComplianceCreateData = Omit<PolicyComplianceData, "id" | "created_at">;
export type PolicyComplianceUpdateData = Partial<PolicyComplianceCreateData>;

/**
 * Get all policy compliance records
 */
export async function getPolicyComplianceRecords(): Promise<PolicyComplianceData[]> {
  return xanoGet<PolicyComplianceData[]>("/policy_compliance");
}

/**
 * Get a specific policy compliance record by ID
 */
export async function getPolicyCompliance(id: number): Promise<PolicyComplianceData> {
  return xanoGet<PolicyComplianceData>(`/policy_compliance/${id}`);
}

/**
 * Create a new policy compliance record
 */
export async function createPolicyCompliance(data: PolicyComplianceCreateData): Promise<PolicyComplianceData> {
  return xanoPost<PolicyComplianceData>("/policy_compliance", data);
}

/**
 * Update an existing policy compliance record
 */
export async function updatePolicyCompliance(id: number, data: PolicyComplianceUpdateData): Promise<PolicyComplianceData> {
  return xanoPatch<PolicyComplianceData>(`/policy_compliance/${id}`, data);
}

/**
 * Delete a policy compliance record
 */
export async function deletePolicyCompliance(id: number): Promise<void> {
  return xanoDelete(`/policy_compliance/${id}`);
}
