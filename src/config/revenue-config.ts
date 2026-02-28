/**
 * Revenue Strategy Module — centralised config
 * Replaces all hardcoded strings, tab labels, and formatting in RevenueStrategy.tsx
 */

// ─── Module Identity ──────────────────────────────────────────────────────────

export const MODULE_TITLE = "Revenue Strategy & Analysis";
export const MODULE_DESCRIPTION = (companyName: string) =>
  `Optimise revenue streams, reduce churn, and maximise growth for ${companyName}`;

// ─── Tab Labels ───────────────────────────────────────────────────────────────

export const TAB_LABELS = {
  overview: "Overview",
  summary: "Summary & Rec",
  streams: "Revenue Streams",
  forecasting: "Forecasting",
  churn: "Churn Analysis",
  upsell: "Upsell Opportunities",
  joseph: "JOSEPH",
} as const;

// ─── Card / Section Headings ──────────────────────────────────────────────────

export const SECTION_TITLES = {
  topStreams: "Top Revenue Streams",
  churnRisk: "Churn Risk Summary",
  topUpsells: "Top Upsell Opportunities",
  channelPerformance: "Channel Performance",
  summary: "Revenue Strategy Summary",
  recommendations: "Revenue Strategy Recommendations",
} as const;

// ─── Formatting ───────────────────────────────────────────────────────────────

export const FORMAT = {
  millionsSuffix: "M",
  thousandsSuffix: "K",
  decimalPlaces: 1,
} as const;

// ─── Stream Types ─────────────────────────────────────────────────────────────

export const STREAM_TYPES = ["subscription", "one-time", "usage-based", "licensing", "services"] as const;

// ─── Stream Status ────────────────────────────────────────────────────────────

export const STREAM_STATUS = ["active", "inactive", "growth", "declining", "new"] as const;

// ─── React Query Timing ───────────────────────────────────────────────────────

export const TIMING = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;
