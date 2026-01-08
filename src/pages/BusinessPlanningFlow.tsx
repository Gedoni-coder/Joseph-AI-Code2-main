import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  Download,
  Edit2,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  BusinessPlan,
  BusinessPlanStep,
  StepStatus,
} from "@/lib/business-planning-types";
import {
  createEmptyBusinessPlan,
  BUSINESS_PLAN_STEPS,
} from "@/lib/business-planning-types";
import {
  generateBusinessPlanContent,
  generateMarketValidationContent,
  generateBusinessModelCanvasContent,
  generateOperationalPlanningContent,
  generateFinancialPlanningContent,
  generateGTMStrategyContent,
  generateComplianceGuidanceContent,
  generateHealthCheckContent,
  generateInvestorPitchContent,
  generateContinuousUpdatingContent,
} from "@/lib/business-plan-content-generator";
import { downloadBusinessPlan } from "@/lib/business-plan-export";

const STORAGE_KEY = "joseph_business_plans_v1";

export default function BusinessPlanningFlow() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [exporting, setExporting] = useState(false);

  // Load existing business plan or create new one
  useEffect(() => {
    if (!planId) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const plans: BusinessPlan[] = stored ? JSON.parse(stored) : [];
    let plan = plans.find((p) => p.id === planId);

    // If not found by plan ID, try to find by feasibility ID (for backwards compatibility)
    if (!plan) {
      plan = plans.find((p) => p.feasibilityId === planId);
    }

    // If still not found, create new plan (standalone)
    if (!plan && planId.startsWith("idea_")) {
      // This is a feasibility ID, get the idea from feasibility reports
      const feasibilityStored = localStorage.getItem(
        "joseph_feasibility_ideas_v1",
      );
      const feasibilityReports: any[] = feasibilityStored
        ? JSON.parse(feasibilityStored)
        : [];
      const feasibilityReport = feasibilityReports.find((r) => r.id === planId);
      const idea = feasibilityReport?.idea || "Business Idea";

      plan = createEmptyBusinessPlan(planId, idea);
      plan.businessName = extractBusinessName(idea);
      savePlan(plan);
    }

    setBusinessPlan(plan);
  }, [planId]);

  const savePlan = (plan: BusinessPlan) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const plans: BusinessPlan[] = stored ? JSON.parse(stored) : [];
    const index = plans.findIndex((p) => p.id === plan.id);

    if (index >= 0) {
      plans[index] = plan;
    } else {
      plans.push(plan);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  };

  const generateStepContent = async (stepId: number) => {
    if (!businessPlan) return;

    setLoading(true);
    try {
      const step = businessPlan.steps[stepId - 1];
      let content = "";

      switch (step.key) {
        case "business-plan-generator":
          content = await generateBusinessPlanContent(
            businessPlan.idea,
            businessPlan.businessName,
          );
          businessPlan.fullDocument.executiveSummary = content;
          break;
        case "market-validation":
          content = await generateMarketValidationContent(
            businessPlan.idea,
            businessPlan.businessName,
          );
          businessPlan.fullDocument.marketAnalysis = content;
          break;
        case "business-model-canvas":
          content = await generateBusinessModelCanvasContent(businessPlan.idea);
          businessPlan.fullDocument.businessModel = content;
          break;
        case "operational-planning":
          content = await generateOperationalPlanningContent(businessPlan.idea);
          businessPlan.fullDocument.operationsPlan = content;
          break;
        case "financial-planning":
          content = await generateFinancialPlanningContent(businessPlan.idea);
          businessPlan.fullDocument.financialProjections = content;
          break;
        case "gtm-strategy":
          content = await generateGTMStrategyContent(businessPlan.idea);
          businessPlan.fullDocument.goToMarketStrategy = content;
          break;
        case "compliance-guidance":
          content = await generateComplianceGuidanceContent(businessPlan.idea);
          break;
        case "health-checker":
          content = await generateHealthCheckContent(businessPlan.idea);
          break;
        case "investor-pitch":
          content = await generateInvestorPitchContent(
            businessPlan.idea,
            businessPlan.businessName,
          );
          break;
        case "continuous-updating":
          content = await generateContinuousUpdatingContent(
            businessPlan.idea,
            businessPlan.businessName,
          );
          break;
      }

      const updatedPlan = {
        ...businessPlan,
        steps: businessPlan.steps.map((s) =>
          s.id === stepId
            ? {
                ...s,
                status: "completed" as StepStatus,
                content: {
                  title: s.name,
                  content,
                  generatedAt: new Date().toISOString(),
                  status: "completed" as StepStatus,
                },
              }
            : s,
        ),
        currentStep: Math.min(stepId + 1, businessPlan.steps.length),
        updatedAt: new Date().toISOString(),
      };

      setBusinessPlan(updatedPlan);
      savePlan(updatedPlan);
    } catch (error) {
      console.error("Error generating step content:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStepContent = (stepId: number, newContent: string) => {
    if (!businessPlan) return;

    const updatedPlan = {
      ...businessPlan,
      steps: businessPlan.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              content: s.content
                ? { ...s.content, content: newContent }
                : {
                    title: s.name,
                    content: newContent,
                    generatedAt: new Date().toISOString(),
                    status: "completed" as StepStatus,
                  },
              status: "completed" as StepStatus,
            }
          : s.id > stepId
            ? { ...s, status: "needs_update" as StepStatus }
            : s,
      ),
      updatedAt: new Date().toISOString(),
    };

    setBusinessPlan(updatedPlan);
    savePlan(updatedPlan);
    setEditingStepId(null);
  };

  const goToStep = (stepId: number) => {
    if (!businessPlan) return;
    const updatedPlan = { ...businessPlan, currentStep: stepId };
    setBusinessPlan(updatedPlan);
    savePlan(updatedPlan);
  };

  const handleExport = async (format: "docx" | "pdf") => {
    if (!businessPlan) return;
    setExporting(true);
    try {
      await downloadBusinessPlan(businessPlan, format);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setExporting(false);
    }
  };

  if (!businessPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading business plan...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = businessPlan.steps[businessPlan.currentStep - 1];
  const stepProgress = Math.round(
    (businessPlan.steps.filter((s) => s.status === "completed").length /
      businessPlan.steps.length) *
      100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/business-planning")}
              className="gap-2 h-8 px-2"
            >
              <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">Back to plans</span>
              <span className="md:hidden">Back</span>
            </Button>
          </div>

          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 line-clamp-2">
            {businessPlan.businessName}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            Business Planning Workflow
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs md:text-sm">
                Step {businessPlan.currentStep} of {businessPlan.steps.length}
              </Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">{stepProgress}% Complete</Badge>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("docx")}
                disabled={exporting}
                className="text-xs md:text-sm h-8 md:h-9"
              >
                <Download className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                <span className="hidden md:inline">{exporting ? "Exporting..." : "Export DOCX"}</span>
                <span className="md:hidden">DOCX</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                disabled={exporting}
                className="text-xs md:text-sm h-8 md:h-9"
              >
                <Download className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                <span className="hidden md:inline">{exporting ? "Exporting..." : "Export PDF"}</span>
                <span className="md:hidden">PDF</span>
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Steps Sidebar - Left */}
          <div className="col-span-1">
            <Card className="sticky top-4 h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 md:space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {businessPlan.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={cn(
                      "w-full text-left p-2 md:p-3 rounded-lg border-2 transition-all text-xs md:text-sm",
                      businessPlan.currentStep === step.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50",
                      step.status === "completed" &&
                        "bg-green-50 dark:bg-green-950",
                    )}
                  >
                    <div className="flex items-start gap-1.5 md:gap-2">
                      {step.status === "completed" ? (
                        <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : step.status === "needs_update" ? (
                        <AlertCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="h-3.5 w-3.5 md:h-4 md:w-4 border-2 border-muted-foreground rounded-full mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs md:text-sm leading-tight">
                          {step.id}. {step.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Business Plan Generator - Right */}
          <div className="col-span-1 lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl">{currentStep.name}</CardTitle>
                <CardDescription className="text-xs md:text-sm">{currentStep.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-6">
                {currentStep.status === "needs_update" && (
                  <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      This step needs to be updated based on changes made in
                      previous steps.
                    </AlertDescription>
                  </Alert>
                )}

                {editingStepId === currentStep.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-48 md:h-96 p-2 md:p-4 border rounded-lg font-mono text-xs md:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Edit step content..."
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button
                        onClick={() =>
                          updateStepContent(currentStep.id, editContent)
                        }
                        className="gap-2 md:w-auto w-full"
                        size="sm"
                      >
                        <Check className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingStepId(null)}
                        size="sm"
                        className="md:w-auto w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {currentStep.content ? (
                      <div>
                        <div className="prose dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed p-2 md:p-4 bg-muted/30 rounded-lg border">
                            {currentStep.content.content}
                          </div>
                        </div>
                        <div className="mt-3 md:mt-4 flex flex-col md:flex-row gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingStepId(currentStep.id);
                              setEditContent(
                                currentStep.content?.content || "",
                              );
                            }}
                            className="gap-2 md:w-auto w-full"
                            size="sm"
                          >
                            <Edit2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            Edit Content
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => generateStepContent(currentStep.id)}
                            disabled={loading}
                            size="sm"
                            className="md:w-auto w-full"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Regenerating...
                              </>
                            ) : (
                              "Regenerate"
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 md:py-8">
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                          No content generated yet
                        </p>
                        <Button
                          onClick={() => generateStepContent(currentStep.id)}
                          disabled={loading}
                          size="md"
                          className="gap-2 w-full md:w-auto"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            "Generate Content"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation - Below Both Panes */}
        <div className="flex justify-between items-center pt-4 md:pt-6 mt-4 md:mt-6 border-t gap-2">
          <Button
            variant="outline"
            onClick={() => goToStep(Math.max(1, businessPlan.currentStep - 1))}
            disabled={businessPlan.currentStep === 1}
            className="gap-1 md:gap-2 text-xs md:text-sm h-8 md:h-9"
            size="sm"
          >
            <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">Previous</span>
            <span className="md:hidden">Prev</span>
          </Button>

          <div className="text-xs md:text-sm text-muted-foreground">
            Step {businessPlan.currentStep} of {businessPlan.steps.length}
          </div>

          <Button
            onClick={() => {
              if (businessPlan.currentStep < businessPlan.steps.length) {
                goToStep(businessPlan.currentStep + 1);
              }
            }}
            disabled={businessPlan.currentStep === businessPlan.steps.length}
            className="gap-1 md:gap-2 text-xs md:text-sm h-8 md:h-9"
            size="sm"
          >
            <span className="hidden md:inline">Next</span>
            <span className="md:hidden">Next</span>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function extractBusinessName(idea: string): string {
  // Extract potential business name from idea
  const words = idea.split(" ");
  const businessName = words.slice(0, Math.min(3, words.length)).join(" ");
  return businessName || "My Business Plan";
}
