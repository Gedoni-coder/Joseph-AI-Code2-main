/**
 * Economic Forecasting Module — centralised config
 * Replaces all hardcoded strings, labels, and timing constants in Index.tsx
 */

// ─── Context Labels ───────────────────────────────────────────────────────────

export const ECONOMIC_CONTEXT_TITLES: Record<string, string> = {
  local: "Local Economic Dashboard",
  state: "State Economic Overview",
  national: "National Economic Indicators",
  global: "Global Market Landscape",
};

export const ECONOMIC_CONTEXT_DESCRIPTIONS: Record<string, string> = {
  local: "Monitor economic conditions affecting your local business environment",
  state: "Track state-level economic trends and policy impacts",
  national: "Comprehensive view of national economic health and forecasts",
  global: "Global market dynamics, currency trends, and international trade",
};

// ─── Status Badges ────────────────────────────────────────────────────────────

export const STATUS_LABELS = {
  live: "Live Streaming",
  offline: "Offline Mode",
} as const;

// ─── Loading Messages ─────────────────────────────────────────────────────────

export const LOADING_MESSAGES = {
  metrics: "Updating metrics...",
  news: "Fetching latest news...",
  forecasts: "Refreshing forecasts...",
  events: "Loading upcoming events...",
} as const;

// ─── Section Headings ─────────────────────────────────────────────────────────

export const SECTION_TITLES = {
  marketAlerts: "Market Alerts & Notifications",
  analysisSummary: "Economic Analysis Summary",
  upcomingEvents: "Upcoming Events",
  keyTakeaways: "Key Takeaways",
} as const;

// ─── Timing Constants (ms) ────────────────────────────────────────────────────

export const TIMING = {
  /** How long the active-update indicator stays visible after a streaming tick */
  activeUpdateDisplay: 3000,
  /** Minimum interval between streaming simulation ticks */
  streamingIntervalMin: 2000,
  /** Maximum extra jitter added to streaming interval */
  streamingIntervalJitter: 3000,
  /** React Query stale time */
  staleTime: 5 * 60 * 1000,
  /** React Query GC time */
  gcTime: 10 * 60 * 1000,
} as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  sourcesPrefix: "Sources: ",
  copyright: `© ${new Date().getFullYear()} Economic Forecasting Platform`,
} as const;
