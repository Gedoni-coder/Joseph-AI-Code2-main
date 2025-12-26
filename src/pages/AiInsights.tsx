import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModuleHeader from "@/components/ui/module-header";
import {
  Brain,
  Send,
  ArrowLeft,
  Paperclip,
  Mic,
  MoreVertical,
  Copy,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

interface ModuleAdvice {
  id: string;
  module: string;
  moduleKey: string;
  icon: string;
  color: string;
  hasUnread: boolean;
  latestAdvice: {
    message: string;
    timestamp: Date;
    id: string;
  };
  allAdvices: Array<{
    id: string;
    message: string;
    timestamp: Date;
  }>;
}

interface ChatMessage {
  id: string;
  role: "user" | "joseph";
  content: string;
  timestamp: Date;
}

const AdviceHub = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [readAdvices, setReadAdvices] = useState<string[]>([]);
  const messagesEndRef = useRef(null);

  const modules: ModuleAdvice[] = [
    {
      id: "module-1",
      module: "Sales Strategy",
      moduleKey: "sales",
      icon: "📈",
      color: "from-blue-400 to-blue-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-1",
        message:
          "Focus on the top 3 accounts in your pipeline representing 45% of potential revenue. Implement daily check-ins for these deals and assign a dedicated account manager. This approach has shown a 23% improvement in close rates.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-1",
          message:
            "Focus on the top 3 accounts in your pipeline representing 45% of potential revenue. Implement daily check-ins for these deals and assign a dedicated account manager. This approach has shown a 23% improvement in close rates.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-2",
      module: "Lead Management",
      moduleKey: "leads",
      icon: "🎯",
      color: "from-green-400 to-green-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-2",
        message:
          "3 deals at risk detected in your pipeline. Recommended rescue strategy: Send personalized value ROI summary + decision reminder within 24 hours. Success rate: 68% for similar scenarios. Total recoverable value: $180K.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-2",
          message:
            "3 deals at risk detected in your pipeline. Recommended rescue strategy: Send personalized value ROI summary + decision reminder within 24 hours. Success rate: 68% for similar scenarios. Total recoverable value: $180K.",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-3",
      module: "Customer Engagement",
      moduleKey: "engagement",
      icon: "🤝",
      color: "from-purple-400 to-purple-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-3",
        message:
          "Your engagement score on WhatsApp is 95% vs 52% on Email. Reallocate 30% of email budget to WhatsApp campaigns. Projected additional revenue: $125K over Q2.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-3",
          message:
            "Your engagement score on WhatsApp is 95% vs 52% on Email. Reallocate 30% of email budget to WhatsApp campaigns. Projected additional revenue: $125K over Q2.",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-4",
      module: "Revenue Optimization",
      moduleKey: "revenue",
      icon: "💰",
      color: "from-yellow-400 to-yellow-600",
      hasUnread: false,
      latestAdvice: {
        id: "advice-4",
        message:
          "Customer retention insight: Customers acquired through referrals have 42% higher lifetime value. Create referral incentive program with 15% discount.",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-4",
          message:
            "Customer retention insight: Customers acquired through referrals have 42% higher lifetime value. Create referral incentive program with 15% discount.",
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-5",
      module: "Pipeline Management",
      moduleKey: "pipeline",
      icon: "📊",
      color: "from-red-400 to-red-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-5",
        message:
          "Pipeline health score: 8.5/10. Two key risks identified: Deal closure rate declining and average deal size trending down. Recommend immediate intervention.",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-5",
          message:
            "Pipeline health score: 8.5/10. Two key risks identified: Deal closure rate declining and average deal size trending down. Recommend immediate intervention.",
          timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-6",
      module: "Team Coaching",
      moduleKey: "coaching",
      icon: "🎓",
      color: "from-indigo-400 to-indigo-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-6",
        message:
          "Mike Chen shows potential to reach top performer status. His deal size is 23% higher than team average. Focus coaching on follow-up consistency. Expected improvement: 15% in closing ratio.",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-6",
          message:
            "Mike Chen shows potential to reach top performer status. His deal size is 23% higher than team average. Focus coaching on follow-up consistency. Expected improvement: 15% in closing ratio.",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-7",
      module: "Forecasting",
      moduleKey: "forecast",
      icon: "📈",
      color: "from-cyan-400 to-cyan-600",
      hasUnread: false,
      latestAdvice: {
        id: "advice-7",
        message:
          "Q2 projection: You'll achieve 82% of target by month-end. Action needed: Increase prospecting activity by 25% to hit 100%. Focus on Enterprise segment (4.2x higher deal value).",
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-7",
          message:
            "Q2 projection: You'll achieve 82% of target by month-end. Action needed: Increase prospecting activity by 25% to hit 100%. Focus on Enterprise segment (4.2x higher deal value).",
          timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-8",
      module: "Risk Management",
      moduleKey: "risk",
      icon: "⚠️",
      color: "from-orange-400 to-orange-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-8",
        message:
          "Risk alert: 2 key customers showing reduced engagement (30% below average). Schedule executive check-ins this week. Retention probability with intervention: 78%.",
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-8",
          message:
            "Risk alert: 2 key customers showing reduced engagement (30% below average). Schedule executive check-ins this week. Retention probability with intervention: 78%.",
          timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-9",
      module: "Performance Analytics",
      moduleKey: "analytics",
      icon: "📉",
      color: "from-teal-400 to-teal-600",
      hasUnread: false,
      latestAdvice: {
        id: "advice-9",
        message:
          "Team performance dashboard: Overall win rate improved to 34% (+5% vs last month). Top performer: Sarah Johnson at 125% target achievement. Continue current strategy.",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-9",
          message:
            "Team performance dashboard: Overall win rate improved to 34% (+5% vs last month). Top performer: Sarah Johnson at 125% target achievement. Continue current strategy.",
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-10",
      module: "Market Insights",
      moduleKey: "market",
      icon: "🌍",
      color: "from-pink-400 to-pink-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-10",
        message:
          "Market analysis: 3 emerging opportunities identified in untapped segments. Combined addressable market: $8.5M. Recommended approach: Pilot program with 2-week test in highest-potential segment.",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-10",
          message:
            "Market analysis: 3 emerging opportunities identified in untapped segments. Combined addressable market: $8.5M. Recommended approach: Pilot program with 2-week test in highest-potential segment.",
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-11",
      module: "Proposal Generation",
      moduleKey: "proposals",
      icon: "📄",
      color: "from-lime-400 to-lime-600",
      hasUnread: false,
      latestAdvice: {
        id: "advice-11",
        message:
          "Lisa Rodriguez - Proposal turnaround: Currently 3.2 days vs team average of 1.8 days. AI proposal generator can reduce to <24 hours. Expected win rate improvement: 12%.",
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-11",
          message:
            "Lisa Rodriguez - Proposal turnaround: Currently 3.2 days vs team average of 1.8 days. AI proposal generator can reduce to <24 hours. Expected win rate improvement: 12%.",
          timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "module-12",
      module: "CRM Intelligence",
      moduleKey: "crm",
      icon: "💎",
      color: "from-violet-400 to-violet-600",
      hasUnread: true,
      latestAdvice: {
        id: "advice-12",
        message:
          "CRM data quality score: 76%. Recommendation: Clean duplicate contacts (342 found) and update 18% of records missing key fields. Estimated impact on forecasting accuracy: +8%.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      allAdvices: [
        {
          id: "advice-12",
          message:
            "CRM data quality score: 76%. Recommendation: Clean duplicate contacts (342 found) and update 18% of records missing key fields. Estimated impact on forecasting accuracy: +8%.",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ],
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    const module = modules.find((m) => m.id === moduleId);
    if (module && !readAdvices.includes(module.latestAdvice.id)) {
      setReadAdvices((prev) => [...prev, module.latestAdvice.id]);
    }
    setChatMessages([
      {
        id: "init-1",
        role: "joseph",
        content: module?.latestAdvice.message || "",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const josephResponses = [
        "That's a great question. Based on the data, I recommend focusing on this approach for the best results.",
        "I've analyzed your input. Here's what the metrics suggest: you should prioritize this action to see the most impact.",
        "Excellent observation. The data supports this direction. Would you like me to create a detailed action plan?",
        "I see your concern. Let me provide additional context: the data shows this is the optimal path forward.",
        "This aligns well with the current trends. Shall I provide more specific recommendations for implementation?",
      ];

      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "joseph",
        content: josephResponses[Math.floor(Math.random() * josephResponses.length)],
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const currentModule = modules.find((m) => m.id === selectedModule);
  const unreadCount = modules.filter((m) => m.hasUnread && !readAdvices.includes(m.latestAdvice.id))
    .length;

  if (selectedModule) {
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

        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModule(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-xl">{currentModule?.icon}</span>
                {currentModule?.module}
              </h2>
              <p className="text-xs text-gray-500">Latest advice</p>
            </div>
          </div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            🟢 Joseph Live
          </Badge>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "joseph" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                <div className={`max-w-xl ${message.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.role === "joseph" && (
                      <div className="flex items-center gap-1 ml-2">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Copy className="h-3 w-3 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Share2 className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-medium">
                      U
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t bg-white p-6 flex-shrink-0">
          <div className="max-w-2xl mx-auto">
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
                    placeholder="Ask Joseph for more details or follow-up advice..."
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
  }

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
      <div className="flex-1 overflow-hidden flex flex-col p-6">
        {/* Status Circles Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Module Updates</h2>
              <p className="text-sm text-gray-600">
                {unreadCount === 0 ? "All updates read" : `${unreadCount} new advice`}
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
            {modules.map((module) => {
              const isUnread = module.hasUnread && !readAdvices.includes(module.latestAdvice.id);

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleSelect(module.id)}
                  className="flex-shrink-0 focus:outline-none group transition-transform hover:scale-110"
                >
                  <div
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isUnread
                        ? `bg-gradient-to-br ${module.color} ring-4 ring-offset-2 ring-offset-white ring-yellow-400`
                        : `bg-gradient-to-br ${module.color}`
                    }`}
                  >
                    <span className="text-4xl">{module.icon}</span>

                    {/* Unread Indicator Dot */}
                    {isUnread && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>

                  {/* Module Name */}
                  <p className="text-center text-xs font-medium text-gray-700 mt-3 group-hover:text-gray-900 transition-colors">
                    {module.module.split(" ")[0]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">How it works</h3>
              <p className="text-sm text-blue-800">
                Click on any module circle to view the latest advice from Joseph AI. Colored rings indicate new advice
                awaiting your review. The rings disappear once you've read the advice. Click on a circle to open a chat
                conversation with Joseph about the specific advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceHub;
