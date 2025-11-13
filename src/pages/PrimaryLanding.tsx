import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Globe,
  Shield,
} from "lucide-react";

export default function PrimaryLanding() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("joseph:signupEmail", email);
      navigate("/signup");
    }, 300);
  };

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Economic Intelligence",
      description: "Real-time insights into global economic trends and indicators",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Business Forecasting",
      description: "Predict revenue, growth, and business outcomes with precision",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Market Analysis",
      description: "Understand your competition and market positioning instantly",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategy Planning",
      description: "Develop data-driven strategies that actually work",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations from our Joseph AI assistant",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Your data is protected with enterprise-grade security",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      {/* Animated Liquidmetal Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient with royal blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

        {/* Animated liquid metal blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Radial light effect following mouse (Shopify-like) */}
        <div
          className="absolute pointer-events-none w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl transition-all duration-100"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-40 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Joseph</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-300 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <Button
            variant="outline"
            className="border-blue-500/50 text-white hover:bg-blue-500/10"
            onClick={() => navigate("/signup")}
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <div className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
                  <span className="text-sm text-blue-300 font-medium">
                    Powered by AI • Always Learning
                  </span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  Economic
                </span>{" "}
                Intelligence Platform
              </h1>

              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Make better business decisions with real-time economic insights,
                market intelligence, and AI-powered strategy recommendations.
              </p>
            </div>

            {/* Email Signup - Floating Style */}
            <div className="relative">
              <form onSubmit={handleEmailSignup} className="group">
                <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-blue-500/30 backdrop-blur-sm">
                  <div className="relative flex items-center bg-slate-900 rounded-full pr-1 pl-6 py-1 gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-0 text-white placeholder:text-gray-500 focus:outline-none"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full px-6 h-10 font-semibold flex items-center gap-2 transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
              <p className="text-sm text-gray-400 mt-3 text-center">
                Free for 14 days. No credit card required. Cancel anytime.
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-slate-950 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                Join 10,000+ businesses
              </span>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative h-96 lg:h-full min-h-96">
            {/* Animated cards showcase */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-96">
                {/* Card 1 */}
                <div className="absolute top-0 left-8 w-72 p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-md border border-blue-400/30 shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-float"
                  style={{ animationDelay: "0s" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-semibold text-white">
                      Revenue Growth
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text">
                    +34.2%
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Projected this quarter
                  </p>
                </div>

                {/* Card 2 */}
                <div className="absolute top-32 right-0 w-72 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 backdrop-blur-md border border-indigo-400/30 shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-float"
                  style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-white">
                      Market Position
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text">
                    Top 10%
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    In your market segment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to understand your market, optimize your strategy,
            and drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-400/20 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Sign Up",
              description: "Create your account in seconds and get started immediately",
            },
            {
              step: "02",
              title: "Connect Data",
              description: "Link your business data sources for real-time analysis",
            },
            {
              step: "03",
              title: "Get Insights",
              description: "Receive AI-powered recommendations and strategic guidance",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-400/20 backdrop-blur-sm h-full">
                <div className="text-4xl font-bold text-blue-400/50 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <ChevronRight className="w-8 h-8 text-blue-500/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <div className="relative p-12 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 border border-blue-400/30 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
          <div className="relative text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of companies using Joseph to make smarter business
              decisions
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full px-8 h-12 font-semibold inline-flex items-center gap-2 text-lg"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-400">
              14-day free trial • No credit card required • Full access to all
              features
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-500/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white">Joseph</span>
              </div>
              <p className="text-sm text-gray-400">
                Economic intelligence platform for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/10 pt-8">
            <p className="text-center text-sm text-gray-500">
              © 2024 Joseph. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </div>
  );
}
