"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingDown,
  DollarSign,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  SplitSquareVertical,
  Sliders,
  History,
  Workflow,
  Check,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CostModel {
  name: string;
  vendor: string;
  monthlyCost: number;
}

const SEPARATE_SERVICES: CostModel[] = [
  { name: "ChatGPT Plus (GPT-5.6)", vendor: "OpenAI", monthlyCost: 20 },
  { name: "Claude Pro (Opus 5.5)", vendor: "Anthropic", monthlyCost: 20 },
  { name: "Gemini Advanced (3.8 Flash)", vendor: "Google", monthlyCost: 20 },
  { name: "DeepSeek & Kimi API Top-ups", vendor: "Open Router / APIs", monthlyCost: 15 },
];

const ARCHITECTURE_COMPARISONS = [
  {
    feature: "Monthly Cost per Seat",
    category: "Economics",
    legacy: "$75/mo across 4 separate credit card invoices",
    legacyBad: true,
    echoGpt: "$15/mo ($12/mo billed annually) — save 80%",
    echoGood: true,
  },
  {
    feature: "Model Switching Workflow",
    category: "Productivity",
    legacy: "Opening 4 different tabs, re-logging in, re-pasting context from scratch",
    legacyBad: true,
    echoGpt: "Instant 1-click model hot-swap in the exact same chat thread",
    echoGood: true,
  },
  {
    feature: "In-Browser Ambient Dock",
    category: "Workflow",
    legacy: "Constant alt-tabbing between IDE/browser and AI website",
    legacyBad: true,
    echoGpt: "Native Ctrl+Shift+E sidebar companion with DOM highlight chip",
    echoGood: true,
  },
  {
    feature: "Multi-Model Consensus Arena",
    category: "Accuracy",
    legacy: "Manually opening 2 windows, typing query twice, comparing by eye",
    legacyBad: true,
    echoGpt: "Side-by-side Dual Engine Arena with diff highlighting and synthesis",
    echoGood: true,
  },
  {
    feature: "Context Windows & Codebase Depth",
    category: "Scale",
    legacy: "Hit 32k/128k context walls; forced to split repos into fragments",
    legacyBad: true,
    echoGpt: "Up to 5M tokens context with Kimi 3 & Gemini 3.8 Flash indexing",
    echoGood: true,
  },
  {
    feature: "Privacy & Storage Sovereignty",
    category: "Security",
    legacy: "Prompts stored on 4 different cloud databases with third-party training",
    legacyBad: true,
    echoGpt: "100% Local-First encrypted browser vault; zero training on your data",
    echoGood: true,
  },
];

export function WhyChooseUs() {
  const [teamMembers, setTeamMembers] = useState(3);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [activeTab, setActiveTab] = useState<"calculator" | "architecture">("calculator");

  // Calculations
  const separateCostPerSeat = SEPARATE_SERVICES.reduce((acc, s) => acc + s.monthlyCost, 0); // $75/mo
  const echoCostPerSeat = billingCycle === "annual" ? 12 : 15;
  const separateAnnualTotal = separateCostPerSeat * 12 * teamMembers;
  const echoAnnualTotal = echoCostPerSeat * 12 * teamMembers;
  const netAnnualSavings = separateAnnualTotal - echoAnnualTotal;
  const savingsPercent = Math.round(((separateAnnualTotal - echoAnnualTotal) / separateAnnualTotal) * 100);
  const hoursSavedPerYear = teamMembers * 160; // ~13 hrs/month per dev eliminated from tab-switching friction

  return (
    <section id="why-choose-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden border-t border-border">
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Architectural Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Why engineers choose <span className="text-emerald-600 dark:text-emerald-400">EchoGPT</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
              Stop juggling 4 separate $20 subscriptions and losing your train of thought in tab sprawl. Here is the mathematical and architectural proof.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-border self-start md:self-auto">
            <button
              onClick={() => setActiveTab("calculator")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                activeTab === "calculator"
                  ? "bg-white dark:bg-stone-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>Savings Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                activeTab === "architecture"
                  ? "bg-white dark:bg-stone-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Architecture Matrix</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Content based on Active Tab with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5}>
          <AnimatePresence mode="wait">
            {activeTab === "calculator" ? (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Interactive Controls & Breakdown (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl border border-border bg-stone-50/70 dark:bg-stone-900/60 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Interactive ROI Simulator</h3>
                      <p className="text-xs text-muted-foreground">Adjust team seats to calculate exact dollar & engineering time savings</p>
                    </div>

                    {/* Billing Cycle Pill */}
                    <div className="inline-flex items-center p-1 rounded-lg bg-stone-200/70 dark:bg-stone-800 border border-border/80 self-start sm:self-auto">
                      <button
                        onClick={() => setBillingCycle("monthly")}
                        className={cn(
                          "px-3 py-1 rounded-md text-xs font-semibold transition-colors",
                          billingCycle === "monthly" ? "bg-white dark:bg-stone-900 text-foreground shadow-xs" : "text-muted-foreground"
                        )}
                      >
                        Monthly ($15)
                      </button>
                      <button
                        onClick={() => setBillingCycle("annual")}
                        className={cn(
                          "px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1",
                          billingCycle === "annual" ? "bg-emerald-500 text-white shadow-xs" : "text-muted-foreground"
                        )}
                      >
                        Annual ($12)
                        <span className="text-[10px] bg-emerald-600 px-1 rounded uppercase tracking-wider">Save 20%</span>
                      </button>
                    </div>
                  </div>

                  {/* Seat Slider */}
                  <div className="py-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-500" />
                        Team Size / Workstations:
                      </span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono">
                        {teamMembers} {teamMembers === 1 ? "seat" : "seats"}
                      </span>
                    </div>

                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="1"
                        max="25"
                        step="1"
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-hidden"
                      />
                      <div className="flex justify-between text-[11px] text-muted-foreground font-mono mt-1">
                        <span>1 solo</span>
                        <span>5 team</span>
                        <span>10 studio</span>
                        <span>25 scale</span>
                      </div>
                    </div>
                  </div>

                  {/* The Comparison List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      The Disjointed Alternative Stack:
                    </div>

                    <div className="space-y-2">
                      {SEPARATE_SERVICES.map((serv) => (
                        <div
                          key={serv.name}
                          className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-950/60 border border-border text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="font-medium text-foreground">{serv.name}</span>
                            <span className="text-[11px] text-muted-foreground">({serv.vendor})</span>
                          </div>
                          <div className="font-mono text-muted-foreground">
                            ${serv.monthlyCost * teamMembers}/mo
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* EchoGPT Consolidated Bar */}
                    <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                          <span className="font-bold text-foreground">EchoGPT Unified Pro License</span>
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                            Includes all 7 frontier engines in 1 hub + browser extension
                          </p>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        ${echoCostPerSeat * teamMembers}/mo
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Metrics Card (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-stone-900/90 to-stone-950 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                        <TrendingDown className="w-4 h-4" /> Net Annual ROI
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
                        -{savingsPercent}% Reduction
                      </span>
                    </div>

                    <div>
                      <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                        ${netAnnualSavings.toLocaleString()}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        Hard cash saved every year compared to 4 separate subscriptions
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-800">
                      <div>
                        <div className="text-xs text-stone-400">Separate Accounts</div>
                        <div className="text-lg font-bold text-red-400 font-mono line-through mt-0.5">
                          ${separateAnnualTotal.toLocaleString()}/yr
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-stone-400">EchoGPT Pro</div>
                        <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                          ${echoAnnualTotal.toLocaleString()}/yr
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Reclaimed Engineering Hours:</span>
                      </div>
                      <div className="text-xl font-bold font-mono text-emerald-300">
                        ~{hoursSavedPerYear.toLocaleString()} hrs/year
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Based on eliminating ~20 min daily context re-pasting and credential re-authenticating across 4 separate AI platforms.
                      </p>
                    </div>

                    <Link href="/app" className="block">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-5 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                        <span>Deploy EchoGPT Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Micro Guarantee Note */}
                <div className="p-4 rounded-xl border border-border bg-stone-50/50 dark:bg-stone-900/30 flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>
                    No locked-in contracts. Cancel or alter your seat count anytime. All 7 frontier engines active instantly on day one.
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Architecture Diff Table */}
              <div className="rounded-2xl border border-border overflow-hidden bg-stone-50/50 dark:bg-stone-900/40">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-stone-100/80 dark:bg-stone-800/80 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        <th className="py-4 px-6 w-1/4">Workflow Dimension</th>
                        <th className="py-4 px-6 w-3/8 text-red-500 dark:text-red-400 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" />
                          <span>Fragmented Silos (Old Way)</span>
                        </th>
                        <th className="py-4 px-6 w-3/8 text-emerald-600 dark:text-emerald-400">
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>EchoGPT Fabric</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {ARCHITECTURE_COMPARISONS.map((row) => (
                        <tr key={row.feature} className="hover:bg-stone-100/50 dark:hover:bg-stone-800/30 transition-colors">
                          <td className="py-4 px-6 align-top">
                            <div className="font-semibold text-foreground">{row.feature}</div>
                            <span className="text-[11px] text-muted-foreground font-mono">{row.category}</span>
                          </td>
                          <td className="py-4 px-6 align-top text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                            <div className="flex items-start gap-2">
                              <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                              <span>{row.legacy}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top text-xs sm:text-sm font-medium text-foreground bg-emerald-500/5">
                            <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                              <Check className="w-4 h-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                              <span>{row.echoGpt}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3 Core Architectural Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base">Consensus Benchmarking</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Never trust a single model on mission-critical architecture. Pit Opus 5.5 against GPT-5.6 simultaneously and view the diff in real time.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base">Sub-30ms Dynamic Routing</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    EchoGPT inspects code syntax, token weight, and mathematical complexity, routing each prompt to the cheapest and smartest available frontier engine.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                    <History className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base">Unified Vector Memory</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Every chat session, prompt preset, and highlighted web clipping lives in a single local-first index with sub-5ms client-side search.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
