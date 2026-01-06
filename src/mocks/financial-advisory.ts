// Financial Advisory & Planning Module (Module 6) - Mock Data
// Tags: notification types, advice categories - HARDCODED
// Data: actual notification content, advice recommendations - MOVED TO MOCK

export interface FinancialNotification {
  id: number;
  type: "alert" | "recommendation" | "opportunity" | "warning";
  title: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  actionRequired: boolean;
  relatedModule: string;
}

export const DEFAULT_NOTIFICATIONS: FinancialNotification[] = [
  {
    id: 1,
    type: "alert",
    title: "Cash Flow Alert",
    message: "Your projected cash flow for Q2 2024 shows a potential shortfall of $250K. Review your expense projections and consider adjusting payment terms.",
    severity: "high",
    actionRequired: true,
    relatedModule: "Financial Planning",
  },
  {
    id: 2,
    type: "recommendation",
    title: "Tax Optimization Opportunity",
    message: "Based on your revenue growth, consider accelerating depreciation deductions in 2024 to reduce tax liability by an estimated $85K.",
    severity: "medium",
    actionRequired: false,
    relatedModule: "Tax Planning",
  },
];

export interface FinancialAdvice {
  id: string;
  category:
    | "cash-flow"
    | "profitability"
    | "debt-management"
    | "tax-planning"
    | "investment"
    | "contingency";
  title: string;
  description: string;
  expectedBenefit: string;
  implementationEffort: "high" | "medium" | "low";
  timeframe: string;
  priority: "critical" | "high" | "medium" | "low";
}

export const EXPERT_ADVICE: FinancialAdvice[] = [
  {
    id: "advice-1",
    category: "cash-flow",
    title: "Implement Just-in-Time Inventory System",
    description:
      "Reduce working capital tied up in inventory by implementing a JIT system with key suppliers. This could free up $500K in cash.",
    expectedBenefit: "Free up $500K in working capital",
    implementationEffort: "high",
    timeframe: "6-9 months",
    priority: "high",
  },
  {
    id: "advice-2",
    category: "profitability",
    title: "Optimize Cost of Goods Sold",
    description:
      "Renegotiate supplier contracts and explore alternative vendors to reduce COGS by 5-8%. Estimated annual savings: $425K.",
    expectedBenefit: "Reduce COGS by 5-8% ($425K annually)",
    implementationEffort: "medium",
    timeframe: "3-4 months",
    priority: "high",
  },
  {
    id: "advice-3",
    category: "debt-management",
    title: "Refinance High-Interest Debt",
    description:
      "Current debt carries 8.5% interest. Market rates are 6.2%. Refinancing could save $180K annually.",
    expectedBenefit: "Save $180K annually on interest",
    implementationEffort: "low",
    timeframe: "1-2 months",
    priority: "medium",
  },
  {
    id: "advice-4",
    category: "tax-planning",
    title: "Establish Employee Retirement Plan",
    description:
      "Implement a SIMPLE IRA or Solo 401(k) to provide tax-deductible contributions and reduce taxable income.",
    expectedBenefit: "Reduce taxable income by up to $60K",
    implementationEffort: "medium",
    timeframe: "2-3 months",
    priority: "medium",
  },
];

export const FINANCIAL_PLANNING_TEMPLATES = [
  { id: "template-1", name: "12-Month Cash Flow Forecast", category: "planning" },
  { id: "template-2", name: "5-Year Financial Model", category: "planning" },
  { id: "template-3", name: "Debt Restructuring Analysis", category: "planning" },
  { id: "template-4", name: "Break-Even Analysis", category: "analysis" },
];

export const NOTIFICATION_TOOLTIP_WIDTH = "w-80";
export const ADVISOR_TOOLTIP_WIDTH = "w-96";
