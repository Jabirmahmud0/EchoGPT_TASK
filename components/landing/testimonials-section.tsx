"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrollReveal, staggerContainer, revealItem } from "@/components/ui/scroll-reveal";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarText: string;
  avatarBg: string;
  favoriteModels: string[];
  quote: string;
  metric: string;
  tag: "Engineering" | "Research" | "Product" | "Architecture";
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alexandre Moreau",
    role: "Staff Infrastructure Engineer",
    company: "Distributed Systems Lab",
    avatarText: "AM",
    avatarBg: "bg-sky-500",
    favoriteModels: ["Opus 5.5", "DeepSeek V4 Pro"],
    quote:
      "We benchmark concurrency primitives across distributed actors. Running Opus 5.5 and DeepSeek V4 Pro side-by-side in the dual arena saved our team 3 solid days of race-condition auditing.",
    metric: "3 days saved per sprint",
    tag: "Architecture",
  },
  {
    name: "Dr. Elena Rostova",
    role: "AI Research Fellow",
    company: "Stanford NLP Lab",
    avatarText: "ER",
    avatarBg: "bg-emerald-500",
    favoriteModels: ["Kimi 3", "EchoGPT"],
    quote:
      "Kimi 3's 5M token context inside the docked browser companion lets us parse 400-page academic monographs and complex LaTeX proofs without splitting documents into arbitrary chunks.",
    metric: "5M token doc indexing",
    tag: "Research",
  },
  {
    name: "Karan Mehta",
    role: "VP of Engineering",
    company: "HyperScale Data",
    avatarText: "KM",
    avatarBg: "bg-indigo-500",
    favoriteModels: ["EchoGPT", "Gemini 3.8 Flash"],
    quote:
      "We cancelled 16 individual ChatGPT Plus and Claude Pro accounts and moved everyone to EchoGPT Pro. Our monthly AI bill plummeted from $960 to $192, and zero devs miss the old tab juggle.",
    metric: "80% monthly spend cut",
    tag: "Engineering",
  },
  {
    name: "Sophie Lin",
    role: "Principal Frontend Architect",
    company: "Vercel Ecosystem Partner",
    avatarText: "SL",
    avatarBg: "bg-amber-500",
    favoriteModels: ["GPT-5.6", "Opus 5.5"],
    quote:
      "Highlighting a snippet directly on GitHub PRs and clicking the floating 'Ask EchoGPT' chip has become second nature. You never lose your mental state or context switching tabs.",
    metric: "4x faster code review",
    tag: "Product",
  },
  {
    name: "Julian Vance",
    role: "Security Auditor & Red Teamer",
    company: "ZeroDay Labs",
    avatarText: "JV",
    avatarBg: "bg-rose-500",
    favoriteModels: ["DeepSeek V4 Pro", "Qwen 3.8 Plus"],
    quote:
      "The local-first cryptographic storage is what sold our compliance committee. Our proprietary vulnerability exploits never leave browser localStorage to train public foundational weights.",
    metric: "100% data sovereignty",
    tag: "Engineering",
  },
  {
    name: "Tariq Al-Mansoor",
    role: "Founding Engineer",
    company: "Autonomous Agents Studio",
    avatarText: "TA",
    avatarBg: "bg-teal-500",
    favoriteModels: ["EchoGPT", "Opus 5.5"],
    quote:
      "The EchoGPT auto-router is insanely good. It dispatches simple prompts to Gemini 3.8 Flash at 140+ tokens/sec, and switches to Opus 5.5 the second I ask for recursive AST transformations.",
    metric: "Sub-25ms router dispatch",
    tag: "Architecture",
  },
];

const FILTER_TAGS = ["All", "Architecture", "Engineering", "Research", "Product"] as const;

export function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_TAGS)[number]>("All");

  const filtered = TESTIMONIALS.filter(
    (t) => activeFilter === "All" || t.tag === activeFilter
  );

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50/40 dark:bg-stone-950/40 border-t border-border relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Loved by engineers who <span className="text-emerald-600 dark:text-emerald-400">hate tab sprawl</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
              See how senior developers, researchers, and systems architects streamline their frontier workflows with EchoGPT.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-200/60 dark:bg-stone-900 border border-border self-start md:self-auto">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeFilter === tag
                    ? "bg-white dark:bg-stone-800 text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Aggregate Social Proof Bar with Scroll Reveal */}
        <ScrollReveal yOffset={16} duration={0.48} delay={0.04} className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-card border border-border mb-12 shadow-xs">
          <div className="text-center sm:text-left sm:border-r border-border sm:pr-4">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xl font-bold font-mono text-foreground">4.92 / 5.0</div>
            <div className="text-xs text-muted-foreground">Dev Satisfaction Score</div>
          </div>

          <div className="text-center sm:text-left sm:border-r border-border sm:px-4">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-emerald-500 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold font-mono text-foreground">14,200+</div>
            <div className="text-xs text-muted-foreground">Active Workstations</div>
          </div>

          <div className="text-center sm:text-left sm:border-r border-border sm:px-4">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-emerald-500 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold font-mono text-foreground">80% Avg Savings</div>
            <div className="text-xs text-muted-foreground">Vs Separate Subscriptions</div>
          </div>

          <div className="text-center sm:text-left sm:pl-4">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-emerald-500 mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold font-mono text-foreground">99.98% SLA</div>
            <div className="text-xs text-muted-foreground">Multi-Engine Redundancy</div>
          </div>
        </ScrollReveal>

        {/* Testimonials Bento Grid with Staggered Scroll Reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((t) => (
              <motion.div
                key={t.name}
                variants={revealItem}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <Card className="p-6 rounded-2xl border border-border bg-card hover:border-stone-400 dark:hover:border-stone-700 transition-all flex flex-col justify-between h-full shadow-xs">
                  <div>
                    {/* Top row: Quote icon & Metric pill */}
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-5 h-5 text-emerald-500/40" />
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {t.metric}
                      </span>
                    </div>

                    {/* Quote text */}
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Bottom info */}
                  <div className="pt-6 mt-6 border-t border-border/60">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono shrink-0 shadow-xs",
                          t.avatarBg
                        )}
                      >
                        {t.avatarText}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                            {t.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {t.role} • <span className="text-foreground/80 font-medium">{t.company}</span>
                        </p>
                      </div>
                    </div>

                    {/* Favorite Model Badges */}
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-muted-foreground font-mono">Engine Combo:</span>
                      {t.favoriteModels.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-foreground font-medium border border-border/80"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
