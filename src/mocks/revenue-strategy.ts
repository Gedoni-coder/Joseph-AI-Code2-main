// Revenue Strategy Module (Module 5) - Mock Data
// Tags: stream types, channel types, segment types - HARDCODED
// Data: revenue stream names, amounts, channel names, segment details - MOVED TO MOCK

export interface RevenueStream {
  id: string;
  name: string;
  type: "marketplace-commission" | "advertising" | "subscriptions" | "services" | "partnerships";
  currentRevenue: number;
  percentageOfTotal: number;
  growthRate: number; // percentage
  trend: "up" | "down" | "stable";
}

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: "stream-1",
    name: "Marketplace Commission",
    type: "marketplace-commission",
    currentRevenue: 8500000,
    percentageOfTotal: 58,
    growthRate: 12.5,
    trend: "up",
  },
  {
    id: "stream-2",
    name: "Advertising Revenue",
    type: "advertising",
    currentRevenue: 3200000,
    percentageOfTotal: 22,
    growthRate: 18.3,
    trend: "up",
  },
  {
    id: "stream-3",
    name: "Premium Subscriptions",
    type: "subscriptions",
    currentRevenue: 1800000,
    percentageOfTotal: 12,
    growthRate: 5.8,
    trend: "stable",
  },
  {
    id: "stream-4",
    name: "Seller Services",
    type: "services",
    currentRevenue: 900000,
    percentageOfTotal: 6,
    growthRate: -2.3,
    trend: "down",
  },
  {
    id: "stream-5",
    name: "Partner Revenue",
    type: "partnerships",
    currentRevenue: 600000,
    percentageOfTotal: 4,
    growthRate: 8.5,
    trend: "up",
  },
];

export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  averageSpend: number;
  growthRate: number;
  churnRate: number;
  ltv: number; // Lifetime Value
}

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    id: "seg-1",
    name: "Enterprise",
    size: 245,
    averageSpend: 125000,
    growthRate: 8.2,
    churnRate: 2.1,
    ltv: 875000,
  },
  {
    id: "seg-2",
    name: "SMB",
    size: 2850,
    averageSpend: 28500,
    growthRate: 15.3,
    churnRate: 5.8,
    ltv: 142500,
  },
  {
    id: "seg-3",
    name: "Startups",
    size: 8200,
    averageSpend: 5200,
    growthRate: 28.7,
    churnRate: 18.5,
    ltv: 18200,
  },
];

export interface UpsellOpportunity {
  id: string;
  segment: string;
  opportunity: string;
  currentAdoptionRate: number;
  potentialRevenue: number;
  timeframe: string;
}

export const UPSELL_OPPORTUNITIES: UpsellOpportunity[] = [
  {
    id: "upsell-1",
    segment: "Enterprise",
    opportunity: "Premium Analytics Package",
    currentAdoptionRate: 35,
    potentialRevenue: 1250000,
    timeframe: "Q2 2024",
  },
  {
    id: "upsell-2",
    segment: "SMB",
    opportunity: "Logistics Integration",
    currentAdoptionRate: 22,
    potentialRevenue: 850000,
    timeframe: "Q2 2024",
  },
  {
    id: "upsell-3",
    segment: "Startups",
    opportunity: "Growth Toolkit",
    currentAdoptionRate: 8,
    potentialRevenue: 450000,
    timeframe: "Q3 2024",
  },
];

export interface SalesChannel {
  id: string;
  name: string;
  type: "direct" | "partner" | "marketplace" | "affiliate";
  revenue: number;
  growthRate: number;
  efficiency: number; // percentage
}

export const SALES_CHANNELS: SalesChannel[] = [
  {
    id: "ch-1",
    name: "Direct Sales",
    type: "direct",
    revenue: 6800000,
    growthRate: 9.5,
    efficiency: 78,
  },
  {
    id: "ch-2",
    name: "Channel Partners",
    type: "partner",
    revenue: 4200000,
    growthRate: 12.3,
    efficiency: 65,
  },
  {
    id: "ch-3",
    name: "Marketplace Listings",
    type: "marketplace",
    revenue: 2100000,
    growthRate: 22.5,
    efficiency: 82,
  },
  {
    id: "ch-4",
    name: "Affiliate Programs",
    type: "affiliate",
    revenue: 1400000,
    growthRate: 35.8,
    efficiency: 88,
  },
];

export const CHURN_METRICS = {
  overallChurnRate: 6.2,
  seasonalPeakMonth: "August",
  highestChurnSegment: "Startups",
  primaryChurnReason: "Price sensitivity",
  retentionProgramROI: 3.5,
};
