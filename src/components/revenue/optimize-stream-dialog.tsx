import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Zap,
} from "lucide-react";
import { type RevenueStream } from "@/lib/revenue-data";

interface OptimizeStreamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stream: RevenueStream | null;
  allStreams: RevenueStream[];
}

interface Bottleneck {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
  impact: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  projectedImpact: number;
  projectedImpactUnit: string;
  difficulty: "easy" | "medium" | "hard";
  timeframe: string;
  action: string;
}

function analyzeStream(
  stream: RevenueStream,
  allStreams: RevenueStream[]
): {
  bottlenecks: Bottleneck[];
  recommendations: Recommendation[];
} {
  const bottlenecks: Bottleneck[] = [];
  const recommendations: Recommendation[] = [];

  // Guard against empty arrays
  if (!allStreams || allStreams.length === 0) {
    return { bottlenecks, recommendations };
  }

  const avgGrowth =
    allStreams.reduce((sum, s) => sum + (s.growth || 0), 0) / allStreams.length;
  const avgMargin =
    allStreams.reduce((sum, s) => sum + (s.margin || 0), 0) / allStreams.length;
  const avgArpc =
    allStreams.reduce((sum, s) => sum + (s.avgRevenuePerCustomer || 0), 0) /
    allStreams.length;

  // Identify bottlenecks
  if (stream.growth && avgGrowth && stream.growth < avgGrowth * 0.5) {
    bottlenecks.push({
      id: "low-growth",
      title: "Below-Average Growth Rate",
      description: `This stream is growing at ${stream.growth}%, significantly below the portfolio average of ${avgGrowth.toFixed(1)}%. This suggests untapped expansion potential.`,
      severity: "high",
      impact: "Revenue Growth",
    });
  }

  if (stream.margin && avgMargin && stream.margin < avgMargin * 0.8) {
    bottlenecks.push({
      id: "low-margin",
      title: "Margin Compression",
      description: `Current margin of ${stream.margin}% is below portfolio average of ${avgMargin.toFixed(1)}%. Cost structure may need optimization.`,
      severity: "high",
      impact: "Profitability",
    });
  }

  if (
    stream.avgRevenuePerCustomer &&
    avgArpc &&
    stream.avgRevenuePerCustomer < avgArpc * 0.7
  ) {
    bottlenecks.push({
      id: "low-arpc",
      title: "Low Revenue Per Customer",
      description: `ARPC of $${stream.avgRevenuePerCustomer} is ${((1 - stream.avgRevenuePerCustomer / avgArpc) * 100).toFixed(0)}% below average. Pricing or product mix optimization needed.`,
      severity: "medium",
      impact: "Unit Economics",
    });
  }

  if (stream.currentRevenue < 500000) {
    bottlenecks.push({
      id: "small-stream",
      title: "Underdeveloped Revenue Stream",
      description: "This stream is early-stage with limited scale. Focus on proving unit economics before expansion.",
      severity: "medium",
      impact: "Scale",
    });
  }

  // Generate recommendations based on bottlenecks and stream characteristics
  if (stream.growth && avgGrowth && stream.growth < avgGrowth) {
    recommendations.push({
      id: "expansion-marketing",
      title: "Increase Marketing Investment",
      description: `Allocate additional marketing budget to this ${stream.type} stream. A 30% increase in customer acquisition could drive revenue growth.`,
      projectedImpact: Math.max(0, stream.currentRevenue * 0.15),
      projectedImpactUnit: "$",
      difficulty: "easy",
      timeframe: "90 days",
      action: "Create marketing campaign",
    });
  }

  if (stream.margin && avgMargin && stream.margin < avgMargin) {
    const marginImprovement = stream.margin * 0.03;
    recommendations.push({
      id: "cost-optimization",
      title: "Optimize Cost Structure",
      description: `Review and optimize operational costs. Target 2-3% margin improvement through operational efficiency and automation.`,
      projectedImpact: Math.max(0, stream.currentRevenue * marginImprovement),
      projectedImpactUnit: "$",
      difficulty: "medium",
      timeframe: "120 days",
      action: "Conduct cost analysis",
    });
  }

  if (
    stream.avgRevenuePerCustomer &&
    avgArpc &&
    stream.avgRevenuePerCustomer < avgArpc
  ) {
    recommendations.push({
      id: "pricing-optimization",
      title: "Implement Tiered Pricing",
      description: `Develop premium tiers or add-ons to increase ARPC. Even a 10% increase in pricing realization could significantly boost revenue.`,
      projectedImpact: Math.max(0, stream.currentRevenue * 0.1),
      projectedImpactUnit: "$",
      difficulty: "medium",
      timeframe: "90 days",
      action: "Design pricing experiment",
    });
  }

  if (stream.type === "subscription") {
    recommendations.push({
      id: "churn-reduction",
      title: "Reduce Churn Rate",
      description: `Implement retention program targeting high-value customers. Even 5% churn reduction could protect significant revenue.`,
      projectedImpact: Math.max(0, stream.currentRevenue * 0.08),
      projectedImpactUnit: "$",
      difficulty: "medium",
      timeframe: "180 days",
      action: "Launch retention program",
    });
  }

  if (stream.currentRevenue && stream.currentRevenue < 1000000) {
    const upsellImpact = stream.customers
      ? stream.customers * (stream.avgRevenuePerCustomer || 0) * 0.15
      : 0;
    recommendations.push({
      id: "upsell-program",
      title: "Develop Cross-Sell Strategy",
      description: `Create targeted upsell program for existing customers. Leverage complementary offerings to increase customer lifetime value.`,
      projectedImpact: Math.max(0, upsellImpact),
      projectedImpactUnit: "$",
      difficulty: "easy",
      timeframe: "60 days",
      action: "Identify upsell opportunities",
    });
  }

  if (stream.currentRevenue) {
    recommendations.push({
      id: "customer-segmentation",
      title: "Advanced Customer Segmentation",
      description: `Segment customers by profitability and engagement. Tailor offers and messaging to each segment for improved conversion and retention.`,
      projectedImpact: Math.max(0, stream.currentRevenue * 0.12),
      projectedImpactUnit: "$",
      difficulty: "hard",
      timeframe: "150 days",
      action: "Build segmentation model",
    });
  }

  return {
    bottlenecks,
    recommendations: recommendations.slice(0, 5),
  };
}

export function OptimizeStreamDialog({
  open,
  onOpenChange,
  stream,
  allStreams,
}: OptimizeStreamDialogProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(
    null
  );

  if (!stream) return null;

  const { bottlenecks, recommendations } = analyzeStream(stream, allStreams);

  const severityColors = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-blue-100 text-blue-800",
    hard: "bg-purple-100 text-purple-800",
  };

  const totalProjectedImpact = recommendations.reduce(
    (sum, rec) => sum + rec.projectedImpact,
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Optimize: {stream.name}
          </DialogTitle>
          <DialogDescription>
            Performance diagnosis and optimization recommendations for your{" "}
            {stream.type} revenue stream
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-1">
          {/* Current Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${(stream.currentRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-600">Current Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {stream.growth}%
                  </div>
                  <div className="text-sm text-gray-600">Growth Target</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {stream.margin}%
                  </div>
                  <div className="text-sm text-gray-600">Margin</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {stream.customers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Customers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Diagnosis */}
          {bottlenecks.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Performance Diagnosis
                </CardTitle>
                <CardDescription>
                  Identified bottlenecks preventing this stream from reaching its
                  potential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bottlenecks.map((bottleneck) => (
                  <div
                    key={bottleneck.id}
                    className={`p-4 rounded-lg border ${severityColors[bottleneck.severity]}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{bottleneck.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {bottleneck.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{bottleneck.description}</p>
                    <div className="text-xs font-medium opacity-75">
                      Impact Area: {bottleneck.impact}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Optimization Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Optimization Recommendations
              </CardTitle>
              <CardDescription>
                Prioritized actions to improve this revenue stream
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-700">
                    Total Projected Impact:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    +${(totalProjectedImpact / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-xs text-gray-600">annual revenue</span>
                </div>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRecommendation === rec.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() =>
                      setSelectedRecommendation(
                        selectedRecommendation === rec.id ? null : rec.id
                      )
                    }
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            {index + 1}
                          </span>
                          <h4 className="font-semibold">{rec.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                      <div className="ml-4 text-right flex-shrink-0">
                        <div className="text-lg font-bold text-green-600 mb-1">
                          +${(rec.projectedImpact / 1000000).toFixed(2)}M
                        </div>
                        <Badge className={difficultyColors[rec.difficulty]}>
                          {rec.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {selectedRecommendation === rec.id && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-700 mb-1">
                            Implementation Timeframe
                          </div>
                          <div className="text-sm">{rec.timeframe}</div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          {rec.action}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0">
                    1
                  </span>
                  <span className="text-sm">
                    Review the identified bottlenecks and understand their impact on
                    revenue potential
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0">
                    2
                  </span>
                  <span className="text-sm">
                    Select your top 2-3 recommendations based on effort and potential impact
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0">
                    3
                  </span>
                  <span className="text-sm">
                    Click the action buttons to initiate implementation workflows
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex-shrink-0">
                    4
                  </span>
                  <span className="text-sm">
                    Track progress and measure impact against projected improvements
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Close
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            Export Optimization Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
