import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ModuleHeader from "@/components/ui/module-header";
import { BarChart3 } from "lucide-react";
import KPIDashboard from "@/components/sales-intelligence/KPIDashboard";
import KPICategories from "@/components/sales-intelligence/KPICategories";
import CustomKPIBuilder from "@/components/sales-intelligence/CustomKPIBuilder";
import BenchmarkingSection from "@/components/sales-intelligence/BenchmarkingSection";
import KPIAlerts from "@/components/sales-intelligence/KPIAlerts";
import ExportReporting from "@/components/sales-intelligence/ExportReporting";

const KPIDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<BarChart3 className="h-6 w-6" />}
        title="KPI Dashboard"
        description="Comprehensive KPI tracking and analytics for sales performance monitoring. Track metrics, categories, custom KPIs, benchmarking, alerts, and generate reports."
        isConnected={true}
        lastUpdated={new Date()}
        onReconnect={() => {}}
        connectionLabel="Live"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="rounded-lg bg-muted p-1 flex flex-wrap gap-2 mb-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto gap-2">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Custom Builder
              </TabsTrigger>
              <TabsTrigger
                value="benchmarking"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Benchmarking
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Alerts
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Reports
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <KPIDashboard />
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <KPICategories />
            </TabsContent>

            {/* Custom Builder Tab */}
            <TabsContent value="custom" className="space-y-6">
              <CustomKPIBuilder />
            </TabsContent>

            {/* Benchmarking Tab */}
            <TabsContent value="benchmarking" className="space-y-6">
              <BenchmarkingSection />
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <KPIAlerts />
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <ExportReporting />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default KPIDashboardPage;
