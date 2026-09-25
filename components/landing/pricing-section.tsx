"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

interface ComparisonRow {
  feature: string;
  category: string;
  traditional: string;
  echoGpt: string;
  echoHighlight?: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: "Cost & Billing",
    feature: "Monthly Cost",
    traditional: "$60+ / month ($20 × 3 subscriptions)",
    echoGpt: "$15 / month (Save 75%)",
    echoHighlight: true,
  },
  {
    category: "Workflow",
    feature: "Active Browser Tabs",
    traditional: "3–5 disjointed tabs & logins",
    echoGpt: "1 centralized tab or docked sidebar",
  },
  {
    category: "Workflow",
    feature: "In-Browser Selection",
    traditional: "Copy-paste back and forth to chat tab",
    echoGpt: "Instant highlight & 'Ask EchoGPT' chip",
    echoHighlight: true,
  },
  {
    category: "Model Access",
    feature: "Supported Frontier Models",
    traditional: "Locked to one vendor per account",
    echoGpt: "GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1",
    echoHighlight: true,
  },
  {
    category: "Context & Search",
    feature: "Unified History",
    traditional: "Scattered histories across 3 silos",
    echoGpt: "Synchronized local-first search across all models",
  },
  {
    category: "Developer Tools",
    feature: "Code Block Highlighting & Export",
    traditional: "Basic copy button, no multi-model diff",
    echoGpt: "Full syntax highlighting, copy & markdown export",
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"input" | "success">("input");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenProModal = () => {
    setCheckoutStep("input");
    setIsModalOpen(true);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep("success");
    }, 1100);
  };

  const proPrice = billingCycle === "monthly" ? "$15" : "$12";
  const proBillingPeriod = billingCycle === "monthly" ? "/month" : "/month, billed annually";

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-stone-50/50 dark:bg-stone-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Stop paying three separate <span className="text-emerald-500">$20/mo</span> bills.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get OpenAI, Anthropic, Google, and Meta frontier models in one unified subscription. Save over $45 every single month.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-stone-200/60 dark:bg-stone-800/60 border border-border">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-stone-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-white dark:bg-stone-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual Billing
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20 items-stretch">
          {/* Free Tier Card */}
          <Card className="flex flex-col p-8 bg-card border-border hover:border-stone-400 dark:hover:border-stone-700 transition-all rounded-2xl relative shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground">Free Starter</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Perfect for casual curiosity and testing multi-model intelligence.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">$0</span>
                <span className="text-muted-foreground text-sm font-medium">/forever</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">No credit card or API key required</p>
            </div>

            <div className="border-t border-border pt-6 mb-8 flex-1">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                What&apos;s Included
              </p>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>30 queries/day</strong> across fast models</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>GPT-4o mini &amp; Gemini 1.5 Flash</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Full Web Workspace (`/app`)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Chrome Extension popup view</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Local-first conversation persistence</span>
                </li>
                <li className="flex items-center gap-3 text-stone-400 dark:text-stone-600 line-through">
                  <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span>Claude 3.5 Sonnet &amp; Llama 3.1 70B</span>
                </li>
                <li className="flex items-center gap-3 text-stone-400 dark:text-stone-600 line-through">
                  <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span>Docked web sidebar &amp; text selection tool</span>
                </li>
              </ul>
            </div>

            <Link href="/app" className="w-full block">
              <Button variant="outline" className="w-full py-6 font-semibold border-border hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-2">
                Launch Free Workspace
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          {/* Pro Tier Card (Recommended) */}
          <div className="relative group">
            {/* Emerald ambient blur */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-3xl opacity-30 group-hover:opacity-50 blur-sm transition duration-300" />

            <Card className="relative flex flex-col p-8 bg-card border-2 border-emerald-500 dark:border-emerald-500 rounded-2xl shadow-xl h-full">
              {/* Popular badge */}
              <div className="absolute -top-3.5 right-6">
                <span className="bg-emerald-500 text-white text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  Recommended
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  EchoGPT Pro
                  <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-[11px]">
                    All-in-One
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  For engineers, researchers, and creators wanting flagship models without silos.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{proPrice}</span>
                  <span className="text-muted-foreground text-sm font-medium">{proBillingPeriod}</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  Replaces $60/month across separate subscriptions
                </p>
              </div>

              <div className="border-t border-border pt-6 mb-8 flex-1">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                  Everything in Free, plus:
                </p>
                <ul className="space-y-3.5 text-sm text-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span><strong>Unlimited requests</strong> on flagship frontier models</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span><strong>All 4 Models:</strong> GPT-4o, Claude 3.5, Gemini 1.5 &amp; Llama 3.1</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span><strong>Full Chrome Extension:</strong> Popup + Docked Sidebar (`Ctrl+Shift+E`)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>In-page text selection &amp; inline AI assist</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Instant model switching without losing conversation context</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Code highlighting, copy snippet, &amp; markdown export</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Priority streaming bandwidth &amp; zero throttle rate</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleOpenProModal}
                className="w-full py-6 font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group/btn"
              >
                Start 14-Day Free Trial
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>

        {/* Why Choose EchoGPT - Value Comparison Matrix */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why Choose EchoGPT?
            </h3>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              A direct comparison between managing multiple AI subscriptions versus the EchoGPT unified ecosystem.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-stone-100/60 dark:bg-stone-900/60">
                  <th className="py-4 px-6 font-semibold text-foreground w-1/3">Feature &amp; Workflow</th>
                  <th className="py-4 px-6 font-semibold text-muted-foreground w-1/3">
                    Separate Subscriptions
                    <span className="block text-xs font-normal text-muted-foreground/80 mt-0.5">
                      OpenAI + Anthropic + Google ($60/mo)
                    </span>
                  </th>
                  <th className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400 w-1/3 bg-emerald-500/5">
                    EchoGPT Ecosystem
                    <span className="block text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                      Unified ($15/mo)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-stone-50/80 dark:hover:bg-stone-900/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-foreground">
                      <div className="flex flex-col">
                        <span>{row.feature}</span>
                        <span className="text-xs text-muted-foreground font-normal">{row.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-foreground bg-emerald-500/5">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                        <span className={row.echoHighlight ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}>
                          {row.echoGpt}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Guarantee banner */}
          <div className="mt-8 p-5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-foreground">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">14-Day Money-Back Guarantee</p>
                <p className="text-xs text-muted-foreground">Cancel anytime with 1 click in your settings. Zero questions asked.</p>
              </div>
            </div>
            <Button
              onClick={handleOpenProModal}
              variant="outline"
              size="sm"
              className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 shrink-0 font-medium"
            >
              Try Pro Risk-Free
            </Button>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        title={checkoutStep === "input" ? "Activate EchoGPT Pro" : "Welcome to EchoGPT Pro!"}
        description={
          checkoutStep === "input"
            ? `14-day free trial on the ${billingCycle} plan. Cancel anytime.`
            : "Your trial has been activated with unlimited frontier access."
        }
      >
        {checkoutStep === "input" ? (
          <form onSubmit={handleSimulatePayment} className="space-y-4 pt-2">
            {/* Plan Summary Card */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-border flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground">EchoGPT Pro ({billingCycle})</p>
                <p className="text-xs text-muted-foreground">Unlimited GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-foreground">{proPrice}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">14 days free</span>
              </div>
            </div>

            {/* Test Credit Card notice */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Card Information (Simulation)
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value="4242 •••• •••• 4242"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-stone-50 dark:bg-stone-900 text-sm font-mono text-foreground focus:outline-hidden"
                />
                <CreditCard className="w-4 h-4 text-muted-foreground absolute right-3 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Expires
                </label>
                <input
                  type="text"
                  readOnly
                  value="12 / 28"
                  className="w-full px-3.5 py-2 rounded-lg border border-border bg-stone-50 dark:bg-stone-900 text-sm font-mono text-foreground focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  readOnly
                  value="888"
                  className="w-full px-3.5 py-2 rounded-lg border border-border bg-stone-50 dark:bg-stone-900 text-sm font-mono text-foreground focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Simulated demo checkout. No actual charges will occur.</span>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              >
                {isProcessing ? "Activating Trial..." : "Start 14-Day Free Trial"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">Access Granted</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                You now have unlimited frontier access across all four models in the web workspace and extension.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/app">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5">
                  Open Web Workspace
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-border text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
