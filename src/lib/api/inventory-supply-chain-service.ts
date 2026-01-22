/**
 * Inventory & Supply Chain Service
 * Handles all API requests for inventory and supply chain analytics
 */

import { xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

export interface InventorySupplyChainData {
  id: number;
  created_at: string;
  account_id: number;
  total_inventory_value: number;
  inventory_turnover_ratio: number;
  stockout_incidents: number;
  supplier_count: number;
  supply_chain_efficiency_score: number;
  lead_time_days: number;
  inventory_levels: string[];
  sku_performance: string[];
  supplier_performance: string[];
  demand_forecasts: string[];
  reorder_points: string[];
  safety_stock_levels: string[];
  supply_chain_risks: string[];
  optimization_recommendations: string[];
}

export type InventorySupplyChainCreateData = Omit<InventorySupplyChainData, "id" | "created_at">;
export type InventorySupplyChainUpdateData = Partial<InventorySupplyChainCreateData>;

/**
 * Get all inventory and supply chain records
 */
export async function getInventorySupplyChainRecords(): Promise<InventorySupplyChainData[]> {
  return xanoGet<InventorySupplyChainData[]>("/inventory_supply_chain");
}

/**
 * Get a specific inventory and supply chain record by ID
 */
export async function getInventorySupplyChain(id: number): Promise<InventorySupplyChainData> {
  return xanoGet<InventorySupplyChainData>(`/inventory_supply_chain/${id}`);
}

/**
 * Create a new inventory and supply chain record
 */
export async function createInventorySupplyChain(data: InventorySupplyChainCreateData): Promise<InventorySupplyChainData> {
  return xanoPost<InventorySupplyChainData>("/inventory_supply_chain", data);
}

/**
 * Update an existing inventory and supply chain record
 */
export async function updateInventorySupplyChain(id: number, data: InventorySupplyChainUpdateData): Promise<InventorySupplyChainData> {
  return xanoPatch<InventorySupplyChainData>(`/inventory_supply_chain/${id}`, data);
}

/**
 * Delete an inventory and supply chain record
 */
export async function deleteInventorySupplyChain(id: number): Promise<void> {
  return xanoDelete(`/inventory_supply_chain/${id}`);
}
