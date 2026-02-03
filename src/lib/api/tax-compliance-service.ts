/**
 * Tax Compliance Service
 * Handles all API requests for tax compliance data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface TaxComplianceData {
  id: number;
  created_at: string;
  account_id: number;
  total_tax_liability: number;
  potential_savings: number;
  compliance_updates_count: number;
  active_entities_count: number;
  smart_tax_calculator: string;
  tax_avoidance_recommendations: string[];
  automated_compliance_updates_guidance: string[];
  compliance_obligations_calendar: string[];
  tax_planning_advisory_support: string[];
  document_management_compliance_reporting: string[];
  audit_trail: string[];
}

export type TaxComplianceCreateData = Omit<TaxComplianceData, "id" | "created_at">;
export type TaxComplianceUpdateData = Partial<TaxComplianceCreateData>;

/**
 * Get all tax compliance records
 */
export async function getTaxComplianceRecords(): Promise<TaxComplianceData[]> {
  return xanoGet<TaxComplianceData[]>("/tax_compliance");
}

/**
 * Get a specific tax compliance record by ID
 */
export async function getTaxCompliance(id: number): Promise<TaxComplianceData> {
  return xanoGet<TaxComplianceData>(`/tax_compliance/${id}`);
}

/**
 * Create a new tax compliance record
 */
export async function createTaxCompliance(data: TaxComplianceCreateData): Promise<TaxComplianceData> {
  return xanoPost<TaxComplianceData>("/tax_compliance", data);
}

/**
 * Update an existing tax compliance record
 */
export async function updateTaxCompliance(id: number, data: TaxComplianceUpdateData): Promise<TaxComplianceData> {
  return xanoPatch<TaxComplianceData>(`/tax_compliance/${id}`, data);
}

/**
 * Delete a tax compliance record
 */
export async function deleteTaxCompliance(id: number): Promise<void> {
  return xanoDelete(`/tax_compliance/${id}`);
}
