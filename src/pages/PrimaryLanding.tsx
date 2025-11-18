import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Globe,
  Shield,
  DollarSign,
  Truck,
  TrendingDown,
  Lock,
  Check,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function PrimaryLanding() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      alert("Thank you! We'll get back to you within 1 business day.");
    }, 500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0a1449] via-[#1a2555] to-[#0a1449]"
    >
      {/* Animated Liquidmetal Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1449] via-[#1a2555] to-[#0a1449]" />

        {/* Animated liquid metal blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4d7fd9] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3d6dc4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#2d5db9] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1449] via-transparent to-transparent" />

        {/* Radial light effect following mouse */}
        <div
          className="absolute pointer-events-none w-96 h-96 bg-gradient-radial from-[#4d7fd9]/15 to-transparent rounded-full blur-3xl transition-all duration-100"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-40 flex items-center justify-between px-6 lg:px-12 py-6 backdrop-blur-sm border-b border-[#4d7fd9]/10">
        <div className="text-2xl font-bold text-white">Joseph AI</div>

        <div className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-300 hover:text-[#4d7fd9] transition-colors font-medium"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-gray-300 hover:text-[#4d7fd9] transition-colors font-medium"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-300 hover:text-[#4d7fd9] transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-[#4d7fd9] transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        <Button
          className="bg-transparent border border-[#4d7fd9]/30 text-[#4d7fd9] hover:bg-[#4d7fd9]/10 hover:border-[#4d7fd9]/60 transition-all duration-300"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="text-center space-y-12">
          {/* Main Tagline */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="font-bold">Plan.</span>
              <span className="italic text-[#4d7fd9] ml-3">Decide.</span>
              <span className="font-bold text-white ml-3">Grow.</span>
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
              <div className="flex-1">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Agentic Economic Intelligence System built to guide businesses,
                  policymakers, and enterprises toward smarter financial, market,
                  and operational decisions. From micro to macro, Joseph helps you
                  grow sustainably — and drive real economic growth.
                </p>
              </div>

              {/* Floating Metrics Cards */}
              <div className="flex gap-6 flex-shrink-0 lg:ml-4">
                {/* Card 1 */}
                <div className="relative animate-float-card" style={{ animationDelay: '0s' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4d7fd9] to-[#3d6dc4] rounded-2xl blur-lg opacity-30 animate-pulse" />
                  <div className="relative w-32 h-40 px-4 py-6 rounded-2xl bg-gradient-to-br from-[#4d7fd9]/25 to-[#3d6dc4]/15 border border-[#4d7fd9]/50 backdrop-blur-md flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold text-[#4d7fd9] mb-2">📊</div>
                    <div className="text-xs font-semibold text-white leading-tight">Top 10 in competitive market</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative animate-float-card" style={{ animationDelay: '0.5s' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4d7fd9] to-[#3d6dc4] rounded-2xl blur-lg opacity-30 animate-pulse" />
                  <div className="relative w-32 h-40 px-4 py-6 rounded-2xl bg-gradient-to-br from-[#4d7fd9]/25 to-[#3d6dc4]/15 border border-[#4d7fd9]/50 backdrop-blur-md flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold text-[#4d7fd9] mb-2">📈</div>
                    <div className="text-xs font-semibold text-white leading-tight">100% Revenue growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Signup with Pricing Button */}
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-400 font-medium">Enter your email in the email box</p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <form onSubmit={handleEmailSignup} className="w-full lg:flex-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4d7fd9]/40 via-[#3d6dc4]/20 to-[#4d7fd9]/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center bg-[#0a1449]/80 border border-[#4d7fd9]/20 rounded-xl px-6 py-3.5 backdrop-blur-md hover:border-[#4d7fd9]/50 hover:bg-[#0a1449]/90 transition-all duration-300 shadow-lg hover:shadow-lg hover:shadow-[#4d7fd9]/10">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-0 text-white placeholder:text-gray-500/70 focus:outline-none text-base w-full"
                    required
                  />
                </div>
              </div>
            </form>

            <Button
              className="bg-transparent border border-[#4d7fd9]/30 text-white hover:bg-[#4d7fd9]/10 hover:border-[#4d7fd9]/60 rounded-lg px-6 h-12 font-semibold w-full lg:w-auto whitespace-nowrap transition-all duration-300"
              onClick={() => scrollToSection("pricing")}
            >
              View Plan and Pricing
            </Button>
          </div>
          </div>

          {/* CTA Button */}
          <div>
            <Button
              onClick={handleEmailSignup}
              disabled={isLoading || !email}
              className="bg-gradient-to-r from-[#4d7fd9] to-[#3d6dc4] hover:from-[#5d8fe9] hover:to-[#4d7dd4] text-white rounded-lg px-8 h-12 font-semibold inline-flex items-center gap-2 text-lg"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
            <p className="text-sm text-gray-400 mt-3">
              14-day free trial • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="space-y-16">
          {/* Intro */}
          <div className="text-center space-y-4">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Joseph AI connects data, insight, and action to help businesses
              grow smarter. Powered by Agentic AI.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Real-time Financial Insights",
                description:
                  "Analyze finance in real time with AI-powered analytics.",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Smart Pricing Optimization",
                description:
                  "Optimize revenue and pricing strategies intelligently.",
              },
              {
                icon: <TrendingDown className="w-8 h-8" />,
                title: "Loan & Funding Advisory",
                description:
                  "Access tools to help secure funding and manage loans.",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Predictive Supply Chain",
                description:
                  "AI-driven supply chain forecasting and optimization.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Policy & Market Forecasting",
                description:
                  "Predict market and policy trends with intelligence.",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Secure Data Management",
                description:
                  "Enterprise-grade security with continuous updates.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/15 to-[#3d6dc4]/10 border border-[#4d7fd9]/20 hover:border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#4d7fd9]/20"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#4d7fd9] to-[#3d6dc4] flex items-center justify-center text-white mb-4 group-hover:shadow-lg group-hover:shadow-[#4d7fd9]/50 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Plans and Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. From individual creators
              to enterprise teams, we have flexible pricing options to help you
              succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* FREE Plan */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/10 to-[#3d6dc4]/5 border border-[#4d7fd9]/20 hover:border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">FREE</h3>
              <p className="text-gray-300 text-sm mb-6">Get Started</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">$0</span>
                <span className="text-gray-400 text-sm ml-2">/month</span>
              </div>
              <Button className="w-full bg-[#4d7fd9]/20 border border-[#4d7fd9]/50 text-white hover:bg-[#4d7fd9]/30 rounded-lg mb-6">
                Get Started
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    $5 monthly AI credits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Access basic economic insights
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Smart market recommendations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Interactive dashboards
                  </span>
                </li>
              </ul>
            </div>

            {/* PREMIUM Plan */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/20 to-[#3d6dc4]/10 border border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300 ring-2 ring-[#4d7fd9]/50">
              <h3 className="text-xl font-bold text-white mb-2">PREMIUM</h3>
              <p className="text-gray-300 text-sm mb-6">Subscribe</p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$6</span>
                <span className="text-gray-400 text-sm ml-2">/month</span>
              </div>
              <p className="text-gray-400 text-xs mb-6">or $60/year</p>
              <Button className="w-full bg-[#4d7fd9] hover:bg-[#5d8fe9] text-white rounded-lg mb-6">
                Subscribe
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    $20 monthly AI credits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Advanced module access (finance, market, tax)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Custom business insights
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Higher data upload limits
                  </span>
                </li>
              </ul>
            </div>

            {/* TEAM Plan */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/15 to-[#3d6dc4]/8 border border-[#4d7fd9]/30 hover:border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">TEAM</h3>
              <p className="text-gray-300 text-sm mb-6">Subscribe</p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$60</span>
                <span className="text-gray-400 text-sm ml-2">/user/month</span>
              </div>
              <Button className="w-full bg-[#4d7fd9]/20 border border-[#4d7fd9]/50 text-white hover:bg-[#4d7fd9]/30 rounded-lg mb-6">
                Subscribe
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    $60 monthly AI credits per user
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Centralized dashboards
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Collaborative financial analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Shared project data
                  </span>
                </li>
              </ul>
            </div>

            {/* BUSINESS Plan */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/15 to-[#3d6dc4]/8 border border-[#4d7fd9]/30 hover:border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">BUSINESS</h3>
              <p className="text-gray-300 text-sm mb-6">Subscribe</p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">$200</span>
                <span className="text-gray-400 text-sm ml-2">/user/month</span>
              </div>
              <Button className="w-full bg-[#4d7fd9]/20 border border-[#4d7fd9]/50 text-white hover:bg-[#4d7fd9]/30 rounded-lg mb-6">
                Subscribe
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    $60 monthly AI credits per user
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Custom API access
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Private model tuning
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Dedicated support
                  </span>
                </li>
              </ul>
            </div>

            {/* ENTERPRISE Plan */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4d7fd9]/15 to-[#3d6dc4]/8 border border-[#4d7fd9]/30 hover:border-[#4d7fd9]/50 backdrop-blur-sm transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">ENTERPRISE</h3>
              <p className="text-gray-300 text-sm mb-6">Contact Sales</p>
              <Button className="w-full bg-[#4d7fd9]/20 border border-[#4d7fd9]/50 text-white hover:bg-[#4d7fd9]/30 rounded-lg mb-6">
                Contact Us
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Custom Agentic automation for large-scale analytics
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    SAML SSO security
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Dedicated account manager
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#4d7fd9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Priority infrastructure
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              About Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn more about our mission, vision, and the values that drive us
              forward.
            </p>
          </div>

          <div className="p-12 rounded-2xl bg-gradient-to-br from-[#4d7fd9]/20 to-[#3d6dc4]/10 border border-[#4d7fd9]/30 backdrop-blur-sm space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="font-semibold text-[#4d7fd9]">
                  Driving Global Economic Revival and Building the Connected
                  Economy Using Agentic AI
                </span>
              </p>
              <p className="text-gray-300 mt-4 leading-relaxed">
                At Joseph AI, we empower MSMEs, entrepreneurs, and enterprises
                across Africa to make smarter financial, policy, and market
                choices using Agentic AI — a new class of artificial
                intelligence that learns, reasons, and acts autonomously. By
                combining economic intelligence, predictive analytics, and
                AI-powered automation, Joseph AI helps businesses cut losses,
                access funding, optimize pricing, and grow sustainably. Our goal
                is to transform local business performance into national
                economic growth, one enterprise at a time.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Core Values
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Innovation", "Integrity", "Revival", "Satisfaction"].map(
                  (value, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-lg bg-[#4d7fd9]/20 border border-[#4d7fd9]/50 text-white font-semibold"
                    >
                      {value}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Get in touch
              </h2>
              <p className="text-xl text-gray-300">
                If you have any questions regarding our Services or need help,
                please fill out the form here. We do our best to respond within
                1 business day.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#4d7fd9] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300">support@josephai.site</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#4d7fd9] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300">+234 708 811 4692</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#4d7fd9] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Address</h3>
                  <p className="text-gray-300">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleContactSubmit}
              className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-[#4d7fd9]/15 to-[#3d6dc4]/8 border border-[#4d7fd9]/30 backdrop-blur-sm"
            >
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-[#0a1449] border-[#4d7fd9]/30 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-[#0a1449] border-[#4d7fd9]/30 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-[#0a1449] border-[#4d7fd9]/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="bg-[#0a1449] border border-[#4d7fd9]/30 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-[#4d7fd9]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={contactLoading}
                className="w-full bg-[#4d7fd9] hover:bg-[#5d8fe9] text-white rounded-lg py-3 font-semibold"
              >
                {contactLoading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#4d7fd9]/10 mt-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Joseph AI. All rights reserved.
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

        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float-card {
          animation: float-card 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </div>
  );
}
