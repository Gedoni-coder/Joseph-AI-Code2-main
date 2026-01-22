/**
 * Risk Management Service
 * Handles all API requests for risk management and mitigation strategies
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface RiskManagementData {
  id: number;
  created_at: string;
  account_id: number;
  total_risks_identified: number;
  critical_risks_count: number;
  risk_mitigation_coverage: number;
  overall_risk_score: number;
  risk_register: string[];
  risk_assessments: string[];
  mitigation_strategies: string[];
  contingency_plans: string[];
  risk_monitoring_metrics: string[];
  risk_tolerance_levels: string[];
  business_continuity_plans: string[];
  insurance_requirements: string[];
}

export type RiskManagementCreateData = Omit<RiskManagementData, "id" | "created_at">;
export type RiskManagementUpdateData = Partial<RiskManagementCreateData>;

/**
 * Get all risk management records
 */
export async function getRiskManagementRecords(): Promise<RiskManagementData[]> {
  return xanoGet<RiskManagementData[]>("/risk_management");
}

/**
 * Get a specific risk management record by ID
 */
export async function getRiskManagement(id: number): Promise<RiskManagementData> {
  return xanoGet<RiskManagementData>(`/risk_management/${id}`);
}

/**
 * Create a new risk management record
 */
export async function createRiskManagement(data: RiskManagementCreateData): Promise<RiskManagementData> {
  return xanoPost<RiskManagementData>("/risk_management", data);
}

/**
 * Update an existing risk management record
 */
export async function updateRiskManagement(id: number, data: RiskManagementUpdateData): Promise<RiskManagementData> {
  return xanoPatch<RiskManagementData>(`/risk_management/${id}`, data);
}

/**
 * Delete a risk management record
 */
export async function deleteRiskManagement(id: number): Promise<void> {
  return xanoDelete(`/risk_management/${id}`);
}
