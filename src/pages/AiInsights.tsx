import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModuleHeader from "@/components/ui/module-header";
import {
  Brain,
  Send,
  Paperclip,
  Mic,
  Copy,
  Share2,
  Sparkles,
  Heart,
  MessageCircle,
} from "lucide-react";

interface AdviceMessage {
  id: string;
  moduleId: string;
  moduleName: string;
  moduleIcon: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ModuleInfo {
  id: string;
  module: string;
  moduleKey: string;
  icon: string;
  color: string;
}

const AdviceHub = () => {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("all");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [readAdvices, setReadAdvices] = useState<string[]>([]);
  const [adviceMessages, setAdviceMessages] = useState<AdviceMessage[]>([
    {
      id: "msg-1",
      moduleId: "module-1",
      moduleName: "Sales Strategy",
      moduleIcon: "📈",
      content:
        "Focus on the top 3 accounts in your pipeline representing 45% of potential revenue. Implement daily check-ins for these deals and assign a dedicated account manager. This approach has shown a 23% improvement in close rates.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-2",
      moduleId: "module-2",
      moduleName: "Lead Management",
      moduleIcon: "🎯",
      content:
        "3 deals at risk detected in your pipeline. Recommended rescue strategy: Send personalized value ROI summary + decision reminder within 24 hours. Success rate: 68% for similar scenarios. Total recoverable value: $180K.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-3",
      moduleId: "module-3",
      moduleName: "Customer Engagement",
      moduleIcon: "🤝",
      content:
        "Your engagement score on WhatsApp is 95% vs 52% on Email. Reallocate 30% of email budget to WhatsApp campaigns. Projected additional revenue: $125K over Q2.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-4",
      moduleId: "module-4",
      moduleName: "Revenue Optimization",
      moduleIcon: "💰",
      content:
        "Customer retention insight: Customers acquired through referrals have 42% higher lifetime value. Create referral incentive program with 15% discount. ROI projection: 340% within 6 months.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "msg-5",
      moduleId: "module-5",
      moduleName: "Pipeline Management",
      moduleIcon: "📊",
      content:
        "Pipeline health score: 8.5/10. Two key risks identified: Deal closure rate declining and average deal size trending down. Recommend immediate intervention.",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-6",
      moduleId: "module-6",
      moduleName: "Team Coaching",
      moduleIcon: "🎓",
      content:
        "Mike Chen shows potential to reach top performer status. His deal size is 23% higher than team average. Focus coaching on follow-up consistency. Expected improvement: 15% in closing ratio.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-7",
      moduleId: "module-7",
      moduleName: "Forecasting",
      moduleIcon: "📈",
      content:
        "Q2 projection: You'll achieve 82% of target by month-end. Action needed: Increase prospecting activity by 25% to hit 100%. Focus on Enterprise segment (4.2x higher deal value).",
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "msg-8",
      moduleId: "module-8",
      moduleName: "Risk Management",
      moduleIcon: "⚠️",
      content:
        "Risk alert: 2 key customers showing reduced engagement (30% below average). Schedule executive check-ins this week. Retention probability with intervention: 78%.",
      timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-9",
      moduleId: "module-9",
      moduleName: "Performance Analytics",
      moduleIcon: "📉",
      content:
        "Team performance dashboard: Overall win rate improved to 34% (+5% vs last month). Top performer: Sarah Johnson at 125% target achievement. Continue current strategy.",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "msg-10",
      moduleId: "module-10",
      moduleName: "Market Insights",
      moduleIcon: "🌍",
      content:
        "Market analysis: 3 emerging opportunities identified in untapped segments. Combined addressable market: $8.5M. Recommended approach: Pilot program with 2-week test.",
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: "msg-11",
      moduleId: "module-11",
      moduleName: "Proposal Generation",
      moduleIcon: "📄",
      content:
        "Lisa Rodriguez - Proposal turnaround: Currently 3.2 days vs team average of 1.8 days. AI proposal generator can reduce to <24 hours. Expected win rate improvement: 12%.",
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "msg-12",
      moduleId: "module-12",
      moduleName: "CRM Intelligence",
      moduleIcon: "💎",
      content:
        "CRM data quality score: 76%. Recommendation: Clean duplicate contacts (342 found) and update 18% of records missing key fields. Estimated impact on forecasting accuracy: +8%.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: false,
    },
  ]);
  const messagesEndRef = useRef(null);

  const modules: ModuleInfo[] = [
    { id: "module-1", module: "Sales Strategy", moduleKey: "sales", icon: "📈", color: "from-blue-400 to-blue-600" },
    { id: "module-2", module: "Lead Management", moduleKey: "leads", icon: "🎯", color: "from-green-400 to-green-600" },
    { id: "module-3", module: "Customer Engagement", moduleKey: "engagement", icon: "🤝", color: "from-purple-400 to-purple-600" },
    { id: "module-4", module: "Revenue Optimization", moduleKey: "revenue", icon: "💰", color: "from-yellow-400 to-yellow-600" },
    { id: "module-5", module: "Pipeline Management", moduleKey: "pipeline", icon: "📊", color: "from-red-400 to-red-600" },
    { id: "module-6", module: "Team Coaching", moduleKey: "coaching", icon: "🎓", color: "from-indigo-400 to-indigo-600" },
    { id: "module-7", module: "Forecasting", moduleKey: "forecast", icon: "📈", color: "from-cyan-400 to-cyan-600" },
    { id: "module-8", module: "Risk Management", moduleKey: "risk", icon: "⚠️", color: "from-orange-400 to-orange-600" },
    { id: "module-9", module: "Performance Analytics", moduleKey: "analytics", icon: "📉", color: "from-teal-400 to-teal-600" },
    { id: "module-10", module: "Market Insights", moduleKey: "market", icon: "🌍", color: "from-pink-400 to-pink-600" },
    { id: "module-11", module: "Proposal Generation", moduleKey: "proposals", icon: "📄", color: "from-lime-400 to-lime-600" },
    { id: "module-12", module: "CRM Intelligence", moduleKey: "crm", icon: "💎", color: "from-violet-400 to-violet-600" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [adviceMessages]);

  const filteredMessages =
    selectedModuleFilter === "all"
      ? adviceMessages
      : adviceMessages.filter((m) => m.moduleId === selectedModuleFilter);

  const unreadMessages = adviceMessages.filter((m) => !m.isRead);
  const unreadCount = unreadMessages.length;

  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleFilter(selectedModuleFilter === moduleId ? "all" : moduleId);
  };

  const markAsRead = (messageId: string) => {
    setAdviceMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg))
    );
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: AdviceMessage = {
      id: Date.now().toString(),
      moduleId: selectedModuleFilter,
      moduleName: selectedModuleFilter === "all" ? "General" : modules.find((m) => m.id === selectedModuleFilter)?.module || "General",
      moduleIcon: selectedModuleFilter === "all" ? "💬" : modules.find((m) => m.id === selectedModuleFilter)?.icon || "💬",
      content: inputMessage,
      timestamp: new Date(),
      isRead: true,
    };

    setAdviceMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const josephResponses = [
        "That's an excellent observation. Based on the current metrics, I recommend prioritizing this approach for optimal results.",
        "I've analyzed your input and cross-referenced it with the data. This aligns well with the recommended strategy.",
        "Great question. The data strongly supports this direction. Would you like me to provide more detailed implementation steps?",
        "I see what you're getting at. This is consistent with the trends we're observing. Let me help you with the next steps.",
        "Excellent thinking. This complements the existing insights perfectly. Shall I create a specific action plan?",
      ];

      const response: AdviceMessage = {
        id: (Date.now() + 1).toString(),
        moduleId: selectedModuleFilter,
        moduleName: selectedModuleFilter === "all" ? "Joseph AI" : modules.find((m) => m.id === selectedModuleFilter)?.module || "Joseph AI",
        moduleIcon: "🤖",
        content: josephResponses[Math.floor(Math.random() * josephResponses.length)],
        timestamp: new Date(),
        isRead: true,
      };

      setAdviceMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

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

      {/* Module Circles Section - Always Visible */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Module Updates</h2>
              <p className="text-sm text-gray-600">
                {unreadCount === 0 ? "All advice read" : `${unreadCount} new advice`}
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          {/* Horizontal Scrollable Circles */}
          <div className="flex gap-6 overflow-x-auto pb-2">
            {/* All Button */}
            <button
              onClick={() => setSelectedModuleFilter("all")}
              className={`flex-shrink-0 focus:outline-none group transition-all ${
                selectedModuleFilter === "all" ? "scale-110" : ""
              }`}
            >
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  selectedModuleFilter === "all"
                    ? "bg-gradient-to-br from-gray-400 to-gray-600 ring-4 ring-offset-2 ring-offset-white ring-blue-400"
                    : "bg-gradient-to-br from-gray-300 to-gray-500"
                }`}
              >
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-center text-xs font-medium text-gray-700 mt-3">All</p>
            </button>

            {modules.map((module) => {
              const moduleUnread = adviceMessages.filter(
                (m) => m.moduleId === module.id && !m.isRead
              );
              const hasUnread = moduleUnread.length > 0;
              const isSelected = selectedModuleFilter === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className="flex-shrink-0 focus:outline-none group transition-all"
                >
                  <div
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? `bg-gradient-to-br ${module.color} ring-4 ring-offset-2 ring-offset-white ring-blue-400 scale-110`
                        : hasUnread
                          ? `bg-gradient-to-br ${module.color} ring-4 ring-offset-2 ring-offset-white ring-yellow-400`
                          : `bg-gradient-to-br ${module.color}`
                    }`}
                  >
                    <span className="text-4xl">{module.icon}</span>

                    {/* Unread Indicator Dot */}
                    {hasUnread && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>

                  <p className="text-center text-xs font-medium text-gray-700 mt-3 group-hover:text-gray-900 transition-colors truncate w-24">
                    {module.module.split(" ")[0]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages Feed - Facebook Messenger Style */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">No messages</p>
              <p className="text-xs text-gray-500">Check back soon for updates</p>
            </div>
          ) : (
            filteredMessages.map((message) => {
              const isJoseph = message.moduleIcon === "🤖";
              const unread = !message.isRead;

              return (
                <div
                  key={message.id}
                  onClick={() => {
                    if (unread) markAsRead(message.id);
                  }}
                  className={`flex gap-3 transition-all ${isJoseph ? "" : "justify-end"} cursor-pointer group`}
                >
                  {/* Joseph/Module Avatar */}
                  {!isJoseph && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        U
                      </div>
                    </div>
                  )}

                  {isJoseph && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`max-w-2xl ${isJoseph ? "" : "order-first"}`}>
                    {/* Message Group Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${unread ? "text-gray-900" : "text-gray-600"}`}>
                        {isJoseph ? "Joseph AI" : "You"}
                      </span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 transition-all ${
                        isJoseph
                          ? "bg-white border border-gray-200 shadow-sm"
                          : "bg-blue-600 text-white"
                      } ${unread ? "ring-1 ring-yellow-400" : ""}`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Action Buttons (hover) */}
                    {isJoseph && (
                      <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-6 p-1">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 p-1">
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 p-1">
                          <Heart className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {isJoseph && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500"></div>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <div className="relative border border-gray-200 rounded-2xl bg-white shadow-sm">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask Joseph anything about this advice..."
                  className="w-full p-4 pr-20 resize-none border-0 focus:ring-0 focus:outline-none rounded-2xl"
                  rows={1}
                  style={{
                    minHeight: "52px",
                    maxHeight: "200px",
                    height: "auto",
                  }}
                />

                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="h-12 w-12 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceHub;
