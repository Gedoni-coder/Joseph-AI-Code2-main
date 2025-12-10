import React, { useRef } from "react";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

interface ValidationReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startDate: Date;
  endDate: Date;
}

// Mock data generator
const generateMockReportData = (startDate: Date, endDate: Date) => {
  const periodLabel = `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd, yyyy")}`;

  return {
    period: periodLabel,
    generatedAt: new Date(),
    executiveSummary: {
      accuracyScore: 88.5,
      conclusion: "Pass",
      keyVariances: [
        { metric: "Revenue", variance: 2.3 },
        { metric: "Expenses", variance: -1.8 },
        { metric: "Net Income", variance: 3.1 },
      ],
    },
    forecastVsActual: [
      {
        period: "Week 1",
        status: "accurate",
        forecastedRevenue: 450000,
        actualRevenue: 461000,
        revenueVariance: 2.4,
        forecastedNetIncome: 125000,
        actualNetIncome: 132000,
        accuracyScore: 89,
      },
      {
        period: "Week 2",
        status: "accurate",
        forecastedRevenue: 425000,
        actualRevenue: 418000,
        revenueVariance: -1.6,
        forecastedNetIncome: 118000,
        actualNetIncome: 115000,
        accuracyScore: 87,
      },
      {
        period: "Week 3",
        status: "acceptable",
        forecastedRevenue: 480000,
        actualRevenue: 492000,
        revenueVariance: 2.5,
        forecastedNetIncome: 133000,
        actualNetIncome: 140000,
        accuracyScore: 90,
      },
      {
        period: "Week 4",
        status: "accurate",
        forecastedRevenue: 410000,
        actualRevenue: 403000,
        revenueVariance: -1.7,
        forecastedNetIncome: 113000,
        actualNetIncome: 109000,
        accuracyScore: 86,
      },
    ],
    budgetAlignment: {
      revenueAlignment: 88,
      expenseAlignment: 94,
      cashFlowAlignment: 79,
      marketAlignment: 86,
    },
    insights: [
      {
        type: "positive",
        title: "Strong Revenue Performance",
        description:
          "Revenue consistently outperforms forecasts by an average of 2.3%, indicating robust market demand and effective sales execution.",
        icon: TrendingUp,
      },
      {
        type: "neutral",
        title: "Expense Volatility Detected",
        description:
          "Operating expenses show higher variance than forecasted, particularly in weeks 1-2. Review procurement patterns and staffing costs.",
        icon: AlertCircle,
      },
      {
        type: "positive",
        title: "Improved Seasonal Forecasting",
        description:
          "Q1 and Q4 forecasts now incorporate stronger seasonal patterns, improving prediction accuracy by 4.2%.",
        icon: TrendingUp,
      },
      {
        type: "neutral",
        title: "Cash Flow Forecast Gap",
        description:
          "Cash flow predictions lag by approximately 3-5 days. Consider adjusting payment cycle assumptions in future forecasts.",
        icon: AlertCircle,
      },
    ],
  };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercent = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "accurate":
      return "bg-green-100 text-green-800";
    case "acceptable":
      return "bg-yellow-100 text-yellow-800";
    case "concerning":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getConclusionColor = (conclusion: string) => {
  switch (conclusion) {
    case "Pass":
      return "bg-green-100 text-green-800";
    case "Needs Review":
      return "bg-yellow-100 text-yellow-800";
    case "Fail":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ValidationReport({
  open,
  onOpenChange,
  startDate,
  endDate,
}: ValidationReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const data = generateMockReportData(startDate, endDate);

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save(
        `Validated-Forecast-${format(new Date(), "yyyy-MM-dd-HHmmss")}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Period",
      "Status",
      "Forecasted Revenue",
      "Actual Revenue",
      "Revenue Variance",
      "Forecasted Net Income",
      "Actual Net Income",
      "Accuracy Score",
    ];

    const rows = data.forecastVsActual.map((row) => [
      row.period,
      row.status,
      row.forecastedRevenue,
      row.actualRevenue,
      row.revenueVariance,
      row.forecastedNetIncome,
      row.actualNetIncome,
      row.accuracyScore,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Validated-Forecast-${format(new Date(), "yyyy-MM-dd-HHmmss")}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Validation Report</DialogTitle>
          <DialogDescription>
            {data.period} • Generated on {format(data.generatedAt, "MMM dd, yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6" ref={reportRef}>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Validated Forecast Report</h1>
            <p className="text-blue-100">
              Comprehensive validation analysis for {data.period}
            </p>
          </div>

          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>
                Key findings and overall validation conclusion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Overall Accuracy Score
                  </p>
                  <p className="text-4xl font-bold text-blue-600">
                    {data.executiveSummary.accuracyScore.toFixed(1)}%
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Validation Status
                  </p>
                  <div>
                    <Badge className={getConclusionColor(data.executiveSummary.conclusion)}>
                      {data.executiveSummary.conclusion}
                    </Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Average Variance
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {(
                      data.executiveSummary.keyVariances.reduce(
                        (sum, v) => sum + Math.abs(v.variance),
                        0,
                      ) / data.executiveSummary.keyVariances.length
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Key Variances
                </h3>
                <div className="space-y-2">
                  {data.executiveSummary.keyVariances.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{item.metric}</span>
                      <span
                        className={`font-medium ${item.variance >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatPercent(item.variance)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forecast vs Actual Table */}
          <Card>
            <CardHeader>
              <CardTitle>Forecast vs Actual Performance</CardTitle>
              <CardDescription>
                Detailed comparison of forecasted vs actual financial metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium">Period</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">
                        Forecasted Revenue
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Actual Revenue
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Variance
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Forecasted NI
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        Actual NI
                      </th>
                      <th className="text-center py-3 px-4 font-medium">
                        Accuracy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.forecastVsActual.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{row.period}</td>
                        <td className="text-center py-3 px-4">
                          <Badge className={getStatusColor(row.status)}>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(row.forecastedRevenue)}
                        </td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(row.actualRevenue)}
                        </td>
                        <td className="text-right py-3 px-4">
                          <span
                            className={
                              row.revenueVariance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {formatPercent(row.revenueVariance)}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(row.forecastedNetIncome)}
                        </td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(row.actualNetIncome)}
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Progress
                              value={row.accuracyScore}
                              className="w-16 h-2"
                            />
                            <span className="text-sm font-medium">
                              {row.accuracyScore}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Budget Alignment Scorecard */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Alignment Scorecard</CardTitle>
              <CardDescription>
                How well your budgets align with forecasts and actuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Revenue Alignment",
                    value: data.budgetAlignment.revenueAlignment,
                  },
                  {
                    name: "Expense Alignment",
                    value: data.budgetAlignment.expenseAlignment,
                  },
                  {
                    name: "Cash Flow Alignment",
                    value: data.budgetAlignment.cashFlowAlignment,
                  },
                  {
                    name: "Market Alignment",
                    value: data.budgetAlignment.marketAlignment,
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm font-bold text-blue-600">
                        {item.value}%
                      </span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
              <CardDescription>
                AI-generated analysis and suggested improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.insights.map((insight, index) => {
                  const Icon = insight.icon;
                  const iconColor =
                    insight.type === "positive"
                      ? "text-green-600"
                      : "text-yellow-600";

                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex gap-4"
                    >
                      <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p>
              Report generated on {format(data.generatedAt, "MMMM dd, yyyy 'at' HH:mm")}
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
          <Button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
