// Inventory & Supply Chain Module (Module 12) - Mock Data
// Tags: status types, urgency levels, supplier types - HARDCODED
// Data: inventory items, supplier names, quantities, risk scores - MOVED TO MOCK

export interface InventoryStatus {
  key: string;
  label: string;
  color: string;
  severity: "critical" | "warning" | "info" | "success";
}

export const INVENTORY_STATUSES: Record<string, InventoryStatus> = {
  "in-stock": { key: "in-stock", label: "In Stock", color: "green", severity: "success" },
  "low-stock": { key: "low-stock", label: "Low Stock", color: "yellow", severity: "warning" },
  "out-of-stock": {
    key: "out-of-stock",
    label: "Out of Stock",
    color: "red",
    severity: "critical",
  },
  overstock: { key: "overstock", label: "Overstock", color: "blue", severity: "info" },
};

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  reorderPoint: number;
  value: number;
  status: string;
  location: string;
  lastUpdated: string;
}

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Electronics Processor",
    sku: "ELEC-001",
    category: "Electronics",
    currentStock: 450,
    minimumStock: 100,
    reorderPoint: 200,
    value: 67500,
    status: "in-stock",
    location: "Warehouse A",
    lastUpdated: "2024-02-01",
  },
  {
    id: "inv-2",
    name: "Packaging Materials",
    sku: "PKG-002",
    category: "Packaging",
    currentStock: 45,
    minimumStock: 200,
    reorderPoint: 400,
    value: 2250,
    status: "low-stock",
    location: "Warehouse B",
    lastUpdated: "2024-02-01",
  },
  {
    id: "inv-3",
    name: "Raw Steel Sheets",
    sku: "STEEL-003",
    category: "Raw Materials",
    currentStock: 0,
    minimumStock: 500,
    reorderPoint: 800,
    value: 0,
    status: "out-of-stock",
    location: "Warehouse C",
    lastUpdated: "2024-02-01",
  },
  {
    id: "inv-4",
    name: "Plastic Components",
    sku: "PLASTIC-004",
    category: "Components",
    currentStock: 8500,
    minimumStock: 2000,
    reorderPoint: 3000,
    value: 42500,
    status: "overstock",
    location: "Warehouse A",
    lastUpdated: "2024-02-01",
  },
];

export interface Supplier {
  id: string;
  name: string;
  type: "primary" | "secondary" | "backup" | "specialized";
  location: string;
  leadTime: number; // days
  reliability: number; // percentage
  onTimeDeliveryRate: number; // percentage
  costPerUnit: number;
  minimumOrder: number;
  contacts: string[];
  lastDelivery: string;
  performanceRating: number; // 1-5 stars
}

export const SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    name: "Global Parts Ltd",
    type: "primary",
    location: "Shanghai, China",
    leadTime: 30,
    reliability: 94,
    onTimeDeliveryRate: 96,
    costPerUnit: 150,
    minimumOrder: 100,
    contacts: ["john@globalparts.com", "+86-21-5888-1234"],
    lastDelivery: "2024-01-28",
    performanceRating: 4.8,
  },
  {
    id: "sup-2",
    name: "AfriTrade Partners",
    type: "secondary",
    location: "Lagos, Nigeria",
    leadTime: 7,
    reliability: 85,
    onTimeDeliveryRate: 82,
    costPerUnit: 180,
    minimumOrder: 50,
    contacts: ["support@afritrade.com", "+234-1-2345-6789"],
    lastDelivery: "2024-01-25",
    performanceRating: 4.2,
  },
  {
    id: "sup-3",
    name: "Emergency Components Inc",
    type: "backup",
    location: "Dubai, UAE",
    leadTime: 3,
    reliability: 92,
    onTimeDeliveryRate: 88,
    costPerUnit: 220,
    minimumOrder: 25,
    contacts: ["orders@emcomp.ae"],
    lastDelivery: "2024-02-01",
    performanceRating: 4.5,
  },
];

export interface RiskAlert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  category: "supplier" | "logistics" | "demand" | "compliance" | "cost";
  title: string;
  description: string;
  affectedItems: string[];
  recommendedAction: string;
  daysUntilImpact: number;
}

export const RISK_ALERTS: RiskAlert[] = [
  {
    id: "risk-1",
    severity: "critical",
    category: "supplier",
    title: "Primary Supplier Disruption",
    description:
      "Global Parts Ltd experiencing production delays due to equipment failure. 2-3 week impact expected.",
    affectedItems: ["Electronics Processor", "Raw Steel Sheets"],
    recommendedAction: "Activate backup supplier (Emergency Components Inc) immediately",
    daysUntilImpact: 5,
  },
  {
    id: "risk-2",
    severity: "high",
    category: "logistics",
    title: "Port Strike - West Africa Region",
    description: "Potential port workers strike could affect shipments through Lagos and other West African ports.",
    affectedItems: ["All imported items"],
    recommendedAction: "Consider air freight for critical items; pre-position safety stock",
    daysUntilImpact: 10,
  },
];

export const INVENTORY_CONFIG = {
  riskThreshold: 20,
  currencyFormat: {
    millions: 1000000,
    millions_suffix: "M",
    thousands: 1000,
    thousands_suffix: "K",
  },
  defaultReorderLeadTime: 14, // days
};

export const SUPPLY_CHAIN_METRICS = {
  totalInventoryValue: 2150000,
  turnoverRate: 4.2,
  serviceLevel: 97.5,
  supplyChainEfficiency: 82,
  averageLeadTime: 18,
};

export const COMING_SOON_FEATURES = [
  "Demand forecasting with AI",
  "Automated reorder optimization",
  "Supplier performance scoring",
  "Multi-warehouse optimization",
  "Real-time tracking and visibility",
  "Sustainability reporting",
  "Advanced analytics and insights",
];
