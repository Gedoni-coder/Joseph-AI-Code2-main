/**
 * Tax Compliance Service
 * XANO DISCONNECTED - All API calls have been disabled
 * Functions return empty data only
 */

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
 * XANO DISCONNECTED - Returns empty array
 */
export async function getTaxComplianceRecords(): Promise<TaxComplianceData[]> {
  console.debug("[XANO DISCONNECTED] getTaxComplianceRecords blocked");
  return [];
}

/**
 * Get a specific tax compliance record by ID
 * XANO DISCONNECTED - Returns empty object
 */
export async function getTaxCompliance(id: number): Promise<TaxComplianceData> {
  console.debug(`[XANO DISCONNECTED] getTaxCompliance blocked for ID: ${id}`);
  return {} as TaxComplianceData;
}

/**
 * Create a new tax compliance record
 * XANO DISCONNECTED - Returns empty object
 */
export async function createTaxCompliance(data: TaxComplianceCreateData): Promise<TaxComplianceData> {
  console.debug("[XANO DISCONNECTED] createTaxCompliance blocked");
  return {} as TaxComplianceData;
}

/**
 * Update an existing tax compliance record
 * XANO DISCONNECTED - Returns empty object
 */
export async function updateTaxCompliance(id: number, data: TaxComplianceUpdateData): Promise<TaxComplianceData> {
  console.debug(`[XANO DISCONNECTED] updateTaxCompliance blocked for ID: ${id}`);
  return {} as TaxComplianceData;
}

/**
 * Delete a tax compliance record
 * XANO DISCONNECTED - Does nothing
 */
export async function deleteTaxCompliance(id: number): Promise<void> {
  console.debug(`[XANO DISCONNECTED] deleteTaxCompliance blocked for ID: ${id}`);
}
