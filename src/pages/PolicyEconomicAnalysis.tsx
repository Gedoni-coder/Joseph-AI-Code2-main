import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ConnectionStatus } from "../components/ui/connection-status";
import { PolicyEconomicManagement } from "../components/policy/policy-economic-management";
import { PolicyWatchtower } from "../components/policy/policy-watchtower";
import { PolicySimplifier } from "../components/policy/policy-simplifier";
import { EconomicPulseboard } from "../components/policy/economic-pulseboard";
import { ScenarioSimulation } from "../components/policy/scenario-simulation";
import { FiscalPolicyAnalyzer } from "../components/policy/fiscal-policy-analyzer";
import {
  Loader2,
  Settings,
  Radio,
  BookOpen,
  Activity,
  Zap,
  DollarSign,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";

export default function PolicyEconomicAnalysis() {
  const [activeTab, setActiveTab] = useState("management");

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policy & Economic Impact Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive policy monitoring, regulatory compliance, economic forecasting, and strategic decision-making engine
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ConnectionStatus isConnected={isConnected} lastUpdated={lastUpdated} />
          <Link to="/economic-indicators">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Economic Dashboard
            </Button>
          </Link>
          <Link to="/business-forecast">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Business Forecast
            </Button>
          </Link>
          <Link to="/tax-compliance">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Tax & Compliance
            </Button>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading policy and economic data...</span>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 overflow-x-auto">
          <TabsTrigger value="external-policy" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">External</span>
          </TabsTrigger>
          <TabsTrigger value="internal-policy" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Internal</span>
          </TabsTrigger>
          <TabsTrigger value="policy-reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="economic-impact" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Impact</span>
          </TabsTrigger>
          <TabsTrigger value="internal-impact" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Int. Impact</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Strategy</span>
          </TabsTrigger>
          <TabsTrigger value="watchtower" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Watchtower</span>
          </TabsTrigger>
          <TabsTrigger value="simplifier" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Simplifier</span>
          </TabsTrigger>
          <TabsTrigger value="pulseboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Pulseboard</span>
          </TabsTrigger>
          <TabsTrigger value="scenario" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Scenario</span>
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Fiscal</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="external-policy" className="space-y-4">
          <ExternalPolicyAnalysis
            externalPolicies={externalPolicies}
            onAddPolicy={addExternalPolicy}
            onUpdatePolicy={updateExternalPolicy}
          />
        </TabsContent>

        <TabsContent value="internal-policy" className="space-y-4">
          <InternalPolicyAnalysis
            internalPolicies={internalPolicies}
            onAddPolicy={addInternalPolicy}
            onUpdatePolicy={updateInternalPolicy}
          />
        </TabsContent>

        <TabsContent value="policy-reports" className="space-y-4">
          <PolicyReports
            policyReports={policyReports}
            onGenerateReport={generatePolicyReport}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="economic-impact" className="space-y-4">
          <EconomicImpactAnalysis
            economicIndicators={economicIndicators}
            onRefreshData={refreshData}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="internal-impact" className="space-y-4">
          <InternalImpactAnalysis
            internalImpacts={internalImpacts}
            onAddImpact={addInternalImpact}
            onUpdateStatus={updateImpactStatus}
          />
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <StrategyRecommendations
            strategyRecommendations={strategyRecommendations}
            onAddRecommendation={addStrategyRecommendation}
            onUpdateStatus={updateStrategyStatus}
          />
        </TabsContent>

        <TabsContent value="watchtower" className="space-y-4">
          <PolicyWatchtower />
        </TabsContent>

        <TabsContent value="simplifier" className="space-y-4">
          <PolicySimplifier />
        </TabsContent>

        <TabsContent value="pulseboard" className="space-y-4">
          <EconomicPulseboard />
        </TabsContent>

        <TabsContent value="scenario" className="space-y-4">
          <ScenarioSimulation />
        </TabsContent>

        <TabsContent value="fiscal" className="space-y-4">
          <FiscalPolicyAnalyzer />
        </TabsContent>
      </Tabs>

      {/* Action Center */}
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/policy-alerts">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Policy Alerts
            </Button>
          </Link>
          <Link to="/impact-calculator">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Impact Calculator
            </Button>
          </Link>
          <Link to="/strategy-builder">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Strategy Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Policy & Economic Analysis Platform</span>
              <span>•</span>
              <span>Data updated continuously</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Analysis: Policy Impact, Economic Modeling, Strategic Planning</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
