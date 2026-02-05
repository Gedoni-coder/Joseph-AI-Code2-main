import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingOverlay } from "@/components/ui/loading-spinner";
import ModuleHeader from "@/components/ui/module-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCompanyInfo } from "@/lib/company-context";
import { getCompanyName } from "@/lib/get-company-name";
import { useBusinessForecastingData } from "@/hooks/useBusinessForecastingData";
import { CustomerProfileComponent } from "@/components/business/customer-profile";
import { RevenueProjections } from "@/components/business/revenue-projections";
import { KPIDashboard } from "@/components/business/kpi-dashboard";
import { ScenarioPlanningComponent } from "@/components/business/scenario-planning";
import { BusinessMetricsTable } from "@/components/business/business-metrics-table";
import { FinancialLayout } from "@/components/business/financial-layout";
import { DocumentsSection } from "@/components/business/documents-section";
import { SummaryRecommendationSection } from "@/components/module/summary-recommendation-section";
import {
  costStructure as mockCosts,
  cashFlowForecast as mockCashFlow,
} from "@/lib/business-forecast-data";
import {
  BUSINESS_FORECAST_DEFAULTS,
  getSummaryContent,
  SUMMARY_DESCRIPTION,
  getRecommendationContent,
  RECOMMENDATION_DESCRIPTION,
  DEFAULT_ACTION_ITEMS,
  DEFAULT_NEXT_STEPS,
  GROWTH_TRAJECTORY,
  getSummaryMetrics,
} from "@/lib/business-forecast-content";
import {
  KEY_ASSUMPTIONS,
  KEY_RISKS,
  COMPETITIVE_METRICS,
} from "@/mocks/business-forecast";
import {
  Building2,
  RefreshCw,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  PieChart,
  BarChart3,
  AlertTriangle,
  Activity,
  Briefcase,
  Wifi,
  Bell,
  X,
  Lightbulb,
} from "lucide-react";

const BusinessForecast = () => {
  const { companyInfo } = useCompanyInfo();
  const companyName = getCompanyName(companyInfo?.companyName);

  const {
    customerProfiles,
    revenueProjections,
    kpis,
    scenarios,
    lastUpdated,
    isLoading,
    error,
    isConnected,
    refreshData,
    updateKPI,
    updateScenario,
    reconnect,
  } = useBusinessForecastingData();

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <ModuleHeader
          icon={<TrendingUp className="h-6 w-6" />}
          title="Business Forecasting"
          description={`Advanced predictive analytics for ${companyName} revenue projections, growth forecasts, and comprehensive business planning`}
          isConnected={isConnected}
          lastUpdated={lastUpdated}
          onReconnect={reconnect}
          error={error}
          connectionLabel="Live"
        />

        <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-economic-positive/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-economic-positive" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Annual Revenue Target
                    </div>
                    <div className="text-lg font-bold">
                      {BUSINESS_FORECAST_DEFAULTS.ANNUAL_REVENUE_TARGET}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Customer Segments
                    </div>
                    <div className="text-lg font-bold">
                      {customerProfiles.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-economic-warning/10 rounded-lg">
                    <Target className="h-5 w-5 text-economic-warning" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      KPIs Tracked
                    </div>
                    <div className="text-lg font-bold">{kpis.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-economic-neutral/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-economic-neutral" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Scenarios Modeled
                    </div>
                    <div className="text-lg font-bold">{scenarios.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-8 gap-2 w-full rounded-md bg-muted p-1 text-muted-foreground">
              <TabsList className="contents">
                <TabsTrigger
                  value="overview"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="summary-recommendation"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Summary & Rec
                </TabsTrigger>
                <TabsTrigger
                  value="tables"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Tables
                </TabsTrigger>
                <TabsTrigger
                  value="revenue"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Revenue
                </TabsTrigger>
                <TabsTrigger
                  value="costs"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Costs
                </TabsTrigger>
                <TabsTrigger
                  value="planning"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Planning
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Documents
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              {/* Revenue Forecast vs Target Summary */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Revenue Forecast vs Target
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Annual Target
                          </h4>
                          <div className="text-3xl font-bold text-economic-positive">
                            {BUSINESS_FORECAST_DEFAULTS.ANNUAL_REVENUE_TARGET}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Total yearly revenue goal
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Projected Revenue
                          </h4>
                          <div className="text-3xl font-bold">
                            $
                            {(
                              revenueProjections.reduce(
                                (sum, p) => sum + (p.value || 0),
                                0
                              ) / 1000000
                            ).toFixed(1)}
                            M
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Based on current forecasts
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Achievement %
                          </h4>
                          <div className="text-3xl font-bold">
                            {(
                              ((revenueProjections.reduce(
                                (sum, p) => sum + (p.value || 0),
                                0
                              ) /
                                parseFloat(
                                  BUSINESS_FORECAST_DEFAULTS.ANNUAL_REVENUE_TARGET.replace(
                                    /[^0-9.]/g,
                                    ""
                                  )
                                )) *
                                100 ||
                              0)
                            ).toFixed(0)}
                            %
                          </div>
                          <p className="text-xs text-muted-foreground">
                            On track to goal
                          </p>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Monthly/Quarterly/Annual Revenue */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Calculating revenue projections..."
                >
                  <RevenueProjections projections={revenueProjections} />
                </LoadingOverlay>
              </section>

              {/* Cash Flow Forecast */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Updating cash flow..."
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Cash Flow Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                          {mockCashFlow.slice(0, 6).map((flow) => (
                            <Card key={flow.id} className="p-3">
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">
                                  {flow.month}
                                </h4>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Inflow
                                    </span>
                                    <span className="text-economic-positive">
                                      ${(flow.cashInflow / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Outflow
                                    </span>
                                    <span className="text-economic-negative">
                                      ${(flow.cashOutflow / 1000000).toFixed(1)}
                                      M
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm border-t pt-1">
                                    <span className="font-medium">Net</span>
                                    <span
                                      className={
                                        flow.netCashFlow > 0
                                          ? "text-economic-positive"
                                          : "text-economic-negative"
                                      }
                                    >
                                      ${(flow.netCashFlow / 1000000).toFixed(1)}
                                      M
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </LoadingOverlay>
              </section>

              {/* Profit/Loss Projection */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Profit/Loss Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Gross Profit Margin
                          </h4>
                          <div className="text-3xl font-bold text-economic-positive">
                            {(
                              revenueProjections.reduce(
                                (sum, p) => sum + (p.value || 0),
                                0
                              ) * 0.62
                            ).toFixed(0)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            After COGS
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Operating Expense
                          </h4>
                          <div className="text-3xl font-bold text-economic-negative">
                            ${(
                              revenueProjections.reduce(
                                (sum, p) => sum + (p.value || 0),
                                0
                              ) * 0.25
                            ).toFixed(0)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Annual overhead
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Net Profit
                          </h4>
                          <div className="text-3xl font-bold text-economic-positive">
                            ${(
                              revenueProjections.reduce(
                                (sum, p) => sum + (p.value || 0),
                                0
                              ) * 0.37
                            ).toFixed(0)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Bottom line
                          </p>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Key Performance Indicators */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Refreshing KPIs..."
                >
                  <KPIDashboard
                    kpis={kpis.slice(0, 6)}
                    title="Key Performance Indicators"
                  />
                </LoadingOverlay>
              </section>

              {/* Alerts & Warnings */}
              <section>
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-orange-900">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Alerts & Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white rounded border border-orange-200">
                        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-orange-900">
                            Revenue Below Target
                          </h4>
                          <p className="text-xs text-orange-800 mt-1">
                            Current projection is slightly below annual target.
                            Review customer segment assumptions.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white rounded border border-orange-200">
                        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-orange-900">
                            Cash Flow Variability
                          </h4>
                          <p className="text-xs text-orange-800 mt-1">
                            Q2 and Q3 show significant fluctuations. Consider
                            adjusting payment terms.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-white rounded border border-orange-200">
                        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-orange-900">
                            Cost Increase Trend
                          </h4>
                          <p className="text-xs text-orange-800 mt-1">
                            Operating expenses trending upward. Monitor cost
                            structure closely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Customer Profiles */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Updating customer data..."
                >
                  <CustomerProfileComponent profiles={customerProfiles} />
                </LoadingOverlay>
              </section>
            </TabsContent>

            <TabsContent value="summary-recommendation" className="space-y-8">
              <SummaryRecommendationSection
                summaryTitle="Business Forecast Summary"
                summaryDescription={SUMMARY_DESCRIPTION}
                summaryText={getSummaryContent(
                  customerProfiles.length,
                  scenarios.length,
                  kpis.length,
                )}
                summaryMetrics={getSummaryMetrics(
                  customerProfiles.length,
                  kpis.length,
                  scenarios.length,
                )}
                recommendationTitle="Business Forecast Recommendations"
                recommendationDescription={RECOMMENDATION_DESCRIPTION}
                recommendationText={getRecommendationContent()}
                actionItems={DEFAULT_ACTION_ITEMS}
                nextSteps={DEFAULT_NEXT_STEPS}
              />
            </TabsContent>

            <TabsContent value="tables" className="space-y-8">
              {/* Business Metrics Table */}
              <section>
                <BusinessMetricsTable />
              </section>

              {/* Financial Layout Metrics */}
              <section>
                <FinancialLayout />
              </section>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-8">
              {/* Monthly/Quarterly/Yearly Views - Revenue Projections */}
              <section>
                <RevenueProjections projections={revenueProjections} />
              </section>

              {/* Forecast by Product/Service */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Forecast by Product/Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Core Platform</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">2025 Projection</span>
                              <span className="font-bold">$5.2M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Growth Rate</span>
                              <span className="font-bold text-economic-positive">+18%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Market Share</span>
                              <span className="font-bold">42%</span>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Premium Tier</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">2025 Projection</span>
                              <span className="font-bold">$3.1M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Growth Rate</span>
                              <span className="font-bold text-economic-positive">+28%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Market Share</span>
                              <span className="font-bold">25%</span>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Professional Services</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">2025 Projection</span>
                              <span className="font-bold">$2.8M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Growth Rate</span>
                              <span className="font-bold text-economic-positive">+22%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Market Share</span>
                              <span className="font-bold">23%</span>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Support & Maintenance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">2025 Projection</span>
                              <span className="font-bold">$2.6M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Growth Rate</span>
                              <span className="font-bold text-economic-positive">+15%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Market Share</span>
                              <span className="font-bold">10%</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Forecast by Region/Market/Customer Segment */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Forecast by Region, Market & Customer Segment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-3">By Geographic Region</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="p-4">
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">North America</h5>
                              <div className="text-2xl font-bold">$6.5M</div>
                              <p className="text-xs text-muted-foreground">52% of revenue</p>
                              <div className="flex justify-between text-xs mt-2">
                                <span>Growth:</span>
                                <span className="text-economic-positive font-bold">+14%</span>
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Europe</h5>
                              <div className="text-2xl font-bold">$3.8M</div>
                              <p className="text-xs text-muted-foreground">30% of revenue</p>
                              <div className="flex justify-between text-xs mt-2">
                                <span>Growth:</span>
                                <span className="text-economic-positive font-bold">+22%</span>
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Asia-Pacific</h5>
                              <div className="text-2xl font-bold">$2.4M</div>
                              <p className="text-xs text-muted-foreground">18% of revenue</p>
                              <div className="flex justify-between text-xs mt-2">
                                <span>Growth:</span>
                                <span className="text-economic-positive font-bold">+38%</span>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-3">By Customer Segment</h4>
                        <div className="space-y-2">
                          {customerProfiles.map((profile) => (
                            <div
                              key={profile.id}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-sm">{profile.segment}</p>
                                <p className="text-xs text-muted-foreground">
                                  Growth Rate: {profile.growthRate}%
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-sm">
                                  ${(
                                    (profile.demandAssumption *
                                      profile.avgOrderValue) /
                                    1000000
                                  ).toFixed(1)}
                                  M
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Retention: {profile.retention}%
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Historical Revenue Comparison */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Historical Revenue Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4 bg-muted/30">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">2024 Performance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Total Revenue</span>
                              <span className="font-bold">$11.2M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">YoY Growth</span>
                              <span className="font-bold text-economic-positive">+16%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Q4 Actual</span>
                              <span className="font-bold">$3.1M</span>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-blue-50">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">2025 Projection</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Total Revenue</span>
                              <span className="font-bold">$13.7M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Projected Growth</span>
                              <span className="font-bold text-economic-positive">+22%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Confidence Level</span>
                              <span className="font-bold">80%</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Trend Analysis & Forecasting Methods */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trend Analysis & Forecasting Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Linear Regression</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Baseline trend assuming steady growth
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>2025 Projection</span>
                              <span className="font-bold">$13.2M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>R² Score</span>
                              <span className="font-bold">0.92</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Moving Average (12-Month)</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Smoothed trend accounting for seasonality
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>2025 Projection</span>
                              <span className="font-bold">$13.5M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Trend Direction</span>
                              <span className="font-bold text-economic-positive">↗ Up</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Exponential Smoothing</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Recent data weighted more heavily
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>2025 Projection</span>
                              <span className="font-bold">$13.9M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>α Parameter</span>
                              <span className="font-bold">0.15</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">AI-Based Prediction</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Machine learning model incorporating market factors
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>2025 Projection</span>
                              <span className="font-bold">$14.1M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Model Accuracy</span>
                              <span className="font-bold">87%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Scenario-Based Forecasting */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Scenario-Based Forecasting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {scenarios.map((scenario) => (
                        <Card key={scenario.id} className="p-4 border-2">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-sm">
                                {scenario.scenario}
                              </h4>
                              <Badge variant={
                                scenario.scenario === "Best Case" ? "default" :
                                scenario.scenario === "Base Case" ? "secondary" :
                                "destructive"
                              }>
                                {scenario.probability}%
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="border-t pt-2">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Annual Revenue
                                </p>
                                <p className="text-2xl font-bold">
                                  ${(scenario.revenue / 1000000).toFixed(1)}M
                                </p>
                              </div>

                              <div className="border-t pt-2">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Operating Costs
                                </p>
                                <p className="font-bold">
                                  ${(scenario.costs / 1000000).toFixed(1)}M
                                </p>
                              </div>

                              <div className="border-t pt-2">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Net Profit
                                </p>
                                <p className="text-lg font-bold text-economic-positive">
                                  ${(scenario.profit / 1000000).toFixed(1)}M
                                </p>
                              </div>

                              <div className="border-t pt-2">
                                <p className="text-xs font-semibold mb-1">
                                  Key Assumptions
                                </p>
                                <ul className="text-xs space-y-1">
                                  {scenario.keyAssumptions.map((assumption, idx) => (
                                    <li key={idx} className="text-muted-foreground">
                                      • {assumption}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Card className="p-4 border-2 border-destructive/30">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">Worst Case</h4>
                            <Badge variant="outline" className="border-destructive text-destructive">
                              25%
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="border-t pt-2">
                              <p className="text-xs text-muted-foreground mb-1">
                                Annual Revenue
                              </p>
                              <p className="text-2xl font-bold">$11.8M</p>
                            </div>

                            <div className="border-t pt-2">
                              <p className="text-xs text-muted-foreground mb-1">
                                Operating Costs
                              </p>
                              <p className="font-bold">$9.8M</p>
                            </div>

                            <div className="border-t pt-2">
                              <p className="text-xs text-muted-foreground mb-1">
                                Net Profit
                              </p>
                              <p className="text-lg font-bold text-economic-negative">
                                $2.0M
                              </p>
                            </div>

                            <div className="border-t pt-2">
                              <p className="text-xs font-semibold mb-1">
                                Key Assumptions
                              </p>
                              <ul className="text-xs space-y-1">
                                <li className="text-muted-foreground">
                                  • Market slowdown
                                </li>
                                <li className="text-muted-foreground">
                                  • Increased competition
                                </li>
                                <li className="text-muted-foreground">
                                  • Customer churn
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Customer Demand Analysis */}
              <section>
                <CustomerProfileComponent profiles={customerProfiles} />
              </section>
            </TabsContent>

            <TabsContent value="costs" className="space-y-8">
              {/* Cost Structure */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Analyzing cost structure..."
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Cost of Goods Sold (COGS) & Operating Expenses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockCosts.map((cost) => (
                          <Card key={cost.id} className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">
                                  {cost.category}
                                </h4>
                                <Badge
                                  variant={
                                    cost.type === "COGS"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {cost.type}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Amount
                                  </span>
                                  <span className="font-semibold">
                                    ${(cost.amount / 1000).toFixed(0)}K
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    % of Total
                                  </span>
                                  <span className="font-medium">
                                    {cost.percentage}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Type
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {cost.variability}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </LoadingOverlay>
              </section>

              {/* Cash Flow Forecast */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Updating cash flow..."
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Cash Flow Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                          {mockCashFlow.map((flow) => (
                            <Card key={flow.id} className="p-3">
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">
                                  {flow.month}
                                </h4>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Inflow
                                    </span>
                                    <span className="text-economic-positive">
                                      ${(flow.cashInflow / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">
                                      Outflow
                                    </span>
                                    <span className="text-economic-negative">
                                      ${(flow.cashOutflow / 1000000).toFixed(1)}
                                      M
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm border-t pt-1">
                                    <span className="font-medium">Net</span>
                                    <span
                                      className={
                                        flow.netCashFlow > 0
                                          ? "text-economic-positive"
                                          : "text-economic-negative"
                                      }
                                    >
                                      ${(flow.netCashFlow / 1000000).toFixed(1)}
                                      M
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </LoadingOverlay>
              </section>
            </TabsContent>

            <TabsContent value="planning" className="space-y-8">
              {/* Scenario Planning */}
              <section>
                <LoadingOverlay
                  isLoading={isLoading}
                  loadingText="Updating scenarios..."
                >
                  <ScenarioPlanningComponent scenarios={scenarios} />
                </LoadingOverlay>
              </section>

              {/* Risk & Assumption Analysis */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Risk & Assumption Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Key Risks</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">Market Competition</span>
                            <Badge variant="destructive" className="text-xs">
                              High
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">
                              Supply Chain Disruption
                            </span>
                            <Badge className="text-xs bg-economic-warning text-economic-warning-foreground">
                              Medium
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">Regulatory Changes</span>
                            <Badge variant="secondary" className="text-xs">
                              Low
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">
                          Key Assumptions
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {KEY_ASSUMPTIONS.map((assumption, idx) => (
                            <p key={idx}>• {assumption.label}: {assumption.value}</p>
                          ))}
                          <div className="mt-3">
                            <Link to="/risk-management">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 text-orange-700"
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Risk Management
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              {/* Performance Metrics & KPIs */}
              <section>
                <KPIDashboard kpis={kpis} />
              </section>

              {/* Competitive & Market Context */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Competitive & Market Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {COMPETITIVE_METRICS.map((metric, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">
                                {metric.label}
                              </h4>
                              <div className="text-2xl font-bold">
                                {metric.currentValue}{metric.unit}
                              </div>
                              {metric.targetValue && (
                                <div className="text-xs text-muted-foreground">
                                  Target: {metric.targetValue}{metric.unit}
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Link to="/market-competitive-analysis">
                          <Button
                            variant="outline"
                            className="border-blue-200 text-blue-700"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Detailed Market Analysis
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="documents" className="space-y-8">
              <section>
                <DocumentsSection />
              </section>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-12 sm:mt-16">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span>© 2024 Business Forecast Platform</span>
                <span className="hidden sm:inline">•</span>
                <span>Data updated every hour</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span>
                  Models: Monte Carlo, Linear Regression, Scenario Analysis
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default BusinessForecast;
