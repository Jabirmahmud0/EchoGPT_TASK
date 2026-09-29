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
  Users,
  Building,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "team">("pro");
  const [checkoutStep, setCheckoutStep] = useState<"input" | "success">("input");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenCheckout = (plan: "pro" | "team") => {
    setSelectedPlan(plan);
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
  const teamPrice = billingCycle === "monthly" ? "$39" : "$32";
  const teamBillingPeriod = billingCycle === "monthly" ? "/seat/mo" : "/seat/mo, billed annually";

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-stone-50/50 dark:bg-stone-950/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            All 7 flagship engines. <span className="text-emerald-600 dark:text-emerald-400">One unified bill.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Save $60+ every month compared to separate ChatGPT Plus, Claude Pro, and Gemini Advanced subscriptions.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-stone-200/60 dark:bg-stone-800/60 border border-border">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                billingCycle === "monthly"
                  ? "bg-white dark:bg-stone-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "relative px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                billingCycle === "annual"
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual Billing
              <span className="text-[10px] font-bold bg-emerald-600 px-1.5 py-0.5 rounded-full text-white uppercase tracking-wider">
                Save 20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid - 3 Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          {/* Tier 1: Free Starter */}
          <ScrollReveal yOffset={16} duration={0.48} delay={0} className="flex flex-col h-full">
            <Card className="flex flex-col p-8 bg-card border-border hover:border-stone-400 dark:hover:border-stone-700 transition-all rounded-2xl relative shadow-xs h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground">Free Starter</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Explore EchoGPT router and test fast frontier engines without a credit card.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground font-mono">$0</span>
                <span className="text-muted-foreground text-xs font-medium">/forever</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Zero credit card or API keys required</p>
            </div>

            <div className="border-t border-border pt-6 mb-8 flex-1">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Included Features
              </p>
              <ul className="space-y-3.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>30 prompts/day</strong> on EchoGPT auto-router</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Gemini 3.8 Flash &amp; Qwen 3.8 access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Full Web App Workspace (`/app`)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Lightweight Chrome Popup</span>
                </li>
                <li className="flex items-center gap-3 text-stone-400 dark:text-stone-600 line-through">
                  <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span>Opus 5.5, GPT-5.6 &amp; DeepSeek V4 Pro</span>
                </li>
                <li className="flex items-center gap-3 text-stone-400 dark:text-stone-600 line-through">
                  <div className="w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span>Docked in-browser DOM sidebar</span>
                </li>
              </ul>
            </div>

            <Link href="/app" className="w-full block">
              <Button variant="outline" className="w-full py-5 text-xs font-semibold border-border hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-2">
                Launch Free Starter
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </ScrollReveal>

        {/* Tier 2: Pro (Hero / Recommended) */}
        <ScrollReveal yOffset={16} duration={0.48} delay={0.06} className="relative group flex flex-col h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-3xl opacity-35 group-hover:opacity-55 blur-sm transition duration-300" />

          <Card className="relative flex flex-col p-8 bg-card border-2 border-emerald-500 rounded-2xl shadow-xl h-full">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-emerald-500 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                EchoGPT Pro
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-[10px]">
                  All 7 Engines
                </Badge>
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                For individual engineers, researchers, and builders needing unthrottled frontier power.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground font-mono">{proPrice}</span>
                <span className="text-muted-foreground text-xs font-medium">{proBillingPeriod}</span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                Replaces $75/mo across 4 separate AI subscriptions
              </p>
            </div>

            <div className="border-t border-border pt-6 mb-8 flex-1">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Everything in Starter, plus:
              </p>
              <ul className="space-y-3.5 text-xs text-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Unlimited requests</strong> across all 7 frontier models</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Opus 5.5, GPT-5.6, DeepSeek V4 Pro &amp; Kimi 3 (5M context)</span>
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
                  <span>In-page DOM text highlighting &amp; floating chip</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Mid-conversation model hot-swapping without context loss</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Side-by-side Dual Model Consensus Arena</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Priority router queue with sub-30ms latency</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => handleOpenCheckout("pro")}
              className="w-full py-5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </ScrollReveal>

        {/* Tier 3: Team & Enterprise */}
        <ScrollReveal yOffset={16} duration={0.48} delay={0.12} className="flex flex-col h-full">
          <Card className="flex flex-col p-8 bg-card border-border hover:border-stone-400 dark:hover:border-stone-700 transition-all rounded-2xl relative shadow-xs h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                Team &amp; Scale
                <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
                  Centralized
                </Badge>
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                For engineering organizations and agencies needing shared knowledge graphs.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground font-mono">{teamPrice}</span>
                <span className="text-muted-foreground text-xs font-medium">{teamBillingPeriod}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Centralized invoice &amp; admin controls</p>
            </div>

            <div className="border-t border-border pt-6 mb-8 flex-1">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Everything in Pro, plus:
              </p>
              <ul className="space-y-3.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Shared Team Prompt Library</strong> with version control</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>SAML SSO / Okta &amp; Google Workspace auth</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Aggregated token consumption &amp; cost analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Dedicated enterprise failover cluster</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>Custom BAA &amp; zero data retention agreements</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => handleOpenCheckout("team")}
              variant="outline"
              className="w-full py-5 text-xs font-semibold border-border hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              Contact Team Sales
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </ScrollReveal>
      </div>

      {/* Security & Reassurance Strip with Scroll Reveal */}
      <ScrollReveal yOffset={16} duration={0.48} delay={0.05} className="p-5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-foreground">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm">14-Day Free Trial &amp; Money-Back Guarantee</p>
              <p className="text-[11px] text-muted-foreground">Cancel anytime with 1 click in your account settings. Zero questions asked.</p>
            </div>
          </div>
          <Button
            onClick={() => handleOpenCheckout("pro")}
            variant="outline"
            size="sm"
            className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 shrink-0 font-medium text-xs cursor-pointer"
          >
            Try Pro Risk-Free
          </Button>
        </ScrollReveal>
      </div>

      {/* Simulated Checkout Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        title={checkoutStep === "input" ? `Activate EchoGPT ${selectedPlan === "pro" ? "Pro" : "Team"}` : "Welcome to EchoGPT!"}
        description={
          checkoutStep === "input"
            ? `14-day free trial on the ${billingCycle} plan. Cancel anytime.`
            : "Your trial has been activated with unlimited frontier access."
        }
      >
        {checkoutStep === "input" ? (
          <form onSubmit={handleSimulatePayment} className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-border flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground">
                  EchoGPT {selectedPlan === "pro" ? "Pro" : "Team"} ({billingCycle})
                </p>
                <p className="text-xs text-muted-foreground">
                  Unlimited access to EchoGPT, Opus 5.5, GPT-5.6, DeepSeek V4 Pro, Kimi 3, Gemini 3.8
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-foreground">
                  {selectedPlan === "pro" ? proPrice : teamPrice}
                  <span className="text-xs font-normal text-muted-foreground">/mo</span>
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">14 days free</span>
              </div>
            </div>

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
                You now have unlimited frontier access across all 7 models in the web workspace and extension.
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
