import React, { useState } from "react";
import { ChevronDown, Zap, ShoppingCart, TrendingUp, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface AgentCreditsProps {
  creditBalance?: number;
  className?: string;
}

export function AgentCredits({
  creditBalance = 1500,
  className,
}: AgentCreditsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("balance");

  return (
    <div className={cn("w-full px-4 py-3", className)}>
      {/* Header - Blue Box with Credit Balance */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
          "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          "text-white font-semibold flex items-center justify-between group",
          "border border-blue-500/30",
        )}
      >
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-blue-200 group-hover:text-blue-100 transition-colors" />
          <div className="text-left">
            <div className="text-xs font-medium text-blue-100 uppercase tracking-wide">
              Agent Credits
            </div>
            <div className="text-lg font-bold text-white">
              {creditBalance.toLocaleString()} Credits
            </div>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-blue-200 transition-transform duration-200",
            isExpanded && "rotate-180",
          )}
        />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 animate-in fade-in slide-in-from-top-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1 bg-transparent p-0 h-auto mb-4">
              <TabsTrigger
                value="balance"
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-all",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=active]:shadow-md",
                  activeTab === "balance"
                    ? ""
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Balance</span>
              </TabsTrigger>

              <TabsTrigger
                value="buy"
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-all",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=active]:shadow-md",
                  activeTab === "buy"
                    ? ""
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800",
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Buy Credits</span>
              </TabsTrigger>

              <TabsTrigger
                value="upgrade"
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-all",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=active]:shadow-md",
                  activeTab === "upgrade"
                    ? ""
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800",
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Upgrade Plan</span>
              </TabsTrigger>

              <TabsTrigger
                value="analytics"
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-all",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=active]:shadow-md",
                  activeTab === "analytics"
                    ? ""
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Usage</span>
              </TabsTrigger>
            </TabsList>

            {/* Balance Tab */}
            <TabsContent value="balance" className="space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Current Balance
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {creditBalance.toLocaleString()}
                    </p>
                  </div>
                  <Zap className="h-12 w-12 text-blue-600/20" />
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="font-medium">Monthly Allocation:</span> 2,000
                    credits
                  </p>
                  <p>
                    <span className="font-medium">Used This Month:</span> 500
                    credits
                  </p>
                  <p>
                    <span className="font-medium">Renewal Date:</span> March 1, 2026
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Buy Credits Tab */}
            <TabsContent value="buy" className="space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Purchase additional credits for your account
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { amount: 500, price: "$9.99" },
                    { amount: 2000, price: "$29.99" },
                    { amount: 5000, price: "$69.99" },
                  ].map((pkg) => (
                    <div
                      key={pkg.amount}
                      className="border border-blue-200 dark:border-blue-800 rounded-lg p-3 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {pkg.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        credits
                      </p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                        {pkg.price}
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Proceed to Payment
                </Button>
              </div>
            </TabsContent>

            {/* Upgrade Plan Tab */}
            <TabsContent value="upgrade" className="space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Upgrade your plan for more credits and features
                </p>
                <div className="space-y-3">
                  {[
                    {
                      name: "Starter",
                      credits: "2,000/month",
                      price: "Free",
                      current: true,
                    },
                    {
                      name: "Professional",
                      credits: "10,000/month",
                      price: "$49/month",
                      current: false,
                    },
                    {
                      name: "Enterprise",
                      credits: "Unlimited",
                      price: "Custom",
                      current: false,
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={cn(
                        "p-3 rounded-lg border transition-all",
                        plan.current
                          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-600 dark:border-blue-500"
                          : "border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {plan.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {plan.credits}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600 dark:text-blue-400">
                            {plan.price}
                          </p>
                          {plan.current && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              Current Plan
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled
                >
                  Upgrade Plan
                </Button>
              </div>
            </TabsContent>

            {/* Usage Analytics Tab */}
            <TabsContent value="analytics" className="space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Analyze your credit usage patterns
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Usage by Feature
                    </p>
                    <div className="space-y-2">
                      {[
                        { feature: "AI Insights", percentage: 40, used: 200 },
                        { feature: "Reports", percentage: 30, used: 150 },
                        { feature: "Analysis", percentage: 20, used: 100 },
                        { feature: "Other", percentage: 10, used: 50 },
                      ].map((item) => (
                        <div key={item.feature}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {item.feature}
                            </span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                              {item.used} credits
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      This Month Summary
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                        <p className="text-slate-600 dark:text-slate-400">
                          Credits Used
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          500
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                        <p className="text-slate-600 dark:text-slate-400">
                          Remaining
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          1,500
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
