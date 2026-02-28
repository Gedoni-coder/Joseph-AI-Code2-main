/**
 * Market & Competitive Analysis Module — centralised config
 * Replaces all hardcoded strings, labels, and formatting in MarketCompetitiveAnalysis.tsx
 */

// ─── Module Identity ──────────────────────────────────────────────────────────

export const MODULE_TITLE = "Market Analysis";
export const MODULE_DESCRIPTION = (companyName: string) =>
  `Market intelligence and competitive landscape insights for ${companyName}`;

// ─── Tab Labels ───────────────────────────────────────────────────────────────

export const TAB_LABELS = {
  overview: "Overview",
  summary: "Summary & Rec",
  market: "Market Analysis",
  competitive: "Competitive Analysis",
  strategy: "Strategy & Advantages",
  notes: "Report Notes",
  joseph: "JOSEPH",
} as const;

// ─── Overview Card Labels ─────────────────────────────────────────────────────

export const CARD_LABELS = {
  totalTAM: "Total TAM",
  customerSegments: "Customer Segments",
  competitors: "Competitors",
  marketGrowth: "Market Growth",
} as const;

// ─── Formatting ───────────────────────────────────────────────────────────────

export const FORMAT = {
  /** Suffix appended when displaying billions */
  billionsSuffix: "B",
  /** Suffix appended when displaying percentages */
  percentSuffix: "%",
  /** Label appended to confidence scores */
  confidenceLabel: "% confidence",
} as const;

// ─── Badge Labels ─────────────────────────────────────────────────────────────

export const IMPACT_BADGES = {
  high: "high",
  medium: "medium",
  low: "low",
} as const;

// ─── Summary Section Titles ───────────────────────────────────────────────────

export const SUMMARY_TITLES = {
  analysisSummary: "Market & Competitive Analysis Summary",
  recommendations: "Market & Competitive Recommendations",
} as const;

// ─── SWOT Section Labels ──────────────────────────────────────────────────────

export const SWOT_LABELS = {
  strengths: "Strengths",
  weaknesses: "Weaknesses",
  opportunities: "Opportunities",
  threats: "Threats",
} as const;

// ─── React Query Timing ───────────────────────────────────────────────────────

export const TIMING = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  retryDelay: 2000,
} as const;
