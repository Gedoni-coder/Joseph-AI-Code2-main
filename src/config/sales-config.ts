/**
 * Sales Intelligence Module — centralised config
 * Replaces all hardcoded strings, metrics, and tab labels in SalesIntelligence.tsx
 */

// ─── Module Identity ──────────────────────────────────────────────────────────

export const MODULE_TITLE = "Sales Intelligence";
export const MODULE_DESCRIPTION = (companyName: string) =>
  `AI-powered sales analytics, pipeline intelligence, and coaching for ${companyName}`;

// ─── Tab Labels ───────────────────────────────────────────────────────────────

export const TAB_LABELS = {
  overview: "Overview",
  pipeline: "Lead Pipeline",
  coaching: "Sales Coaching",
  engagement: "Engagement",
  competitive: "Competitive Intel",
  forecasting: "Forecasting",
  productivity: "Rep Productivity",
  kpi: "KPI Dashboard",
  deals: "Deals Analytics",
} as const;

// ─── Lead Stage Labels ────────────────────────────────────────────────────────

export const LEAD_STAGES = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
} as const;

// ─── Default Metric Labels ────────────────────────────────────────────────────

export const METRIC_NAMES = {
  pipelineValue: "Total Pipeline Value",
  conversionRate: "Conversion Rate",
  avgDealSize: "Avg Deal Size",
  salesVelocity: "Sales Velocity",
  forecastAccuracy: "Forecast Accuracy",
  quotaAchievement: "Quota Achievement",
  winRate: "Win Rate",
  leadScore: "Lead Score",
} as const;

// ─── Engagement Channels ──────────────────────────────────────────────────────

export const ENGAGEMENT_CHANNELS = ["email", "whatsapp", "linkedin", "sms", "phone"] as const;

// ─── Deal Stages ──────────────────────────────────────────────────────────────

export const DEAL_STAGES = ["prospect", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"] as const;

// ─── KPI Trends ───────────────────────────────────────────────────────────────

export const KPI_TRENDS = ["up", "down", "stable"] as const;

// ─── React Query Timing ───────────────────────────────────────────────────────

export const TIMING = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;

// ─── Sub-module Descriptions ──────────────────────────────────────────────────

export const SUB_MODULE_DESCRIPTIONS: Record<string, string> = {
  "lead-pipeline": "Lead qualification, pipeline forecasting, deal rescue",
  "sales-coaching": "Real-time coaching, call analysis, performance optimization",
  "engagement-optimizer": "Multi-channel engagement, timing optimization, content recommendation",
  "competitive-intel": "Win/loss analysis, competitive positioning, battle cards",
  "sales-forecasting": "AI-powered forecasting, scenario modeling, risk assessment",
  "rep-productivity": "Activity tracking, quota progress, performance leaderboard",
};
