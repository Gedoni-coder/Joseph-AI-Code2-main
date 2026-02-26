import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLeads, createLead, updateLead, deleteLead,
  getSalesTargets, createSalesTarget, updateSalesTarget, deleteSalesTarget,
  getEngagements, createEngagement, deleteEngagement,
  getSalesKPIs, upsertSalesKPI,
  getDealAnalytics, createDealAnalytic, updateDealAnalytic,
  type LeadData, type LeadCreateData, type LeadUpdateData,
  type SalesTargetData, type SalesTargetCreateData, type SalesTargetUpdateData,
  type EngagementData, type EngagementCreateData,
  type SalesKPIData,
  type DealAnalyticData, type DealCreateData,
} from "@/lib/api/sales-intelligence-service";

export type { LeadData, SalesTargetData, EngagementData, SalesKPIData, DealAnalyticData };

export interface SalesSubModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  metrics: Record<string, string>;
  status: "active" | "inactive";
}

export interface UseSalesIntelligenceReturn {
  leads: LeadData[];
  salesTargets: SalesTargetData[];
  engagements: EngagementData[];
  kpis: SalesKPIData[];
  dealAnalytics: DealAnalyticData[];
  subModules: SalesSubModule[];
  isLoading: boolean;
  isConnected: boolean;
  lastUpdated: Date;
  error: string | null;
  refreshData: () => void;
  // Lead mutations
  addLead: (data: LeadCreateData) => Promise<LeadData>;
  editLead: (id: string, data: LeadUpdateData) => Promise<LeadData>;
  removeLead: (id: string) => Promise<void>;
  // Sales target mutations
  addSalesTarget: (data: SalesTargetCreateData) => Promise<SalesTargetData>;
  editSalesTarget: (id: string, data: SalesTargetUpdateData) => Promise<SalesTargetData>;
  removeSalesTarget: (id: string) => Promise<void>;
  // Engagement mutations
  addEngagement: (data: EngagementCreateData) => Promise<EngagementData>;
  removeEngagement: (id: string) => Promise<void>;
  // KPI mutations
  saveKPI: (data: Omit<SalesKPIData, "id" | "user_id" | "created_at" | "updated_at">) => Promise<SalesKPIData>;
  // Deal mutations
  addDeal: (data: DealCreateData) => Promise<DealAnalyticData>;
  editDeal: (id: string, data: Partial<DealCreateData>) => Promise<DealAnalyticData>;
}

/** Static sub-module definitions (structural metadata, not data) */
const SUB_MODULES: SalesSubModule[] = [
  {
    id: "lead-pipeline",
    name: "Lead Intelligence & Pipeline",
    icon: "Target",
    description: "Lead qualification, pipeline forecasting, deal rescue",
    metrics: {},
    status: "active",
  },
  {
    id: "sales-coaching",
    name: "Sales Coaching Engine",
    icon: "Brain",
    description: "Real-time coaching, call analysis, performance optimization",
    metrics: {},
    status: "active",
  },
  {
    id: "engagement-optimizer",
    name: "Engagement Optimizer",
    icon: "MessageCircle",
    description: "Multi-channel engagement, timing optimization, content recommendation",
    metrics: {},
    status: "active",
  },
  {
    id: "competitive-intel",
    name: "Competitive Intelligence",
    icon: "BarChart3",
    description: "Win/loss analysis, competitive positioning, battle cards",
    metrics: {},
    status: "active",
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    icon: "TrendingUp",
    description: "AI-powered forecasting, scenario modeling, risk assessment",
    metrics: {},
    status: "active",
  },
  {
    id: "rep-productivity",
    name: "Rep Productivity Dashboard",
    icon: "Users",
    description: "Activity tracking, quota progress, performance leaderboard",
    metrics: {},
    status: "active",
  },
];

export function useSalesIntelligenceAPI(): UseSalesIntelligenceReturn {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({ queryKey: ["sales-leads"], queryFn: () => getLeads(), staleTime: 5 * 60 * 1000, retry: 1 });
  const targetsQuery = useQuery({ queryKey: ["sales-targets"], queryFn: getSalesTargets, staleTime: 5 * 60 * 1000, retry: 1 });
  const engagementsQuery = useQuery({ queryKey: ["sales-engagements"], queryFn: getEngagements, staleTime: 5 * 60 * 1000, retry: 1 });
  const kpisQuery = useQuery({ queryKey: ["sales-kpis"], queryFn: getSalesKPIs, staleTime: 5 * 60 * 1000, retry: 1 });
  const dealsQuery = useQuery({ queryKey: ["sales-deals"], queryFn: getDealAnalytics, staleTime: 5 * 60 * 1000, retry: 1 });

  const isLoading = leadsQuery.isLoading || targetsQuery.isLoading;
  const error = leadsQuery.error || targetsQuery.error || engagementsQuery.error;
  const isConnected = !error;

  const invalidate = (key: string) => queryClient.invalidateQueries({ queryKey: [key] });

  return {
    leads: leadsQuery.data || [],
    salesTargets: targetsQuery.data || [],
    engagements: engagementsQuery.data || [],
    kpis: kpisQuery.data || [],
    dealAnalytics: dealsQuery.data || [],
    subModules: SUB_MODULES,
    isLoading,
    isConnected,
    lastUpdated: new Date(),
    error: error ? (error as Error).message : null,

    refreshData: () => {
      invalidate("sales-leads");
      invalidate("sales-targets");
      invalidate("sales-engagements");
      invalidate("sales-kpis");
      invalidate("sales-deals");
    },

    addLead: async (data) => {
      const result = await createLead(data);
      invalidate("sales-leads");
      return result;
    },
    editLead: async (id, data) => {
      const result = await updateLead(id, data);
      invalidate("sales-leads");
      return result;
    },
    removeLead: async (id) => {
      await deleteLead(id);
      invalidate("sales-leads");
    },

    addSalesTarget: async (data) => {
      const result = await createSalesTarget(data);
      invalidate("sales-targets");
      return result;
    },
    editSalesTarget: async (id, data) => {
      const result = await updateSalesTarget(id, data);
      invalidate("sales-targets");
      return result;
    },
    removeSalesTarget: async (id) => {
      await deleteSalesTarget(id);
      invalidate("sales-targets");
    },

    addEngagement: async (data) => {
      const result = await createEngagement(data);
      invalidate("sales-engagements");
      return result;
    },
    removeEngagement: async (id) => {
      await deleteEngagement(id);
      invalidate("sales-engagements");
    },

    saveKPI: async (data) => {
      const result = await upsertSalesKPI(data);
      invalidate("sales-kpis");
      return result;
    },

    addDeal: async (data) => {
      const result = await createDealAnalytic(data);
      invalidate("sales-deals");
      return result;
    },
    editDeal: async (id, data) => {
      const result = await updateDealAnalytic(id, data);
      invalidate("sales-deals");
      return result;
    },
  };
}
