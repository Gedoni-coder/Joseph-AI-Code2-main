/**
 * Company Profile Service
 * Handles all API requests for company profile data
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface CompanyLogoFile {
  access: string;
  path: string;
  name: string;
  type: string;
  size: number;
  mime: string;
  meta: Record<string, unknown>;
  url?: string;
}

export interface CompanyProfileData {
  id: number;
  created_at: string;
  account_id: number;
  company_name: string;
  company_description: string;
  number_of_workers: number;
  sector: string;
  company_size: string;
  country: string;
  state_province: string;
  city: string;
  website_url: string;
  email_address: string;
  phone_number: string;
  fiscal_year_end_date: string;
  currency_preference: string;
  preferred_language: string;
  number_of_business_entities_subsidiaries: number;
  company_logo: CompanyLogoFile;
}

export type CompanyProfileCreateData = Omit<CompanyProfileData, "id" | "created_at">;
export type CompanyProfileUpdateData = Partial<CompanyProfileCreateData>;

/**
 * Get all company profiles
 */
export async function getCompanyProfiles(): Promise<CompanyProfileData[]> {
  return xanoGet<CompanyProfileData[]>("/company_profile");
}

/**
 * Get a specific company profile by ID
 */
export async function getCompanyProfile(id: number): Promise<CompanyProfileData> {
  return xanoGet<CompanyProfileData>(`/company_profile/${id}`);
}

/**
 * Create a new company profile
 */
export async function createCompanyProfile(data: CompanyProfileCreateData): Promise<CompanyProfileData> {
  return xanoPost<CompanyProfileData>("/company_profile", data);
}

/**
 * Update an existing company profile
 */
export async function updateCompanyProfile(id: number, data: CompanyProfileUpdateData): Promise<CompanyProfileData> {
  return xanoPatch<CompanyProfileData>(`/company_profile/${id}`, data);
}

/**
 * Delete a company profile
 */
export async function deleteCompanyProfile(id: number): Promise<void> {
  return xanoDelete(`/company_profile/${id}`);
}
