import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Gift,
  Users,
  Compass,
  Star,
  Receipt,
  X,
  ChevronDown,
  Check,
  Send,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CreditsPage = () => {
  const { aiCredits, creditTransactions, addCredits } = useApp();

  // Modal states
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Demo form state
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    groupSize: "4-6 friends",
    date: "",
    notes: ""
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Credit Inquiry",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Squad",
      credits: 50,
      price: 299,
      originalPrice: 499,
      priceFormatted: "₹299",
      period: "one-time",
      badge: null,
      description: "Ideal for a single upcoming weekend getaway or road trip with close friends.",
      features: [
        "50 AI Trip Planning Credits",
        "3 Full AI-Generated Itineraries",
        "Multi-Preference Conflict Solver",
        "Up to 6 Group Members",
        "Email Support within 24h",
        "Credits valid for 1 full year"
      ],
      popular: false,
      ctaText: "Get Starter Pack"
    },
    {
      id: "explorer",
      name: "Explorer Pro",
      credits: 150,
      price: 699,
      originalPrice: 1199,
      priceFormatted: "₹699",
      period: "one-time",
      badge: "Most Popular • Best Value",
      description: "The gold standard for multi-day vacations, college reunions, and frequent group explorers.",
      features: [
        "150 AI Trip Planning Credits",
        "10+ Comprehensive Multi-City Itineraries",
        "Smart Budget & Hidden-Fee Predictor",
        "1-Click Convert Itinerary to Group Polls",
        "Unlimited Group Members per trip",
        "Instant PDF & WhatsApp Itinerary Export",
        "Priority AI Engine Processing",
        "Credits never expire"
      ],
      popular: true,
      ctaText: "Buy Explorer Pro"
    },
    {
      id: "squad_unlimited",
      name: "Squad Unlimited Pass",
      credits: 500,
      price: 1499,
      originalPrice: 2499,
      priceFormatted: "₹1,499",
      period: "one-time",
      badge: "For Large Groups & Clubs",
      description: "Everything a high-frequency travel squad, club, or company retreat coordinator needs.",
      features: [
        "500 AI Trip Planning Credits",
        "Unlimited Custom AI Itinerary Generations",
        "Dedicated Group Concierge AI Prompts",
        "Shared Squad Credit Pool (All members can use)",
        "Automated Expense Reconciliation AI",
        "24/7 Dedicated WhatsApp Travel Hotline",
        "Credits never expire + Free Future Upgrades"
      ],
      popular: false,
      ctaText: "Get Squad Pass"
    }
  ];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "SQUAD20") {
      setAppliedDiscount(20);
      setCouponMessage("🎉 Coupon SQUAD20 applied: 20% discount!");
    } else if (couponCode.trim().toUpperCase() === "EXPLORE50") {
      setAppliedDiscount(50);
      setCouponMessage("🔥 Special Partner Code applied: 50% discount!");
    } else {
      setAppliedDiscount(0);
      setCouponMessage("❌ Invalid coupon code. Try 'SQUAD20'");
    }
  };

  const handleInitiatePurchase = (plan) => {
    setSelectedPlan(plan);
    setAppliedDiscount(0);
    setCouponCode("");
    setCouponMessage("");
    setPurchaseSuccess(false);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPlan) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const discountMultiplier = appliedDiscount > 0 ? (100 - appliedDiscount) / 100 : 1;
      const finalPrice = Math.round(selectedPlan.price * discountMultiplier);

      addCredits(selectedPlan.credits, selectedPlan.name, `₹${finalPrice}`);
      setIsProcessingPayment(false);
      setPurchaseSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setTimeout(() => {
        setSelectedPlan(null);
        setPurchaseSuccess(false);
      }, 2200);
    }, 1000);
  };

  const handleClaimDemoBonus = () => {
    addCredits(10, "Free Daily Demo Top-up", "₹0");
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ name: "", email: "", groupSize: "4-6 friends", date: "", notes: "" });
    }, 2500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", subject: "Credit Inquiry", message: "" });
    }, 3500);
  };

  const faqs = [
    {
      q: "What exactly does 1 AI credit cover in TripCircle?",
      a: "1 AI credit generates a complete, tailored multi-option destination recommendation or optimizes an itinerary schedule for your group based on your specific budget, region, travel style, and group member preferences."
    },
    {
      q: "Do purchased AI credits expire?",
      a: "No! All credits purchased under Explorer Pro and Squad Unlimited Pass never expire. You can buy them now and use them across any trip this season, next summer, or next year."
    },
    {
      q: "Can other members of my trip group use these credits?",
      a: "Yes! In TripCircle, once credits are attached to your account or trip workspace, any itinerary or poll generated for your active group utilizes your shared plan so all friends benefit together."
    },
    {
      q: "What payment methods are supported?",
      a: "We support all major Indian and international payment methods including UPI (Google Pay, PhonePe, Paytm), Visa/Mastercard/RuPay credit and debit cards, and Net Banking."
    },
    {
      q: "What if my group is unhappy with the AI recommendations?",
      a: "We offer a 100% 7-day money-back guarantee. If you are not completely satisfied with the travel plans, reach out to support@tripcircle.app for an immediate full refund."
    }
  ];

  return (
    <div className="space-y-12 py-4">
      
      {/* 1. UPFRONT UNIQUE VALUE PROPOSITION HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-brand-950 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-brand-800/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-tealAccent-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            AI Travel Credits & Group Passes
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Supercharge Group Travel With AI. <br />
            <span className="bg-gradient-to-r from-amber-300 via-tealAccent-300 to-cyan-300 bg-clip-text text-transparent">
              Zero Friction. Perfect Consensus.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            TripCircle AI eliminates the 15+ hours of frustrating WhatsApp debates, conflicting budgets, and spreadsheets. One click reconciles your group’s distinct travel vibes, generates tailored multi-day itineraries, and balances expenses fairly.
          </p>

          {/* Quick Value Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-tealAccent-300">14.2 Hrs</p>
              <p className="text-xs text-slate-400 font-medium">Avg Planning Time Saved</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">98.4%</p>
              <p className="text-xs text-slate-400 font-medium">Squad Consensus Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300">₹4,200+</p>
              <p className="text-xs text-slate-400 font-medium">Avg Group Savings / Trip</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-300">0</p>
              <p className="text-xs text-slate-400 font-medium">Awkward Money Debates</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#pricing-tiers"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-tealAccent-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-base"
            >
              <CreditCard className="w-5 h-5" />
              View Credit Packs & Pricing
            </a>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2 text-base"
            >
              <Users className="w-5 h-5 text-tealAccent-300" />
              Request Live Squad Demo
            </button>

            <a
              href="#contact-section"
              className="px-5 py-3.5 rounded-2xl text-slate-300 hover:text-white font-medium hover:bg-white/5 transition-colors flex items-center gap-1.5 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Sales / Enterprise
            </a>
          </div>

          {/* Live Balance Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Your Active AI Balance</p>
                <p className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{aiCredits} Credits Available</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-tealAccent-500/20 text-tealAccent-300 font-semibold border border-tealAccent-500/30">
                    Active
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClaimDemoBonus}
                className="px-3.5 py-2 rounded-xl bg-tealAccent-500/20 hover:bg-tealAccent-500/30 border border-tealAccent-500/40 text-tealAccent-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Simulate adding free demo credits"
              >
                <Gift className="w-3.5 h-3.5" />
                Claim +10 Free Demo Credits
              </button>

              <Link
                to="/planner"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                Go to AI Planner <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SHOWCASE KEY FEATURES & BENEFITS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why Groups Upgrade to TripCircle AI
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Tailor-made for friends who want spontaneous adventures without the organizational nightmare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Multi-Preference Conflict Solver
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When half the group wants hiking and the other half wants cafes and beach clubs, the AI balances your itinerary so everyone gets their highlight days without feeling compromised.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Smart Budget & Split Estimator
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accurately predicts shared cabs, accommodation tiers, activity fees, and meal budgets per person before you book, so nobody is shocked by hidden out-of-pocket costs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              1-Click Itinerary to Poll Conversion
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instantly transforms AI suggestions into democratic group voting polls with deadlines. Let your friends cast their votes and automatically lock in the winning activities.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRICING & CREDIT TIERS (PURCHASE CALL TO ACTION) */}
      <section id="pricing-tiers" className="space-y-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Choose Your AI Credit Pack
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            No subscriptions or hidden fees. Pay once, use whenever your squad travels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-8 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-white via-amber-50/30 to-brand-50/40 border-2 border-amber-400 shadow-xl shadow-amber-500/10 md:-translate-y-2'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-brand-600 text-white text-xs font-bold shadow-md uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.priceFormatted}</span>
                  <span className="text-sm text-slate-400 line-through">₹{plan.originalPrice}</span>
                  <span className="text-xs font-semibold text-slate-500">/ {plan.period}</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  {plan.credits} AI Planning Credits
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">What's included:</p>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleInitiatePurchase(plan)}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  plan.popular
                    ? 'bg-gradient-to-r from-amber-500 to-brand-600 text-white hover:from-amber-600 hover:to-brand-700 shadow-amber-500/20 hover:scale-[1.02]'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]'
                }`}
              >
                <Zap className="w-4 h-4" />
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise & Custom CTA Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Users className="w-4 h-4 text-tealAccent-400" />
              Need a Custom Plan for 20+ Members or Corporate Retreat?
            </h4>
            <p className="text-xs text-slate-300">
              We offer bespoke group concierge packages with custom APIs, invoice billing, and personalized travel guides.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              Book Demo Call
            </button>
            <a
              href="#contact-section"
              className="px-4 py-2.5 rounded-xl bg-tealAccent-400 hover:bg-tealAccent-500 text-slate-950 text-xs font-bold transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* 4. RECENT TRANSACTIONS / CREDITS LEDGER */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Your AI Credits Ledger</h3>
              <p className="text-xs text-slate-500">Track all your credit top-ups and usage records</p>
            </div>
          </div>

          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
            Total Balance: {aiCredits} Credits
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
          {creditTransactions.length === 0 ? (
            <p className="py-4 text-center text-xs text-slate-400">No transactions recorded yet.</p>
          ) : (
            creditTransactions.map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800">{tx.description}</p>
                  <p className="text-[11px] text-slate-400">{tx.date}</p>
                </div>
                <div className="text-right">
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    tx.type === 'credit'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 bg-slate-100'
                  }`}>
                    {tx.type === 'credit' ? `+${tx.amount}` : `${tx.amount}`} Credits
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. CONTACT INFORMATION & INQUIRY FORM */}
      <section id="contact-section" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Contact Details Card (Left 2 cols) */}
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900 to-brand-950 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealAccent-500/20 text-tealAccent-300 text-xs font-bold uppercase mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                We're Here to Help
              </div>
              <h3 className="text-2xl font-bold text-white">Get in Touch with TripCircle</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Have questions about AI credits, custom itineraries, or need help with a group booking? Our human concierge and travel support team is standing by.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-tealAccent-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Email Inquiries</p>
                  <a href="mailto:support@tripcircle.app" className="text-tealAccent-300 hover:underline">
                    support@tripcircle.app
                  </a>
                  <p className="text-[11px] text-slate-400">For enterprise & sales: sales@tripcircle.app</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-tealAccent-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Phone & WhatsApp Hotline</p>
                  <a href="tel:+919876543210" className="text-tealAccent-300 hover:underline">
                    +91 98765 43210
                  </a>
                  <p className="text-[11px] text-slate-400">Mon – Sat, 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-tealAccent-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Headquarters</p>
                  <p className="text-slate-300">TripCircle Technologies Pvt Ltd</p>
                  <p className="text-[11px] text-slate-400">
                    4th Floor, WeWork Galaxy, 43 Residency Road, Bengaluru, Karnataka 560025, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-tealAccent-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Response Guarantee</p>
                  <p className="text-[11px] text-slate-300">
                    Average response time under 2 hours during working days.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Risk-Free 7-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (Right 3 cols) */}
          <div className="lg:col-span-3 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Fill out this quick form and our travel specialist will respond with custom pricing or solutions.
            </p>

            {contactSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-800">Message Received!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you, <strong>{contactForm.name}</strong>. Our travel desk has received your request and will email you at <strong>{contactForm.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                  >
                    <option value="Credit Inquiry">Buying AI Credits & Invoicing</option>
                    <option value="Group Discount">Group / Squad Discount (10+ people)</option>
                    <option value="Custom Itinerary">Custom Multi-City Itinerary Assistance</option>
                    <option value="Technical Support">Technical / Bug Report</option>
                    <option value="Partnership">Hotel & Activity Vendor Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">How can we help your trip?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your upcoming trip destination, group size, and any specific questions..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about TripCircle AI credits, sharing, and validity.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 text-xs sm:text-sm hover:text-brand-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CHECKOUT MODAL (PURCHASE CALL TO ACTION FLOW)
         ========================================================================= */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-brand-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  Secure Checkout
                </span>
                <h3 className="text-lg font-bold">{selectedPlan.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {purchaseSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Payment Successful!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {selectedPlan.credits} AI credits have been added to your TripCircle account.
                  </p>
                </div>
              ) : (
                <>
                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">Selected Plan:</span>
                      <span className="font-bold text-slate-800">{selectedPlan.name} ({selectedPlan.credits} Credits)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">Original Price:</span>
                      <span className="text-slate-400 line-through">₹{selectedPlan.originalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">Standard Price:</span>
                      <span className="font-semibold text-slate-800">₹{selectedPlan.price}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-600 font-bold">
                        <span>Coupon Discount ({appliedDiscount}%):</span>
                        <span>-₹{Math.round((selectedPlan.price * appliedDiscount) / 100)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                      <span>Total Payable:</span>
                      <span className="text-base text-brand-600">
                        ₹{Math.round(selectedPlan.price * (appliedDiscount > 0 ? (100 - appliedDiscount) / 100 : 1))}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Have a Promo Code?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. SQUAD20"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs uppercase font-mono tracking-wider focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {couponMessage}
                      </p>
                    )}
                  </form>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-600">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === 'upi'
                            ? 'border-brand-600 bg-brand-50/50 text-brand-800 font-bold ring-1 ring-brand-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50 text-xs'
                        }`}
                      >
                        <p className="text-xs">UPI / GPay</p>
                        <p className="text-[10px] text-slate-400">Zero Fee</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === 'card'
                            ? 'border-brand-600 bg-brand-50/50 text-brand-800 font-bold ring-1 ring-brand-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50 text-xs'
                        }`}
                      >
                        <p className="text-xs">Cards</p>
                        <p className="text-[10px] text-slate-400">Credit / Debit</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === 'netbanking'
                            ? 'border-brand-600 bg-brand-50/50 text-brand-800 font-bold ring-1 ring-brand-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50 text-xs'
                        }`}
                      >
                        <p className="text-xs">NetBanking</p>
                        <p className="text-[10px] text-slate-400">All Banks</p>
                      </button>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>256-bit SSL encrypted. Simulated safe transaction for prototype.</span>
                  </div>

                  {/* Purchase Button */}
                  <button
                    disabled={isProcessingPayment}
                    onClick={handleConfirmPurchase}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-brand-600 text-white font-bold text-sm hover:from-amber-600 hover:to-brand-700 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <span>Verifying & Adding Credits...</span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Complete Payment (₹{Math.round(selectedPlan.price * (appliedDiscount > 0 ? (100 - appliedDiscount) / 100 : 1))})
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          DEMO BOOKING MODAL (DEMO CALL TO ACTION FLOW)
         ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="p-6 bg-gradient-to-r from-tealAccent-700 to-brand-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-tealAccent-200 uppercase tracking-wider">
                  Live Walkthrough
                </span>
                <h3 className="text-lg font-bold">Schedule Squad Demo</h3>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {demoSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 mx-auto flex items-center justify-center">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Demo Scheduled!</h4>
                  <p className="text-xs text-slate-600">
                    We've emailed a calendar invite and video link to <strong>{demoForm.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work / Personal Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Group Size</label>
                      <select
                        value={demoForm.groupSize}
                        onChange={(e) => setDemoForm({ ...demoForm, groupSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                      >
                        <option>3 - 5 Friends</option>
                        <option>6 - 12 People</option>
                        <option>12+ Large Squad</option>
                        <option>Corporate / Club</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={demoForm.date}
                        onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Trip Destination or Special Requests</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Goa reunion in December, need custom budget splitting demo..."
                      value={demoForm.notes}
                      onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-tealAccent-500 to-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Confirm Demo Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

