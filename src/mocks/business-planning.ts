// Business Planning Module (Module 10) - Mock Data
// Tags: plan types, section types - HARDCODED
// Data: template names, step names, guidance text - MOVED TO MOCK

export interface PlanTemplate {
  id: string;
  name: string;
  description: string;
  sections: number;
  estimatedTime: string;
  industry?: string;
}

export const PLAN_TEMPLATES: PlanTemplate[] = [
  {
    id: "template-startup",
    name: "Startup Business Plan",
    description: "Comprehensive plan for new business ventures with growth focus",
    sections: 8,
    estimatedTime: "4-6 weeks",
  },
  {
    id: "template-expansion",
    name: "Expansion Plan",
    description: "Strategic plan for expanding existing business operations",
    sections: 6,
    estimatedTime: "3-4 weeks",
  },
  {
    id: "template-product",
    name: "Product Launch Plan",
    description: "Focused plan for launching new products or services",
    sections: 5,
    estimatedTime: "2-3 weeks",
  },
  {
    id: "template-ecommerce",
    name: "E-Commerce Business Plan",
    description: "Specialized plan for online marketplace and retail businesses",
    sections: 9,
    estimatedTime: "5-7 weeks",
    industry: "E-commerce",
  },
  {
    id: "template-nonprofit",
    name: "Non-Profit Business Plan",
    description: "Plan structure tailored for non-profit organizations",
    sections: 7,
    estimatedTime: "4-5 weeks",
  },
];

export interface PlanSection {
  id: string;
  title: string;
  description: string;
  keyElements: string[];
  tips: string;
}

export const PLAN_SECTIONS: PlanSection[] = [
  {
    id: "section-executive",
    title: "Executive Summary",
    description: "High-level overview of your business",
    keyElements: ["Business vision", "Target market", "Key competitive advantages", "Financial highlights"],
    tips: "Write this last. Keep it concise but compelling - this is often the most-read section.",
  },
  {
    id: "section-company",
    title: "Company Description",
    description: "Details about your company and operations",
    keyElements: ["Company mission", "Legal structure", "Location and facilities", "Organization structure"],
    tips: "Be specific about what makes your company unique and sustainable.",
  },
  {
    id: "section-market",
    title: "Market Analysis",
    description: "Research on your industry and target market",
    keyElements: ["Industry overview", "Target market size", "Customer profiles", "Market trends"],
    tips: "Use data and research. Investors want to see you understand your market.",
  },
  {
    id: "section-strategy",
    title: "Strategy & Implementation",
    description: "Your approach to achieving business goals",
    keyElements: [
      "Marketing strategy",
      "Sales strategy",
      "Operational plan",
      "Timeline and milestones",
    ],
    tips: "Be realistic about timelines and resources needed.",
  },
  {
    id: "section-financial",
    title: "Financial Projections",
    description: "3-5 year financial forecasts",
    keyElements: [
      "Revenue projections",
      "Expense budgets",
      "Break-even analysis",
      "Cash flow projections",
    ],
    tips: "Use conservative estimates. Show your assumptions clearly.",
  },
];

export const PLAN_GUIDANCE = {
  defaultPlanName: "My Business Plan",
  businessNameExtractionWords: 3,
  formLabel: "Make a Plan",
  formPlaceholder: "Describe your business idea...",
  formTip: "Tip: include rough timelines, target markets, and unique value propositions to get better analysis",
  emptyStateTitle: "Past Business Plans",
  emptyStateMessage: "No business plans created yet. Start by creating your first plan!",
};

export const BUSINESS_PLANNING_STORAGE_KEY = "joseph_business_plans_v1";

export interface BusinessPlan {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  steps: PlanStep[];
  status: "draft" | "review" | "approved";
}

export interface PlanStep {
  id: string;
  sectionId: string;
  title: string;
  content: string;
  status: "not-started" | "in-progress" | "completed";
}
