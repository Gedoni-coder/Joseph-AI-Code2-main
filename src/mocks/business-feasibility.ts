// Business Feasibility Module (Module 9) - Mock Data
// Tags: mode types, verdict types - HARDCODED
// Data: algorithm thresholds, default values, AI prompts - MOVED TO MOCK

export type FeasibilityMode = "conservative" | "safe" | "wild";

export interface FeasibilityModConfig {
  mode: FeasibilityMode;
  riskWeighting: number;
  timeWeighting: number;
  rateWeighting: number;
  feasibleThreshold: number;
  borderlineThreshold: number;
  description: string;
}

export const FEASIBILITY_MODES: Record<FeasibilityMode, FeasibilityModConfig> = {
  conservative: {
    mode: "conservative",
    riskWeighting: 1.0,
    timeWeighting: 0.8,
    rateWeighting: 0.8,
    feasibleThreshold: 60,
    borderlineThreshold: 45,
    description:
      "Conservative approach - emphasizes risk, careful with timelines, standard rate expectations",
  },
  safe: {
    mode: "safe",
    riskWeighting: 0.7,
    timeWeighting: 0.5,
    rateWeighting: 0.6,
    feasibleThreshold: 50,
    borderlineThreshold: 40,
    description: "Safe approach - moderate risk tolerance, flexible timelines, realistic projections",
  },
  wild: {
    mode: "wild",
    riskWeighting: 0.4,
    timeWeighting: 0.3,
    rateWeighting: 0.4,
    feasibleThreshold: 40,
    borderlineThreshold: 30,
    description:
      "Wild approach - high risk tolerance, aggressive timelines, optimistic projections",
  },
};

export const FEASIBILITY_DEFAULTS = {
  defaultInterestRate: 6.5,
  defaultROITime: 18, // months
  defaultRisk: 35,
  defaultLengthTimeFactor: 12,
  defaultLengthTimeFactorLarge: 24, // for infrastructure/hardware/manufacturing
  interestRateMin: 3,
  interestRateMax: 12,
};

export const FEASIBILITY_ALGORITHM = {
  npvCalculationFactor: 1,
  pvFormulaBase: 1,
  percentageConversion: 100,
};

export const FEASIBILITY_KEYWORDS = {
  percentagePattern: /(\\d+(?:\\.\\d+)?)\\s*%/,
  timePattern: /(\\d+(?:\\.\\d+)?)\\s*(?:months?|yrs?)/i,
  ratePattern: /(\\d+(?:\\.\\d+)?)\\s*(?:%|rate|apr|interest)/i,
  stopWords: [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "should",
    "could",
    "may",
    "might",
    "must",
    "can",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
  ],
};

export const FEASIBILITY_STORAGE_KEY = "joseph_feasibility_ideas_v1";

export const AI_SYSTEM_PROMPT_TEMPLATE = `You are Joseph AI. Create a concise business feasibility narrative for the {mode} mode. Include: Risk, Time Value (NPV intuition), ROI Time, Length Time Factor, Interest Rate, and an overall verdict ({verdict}) with score {score}/100. Avoid fluff.`;

export const FEASIBILITY_VERDICTS = ["feasible", "borderline", "not-feasible"] as const;

export interface FeasibilityIdea {
  id: string;
  description: string;
  mode: FeasibilityMode;
  score: number;
  verdict: (typeof FEASIBILITY_VERDICTS)[number];
  analysis: string;
  createdAt: Date;
}

export const IDEA_ID_PATTERN = (id: string, timestamp: number, random: string) =>
  `idea_${timestamp}_${random}`;
