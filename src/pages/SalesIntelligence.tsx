import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ModuleHeader from "@/components/ui/module-header";
import { useSalesIntelligenceAPI } from "@/hooks/useSalesIntelligenceAPI";
import CreateLeadDialog from "@/components/sales-intelligence/CreateLeadDialog";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageCircle,
  MessageSquareDot,
  Linkedin,
  CheckCircle2,
  Lightbulb,
  Plus,
} from "lucide-react";

const SalesIntelligence = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [selectedSalesRep, setSelectedSalesRep] = useState("sarah");
  const [createLeadOpen, setCreateLeadOpen] = useState(false);

  const {
    subModules,
    metrics,
    isLoading,
    isConnected,
    lastUpdated,
    refreshData,
  } = useSalesIntelligenceAPI();

  const handleLeadCreated = (leadData: any) => {
    console.log("New lead created:", leadData);
    // TODO: Integrate with backend API to save the lead
    // For now, we'll just log it and close the dialog
  };

  const staticSubModules = [
    {
      id: "lead-pipeline",
      name: "Lead Intelligence & Pipeline",
      icon: <Target className="h-5 w-5" />,
      description: "Lead qualification, pipeline forecasting, deal rescue",
      metrics: {
        "Lead Score": "8.2/10",
        "Pipeline Health": "92%",
        "Deal Probability": "68%",
      },
    },
    {
      id: "engagement-crm",
      name: "Automated Engagement & CRM",
      icon: <MessageSquare className="h-5 w-5" />,
      description:
        "Automated follow-ups, CRM intelligence, engagement tracking",
      metrics: {
        "Follow-up Rate": "94%",
        "Engagement Score": "7.8/10",
        "Conversion Rate": "34%",
      },
    },
    {
      id: "sales-targets",
      name: "Target Tracking & Revenue",
      icon: <BarChart3 className="h-5 w-5" />,
      description:
        "Sales target monitoring, performance analytics, forecasting",
      metrics: {
        "Target Achievement": "112%",
        "Revenue Trend": "+18%",
        "Rep Performance": "Avg: 95%",
      },
    },
    {
      id: "sales-assets",
      name: "Sales Assets & Marketing",
      icon: <Zap className="h-5 w-5" />,
      description:
        "Proposal generation, marketing intelligence, lead attribution",
      metrics: {
        "Proposal Gen": "156 generated",
        "Channel Effectiveness": "7.5/10",
        "Marketing-to-Sales": "42%",
      },
    },
    {
      id: "insights-coaching",
      name: "Insights Engine & AI Coaching",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "AI coaching, performance insights, skill recommendations",
      metrics: {
        "Coaching Score": "8.4/10",
        "Top Performers": "12 identified",
        "Improvement Rate": "24%",
      },
    },
  ];

  const performanceMetrics = [
    {
      label: "Total Pipeline Value",
      value: "$2.4M",
      change: "+12%",
      color: "text-green-600",
    },
    {
      label: "Win Rate",
      value: "34%",
      change: "+5%",
      color: "text-blue-600",
    },
    {
      label: "Avg Deal Size",
      value: "$45.2K",
      change: "+8%",
      color: "text-purple-600",
    },
    {
      label: "Sales Cycle",
      value: "32 days",
      change: "-3 days",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<Users className="h-6 w-6" />}
        title="Sales Intelligence"
        description="Universal sales intelligence module helping businesses improve lead handling, sales performance, revenue conversion, and pipeline forecasting"
        isConnected={isConnected}
        lastUpdated={lastUpdated}
        onReconnect={refreshData}
        connectionLabel="Live"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-8 gap-2 w-full rounded-md bg-muted p-1 text-muted-foreground">
            <TabsList className="contents">
              <TabsTrigger
                value="overview"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="lead-pipeline"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Lead Pipeline
              </TabsTrigger>
              <TabsTrigger
                value="engagement"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Engagement
              </TabsTrigger>
              <TabsTrigger
                value="targets"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Targets
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="w-full justify-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          {metric.label}
                        </p>
                        <p className={`text-2xl font-bold ${metric.color}`}>
                          {metric.value}
                        </p>
                      </div>
                      <Badge variant="secondary">{metric.change}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subModules.map((module) => (
                <Card
                  key={module.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {module.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {module.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {module.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(module.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-600">{key}</span>
                          <span className="font-semibold text-gray-900">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lead Intelligence Tab */}
          <TabsContent value="lead-pipeline" className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Pipeline Health Alert
                  </h4>
                  <p className="text-sm text-blue-800">
                    3 deals at risk detected. AI suggests intervention
                    strategies for rescue.
                  </p>
                </div>
              </div>
            </div>

            {/* Hot Leads Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <CardTitle>
                    🔥 Hot Leads (High Conversion Probability)
                  </CardTitle>
                </div>
                <CardDescription>
                  Deals in advanced stages with high probability scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold">
                          Company Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Deal Description
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Opening Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Expected Close
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Pipeline Stage
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          AI Lead Score
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Deal Probability
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Stall?
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          AI Rescue Playbook
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          company: "ZenithTech Ltd",
                          description: "50 Laptops Supply Contract",
                          opening: "2025-01-11",
                          expectedClose: "2025-02-05",
                          stage: "Proposal Sent",
                          leadScore: 92,
                          probability: 88,
                          stall: "No",
                          playbook: "Not Required",
                        },
                        {
                          company: "PrimeFoods PLC",
                          description: "Packaging Automation Upgrade",
                          opening: "2025-01-03",
                          expectedClose: "2025-01-28",
                          stage: "Negotiation",
                          leadScore: 95,
                          probability: 93,
                          stall: "No",
                          playbook: "Not Required",
                        },
                        {
                          company: "Star Transport Co.",
                          description: "Fleet Tracking Subscription",
                          opening: "2025-01-15",
                          expectedClose: "2025-02-10",
                          stage: "Decision Pending",
                          leadScore: 89,
                          probability: 80,
                          stall: "Yes",
                          playbook:
                            "Send 'Decision Reminder + Value ROI Summary'",
                        },
                      ].map((deal, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{deal.company}</td>
                          <td className="py-3 px-4">{deal.description}</td>
                          <td className="py-3 px-4">{deal.opening}</td>
                          <td className="py-3 px-4">{deal.expectedClose}</td>
                          <td className="py-3 px-4">{deal.stage}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-green-100 text-green-800">
                              {deal.leadScore}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-green-100 text-green-800">
                              {deal.probability}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`font-semibold ${deal.stall === "Yes" ? "text-red-600" : "text-green-600"}`}
                            >
                              {deal.stall}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs">{deal.playbook}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Warm Leads Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <CardTitle>
                    🌤 Warm Leads (Medium Conversion Probability)
                  </CardTitle>
                </div>
                <CardDescription>
                  Leads in qualification and early engagement stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold">
                          Company Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Deal Description
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Opening Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Expected Close
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Pipeline Stage
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          AI Lead Score
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Deal Probability
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Stall?
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          AI Rescue Playbook
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          company: "GreenMart Stores",
                          description: "POS + Inventory SaaS",
                          opening: "2025-01-08",
                          expectedClose: "2025-03-01",
                          stage: "Product Demo Booked",
                          leadScore: 72,
                          probability: 54,
                          stall: "No",
                          playbook: "Not Required",
                        },
                        {
                          company: "CraftBuild Ltd",
                          description: "Supplier Workflow System",
                          opening: "2025-01-04",
                          expectedClose: "2025-03-20",
                          stage: "Lead Contacted",
                          leadScore: 68,
                          probability: 48,
                          stall: "Yes",
                          playbook: "'Re-engage With Case Study'",
                        },
                        {
                          company: "NextGen Autos",
                          description: "CRM Deployment",
                          opening: "2025-01-18",
                          expectedClose: "2025-03-10",
                          stage: "Initial Qualification",
                          leadScore: 61,
                          probability: 40,
                          stall: "No",
                          playbook: "'Send Competitive Comparison Brief'",
                        },
                      ].map((deal, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{deal.company}</td>
                          <td className="py-3 px-4">{deal.description}</td>
                          <td className="py-3 px-4">{deal.opening}</td>
                          <td className="py-3 px-4">{deal.expectedClose}</td>
                          <td className="py-3 px-4">{deal.stage}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {deal.leadScore}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {deal.probability}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`font-semibold ${deal.stall === "Yes" ? "text-orange-600" : "text-green-600"}`}
                            >
                              {deal.stall}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs">{deal.playbook}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Cold Leads Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <CardTitle>
                    ❄ Cold Leads (Low Conversion Probability - Nurturing)
                  </CardTitle>
                </div>
                <CardDescription>
                  Outreach and early engagement stage - requires nurturing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold">
                          Company Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Deal Description
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Opening Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Expected Close
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Pipeline Stage
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          AI Lead Score
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Deal Probability
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Stall?
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          AI Rescue Playbook
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          company: "AlphaPrint",
                          description: "Printer Leasing Proposal",
                          opening: "2024-12-22",
                          expectedClose: "2025-04-15",
                          stage: "Outreach Attempted",
                          leadScore: 25,
                          probability: 9,
                          stall: "Yes",
                          playbook: "'Dormant Lead Recovery Script'",
                        },
                        {
                          company: "Urban Boutique",
                          description: "Website Revamp",
                          opening: "2025-01-02",
                          expectedClose: "2025-04-01",
                          stage: "Unresponsive",
                          leadScore: 31,
                          probability: 12,
                          stall: "Yes",
                          playbook: "'Soft Re-open Offer + Discount'",
                        },
                        {
                          company: "RapidFoods",
                          description: "Delivery App Integration",
                          opening: "2025-01-14",
                          expectedClose: "2025-05-20",
                          stage: "No Response Yet",
                          leadScore: 28,
                          probability: 7,
                          stall: "No",
                          playbook: "'Reminder + Value Proposition Summary'",
                        },
                      ].map((deal, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{deal.company}</td>
                          <td className="py-3 px-4">{deal.description}</td>
                          <td className="py-3 px-4">{deal.opening}</td>
                          <td className="py-3 px-4">{deal.expectedClose}</td>
                          <td className="py-3 px-4">{deal.stage}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-blue-100 text-blue-800">
                              {deal.leadScore}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-blue-100 text-blue-800">
                              {deal.probability}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`font-semibold ${deal.stall === "Yes" ? "text-red-600" : "text-green-600"}`}
                            >
                              {deal.stall}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs">{deal.playbook}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            {/* Channel Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Select Engagement Channel
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    id: "whatsapp",
                    name: "WhatsApp",
                    icon: <MessageCircle className="h-8 w-8 text-green-600" />,
                    color: "border-green-300 bg-green-50",
                  },
                  {
                    id: "sms",
                    name: "SMS",
                    icon: (
                      <MessageSquareDot className="h-8 w-8 text-blue-600" />
                    ),
                    color: "border-blue-300 bg-blue-50",
                  },
                  {
                    id: "email",
                    name: "Email",
                    icon: <Mail className="h-8 w-8 text-red-600" />,
                    color: "border-red-300 bg-red-50",
                  },
                  {
                    id: "linkedin",
                    name: "LinkedIn",
                    icon: <Linkedin className="h-8 w-8 text-blue-700" />,
                    color: "border-blue-400 bg-blue-100",
                  },
                ].map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedChannel === channel.id
                        ? `${channel.color} border-solid shadow-lg scale-105`
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {channel.icon}
                      <span className="font-semibold text-sm">
                        {channel.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedChannel === "whatsapp" && "WhatsApp Engagement"}
                  {selectedChannel === "sms" && "SMS Engagement"}
                  {selectedChannel === "email" && "Email Engagement"}
                  {selectedChannel === "linkedin" && "LinkedIn Engagement"}
                </CardTitle>
                <CardDescription>
                  Engagement metrics by contact for the selected channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Company
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Deal Description
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Avg Response Rate
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Avg Response Time
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Engagement Score
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Follow-up Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedChannel === "whatsapp"
                        ? [
                            {
                              name: "Ahmed Hassan",
                              company: "ZenithTech Ltd",
                              dealDescription: "50 Laptops Supply Contract",
                              avgResponseRate: "95%",
                              avgResponseTime: "8 min",
                              engagementScore: 9.2,
                              followUpRate: "100%",
                            },
                            {
                              name: "Fatima Ali",
                              company: "PrimeFoods PLC",
                              dealDescription: "Packaging Automation Upgrade",
                              avgResponseRate: "88%",
                              avgResponseTime: "15 min",
                              engagementScore: 8.7,
                              followUpRate: "94%",
                            },
                            {
                              name: "John Smith",
                              company: "Star Transport Co.",
                              dealDescription: "Fleet Tracking Subscription",
                              avgResponseRate: "72%",
                              avgResponseTime: "2.5 hours",
                              engagementScore: 7.1,
                              followUpRate: "78%",
                            },
                          ]
                        : selectedChannel === "email"
                          ? [
                              {
                                name: "Sarah Johnson",
                                company: "GreenMart Stores",
                                dealDescription: "POS + Inventory SaaS",
                                avgResponseRate: "68%",
                                avgResponseTime: "4 hours",
                                engagementScore: 7.4,
                                followUpRate: "82%",
                              },
                              {
                                name: "Michael Brown",
                                company: "CraftBuild Ltd",
                                dealDescription: "Supplier Workflow System",
                                avgResponseRate: "52%",
                                avgResponseTime: "6 hours",
                                engagementScore: 6.2,
                                followUpRate: "65%",
                              },
                              {
                                name: "Lisa Chen",
                                company: "NextGen Autos",
                                dealDescription: "CRM Deployment",
                                avgResponseRate: "61%",
                                avgResponseTime: "5.2 hours",
                                engagementScore: 6.9,
                                followUpRate: "71%",
                              },
                            ]
                          : selectedChannel === "sms"
                            ? [
                                {
                                  name: "David Wilson",
                                  company: "AlphaPrint",
                                  dealDescription: "Printer Leasing Proposal",
                                  avgResponseRate: "75%",
                                  avgResponseTime: "12 min",
                                  engagementScore: 7.8,
                                  followUpRate: "88%",
                                },
                                {
                                  name: "Emma Davis",
                                  company: "Urban Boutique",
                                  dealDescription: "Website Revamp",
                                  avgResponseRate: "58%",
                                  avgResponseTime: "35 min",
                                  engagementScore: 6.3,
                                  followUpRate: "69%",
                                },
                                {
                                  name: "Robert Garcia",
                                  company: "RapidFoods",
                                  dealDescription: "Delivery App Integration",
                                  avgResponseRate: "81%",
                                  avgResponseTime: "20 min",
                                  engagementScore: 8.4,
                                  followUpRate: "91%",
                                },
                              ]
                            : [
                                {
                                  name: "James Anderson",
                                  company: "TechVision Inc",
                                  dealDescription: "Enterprise Software Suite",
                                  avgResponseRate: "45%",
                                  avgResponseTime: "8 hours",
                                  engagementScore: 5.8,
                                  followUpRate: "52%",
                                },
                                {
                                  name: "Rachel Moore",
                                  company: "Digital Solutions LLC",
                                  dealDescription: "Cloud Migration Services",
                                  avgResponseRate: "62%",
                                  avgResponseTime: "6 hours",
                                  engagementScore: 7.2,
                                  followUpRate: "74%",
                                },
                                {
                                  name: "Christopher Lee",
                                  company: "Innovation Labs",
                                  dealDescription: "AI Implementation Project",
                                  avgResponseRate: "71%",
                                  avgResponseTime: "4 hours",
                                  engagementScore: 8.1,
                                  followUpRate: "85%",
                                },
                              ]
                      ).map((contact, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            {contact.name}
                          </td>
                          <td className="py-3 px-4">{contact.company}</td>
                          <td className="py-3 px-4">
                            {contact.dealDescription}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-green-100 text-green-800">
                              {contact.avgResponseRate}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center text-sm">
                            {contact.avgResponseTime}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-blue-100 text-blue-800">
                              {contact.engagementScore}/10
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-purple-100 text-purple-800">
                              {contact.followUpRate}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Automated Engagement & CRM Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Automated Engagement & CRM</CardTitle>
                <CardDescription>
                  Overall engagement statistics and automation metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-4">Channel Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">WhatsApp</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-5/6"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SMS</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-4/6"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Email</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full w-3/5"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LinkedIn</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-700 h-2 rounded-full w-2/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-4">Follow-up Stats</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Automated Triggers</span>
                          <span className="font-semibold">2,847</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Response Rate</span>
                          <span className="font-semibold">72%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg Response Time</span>
                          <span className="font-semibold">2.1 hours</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conversion from Engagement</span>
                          <span className="font-semibold">34%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Targets Tab */}
          <TabsContent value="targets" className="space-y-6">
            {/* Sales Rep Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Select Sales Representative
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "sarah", name: "Sarah Johnson", achievement: 125 },
                  { id: "mike", name: "Mike Chen", achievement: 118 },
                  { id: "lisa", name: "Lisa Rodriguez", achievement: 95 },
                  { id: "john", name: "John Davis", achievement: 108 },
                ].map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => setSelectedSalesRep(rep.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSalesRep === rep.id
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {rep.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{rep.name}</p>
                        <p
                          className={`text-xs font-bold ${
                            rep.achievement >= 100
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {rep.achievement}%
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sales Rep Target Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedSalesRep === "sarah" &&
                    "Sarah Johnson - Target Tracking"}
                  {selectedSalesRep === "mike" && "Mike Chen - Target Tracking"}
                  {selectedSalesRep === "lisa" &&
                    "Lisa Rodriguez - Target Tracking"}
                  {selectedSalesRep === "john" &&
                    "John Davis - Target Tracking"}
                </CardTitle>
                <CardDescription>
                  Comprehensive target achievement and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold">
                          Target Period
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Target ($)
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Achieved ($)
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Achievement %
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Status
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Deals Closed
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Avg Deal Size
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          AI Recommendation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedSalesRep === "sarah"
                        ? [
                            {
                              period: "January",
                              target: 50000,
                              achieved: 62500,
                              deals: 5,
                              avgDealSize: 12500,
                              recommendation:
                                "Maintain momentum - top performer",
                            },
                            {
                              period: "February",
                              target: 50000,
                              achieved: 50000,
                              deals: 4,
                              avgDealSize: 12500,
                              recommendation: "On track - focus on pipeline",
                            },
                            {
                              period: "March (YTD)",
                              target: 150000,
                              achieved: 112500,
                              deals: 9,
                              avgDealSize: 12500,
                              recommendation:
                                "75% completion - increase outreach",
                            },
                          ]
                        : selectedSalesRep === "mike"
                          ? [
                              {
                                period: "January",
                                target: 50000,
                                achieved: 59000,
                                deals: 4,
                                avgDealSize: 14750,
                                recommendation: "Performing above average",
                              },
                              {
                                period: "February",
                                target: 50000,
                                achieved: 55000,
                                deals: 3,
                                avgDealSize: 18333,
                                recommendation:
                                  "Lower volume but higher value deals",
                              },
                              {
                                period: "March (YTD)",
                                target: 150000,
                                achieved: 114000,
                                deals: 7,
                                avgDealSize: 16286,
                                recommendation:
                                  "76% completion - focus on closing stalled deals",
                              },
                            ]
                          : selectedSalesRep === "lisa"
                            ? [
                                {
                                  period: "January",
                                  target: 50000,
                                  achieved: 45000,
                                  deals: 3,
                                  avgDealSize: 15000,
                                  recommendation:
                                    "Below target - needs support",
                                },
                                {
                                  period: "February",
                                  target: 50000,
                                  achieved: 50000,
                                  deals: 3,
                                  avgDealSize: 16667,
                                  recommendation: "Met minimum target",
                                },
                                {
                                  period: "March (YTD)",
                                  target: 150000,
                                  achieved: 95000,
                                  deals: 6,
                                  avgDealSize: 15833,
                                  recommendation:
                                    "63% completion - coaching program recommended",
                                },
                              ]
                            : [
                                {
                                  period: "January",
                                  target: 50000,
                                  achieved: 54000,
                                  deals: 4,
                                  avgDealSize: 13500,
                                  recommendation:
                                    "Solid performer - consistent results",
                                },
                                {
                                  period: "February",
                                  target: 50000,
                                  achieved: 50000,
                                  deals: 3,
                                  avgDealSize: 16667,
                                  recommendation: "At target with larger deals",
                                },
                                {
                                  period: "March (YTD)",
                                  target: 150000,
                                  achieved: 104000,
                                  deals: 7,
                                  avgDealSize: 14857,
                                  recommendation:
                                    "69% completion - push for final stretch",
                                },
                              ]
                      ).map((target, idx) => {
                        const achievement =
                          (target.achieved / target.target) * 100;
                        const isAchieved = achievement >= 100;
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">
                              {target.period}
                            </td>
                            <td className="py-3 px-4 text-center">
                              ${(target.target / 1000).toFixed(0)}K
                            </td>
                            <td className="py-3 px-4 text-center font-semibold">
                              ${(target.achieved / 1000).toFixed(0)}K
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Badge
                                  className={
                                    isAchieved
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {achievement.toFixed(0)}%
                                </Badge>
                                {isAchieved && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge
                                variant={isAchieved ? "default" : "secondary"}
                              >
                                {isAchieved ? "✓ Achieved" : "In Progress"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center font-semibold">
                              {target.deals}
                            </td>
                            <td className="py-3 px-4 text-center text-sm">
                              ${(target.avgDealSize / 1000).toFixed(1)}K
                            </td>
                            <td className="py-3 px-4 text-xs">
                              <div className="flex items-start gap-1">
                                <Lightbulb className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <span>{target.recommendation}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Overall Team Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Team Target Summary</CardTitle>
                <CardDescription>
                  Overall team performance across all periods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Total Team Target
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$600K</p>
                    <p className="text-xs text-gray-500 mt-2">Q1 Total</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50">
                    <p className="text-sm text-gray-600 mb-1">Total Achieved</p>
                    <p className="text-2xl font-bold text-green-700">$425.5K</p>
                    <p className="text-xs text-green-600 mt-2">
                      71% Completion
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Top Performer</p>
                    <p className="text-2xl font-bold text-blue-700">Sarah</p>
                    <p className="text-xs text-blue-600 mt-2">
                      125% Achievement
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Avg Team Achievement
                    </p>
                    <p className="text-2xl font-bold text-purple-700">111%</p>
                    <p className="text-xs text-purple-600 mt-2">Above Target</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Assets & Marketing Intelligence</CardTitle>
                <CardDescription>
                  Auto-generated proposals, marketing channel effectiveness, and
                  lead source attribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-4">Generated Assets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Proposals</p>
                          <p className="text-sm text-gray-600">
                            Auto-generated
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">156</p>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Quotations</p>
                          <p className="text-sm text-gray-600">
                            Customized pricing
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">89</p>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Pitch Decks</p>
                          <p className="text-sm text-gray-600">Interactive</p>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">43</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-4">Lead Sources</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Website</span>
                          <span className="font-semibold">42%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Social Media</span>
                          <span className="font-semibold">28%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Email Campaign</span>
                          <span className="font-semibold">18%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Referrals</span>
                          <span className="font-semibold">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights Engine & AI Sales Coaching</CardTitle>
                <CardDescription>
                  Data-driven insights, top performer analysis, and personalized
                  coaching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Top Performers
                    </h4>
                    <div className="space-y-2">
                      {["Sarah Johnson", "Mike Chen", "Lisa Rodriguez"].map(
                        (name) => (
                          <div
                            key={name}
                            className="text-sm flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            {name}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-orange-600">•</span>
                        Follow-up consistency
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-600">•</span>
                        Deal closure rate
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-600">•</span>
                        Customer retention
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      AI Coaching Tips
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">→</span>
                        Use power words in emails
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">→</span>
                        Schedule calls earlier
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">→</span>
                        Personalize 1st contact
                      </li>
                    </ul>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Weekly Insights Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                          Team improved follow-up response rate by 12%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>
                          Deal cycle time is 3 days longer than last month
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Conversion rate trending upward (+8%)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Strategic Recommendations Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Strategic Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Focus on Pipeline Expansion
                    </h4>
                    <p className="text-sm text-gray-600">
                      Current pipeline is healthy but needs more top-of-funnel
                      activity to maintain growth
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Implement Deal Rescue Playbooks
                    </h4>
                    <p className="text-sm text-gray-600">
                      3 deals at risk detected. Using AI-recommended
                      intervention strategies can recover $180K
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Personalized Coaching for Mid-Tier Reps
                    </h4>
                    <p className="text-sm text-gray-600">
                      John and Lisa can reach top performer status with focused
                      1-on-1 coaching
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Action Items</h4>
              <ul className="space-y-2">
                {[
                  "Increase daily prospecting activity by 25%",
                  "Implement automated follow-up for warm leads",
                  "Launch sales enablement training program",
                  "Optimize proposal turnaround time to < 24 hours",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesIntelligence;
