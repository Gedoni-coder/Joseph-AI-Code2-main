import { useCompanyInfo } from "@/lib/company-context";
import { useBusinessForecastingData } from "./useBusinessForecastingData";
import {
  type MarketSize,
  type CustomerSegment,
  type MarketTrend,
  type DemandForecast,
  type IndustryInsight,
} from "@/lib/market-data";

/**
 * Placeholder data generators - used when AI Agent hasn't generated content yet
 */
const createPlaceholderMarketSize = (): MarketSize => ({
  id: "placeholder-market",
  name: "Market Size & TAM",
  region: "To be determined",
  timeframe: "2025-2027",
  tam: 0,
  sam: 0,
  som: 0,
  growthRate: 0,
});

const createPlaceholderCustomerSegments = (): CustomerSegment[] => [
  {
    id: "placeholder-segment-1",
    name: "Primary Segment",
    size: 0,
    percentage: 0,
    avgSpending: 0,
    growthRate: 0,
    characteristics: [],
    priority: "high",
  },
];

const createPlaceholderMarketTrends = (): MarketTrend[] => [];

const createPlaceholderDemandForecasts = (): DemandForecast[] => [];

const createPlaceholderInsights = (): IndustryInsight[] => [];

export interface UseMarketAnalysisDataReturn {
  marketSizes: MarketSize[];
  customerSegments: CustomerSegment[];
  marketTrends: MarketTrend[];
  demandForecasts: DemandForecast[];
  industryInsights: IndustryInsight[];
  isDataAvailable: boolean;
  dataSource: "ai-generated" | "onboarding" | "business-forecast" | "placeholder";
  lastUpdated: Date;
}

/**
 * Hook to fetch and integrate market analysis data from multiple sources
 * 1. AI Agent (when available - not yet implemented)
 * 2. Onboarding form
 * 3. Business Forecasting Module
 * 4. Placeholders (when no data available)
 */
export function useMarketAnalysisData(): UseMarketAnalysisDataReturn {
  const { companyInfo } = useCompanyInfo();
  const {
    customerProfiles,
    revenueProjections,
  } = useBusinessForecastingData();

  // TODO: Integrate with AI Agent when available
  // const { marketData: aiGeneratedData } = useAIAgentData();

  // Determine if we have meaningful data
  const hasCompanyInfo = companyInfo?.companyName && companyInfo.companyName.trim().length > 0;
  const hasCustomerProfiles = customerProfiles && customerProfiles.length > 0;
  const hasRevenueProjections = revenueProjections && revenueProjections.length > 0;

  // Priority: AI Generated > Onboarding > Business Forecast > Placeholders
  const marketSizes: MarketSize[] = hasCustomerProfiles && hasRevenueProjections
    ? [
        {
          id: "market-primary",
          name: "Total Addressable Market (TAM)",
          region: "Primary Market",
          timeframe: "2025-2027",
          tam: 0, // To be filled by AI Agent
          sam: 0, // To be filled by AI Agent
          som: revenueProjections[0]?.projected || 0,
          growthRate: 0, // To be filled by AI Agent
        },
      ]
    : [createPlaceholderMarketSize()];

  const customerSegments: CustomerSegment[] = hasCustomerProfiles
    ? customerProfiles.map((profile, idx) => ({
        id: `segment-${idx}`,
        name: profile.segment,
        size: profile.demandAssumption,
        percentage: idx === 0 ? 65 : 35, // Will be replaced by AI
        avgSpending: profile.avgOrderValue,
        growthRate: profile.growthRate,
        characteristics: ["Key characteristic to be defined by AI Agent"],
        priority: idx === 0 ? "high" : "medium",
      }))
    : createPlaceholderCustomerSegments();

  const marketTrends: MarketTrend[] = createPlaceholderMarketTrends();
  const demandForecasts: DemandForecast[] = createPlaceholderDemandForecasts();
  const industryInsights: IndustryInsight[] = createPlaceholderInsights();

  // Determine data source
  let dataSource: "ai-generated" | "onboarding" | "business-forecast" | "placeholder" =
    "placeholder";
  let isDataAvailable = false;

  if (hasCustomerProfiles || hasRevenueProjections) {
    dataSource = "business-forecast";
    isDataAvailable = true;
  }

  if (hasCompanyInfo) {
    dataSource = "onboarding";
    isDataAvailable = true;
  }

  // AI generated would override all (when implemented)
  // if (aiGeneratedData) {
  //   dataSource = "ai-generated";
  //   isDataAvailable = true;
  // }

  return {
    marketSizes,
    customerSegments,
    marketTrends,
    demandForecasts,
    industryInsights,
    isDataAvailable,
    dataSource,
    lastUpdated: new Date(),
  };
}
