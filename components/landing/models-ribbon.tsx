"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelBadge } from "@/components/chat/model-badge";
import { MODELS_LIST } from "@/lib/models";
import { ModelId } from "@/lib/types";
import { Sparkles, Zap, ArrowRight, Activity, Filter, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type ModelCategory = "all" | "router" | "reasoning" | "context" | "speed";

export function ModelsRibbon() {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>("all");

  const filterModels = (category: ModelCategory) => {
    switch (category) {
      case "router":
        return MODELS_LIST.filter((m) => m.id === "echogpt");
      case "reasoning":
        return MODELS_LIST.filter((m) => m.id === "deepseek-v4-pro" || m.id === "opus-5-5");
      case "context":
        return MODELS_LIST.filter((m) => m.id === "kimi-3" || m.id === "gemini-3-8-flash");
      case "speed":
        return MODELS_LIST.filter((m) => m.id === "gemini-3-8-flash" || m.id === "echogpt");
      default:
        return MODELS_LIST;
    }
  };

  const displayedModels = filterModels(activeCategory);

  return (
    <section
      id="models"
      className="py-20 sm:py-28 border-b border-border-subtle bg-surface-elevated/20 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal yOffset={18} duration={0.5} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Frontier Engine Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Top-tier frontier models.{" "}
            <span className="text-text-secondary font-medium">
              Zero vendor lock-in.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Every model possesses distinct reasoning competencies, context windows, and throughput metrics. EchoGPT gives you instant access to our default adaptive router and 6 leading engines in one unified workspace.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Engines (7)" },
              { id: "router", label: "Default Engine" },
              { id: "reasoning", label: "Extreme Reasoning & Logic" },
              { id: "context", label: "Massive Context (Up to 5M)" },
              { id: "speed", label: "Sub-30ms High Speed" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as ModelCategory)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                  activeCategory === tab.id
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-white/80 dark:bg-stone-900/60 border border-stone-200 dark:border-white/[0.08] text-text-secondary hover:text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 7 Models Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {displayedModels.map((model, idx) => (
              <motion.div
                key={model.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md"
              >
                {/* Accent top border glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-60"
                  style={{ backgroundColor: model.accentColor }}
                />

                <div>
                  {/* Header: Provider & Model Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <ModelBadge modelId={model.id} size="md" />
                    <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {model.contextWindow}
                    </span>
                  </div>

                  {/* Name & Specialization Tag */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                    {model.name}
                  </h3>
                  <div className="text-xs font-semibold text-text-secondary mb-3">
                    {model.tag}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-5">
                    {model.description}
                  </p>
                </div>

                {/* Strengths Pills & Speed Footer */}
                <div className="pt-4 border-t border-stone-200/70 dark:border-white/[0.06] space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {model.strengths.map((str) => (
                      <span
                        key={str}
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/60 border border-stone-200/80 dark:border-white/[0.06] text-[10px] text-text-muted font-medium"
                      >
                        {str}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-muted pt-1">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-foreground font-semibold">
                      <Zap className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{model.speed}</span>
                    </span>
                    <Link
                      href="/app"
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Launch</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
