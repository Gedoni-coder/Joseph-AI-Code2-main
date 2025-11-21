import React, { useState } from "react";
import { usePolicyEconomicData } from "../../hooks/usePolicyEconomicData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ExternalPolicyAnalysis } from "./external-policy-analysis";
import { InternalPolicyAnalysis } from "./internal-policy-analysis";
import { PolicyReports } from "./policy-reports";
import { EconomicImpactAnalysis } from "./economic-impact-analysis";
import { InternalImpactAnalysis } from "./internal-impact-analysis";
import { StrategyRecommendations } from "./strategy-recommendations";
import {
  Globe,
  Building,
  FileText,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";

export function PolicyEconomicManagement() {
  const {
    externalPolicies,
    internalPolicies,
    policyReports,
    economicIndicators,
    internalImpacts,
    strategyRecommendations,
    isLoading,
    addExternalPolicy,
    updateExternalPolicy,
    addInternalPolicy,
    updateInternalPolicy,
    generatePolicyReport,
    addInternalImpact,
    updateImpactStatus,
    addStrategyRecommendation,
    updateStrategyStatus,
  } = usePolicyEconomicData();

  const [activeTab, setActiveTab] = useState("external-policy");

  return (
    <div className="space-y-4">
      {/* Nested Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="external-policy" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">External Policy</span>
          </TabsTrigger>
          <TabsTrigger value="internal-policy" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Internal Policy</span>
          </TabsTrigger>
          <TabsTrigger value="policy-reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="economic-impact" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Economic Impact</span>
          </TabsTrigger>
          <TabsTrigger value="internal-impact" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Internal Impact</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Strategy</span>
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
            onRefreshData={() => {}}
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
      </Tabs>
    </div>
  );
}
