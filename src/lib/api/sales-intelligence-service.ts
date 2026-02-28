/**
 * Sales Intelligence Service
 * NEW FILE — calls /api/sales on the Node.js/Express backend.
 * This replaces the entirely mock-based useSalesIntelligenceAPI hook.
 */
import { apiGet, apiPost, apiPatch, apiDelete } from "./apiClient";

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface LeadData {
  id: string;
  user_id: string;
  company: string;
  description: string;
  opening: string;
  expected_close: string;
  stage: "hot" | "warm" | "cold" | string;
  lead_score: number;
  probability: number;
  stall: string;
  playbook: string;
  lead_source: string;
  product: string;
  region: string;
  industry: string;
  segment: string;
  deal_size: number;
  sales_rep: string;
  created_at: string;
  updated_at: string;
}

export type LeadCreateData = Omit<LeadData, "id" | "user_id" | "created_at" | "updated_at">;
export type LeadUpdateData = Partial<LeadCreateData>;

export async function getLeads(stage?: string): Promise<LeadData[]> {
  return apiGet<LeadData[]>("/api/sales/leads", stage ? { stage } : undefined);
}

export async function getLead(id: string): Promise<LeadData> {
  return apiGet<LeadData>(`/api/sales/leads/${id}`);
}

export async function createLead(data: LeadCreateData): Promise<LeadData> {
  return apiPost<LeadData>("/api/sales/leads", data);
}

export async function updateLead(id: string, data: LeadUpdateData): Promise<LeadData> {
  return apiPatch<LeadData>(`/api/sales/leads/${id}`, data);
}

export async function deleteLead(id: string): Promise<void> {
  return apiDelete(`/api/sales/leads/${id}`);
}

// ─── Sales Target ─────────────────────────────────────────────────────────────

export interface SalesTargetData {
  id: string;
  user_id: string;
  sales_rep_id: string;
  sales_rep_name: string;
  target_period: string;
  target_amount: number;
  achieved_amount: number;
  status: string;
  deals_closed: number;
  avg_deal_size: number;
  created_at: string;
  updated_at: string;
}

export type SalesTargetCreateData = Omit<SalesTargetData, "id" | "user_id" | "created_at" | "updated_at">;
export type SalesTargetUpdateData = Partial<Pick<SalesTargetData, "status" | "achieved_amount" | "deals_closed">>;

export async function getSalesTargets(): Promise<SalesTargetData[]> {
  return apiGet<SalesTargetData[]>("/api/sales/targets");
}

export async function createSalesTarget(data: SalesTargetCreateData): Promise<SalesTargetData> {
  return apiPost<SalesTargetData>("/api/sales/targets", data);
}

export async function updateSalesTarget(id: string, data: SalesTargetUpdateData): Promise<SalesTargetData> {
  return apiPatch<SalesTargetData>(`/api/sales/targets/${id}`, data);
}

export async function deleteSalesTarget(id: string): Promise<void> {
  return apiDelete(`/api/sales/targets/${id}`);
}

// ─── Engagement ───────────────────────────────────────────────────────────────

export interface EngagementData {
  id: string;
  user_id: string;
  lead_company: string;
  channel: string;
  message: string;
  subject: string;
  status: string;
  scheduled_at: string;
  sent_at: string;
  response: string;
  rep_name: string;
  created_at: string;
  updated_at: string;
}

export type EngagementCreateData = Omit<EngagementData, "id" | "user_id" | "created_at" | "updated_at">;

export async function getEngagements(): Promise<EngagementData[]> {
  return apiGet<EngagementData[]>("/api/sales/engagements");
}

export async function createEngagement(data: EngagementCreateData): Promise<EngagementData> {
  return apiPost<EngagementData>("/api/sales/engagements", data);
}

export async function deleteEngagement(id: string): Promise<void> {
  return apiDelete(`/api/sales/engagements/${id}`);
}

// ─── Sales KPI ────────────────────────────────────────────────────────────────

export interface SalesKPIData {
  id: string;
  user_id: string;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable" | string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export async function getSalesKPIs(): Promise<SalesKPIData[]> {
  return apiGet<SalesKPIData[]>("/api/sales/kpis");
}

export async function upsertSalesKPI(data: Omit<SalesKPIData, "id" | "user_id" | "created_at" | "updated_at">): Promise<SalesKPIData> {
  return apiPost<SalesKPIData>("/api/sales/kpis", data);
}

// ─── Deal Analytics ───────────────────────────────────────────────────────────

export interface DealAnalyticData {
  id: string;
  user_id: string;
  deal_name: string;
  value: number;
  stage: string;
  probability: number;
  rep_name: string;
  close_date: string;
  industry: string;
  region: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type DealCreateData = Omit<DealAnalyticData, "id" | "user_id" | "created_at" | "updated_at">;

export async function getDealAnalytics(): Promise<DealAnalyticData[]> {
  return apiGet<DealAnalyticData[]>("/api/sales/deals");
}

export async function createDealAnalytic(data: DealCreateData): Promise<DealAnalyticData> {
  return apiPost<DealAnalyticData>("/api/sales/deals", data);
}

export async function updateDealAnalytic(id: string, data: Partial<DealCreateData>): Promise<DealAnalyticData> {
  return apiPatch<DealAnalyticData>(`/api/sales/deals/${id}`, data);
}
