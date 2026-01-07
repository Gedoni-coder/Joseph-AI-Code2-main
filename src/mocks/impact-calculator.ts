// Impact Calculator Module (Module 3) - Mock Data
// Tags: calculator types, scenario templates - HARDCODED
// Data: input field labels, default values, scenario descriptions - MOVED TO MOCK

export interface InputField {
  id: string;
  label: string;
  placeholder: string;
  unit?: string;
  type: "number" | "text" | "select";
}

export const POLICY_IMPACT_FIELDS: InputField[] = [
  { id: "policyName", label: "Policy Name", placeholder: "e.g., Carbon Tax", type: "text" },
  { id: "taxRate", label: "Tax Rate (%)", placeholder: "Enter tax rate", unit: "%", type: "number" },
  { id: "targetSector", label: "Target Sector", placeholder: "e.g., Manufacturing", type: "text" },
  { id: "affectedPopulation", label: "Affected Population", placeholder: "Number or percentage", type: "number" },
  { id: "implementationDate", label: "Implementation Date", placeholder: "YYYY-MM-DD", type: "text" },
  { id: "expectedImpact", label: "Expected Impact", placeholder: "Describe expected outcomes", type: "text" },
];

export const ECONOMIC_IMPACT_FIELDS: InputField[] = [
  { id: "scenario", label: "Economic Scenario", placeholder: "e.g., Recession", type: "text" },
  { id: "gdpChange", label: "GDP Change (%)", placeholder: "Enter GDP percentage change", unit: "%", type: "number" },
  { id: "inflationRate", label: "Inflation Rate (%)", placeholder: "Enter inflation rate", unit: "%", type: "number" },
  { id: "unemploymentChange", label: "Unemployment Change (%)", placeholder: "Enter change", unit: "%", type: "number" },
  { id: "interestRate", label: "Interest Rate (%)", placeholder: "Enter interest rate", unit: "%", type: "number" },
  { id: "marketReaction", label: "Market Reaction", placeholder: "Expected market changes", type: "text" },
];

export interface ScenarioTemplate {
  id: string;
  name: string;
  type: "policy" | "economic";
  description: string;
  icon: string;
}

export const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  {
    id: "carbon-tax",
    name: "Carbon Tax Implementation",
    type: "policy",
    description: "Analyze impact of new carbon taxation on industries",
    icon: "Leaf",
  },
  {
    id: "minimum-wage",
    name: "Minimum Wage Increase",
    type: "policy",
    description: "Calculate effects on employment and business costs",
    icon: "Users",
  },
  {
    id: "recession",
    name: "Economic Recession",
    type: "economic",
    description: "Model business impact during economic downturn",
    icon: "TrendingDown",
  },
  {
    id: "inflation-spike",
    name: "Inflation Spike",
    type: "economic",
    description: "Analyze effects of sudden inflation increase",
    icon: "DollarSign",
  },
];

export const CALCULATION_CONFIG = {
  simulatedDelayMs: 2500,
  algorithmConstants: {
    factor100: 100,
    monthsDivider: 12,
    impactMultiplier: 0.4,
  },
};

export const CALCULATION_MESSAGES = {
  calculating: "Calculating Policy/Economic Impact...",
  analyzing: "Analyzing scenarios...",
  optimizing: "Optimizing recommendations...",
  complete: "Impact calculation complete",
};
