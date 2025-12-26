import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModuleHeader from "@/components/ui/module-header";
import {
  Brain,
  Search,
  Pin,
  Archive,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Clock,
  MapPin,
  User,
  ChevronRight,
  X,
} from "lucide-react";

interface Advice {
  id: string;
  message: string;
  timestamp: Date;
  category: string;
  source: string; // Module/rep context
  avatar: string;
  isSaved: boolean;
  isPinned: boolean;
  reactions: {
    helpful: number;
    notHelpful: number;
  };
}

const AdviceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAdvices, setSavedAdvices] = useState<string[]>([]);
  const [pinnedAdvices, setPinnedAdvices] = useState<string[]>(["advice-1"]);

  const categories = [
    { id: "all", name: "All Advices", icon: "💬" },
    { id: "sales", name: "Sales Strategy", icon: "📈" },
    { id: "revenue", name: "Revenue Optimization", icon: "💰" },
    { id: "pipeline", name: "Pipeline Management", icon: "🎯" },
    { id: "engagement", name: "Customer Engagement", icon: "🤝" },
    { id: "coaching", name: "Team Coaching", icon: "🎓" },
    { id: "forecasting", name: "Forecasting", icon: "📊" },
    { id: "risk", name: "Risk Management", icon: "⚠️" },
  ];

  const mockAdvices: Advice[] = [
    {
      id: "advice-1",
      message:
        "For Sarah Johnson's team: Focus on the top 3 accounts in your pipeline representing 45% of potential revenue. Implement daily check-ins for these deals and assign a dedicated account manager. This approach has shown a 23% improvement in close rates.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "sales",
      source: "Sarah Johnson - Sales Rep",
      avatar: "SJ",
      isSaved: false,
      isPinned: true,
      reactions: { helpful: 12, notHelpful: 1 },
    },
    {
      id: "advice-2",
      message:
        "Revenue opportunity identified: Your engagement score on WhatsApp is 95% vs 52% on Email. Reallocate 30% of email budget to WhatsApp campaigns. Projected additional revenue: $125K over Q2.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: "revenue",
      source: "Engagement Analytics",
      avatar: "EA",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 8, notHelpful: 0 },
    },
    {
      id: "advice-3",
      message:
        "Mike Chen shows potential to reach top performer status. His deal size is 23% higher than team average. Coaching recommendation: Focus on follow-up consistency. Expected improvement: 15% in closing ratio within 30 days.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: "coaching",
      source: "Team Performance Analysis",
      avatar: "TP",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 5, notHelpful: 0 },
    },
    {
      id: "advice-4",
      message:
        "3 deals at risk detected in your pipeline. Recommended rescue strategy: Send personalized value ROI summary + decision reminder within 24 hours. Success rate: 68% for similar scenarios. Total recoverable value: $180K.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: "pipeline",
      source: "Lead Intelligence Module",
      avatar: "LI",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 15, notHelpful: 0 },
    },
    {
      id: "advice-5",
      message:
        "Customer retention insight: Customers acquired through referrals have 42% higher lifetime value. Recommendation: Create referral incentive program with 15% discount on next service. ROI projection: 340% within 6 months.",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      category: "engagement",
      source: "Marketing Intelligence",
      avatar: "MI",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 20, notHelpful: 0 },
    },
    {
      id: "advice-6",
      message:
        "Forecast alert: Based on current pipeline and conversion rates, you'll achieve 82% of Q2 target by month-end. Action required: Increase prospecting activity by 25% to hit 100% target. Recommended focus: Enterprise segment (4.2x higher deal value).",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: "forecasting",
      source: "Target Tracking Module",
      avatar: "TT",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 9, notHelpful: 0 },
    },
    {
      id: "advice-7",
      message:
        "Risk identified: 2 key customers showing reduced engagement (30% below average). Proactive measures: Schedule executive check-ins this week and offer service optimization review. Retention probability with intervention: 78%.",
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
      category: "risk",
      source: "Risk Management Engine",
      avatar: "RM",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 7, notHelpful: 0 },
    },
    {
      id: "advice-8",
      message:
        "Lisa Rodriguez - Performance boost opportunity: Your proposal turnaround time is 3.2 days vs team average of 1.8 days. Implementing the AI proposal generator can reduce this to <24 hours. Expected win rate improvement: 12%.",
      timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      category: "coaching",
      source: "Sales Assets Analysis",
      avatar: "SA",
      isSaved: false,
      isPinned: false,
      reactions: { helpful: 6, notHelpful: 0 },
    },
  ];

  const filteredAdvices = mockAdvices.filter((advice) => {
    const matchesCategory =
      selectedCategory === "all" || advice.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      advice.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advice.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedList = filteredAdvices.filter((a) => pinnedAdvices.includes(a.id));
  const unpinnedList = filteredAdvices.filter((a) => !pinnedAdvices.includes(a.id));

  const toggleSave = (adviceId: string) => {
    setSavedAdvices((prev) =>
      prev.includes(adviceId)
        ? prev.filter((id) => id !== adviceId)
        : [...prev, adviceId]
    );
  };

  const togglePin = (adviceId: string) => {
    setPinnedAdvices((prev) =>
      prev.includes(adviceId)
        ? prev.filter((id) => id !== adviceId)
        : [...prev, adviceId]
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const AdviceCard = ({ advice }: { advice: Advice }) => (
    <div className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-sm font-semibold flex items-center justify-center">
            {advice.avatar}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">{advice.source}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" />
              {formatTime(advice.timestamp)}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {categories.find((c) => c.id === advice.category)?.icon}{" "}
          {categories.find((c) => c.id === advice.category)?.name}
        </Badge>
      </div>

      {/* Message Bubble */}
      <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-gray-800 text-sm leading-relaxed">{advice.message}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSave(advice.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-xs ${
              savedAdvices.includes(advice.id)
                ? "bg-red-50 text-red-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={savedAdvices.includes(advice.id) ? "currentColor" : "none"}
            />
            Save
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded transition-colors text-xs text-gray-600 hover:bg-gray-100">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <button
            onClick={() => togglePin(advice.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-xs ${
              pinnedAdvices.includes(advice.id)
                ? "bg-yellow-50 text-yellow-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Pin
              className="h-3.5 w-3.5"
              fill={pinnedAdvices.includes(advice.id) ? "currentColor" : "none"}
            />
            Pin
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{advice.reactions.helpful} helpful</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ModuleHeader
        icon={<Brain className="h-6 w-6" />}
        title="Advice Hub"
        description="Repository of AI-powered advice and recommendations from Joseph AI"
        isConnected={true}
        lastUpdated={new Date()}
        connectionLabel="Live"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-4 p-4">
        {/* Left Sidebar */}
        <div className="w-72 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${
                    selectedCategory === category.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                  <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                    selectedCategory === category.id ? "opacity-100" : ""
                  }`}>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Total Advice</span>
                <span className="font-semibold">{mockAdvices.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Saved</span>
                <span className="font-semibold text-red-600">{savedAdvices.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pinned</span>
                <span className="font-semibold text-yellow-600">{pinnedAdvices.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="font-semibold text-gray-900">
              {categories.find((c) => c.id === selectedCategory)?.icon}{" "}
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {filteredAdvices.length} advice{filteredAdvices.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Advice Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Pinned Section */}
              {pinnedList.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 mb-3">
                    <Pin className="h-4 w-4 text-yellow-600" />
                    <span className="text-xs font-semibold text-gray-600">PINNED</span>
                  </div>
                  <div className="space-y-3">
                    {pinnedList.map((advice) => (
                      <AdviceCard key={advice.id} advice={advice} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Advice Section */}
              {unpinnedList.length > 0 && (
                <div>
                  {pinnedList.length > 0 && (
                    <div className="flex items-center gap-2 px-2 mb-3 mt-4">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-600">ALL ADVICE</span>
                    </div>
                  )}
                  <div className="space-y-3">
                    {unpinnedList.map((advice) => (
                      <AdviceCard key={advice.id} advice={advice} />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredAdvices.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600 font-medium mb-1">No advice found</p>
                  <p className="text-xs text-gray-500">
                    Try adjusting your search or category filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceHub;
