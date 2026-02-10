import { useState, useEffect } from "react";
import { useCompanyInfo } from "@/lib/company-context";
import { useBusinessForecastingData } from "./useBusinessForecastingData";
import { getMarketAnalysisFromAI } from "@/lib/api/groq-agent-service";
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
 * 1. AI Agent (Groq - primary)
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

  // State for AI-generated data
  const [aiData, setAiData] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Fetch AI-generated market analysis
  useEffect(() => {
    const fetchAIAnalysis = async () => {
      // Only fetch if we have company info
      const hasName = companyInfo?.companyName && companyInfo.companyName.trim().length > 0;
      if (!hasName) {
        setAiData(null);
        setIsLoadingAI(false);
        return;
      }

      setIsLoadingAI(true);
      try {
        const aiResult = await getMarketAnalysisFromAI(
          {
            name: companyInfo.companyName,
            industry: companyInfo.companyIndustry,
            description: companyInfo.companyDescription,
          },
          {
            targetMarket: companyInfo.targetMarket,
            businessStage: companyInfo.businessStage,
          }
        );
        setAiData(aiResult);
        console.debug("AI market analysis generated:", aiResult ? "success" : "no data");
      } catch (err) {
        console.debug("Failed to fetch AI analysis:", err);
        setAiData(null);
      } finally {
        setIsLoadingAI(false);
      }
    };

    fetchAIAnalysis();
  }, [companyInfo?.companyName, companyInfo?.companyIndustry, companyInfo?.companyDescription]);

  // Determine if we have meaningful data
  const hasCompanyInfo = companyInfo?.companyName && companyInfo.companyName.trim().length > 0;
  const hasCustomerProfiles = customerProfiles && customerProfiles.length > 0;
  const hasRevenueProjections = revenueProjections && revenueProjections.length > 0;
  const hasAIData = aiData && (
    aiData.marketSizes?.length > 0 ||
    aiData.customerSegments?.length > 0 ||
    aiData.marketTrends?.length > 0 ||
    aiData.demandForecasts?.length > 0 ||
    aiData.industryInsights?.length > 0
  );

  // Priority: AI Generated > Onboarding > Business Forecast > Placeholders
  let marketSizes: MarketSize[] = [createPlaceholderMarketSize()];
  let customerSegments: CustomerSegment[] = createPlaceholderCustomerSegments();
  let marketTrends: MarketTrend[] = createPlaceholderMarketTrends();
  let demandForecasts: DemandForecast[] = createPlaceholderDemandForecasts();
  let industryInsights: IndustryInsight[] = createPlaceholderInsights();

  // Use AI data if available
  if (hasAIData) {
    if (aiData.marketSizes?.length > 0) {
      marketSizes = aiData.marketSizes;
    }
    if (aiData.customerSegments?.length > 0) {
      customerSegments = aiData.customerSegments;
    }
    if (aiData.marketTrends?.length > 0) {
      marketTrends = aiData.marketTrends;
    }
    if (aiData.demandForecasts?.length > 0) {
      demandForecasts = aiData.demandForecasts;
    }
    if (aiData.industryInsights?.length > 0) {
      industryInsights = aiData.industryInsights;
    }
  } else if (hasCustomerProfiles && hasRevenueProjections) {
    // Fallback to Business Forecast data
    marketSizes = [
      {
        id: "market-primary",
        name: "Total Addressable Market (TAM)",
        region: "Primary Market",
        timeframe: "2025-2027",
        tam: 0,
        sam: 0,
        som: revenueProjections[0]?.projected || 0,
        growthRate: 0,
      },
    ];

    customerSegments = customerProfiles.map((profile, idx) => ({
      id: `segment-${idx}`,
      name: profile.segment,
      size: profile.demandAssumption,
      percentage: idx === 0 ? 65 : 35,
      avgSpending: profile.avgOrderValue,
      growthRate: profile.growthRate,
      characteristics: [profile.segment + " segment characteristics"],
      priority: idx === 0 ? "high" : "medium",
    }));
  }

  // Determine data source
  let dataSource: "ai-generated" | "onboarding" | "business-forecast" | "placeholder" =
    "placeholder";
  let isDataAvailable = false;

  if (hasAIData) {
    dataSource = "ai-generated";
    isDataAvailable = true;
  } else if (hasCustomerProfiles || hasRevenueProjections) {
    dataSource = "business-forecast";
    isDataAvailable = true;
  } else if (hasCompanyInfo) {
    dataSource = "onboarding";
    isDataAvailable = true;
  }

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
