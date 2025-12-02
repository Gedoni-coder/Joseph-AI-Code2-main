import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { type RevenueStream } from "./revenue-data";

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

export function generateOptimizationPlanPDF(
  stream: RevenueStream,
  bottlenecks: Bottleneck[],
  recommendations: Recommendation[],
  selectedRecommendations: string[]
): void {
  const selectedRecs = recommendations.filter((r) =>
    selectedRecommendations.includes(r.id)
  );
  const totalProjectedImpact = selectedRecs.reduce(
    (sum, rec) => sum + rec.projectedImpact,
    0
  );

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #1f2937;
            line-height: 1.6;
            padding: 40px;
            background: white;
          }
          h1 {
            color: #1e40af;
            font-size: 28px;
            margin-bottom: 10px;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 10px;
          }
          h2 {
            color: #1e40af;
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 15px;
            border-left: 4px solid #3b82f6;
            padding-left: 15px;
          }
          h3 {
            color: #374151;
            font-size: 16px;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          .header-section {
            margin-bottom: 30px;
          }
          .subtitle {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .metrics {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
          }
          .metric-box {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .metric-label {
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .metric-value {
            color: #1f2937;
            font-size: 20px;
            font-weight: bold;
          }
          .bottleneck {
            background: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 4px;
          }
          .bottleneck-title {
            color: #991b1b;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .bottleneck-description {
            color: #7f1d1d;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .recommendation {
            background: #f0f9ff;
            border-left: 4px solid #0284c7;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 4px;
          }
          .recommendation-title {
            color: #0c4a6e;
            font-weight: bold;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .recommendation-description {
            color: #0c4a6e;
            font-size: 14px;
            margin-bottom: 8px;
          }
          .recommendation-meta {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            font-size: 12px;
            color: #0c4a6e;
          }
          .meta-item {
            background: white;
            padding: 8px;
            border-radius: 4px;
          }
          .meta-label {
            font-weight: bold;
            margin-bottom: 2px;
            color: #0284c7;
          }
          .impact-summary {
            background: #ecfdf5;
            border: 2px solid #10b981;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
          }
          .impact-label {
            color: #047857;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .impact-value {
            color: #059669;
            font-size: 32px;
            font-weight: bold;
          }
          .implementation-timeline {
            margin-top: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
          }
          .timeline-item {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            align-items: flex-start;
          }
          .timeline-icon {
            background: #3b82f6;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
          }
          .timeline-content {
            flex: 1;
          }
          .timeline-title {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
          }
          .timeline-desc {
            color: #6b7280;
            font-size: 14px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
          }
          .page-break {
            page-break-after: always;
            margin-bottom: 40px;
          }
        </style>
      </head>
      <body>
        <div class="header-section">
          <h1>Revenue Stream Optimization Plan</h1>
          <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
          <p class="subtitle"><strong>Stream:</strong> ${stream.name} (${stream.type})</p>
        </div>

        <h2>Current Performance Metrics</h2>
        <div class="metrics">
          <div class="metric-box">
            <div class="metric-label">Current Revenue</div>
            <div class="metric-value">$${(stream.currentRevenue / 1000000).toFixed(1)}M</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Growth Target</div>
            <div class="metric-value">${stream.growth}%</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Margin</div>
            <div class="metric-value">${stream.margin}%</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Customers</div>
            <div class="metric-value">${stream.customers.toLocaleString()}</div>
          </div>
        </div>

        ${
          bottlenecks.length > 0
            ? `
          <h2>Performance Bottlenecks</h2>
          ${bottlenecks.map((b) => `
            <div class="bottleneck">
              <div class="bottleneck-title">${b.title}</div>
              <div class="bottleneck-description">${b.description}</div>
              <div style="font-size: 12px; color: #7f1d1d;">Impact Area: ${b.impact}</div>
            </div>
          `).join("")}
        `
            : ""
        }

        <h2>Selected Implementation Recommendations</h2>
        ${
          selectedRecs.length > 0
            ? `
          <div class="impact-summary">
            <div class="impact-label">Total Projected Annual Impact</div>
            <div class="impact-value">+$${(totalProjectedImpact / 1000000).toFixed(2)}M</div>
          </div>

          ${selectedRecs.map((r) => `
            <div class="recommendation">
              <div class="recommendation-title">${r.title}</div>
              <div class="recommendation-description">${r.description}</div>
              <div class="recommendation-meta">
                <div class="meta-item">
                  <div class="meta-label">Projected Impact</div>
                  <div>+$${(r.projectedImpact / 1000000).toFixed(2)}M</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Implementation Difficulty</div>
                  <div>${r.difficulty}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Timeframe</div>
                  <div>${r.timeframe}</div>
                </div>
              </div>
            </div>
          `).join("")}
        `
            : "<p style='color: #6b7280;'>No recommendations selected for implementation.</p>"
        }

        <div class="implementation-timeline">
          <h2 style="margin-top: 0; border: none;">Implementation Timeline</h2>
          <div class="timeline-item">
            <div class="timeline-icon">1</div>
            <div class="timeline-content">
              <div class="timeline-title">Week 1: Review & Planning</div>
              <div class="timeline-desc">Review selected recommendations and develop detailed implementation plan</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">2</div>
            <div class="timeline-content">
              <div class="timeline-title">Week 2-4: Implementation</div>
              <div class="timeline-desc">Execute implementation activities across all selected recommendations</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">3</div>
            <div class="timeline-content">
              <div class="timeline-title">Month 2-3: Monitoring</div>
              <div class="timeline-desc">Track progress and measure impact against projected improvements</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">4</div>
            <div class="timeline-content">
              <div class="timeline-title">Month 3+: Optimization</div>
              <div class="timeline-desc">Fine-tune implementation and scale successful initiatives</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>This optimization plan was automatically generated based on comparative analysis of your revenue stream performance against portfolio benchmarks.</p>
          <p>For questions or implementation support, contact your revenue strategy team.</p>
        </div>
      </body>
    </html>
  `;

  const options = {
    margin: [10, 10, 10, 10],
    filename: `optimization-plan-${stream.name}-${new Date().toISOString().split("T")[0]}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
  };

  html2pdf().set(options).from(htmlContent).save();
}
