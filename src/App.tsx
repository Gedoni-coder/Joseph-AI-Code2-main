import React, { useState, createContext, useContext } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ChatbotContainer } from "./components/chatbot/chatbot-container";
import "./lib/demo-explainable-elements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Radio, Moon, Sun } from "lucide-react";
import { Switch } from "./components/ui/switch";
import { ThemeProvider, useTheme } from "./lib/theme-context";
import Landing from "./pages/Landing";
import PrimaryLanding from "./pages/PrimaryLanding";
import Index from "./pages/Index";
import BusinessForecast from "./pages/BusinessForecast";
import TaxCompliance from "./pages/TaxCompliance";
import PricingStrategy from "./pages/PricingStrategy";
import RevenueStrategy from "./pages/RevenueStrategy";
import MarketCompetitiveAnalysis from "./pages/MarketCompetitiveAnalysis";
import MarketReportView from "./pages/MarketReportView";
import SwotWhitePaper from "./pages/SwotWhitePaper";
import CompetitorWhitePaper from "./pages/CompetitorWhitePaper";
import LoanFunding from "./pages/LoanFunding";
import InventorySupplyChain from "./pages/InventorySupplyChain";
import FinancialAdvisory from "./pages/FinancialAdvisory";
import PolicyEconomicAnalysis from "./pages/PolicyEconomicAnalysis";
import BusinessFeasibility from "./pages/BusinessFeasibility";
import BusinessFeasibilityIdea from "./pages/BusinessFeasibilityIdea";
import BusinessPlanning from "./pages/BusinessPlanning";
import BusinessPlanningFlow from "./pages/BusinessPlanningFlow";
import BusinessPlansList from "./pages/BusinessPlansList";
import ImpactCalculator from "./pages/ImpactCalculator";
import AiInsights from "./pages/AiInsights";
import DocumentManager from "./pages/DocumentManager";
import GrowthPlanning from "./pages/GrowthPlanning";
import AllReports from "./pages/AllReports";
import Notifications from "./pages/Notifications";
import PolicyAlerts from "./pages/PolicyAlerts";
import StrategyBuilder from "./pages/StrategyBuilder";
import RiskManagement from "./pages/RiskManagement";
import ComplianceReports from "./pages/ComplianceReports";
import AuditReports from "./pages/AuditReports";
import AuditTrail from "./pages/AuditTrail";
import DocumentUpload from "./pages/DocumentUpload";
import NotFound from "./pages/NotFound";
import Infrastructure from "./pages/Infrastructure";
import Networks from "./pages/infrastructure/Networks";
import Opportunities from "./pages/infrastructure/Opportunities";
import ValueExchangeChannels from "./pages/infrastructure/ValueExchangeChannels";
import KnowledgeFlows from "./pages/infrastructure/KnowledgeFlows";
import GovernanceTrustMechanisms from "./pages/infrastructure/GovernanceTrustMechanisms";
import SocialCapitalInclusion from "./pages/infrastructure/SocialCapitalInclusion";
import CultureOfCollaboration from "./pages/infrastructure/CultureOfCollaboration";
import PolicyIntegrationLayer from "./pages/infrastructure/PolicyIntegrationLayer";
import DataEconomyLayer from "./pages/infrastructure/DataEconomyLayer";
import InfrastructureMappingEngine from "./pages/infrastructure/InfrastructureMappingEngine";
import AnalyticsMetricsEngine from "./pages/infrastructure/AnalyticsMetricsEngine";
import MarketAccessLayer from "./pages/infrastructure/MarketAccessLayer";
import FundingLayer from "./pages/infrastructure/FundingLayer";
import BusinessIntelligenceLayer from "./pages/infrastructure/BusinessIntelligenceLayer";
import SupportSystems from "./pages/infrastructure/SupportSystems";
import OpportunitiesMarketplace from "./pages/infrastructure/OpportunitiesMarketplace";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import CompanySettings from "./pages/CompanySettings";
import Learn from "./pages/learn/Learn";
import { CompanyInfoProvider } from "./lib/company-context";
import LearnDiscover from "./pages/learn/LearnDiscover";
import LearnCourses from "./pages/learn/LearnCourses";
import LearnCourseGenerate from "./pages/learn/LearnCourseGenerate";
import LearnCourseView from "./pages/learn/LearnCourseView";
import LearnQuizzes from "./pages/learn/LearnQuizzes";
import LearnRecords from "./pages/learn/LearnRecords";
import SalesIntelligence from "./pages/SalesIntelligence";
import ChatbotTest from "./pages/ChatbotTest";
import { useCompanyInfo } from "./lib/company-context";

const queryClient = new QueryClient();

interface ConversationalModeContextType {
  conversationalMode: boolean;
  onConversationalModeChange: (enabled: boolean) => void;
}

const ConversationalModeContext = createContext<
  ConversationalModeContextType | undefined
>(undefined);

export const useConversationalMode = () => {
  const context = useContext(ConversationalModeContext);
  if (!context) {
    throw new Error(
      "useConversationalMode must be used within ConversationalModeProvider",
    );
  }
  return context;
};

const infraModules = [
  { slug: "networks", name: "Networks" },
  { slug: "jobs", name: "Jobs" },
  { slug: "opportunities", name: "Opportunities" },
  { slug: "services", name: "Services" },
  { slug: "support-systems", name: "Support Systems" },
  { slug: "value-exchange-channels", name: "Value Exchange Channels" },
  { slug: "knowledge-flows", name: "Knowledge Flows" },
  {
    slug: "governance-trust-mechanisms",
    name: "Governance & Trust Mechanisms",
  },
  { slug: "social-capital-inclusion", name: "Social Capital & Inclusion" },
  { slug: "culture-of-collaboration", name: "Culture of Collaboration" },
  { slug: "business-intelligence-layer", name: "Business Intelligence Layer" },
  { slug: "policy-integration-layer", name: "Policy Integration Layer" },
  { slug: "data-economy-layer", name: "Data Economy Layer" },
  { slug: "funding-layer", name: "Funding Layer" },
  { slug: "market-access-layer", name: "Market Access Layer" },
  {
    slug: "infrastructure-mapping-engine",
    name: "Infrastructure Mapping Engine",
  },
  { slug: "education-training-layer", name: "Education & Training Layer" },
  { slug: "analytics-metrics-engine", name: "Analytics & Metrics Engine" },
  {
    slug: "community-governance-council",
    name: "Community Governance Council",
  },
];

const infraRouteComp = {
  networks: Networks,
  opportunities: Opportunities,
  "value-exchange-channels": ValueExchangeChannels,
  "knowledge-flows": KnowledgeFlows,
  "governance-trust-mechanisms": GovernanceTrustMechanisms,
  "social-capital-inclusion": SocialCapitalInclusion,
  "culture-of-collaboration": CultureOfCollaboration,
  "policy-integration-layer": PolicyIntegrationLayer,
  "data-economy-layer": DataEconomyLayer,
  "infrastructure-mapping-engine": InfrastructureMappingEngine,
  "analytics-metrics-engine": AnalyticsMetricsEngine,
  "market-access-layer": MarketAccessLayer,
  "funding-layer": FundingLayer,
  "business-intelligence-layer": BusinessIntelligenceLayer,
  "support-systems": SupportSystems,
};

function InfraModulePage({ name }: { name: string }) {
  return (
    <div className="container mx-auto max-w-xl py-16">
      <div className="text-3xl font-bold mb-4">{name}</div>
      <p className="text-muted-foreground mb-2">
        This is a placeholder module page for <b>{name}</b>. More functionality
        and integration coming soon.{" "}
      </p>
    </div>
  );
}

interface TopDivisionNavProps {
  conversationalMode: boolean;
  onConversationalModeChange: (enabled: boolean) => void;
}

function TopDivisionNav({
  conversationalMode,
  onConversationalModeChange,
}: TopDivisionNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden md:flex w-full bg-card border-b shadow-sm px-4 py-3 sticky top-0 z-40 gap-2 items-center">
      <Link
        to="/home"
        className="font-bold tracking-tight text-lg px-3 py-1 rounded hover:bg-muted/30 transition-colors"
      >
        Solutions
      </Link>
      <Link
        to="/infrastructure"
        className="font-bold tracking-tight text-lg px-3 py-1 rounded hover:bg-muted/30 transition-colors"
      >
        Infrastructure
      </Link>
      <Link
        to="/learn"
        className="font-bold tracking-tight text-lg px-3 py-1 rounded hover:bg-muted/30 transition-colors"
      >
        Learn
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            Divisions
          </span>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-2 py-1 hover:bg-primary/10 rounded transition-all cursor-pointer"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-primary" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
          <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        <div className="h-6 w-px bg-border"></div>

        <div
          className="flex items-center gap-2 px-2 py-1 hover:bg-primary/10 rounded transition-all cursor-pointer"
          title={
            conversationalMode
              ? "Conversational Mode ON"
              : "Conversational Mode OFF"
          }
        >
          <Radio className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
            Chat
          </span>
          <Switch
            checked={conversationalMode}
            onCheckedChange={onConversationalModeChange}
            className="scale-75"
          />
        </div>
      </div>
    </nav>
  );
}

function ProtectedHomeRoute() {
  const { isSetup } = useCompanyInfo();

  if (!isSetup) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Landing />;
}

function AppContent() {
  const [conversationalMode, setConversationalMode] = React.useState(true);
  const location = useLocation();
  const isLandingPage =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  React.useEffect(() => {
    const saved = localStorage.getItem("conversationalMode");
    if (saved !== null) {
      setConversationalMode(saved === "true");
    }
  }, []);

  const handleConversationalModeChange = (enabled: boolean) => {
    setConversationalMode(enabled);
    localStorage.setItem("conversationalMode", String(enabled));
  };

  return (
    <ConversationalModeContext.Provider
      value={{
        conversationalMode,
        onConversationalModeChange: handleConversationalModeChange,
      }}
    >
      <>
        {!isLandingPage && (
          <TopDivisionNav
            conversationalMode={conversationalMode}
            onConversationalModeChange={handleConversationalModeChange}
          />
        )}
        {!isLandingPage && (
          <ChatbotContainer conversationalMode={conversationalMode} />
        )}
        <Routes>
          <Route path="/" element={<PrimaryLanding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/company-settings" element={<CompanySettings />} />
          <Route path="/chatbot-test" element={<ChatbotTest />} />
          <Route path="/home" element={<ProtectedHomeRoute />} />
          <Route path="/landing" element={<Landing />} />

          {/* Main 10 Module Routes - matching landing page links */}
          <Route path="/economic-indicators" element={<Index />} />
          <Route path="/business-forecast" element={<BusinessForecast />} />
          <Route
            path="/market-competitive-analysis"
            element={<MarketCompetitiveAnalysis />}
          />
          <Route
            path="/market-report/:reportId"
            element={<MarketReportView />}
          />
          <Route
            path="/market-competitive-analysis/swot"
            element={<SwotWhitePaper />}
          />
          <Route
            path="/market-competitive-analysis/profile/:id"
            element={<CompetitorWhitePaper />}
          />
          <Route path="/pricing-strategies" element={<PricingStrategy />} />
          <Route path="/revenue-forecasting" element={<RevenueStrategy />} />
          <Route path="/loan-research" element={<LoanFunding />} />
          <Route
            path="/supply-chain-analytics"
            element={<InventorySupplyChain />}
          />
          <Route path="/financial-advisory" element={<FinancialAdvisory />} />
          <Route path="/impact-calculator" element={<ImpactCalculator />} />
          <Route path="/tax-compliance" element={<TaxCompliance />} />
          <Route
            path="/business-feasibility"
            element={<BusinessFeasibility />}
          />
          <Route
            path="/business-feasibility/:id"
            element={<BusinessFeasibilityIdea />}
          />
          <Route path="/business-planning" element={<BusinessPlanning />} />
          <Route
            path="/business-planning-flow/:planId"
            element={<BusinessPlanningFlow />}
          />
          <Route path="/business-plans" element={<BusinessPlansList />} />
          <Route path="/sales-intelligence" element={<SalesIntelligence />} />

          {/* Additional Feature Routes */}
          <Route path="/ai-insights" element={<AiInsights />} />
          <Route path="/document-manager" element={<DocumentManager />} />
          <Route path="/growth-planning" element={<GrowthPlanning />} />
          <Route path="/all-reports" element={<AllReports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/policy-alerts" element={<PolicyAlerts />} />
          <Route path="/strategy-builder" element={<StrategyBuilder />} />
          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="/compliance-reports" element={<ComplianceReports />} />
          <Route path="/audit-reports" element={<AuditReports />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/document-upload" element={<DocumentUpload />} />

          {/* Legacy routes for backward compatibility */}
          <Route path="/pricing-strategy" element={<PricingStrategy />} />
          <Route path="/revenue-strategy" element={<RevenueStrategy />} />
          <Route path="/loan-funding" element={<LoanFunding />} />
          <Route
            path="/inventory-supply-chain"
            element={<InventorySupplyChain />}
          />
          <Route
            path="/InventorySupplyChain"
            element={<InventorySupplyChain />}
          />
          <Route
            path="/policy-economic-analysis"
            element={<PolicyEconomicAnalysis />}
          />

          {/* Infrastructure Division Routes */}
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route
            path="/infrastructure/opportunities/marketplace"
            element={<OpportunitiesMarketplace />}
          />

          {/* Learn Division Routes */}
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/discover" element={<LearnDiscover />} />
          <Route path="/learn/courses" element={<LearnCourses />} />
          <Route
            path="/learn/courses/generate"
            element={<LearnCourseGenerate />}
          />
          <Route
            path="/learn/courses/:courseId"
            element={<LearnCourseView />}
          />
          <Route path="/learn/quizzes" element={<LearnQuizzes />} />
          <Route path="/learn/records" element={<LearnRecords />} />
          {/* Individual infrastructure module routes */}
          {infraModules.map((mod) => (
            <Route
              key={mod.slug}
              path={`/infrastructure/${mod.slug}`}
              element={
                infraRouteComp[mod.slug] ? (
                  React.createElement(infraRouteComp[mod.slug])
                ) : (
                  <InfraModulePage name={mod.name} />
                )
              }
            />
          ))}

          {/* Catch-all route - MUST be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </ConversationalModeContext.Provider>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CompanyInfoProvider>
            <AppContent />
          </CompanyInfoProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
