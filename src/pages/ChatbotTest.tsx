import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, TrendingUp } from "lucide-react";
import { generateAIResponse } from "@/lib/ai";
import { getAllAppData, formatContextForPrompt } from "@/lib/app-context";
import {
  ECONOMIST_SAMPLE_QUESTIONS,
  ECONOMIST_CAPABILITIES,
} from "@/lib/economist-prompts";
import type { ChatMessage } from "@/lib/chatbot-data";

export default function ChatbotTest() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "I'm Joseph, your Expert Macro and Micro Business Economist. I deliver DEFINITIVE economic analysis and CONFIDENT business recommendations - not suggestions. I analyze your business data and market indicators to provide exact profit improvement targets, specific cost reduction amounts, optimal pricing levels, and concrete risk mitigation strategies. Ask me for definitive advice on maximizing profitability, eliminating losses, and optimizing operations with precision.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appDataReady, setAppDataReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load app context when component mounts
    const context = getAllAppData();
    setAppDataReady(true);
    console.log("App Context Loaded:", context);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `u_${Date.now()}`,
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMessage];
      const response = await generateAIResponse(history, {
        // Uses the economist system prompt automatically when system is not specified
        includeAppContext: true,
        performWebSearch: true,
      });

      if (response) {
        const assistantMessage: ChatMessage = {
          id: `a_${Date.now()}`,
          type: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        type: "assistant",
        content:
          "Sorry, I encountered an error generating a response. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Enhanced Chatbot Test</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Joseph AI with app context and web search
              </p>
            </div>
            <Badge variant={appDataReady ? "default" : "secondary"}>
              {appDataReady ? "✓ Ready" : "Loading..."}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your business..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          Joseph's Definitive Profit Analysis:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ <strong>Exactly</strong> which operations are unprofitable and what to do</li>
          <li>✓ <strong>Precise</strong> optimal price points and revenue impact</li>
          <li>✓ <strong>Specific</strong> cost reduction targets with amounts</li>
          <li>✓ <strong>Definitive</strong> profitability ranking by customer segment</li>
          <li>✓ <strong>Concrete</strong> economic risks and mitigation actions</li>
          <li>✓ <strong>Quantified</strong> impact analysis with exact figures</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2">
          Ask Joseph for Definitive Answers:
        </h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• "Which operations must I eliminate immediately and why?"</li>
          <li>• "What is my exact profit-maximizing price point?"</li>
          <li>• "Identify every cost I can eliminate and the exact savings"</li>
          <li>• "Rank my customer segments - which are destroying value?"</li>
          <li>• "Calculate the exact impact of interest rates on my profit"</li>
          <li>• "What are my priority actions to maximize profitability?"</li>
        </ul>
      </div>
    </div>
  );
}
