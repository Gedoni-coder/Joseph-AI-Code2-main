/**
 * Financial Advisory Module — centralised config
 * Replaces all hardcoded strings, badge counts, and tab labels in FinancialAdvisory.tsx
 */

// ─── Module Identity ──────────────────────────────────────────────────────────

export const MODULE_TITLE = "Financial Advisory & Planning";
export const MODULE_DESCRIPTION = (companyName: string) =>
  `Strategic financial guidance and planning insights for ${companyName}`;

// ─── Tab Labels ───────────────────────────────────────────────────────────────

export const TAB_LABELS = {
  budgeting: "Strategic Budgeting",
  summary: "Summary & Rec",
  cashFlow: "Cash Flow Planning",
  validation: "Budget Validation",
  scenarios: "Scenario Testing",
  risk: "Risk Assessment",
  performance: "Performance Drivers",
  insights: "Advisory Insights",
} as const;

// ─── Popover Labels ───────────────────────────────────────────────────────────

export const POPOVER_LABELS = {
  notificationsTooltip: "View notifications and alerts",
  adviceTooltip: "Get expert advice and recommendations",
  notificationsHeading: "Notifications",
  adviceHeading: "Advice",
  tooltipWidth: "w-80",
} as const;

// ─── Status Labels ────────────────────────────────────────────────────────────

export const STATUS_LABELS = {
  loading: "Loading Financial Advisory Data...",
  error: "Error Loading Data",
} as const;

// ─── Summary Section Titles ───────────────────────────────────────────────────

export const SUMMARY_TITLES = {
  summary: "Financial Advisory & Planning Summary",
  recommendations: "Financial Advisory & Planning Recommendations",
} as const;

// ─── Risk Thresholds ──────────────────────────────────────────────────────────

export const RISK_THRESHOLDS = {
  high: 0.7,
  medium: 0.4,
} as const;

// ─── React Query Timing ───────────────────────────────────────────────────────

export const TIMING = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;
