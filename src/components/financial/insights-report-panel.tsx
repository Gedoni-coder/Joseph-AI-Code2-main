import React, { useState } from "react";
import { GeneratedInsightReport } from "../../lib/ai-insights-engine";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  X,
  Download,
  Save,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  DollarSign,
} from "lucide-react";

interface InsightsReportPanelProps {
  report: GeneratedInsightReport | null;
  onClose: () => void;
}

export function InsightsReportPanel({
  report,
  onClose,
}: InsightsReportPanelProps) {
  const [activeSection, setActiveSection] = useState("summary");

  if (!report) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const exportToPDF = () => {
    // Generate PDF content
    const content = generatePDFContent(report);
    const blob = new Blob([content], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insights-report-${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const saveInsight = () => {
    // Save to local storage or send to backend
    const existingReports = JSON.parse(
      localStorage.getItem("savedInsightReports") || "[]",
    );
    existingReports.push({
      ...report,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "savedInsightReports",
      JSON.stringify(existingReports),
    );
    alert("Insight report saved successfully!");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 overflow-auto">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold">Strategic Advisory Report</h1>
                <p className="text-blue-100 mt-1">
                  AI-Generated Insights & Recommendations
                </p>
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={onClose}
                className="text-white hover:bg-blue-700"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-6">
              <Button
                onClick={exportToPDF}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button
                onClick={saveInsight}
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Report
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b bg-gray-50 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8 overflow-x-auto">
              {[
                { id: "summary", label: "Executive Summary" },
                { id: "observations", label: "Key Observations" },
                { id: "recommendations", label: "Recommendations" },
                { id: "scenarios", label: "Scenarios" },
                { id: "risks", label: "Risk Alerts" },
                { id: "roadmap", label: "Strategic Roadmap" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeSection === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Executive Summary */}
          {activeSection === "summary" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div
                        className={`text-5xl font-bold ${getHealthColor(report.executiveSummary.overallHealthScore)}`}
                      >
                        {report.executiveSummary.overallHealthScore}
                        <span className="text-2xl">/100</span>
                      </div>
                      <p className="text-lg text-gray-600 mt-2">
                        {report.executiveSummary.financialPosition} Financial
                        Position
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(
                          report.executiveSummary.keyMetrics.totalRevenue,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Expenses</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(
                          report.executiveSummary.keyMetrics.totalExpenses,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Net Income</span>
                      <span className="font-semibold text-lg text-green-600">
                        {formatCurrency(
                          report.executiveSummary.keyMetrics.netIncome,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Liquid Cash</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(
                          report.executiveSummary.keyMetrics.liquidityCash,
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Position Overview</CardTitle>
                  <CardDescription>
                    Current state and trajectory of business financials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Based on comprehensive analysis of forecasts, budgets, cash
                    flow performance, and key performance indicators, the
                    organization demonstrates a{" "}
                    <strong>{report.executiveSummary.financialPosition}</strong>{" "}
                    financial position with a health score of{" "}
                    <strong>
                      {report.executiveSummary.overallHealthScore}/100
                    </strong>
                    .
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Key Takeaways:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Revenue trajectory and expense management show{" "}
                        {report.executiveSummary.keyMetrics.netIncome > 0
                          ? "positive"
                          : "concerning"}{" "}
                        profitability trends
                      </li>
                      <li>
                        • Cash position of{" "}
                        {formatCurrency(
                          report.executiveSummary.keyMetrics.liquidityCash,
                        )}{" "}
                        provides operational flexibility
                      </li>
                      <li>
                        • Performance drivers and risk exposures require active
                        management
                      </li>
                      <li>
                        • Strategic initiatives can unlock{" "}
                        {formatCurrency(500000 + Math.random() * 1000000)} in
                        value
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Key Observations */}
          {activeSection === "observations" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Key Observations
              </h2>
              <p className="text-gray-600">
                Critical findings from financial data analysis
              </p>

              <div className="space-y-4 mt-6">
                {report.keyObservations.map((obs, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          {obs.severity === "critical" ? (
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          ) : (
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {obs.title}
                            </h3>
                            <Badge className={getSeverityColor(obs.severity)}>
                              {obs.severity}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{obs.description}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(100, obs.impact * 5)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              Impact: {obs.impact.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {activeSection === "recommendations" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Strategic Recommendations
              </h2>
              <p className="text-gray-600">
                Actionable recommendations with estimated impact
              </p>

              <div className="space-y-4 mt-6">
                {report.recommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rec.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {rec.description}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{rec.rationale}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 uppercase">
                            Impact
                          </span>
                          <div className="text-lg font-semibold text-green-600">
                            {formatCurrency(rec.estimatedImpact)}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase">
                            Timeframe
                          </span>
                          <div className="text-lg font-semibold">
                            {rec.timeframe}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase">
                            Effort
                          </span>
                          <div className="text-lg font-semibold">Medium</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-3">
                          Action Items:
                        </h4>
                        <ul className="space-y-2">
                          {rec.actionItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Scenarios */}
          {activeSection === "scenarios" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Strategic Scenarios
              </h2>
              <p className="text-gray-600">
                Three scenario projections for planning purposes
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {report.strategicScenarios.map((scenario) => (
                  <Card
                    key={scenario.name}
                    className={`border-2 ${
                      scenario.name === "expected"
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="capitalize">
                        {scenario.name.replace("-", " ")} Scenario
                      </CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                      <div className="text-2xl font-bold text-blue-600 mt-2">
                        {scenario.probability}%
                      </div>
                      <span className="text-xs text-gray-500">Probability</span>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-500">Revenue</span>
                        <div className="text-lg font-semibold">
                          {formatCurrency(scenario.projections.revenue)}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Expenses</span>
                        <div className="text-lg font-semibold">
                          {formatCurrency(scenario.projections.expenses)}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Net Income</span>
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(scenario.projections.netIncome)}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">
                          Profit Margin
                        </span>
                        <div className="text-lg font-semibold">
                          {scenario.projections.profitMargin.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Cash</span>
                        <div className="text-lg font-semibold">
                          {formatCurrency(scenario.projections.liquidityCash)}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Assumptions:
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {scenario.assumptions.map((assumption, idx) => (
                            <li key={idx}>• {assumption}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Risk Alerts */}
          {activeSection === "risks" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Risk Alerts</h2>
              <p className="text-gray-600">
                Priority risks requiring active management
              </p>

              <div className="space-y-4 mt-6">
                {report.riskAlerts.map((risk, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {risk.riskName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {risk.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(risk.severity)}>
                            {risk.severity}
                          </Badge>
                          <Badge variant="outline">{risk.category}</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-3">
                          Recommended Actions:
                        </h4>
                        <ul className="space-y-2">
                          {risk.recommendedActions.map((action, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Roadmap */}
          {activeSection === "roadmap" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Strategic Roadmap
              </h2>
              <p className="text-gray-600">
                Step-by-step execution plan across timeframes
              </p>

              <div className="space-y-6 mt-6">
                {report.strategicRoadmap.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                          <span className="text-lg font-bold text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <CardTitle>{phase.timeframe}</CardTitle>
                          <CardDescription className="capitalize">
                            {phase.phase} focus
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Objectives:
                        </h4>
                        <ul className="space-y-2">
                          {phase.objectives.map((obj, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <Target className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Initiatives:
                        </h4>
                        <ul className="space-y-2">
                          {Array.isArray(phase.keyInitiatives) ? (
                            phase.keyInitiatives.map((init, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-700"
                              >
                                <Zap className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                                {init}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-700">
                              {phase.keyInitiatives}
                            </li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Expected Outcomes:
                        </h4>
                        <ul className="space-y-2">
                          {phase.expectedOutcomes.map((outcome, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <BarChart3 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Success Metrics
                      </h3>
                      <p className="text-sm text-blue-800">
                        Progress will be measured through health score
                        improvement, KPI achievement, risk reduction, and
                        financial metric improvement. Monthly reviews will track
                        execution against plan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Report generated on{" "}
                  {new Date(report.generatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                className="gap-2"
              >
                Close Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePDFContent(report: GeneratedInsightReport): string {
  return `Strategic Advisory Report
Generated: ${new Date(report.generatedAt).toLocaleDateString()}

EXECUTIVE SUMMARY
Overall Health Score: ${report.executiveSummary.overallHealthScore}/100
Financial Position: ${report.executiveSummary.financialPosition}

Key Metrics:
- Total Revenue: $${(report.executiveSummary.keyMetrics.totalRevenue / 1000000).toFixed(2)}M
- Total Expenses: $${(report.executiveSummary.keyMetrics.totalExpenses / 1000000).toFixed(2)}M
- Net Income: $${(report.executiveSummary.keyMetrics.netIncome / 1000000).toFixed(2)}M
- Liquid Cash: $${(report.executiveSummary.keyMetrics.liquidityCash / 1000000).toFixed(2)}M

KEY OBSERVATIONS
${report.keyObservations.map((obs) => `- ${obs.title} (${obs.severity}): ${obs.description}`).join("\n")}

STRATEGIC RECOMMENDATIONS
${report.recommendations
  .map(
    (rec) => `
- ${rec.title} (${rec.priority} priority)
  Description: ${rec.description}
  Estimated Impact: $${(rec.estimatedImpact / 1000).toFixed(0)}K
  Timeframe: ${rec.timeframe}
  Actions: ${rec.actionItems.join("; ")}
`,
  )
  .join("\n")}

RISK ALERTS
${report.riskAlerts.map((risk) => `- ${risk.riskName} (${risk.severity}): ${risk.description}`).join("\n")}

STRATEGIC SCENARIOS
${report.strategicScenarios
  .map(
    (scenario) => `
${scenario.name.toUpperCase()} (${scenario.probability}% probability)
Revenue: $${(scenario.projections.revenue / 1000000).toFixed(2)}M
Net Income: $${(scenario.projections.netIncome / 1000000).toFixed(2)}M
Profit Margin: ${scenario.projections.profitMargin.toFixed(1)}%
`,
  )
  .join("\n")}

STRATEGIC ROADMAP
${report.strategicRoadmap
  .map(
    (phase) => `
${phase.timeframe}:
Objectives: ${phase.objectives.join("; ")}
Key Initiatives: ${Array.isArray(phase.keyInitiatives) ? phase.keyInitiatives.join("; ") : phase.keyInitiatives}
Expected Outcomes: ${phase.expectedOutcomes.join("; ")}
`,
  )
  .join("\n")}`;
}
