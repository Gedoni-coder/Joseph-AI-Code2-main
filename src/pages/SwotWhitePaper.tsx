import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, FileText } from "lucide-react";

export default function SwotWhitePaper() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const company = params.get("company") || "Your Organization";

  const content = `A SWOT analysis is a strategic planning tool that identifies a project or organization's internal Strengths and Weaknesses, and its external Opportunities and Threats. It helps provide a comprehensive understanding of a current situation by evaluating internal factors that can be controlled, and external factors that are beyond control, to inform future decision-making.

The four components of a SWOT analysis

Strengths: Internal positive attributes that give an advantage over others. Examples: A strong brand reputation, unique technology, or skilled workforce.

Weaknesses: Internal negative attributes that put an organization at a disadvantage. Examples: A lack of funding, outdated technology, or poor management.

Opportunities: External factors that could be exploited to the advantage of the organization. Examples: Emerging market trends, a competitor's weakness, or new technology.

Threats: External factors that could cause trouble for the organization. Examples: New regulations, a shift in consumer taste, or economic downturns.

How it's used

Strategic Planning: It serves as a foundation for developing future strategies by matching internal capabilities with external possibilities.

Decision Making: It provides insights that help guide decisions, such as whether to launch a new product or enter a new market.

Competitive Analysis: It helps organizations understand how they are positioned against competitors.

Project Assessment: It can be used to evaluate the viability of a specific project or venture.`;

  const downloadTxt = () => {
    const blob = new Blob([`SWOT White Paper\n\nCompany: ${company}\n\n${content}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SWOT-${company.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/market-competitive-analysis" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadTxt}><Download className="h-4 w-4 mr-2" /> Download</Button>
            <Button onClick={exportPdf}><FileText className="h-4 w-4 mr-2" /> Export PDF</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">SWOT Analysis White Paper</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p><strong>Company:</strong> {company}</p>
              {content.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
