/**
 * Business Forecasting Module — centralised config
 * Replaces all hardcoded strings and numeric values in BusinessForecast.tsx
 */

// ─── Module Identity ──────────────────────────────────────────────────────────

export const MODULE_TITLE = "Business Forecasting";
export const MODULE_DESCRIPTION = (companyName: string) =>
  `AI-powered revenue projections and scenario planning for ${companyName}`;

// ─── Tab Labels ───────────────────────────────────────────────────────────────

export const TAB_LABELS = {
  overview: "Overview",
  summary: "Summary & Rec",
  tables: "Tables",
  revenue: "Revenue",
  costs: "Costs",
  planning: "Planning",
  analytics: "Analytics",
  documents: "Documents",
} as const;

// ─── Quick-Stat Card Headings ─────────────────────────────────────────────────

export const STAT_CARD_TITLES = {
  revenueTarget: "Annual Revenue Target",
  segments: "Customer Segments",
  kpisTracked: "KPIs Tracked",
  scenariosModeled: "Scenarios Modeled",
} as const;

// ─── Section Headings ─────────────────────────────────────────────────────────

export const SECTION_TITLES = {
  forecastSummary: "Business Forecast Summary",
  forecastRecommendations: "Business Forecast Recommendations",
} as const;

// ─── Key Assumptions (defaults — can be overridden by API data) ───────────────

export const KEY_ASSUMPTIONS = {
  growthRate: "15%",
  customerRetention: "85%",
  inflationFactor: "3-5%",
  techAdoption: "25%",
} as const;

// ─── Competitive Position Defaults ───────────────────────────────────────────

export const COMPETITIVE_DEFAULTS = {
  marketShare: "12.5%",
  marketShareTarget: "15%",
  competitivePosition: "#3",
  pricePremium: "+8%",
} as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Business Forecast Platform`,
  dataRefresh: "Data updated every hour",
  models: "Models: Monte Carlo, Linear Regression, Scenario Analysis",
} as const;

// ─── React Query Timing ───────────────────────────────────────────────────────

export const TIMING = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;
