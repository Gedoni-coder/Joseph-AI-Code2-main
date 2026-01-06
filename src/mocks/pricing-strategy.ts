// Pricing Strategy Module (Module 4) - Mock Data
// Tags: strategy types, test types - HARDCODED
// Data: strategy names, descriptions, competitor pricing, test results - MOVED TO MOCK

export interface PricingStrategy {
  id: string;
  name: string;
  type: "dynamic" | "value-based" | "cost-plus" | "penetration" | "premium";
  description: string;
  expectedImpact: "high" | "medium" | "low";
  complexity: "high" | "medium" | "low";
}

export const PRICING_STRATEGIES: PricingStrategy[] = [
  {
    id: "dynamic-pricing",
    name: "Dynamic Pricing",
    type: "dynamic",
    description: "Adjust prices based on demand, seasonality, and competitor actions",
    expectedImpact: "high",
    complexity: "high",
  },
  {
    id: "value-based",
    name: "Value-Based Pricing",
    type: "value-based",
    description: "Price based on customer perceived value and willingness to pay",
    expectedImpact: "high",
    complexity: "medium",
  },
  {
    id: "cost-plus",
    name: "Cost-Plus Markup",
    type: "cost-plus",
    description: "Fixed markup percentage over production costs",
    expectedImpact: "medium",
    complexity: "low",
  },
  {
    id: "penetration",
    name: "Penetration Pricing",
    type: "penetration",
    description: "Low introductory prices to gain market share quickly",
    expectedImpact: "high",
    complexity: "medium",
  },
];

export interface PriceTest {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  controlPrice: number;
  testPrice: number;
  targetSegment: string;
  status: "running" | "completed" | "paused";
  volumeImpact: number; // percentage
  revenueImpact: number; // percentage
  confidence: number; // percentage
}

export const ACTIVE_PRICE_TESTS: PriceTest[] = [
  {
    id: "test-1",
    name: "Premium Tier Price Test",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    controlPrice: 99,
    testPrice: 119,
    targetSegment: "Enterprise",
    status: "running",
    volumeImpact: -5.2,
    revenueImpact: 11.3,
    confidence: 87,
  },
  {
    id: "test-2",
    name: "Volume Discount Strategy",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    controlPrice: 50,
    testPrice: 45,
    targetSegment: "SMB",
    status: "running",
    volumeImpact: 18.7,
    revenueImpact: 8.2,
    confidence: 92,
  },
];

export interface CompetitorPrice {
  competitor: string;
  productName: string;
  currentPrice: number;
  priceHistory: { date: string; price: number }[];
  priceChangePercent: number;
  marketPosition: "undercut" | "aligned" | "premium";
}

export const COMPETITOR_PRICING: CompetitorPrice[] = [
  {
    competitor: "Jumia",
    productName: "Standard Marketplace",
    currentPrice: 85,
    priceHistory: [
      { date: "2024-01-01", price: 89 },
      { date: "2024-01-15", price: 87 },
      { date: "2024-02-01", price: 85 },
    ],
    priceChangePercent: -4.5,
    marketPosition: "aligned",
  },
  {
    competitor: "Konga",
    productName: "Marketplace Plus",
    currentPrice: 95,
    priceHistory: [
      { date: "2024-01-01", price: 95 },
      { date: "2024-01-15", price: 95 },
      { date: "2024-02-01", price: 95 },
    ],
    priceChangePercent: 0,
    marketPosition: "premium",
  },
  {
    competitor: "Temu",
    productName: "Budget Marketplace",
    currentPrice: 49,
    priceHistory: [
      { date: "2024-01-01", price: 49 },
      { date: "2024-01-15", price: 45 },
      { date: "2024-02-01", price: 42 },
    ],
    priceChangePercent: -14.3,
    marketPosition: "undercut",
  },
];
