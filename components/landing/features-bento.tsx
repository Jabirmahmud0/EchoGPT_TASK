"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PanelRight,
  MousePointerClick,
  Keyboard,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  FileText,
  Lock,
  Workflow,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { ModelBadge } from "@/components/chat/model-badge";
import { cn } from "@/lib/utils";
import { ScrollReveal, staggerContainer, revealItem } from "@/components/ui/scroll-reveal";

export function FeaturesBento() {
  const [activeHandoffStep, setActiveHandoffStep] = useState(1);
  const [simulatedHighlight, setSimulatedHighlight] = useState(false);

  return (
    <section id="features" className="py-20 sm:py-28 bg-background relative select-none border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Architecture &amp; Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            A cohesive AI operating system.{" "}
            <span className="text-text-secondary font-medium">
              Not another isolated chatbot.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            From deep architectural code synthesis in the full web workspace to instant in-page context extraction inside our persistent browser sidebar.
          </p>
        </ScrollReveal>

        {/* Bento Grid with Staggered Scroll Reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {/* Card 1: Multi-Model Handoff (Spans 2 cols on lg) */}
          <motion.div
            variants={revealItem}
            className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative backdrop-blur-md"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <Workflow className="h-3 w-3" />
                <span>ZERO-LOSS HANDOFF</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Mid-Conversation Model Switching with Zero Context Loss
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mb-6">
                Begin an architectural blueprint with <strong className="text-foreground">EchoGPT</strong>, cross-examine symbolic logic in <strong className="text-foreground">DeepSeek V4 Pro</strong>, and perform code verification in <strong className="text-foreground">Opus 5.5</strong>—all in the exact same conversation thread.
              </p>
            </div>

            {/* Interactive Visual Representation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/70 dark:bg-stone-950/70 border border-stone-200/80 dark:border-white/[0.06] space-y-3 font-mono text-xs backdrop-blur-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/70 dark:border-white/[0.06] text-[11px] text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Turn Switcher</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[10px]">
                  100% Token Retention
                </span>
              </div>

              {/* 3 Step Interactive Turns */}
              <div className="space-y-2">
                <div
                  onClick={() => setActiveHandoffStep(1)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-xs",
                    activeHandoffStep === 1
                      ? "bg-white dark:bg-stone-800/80 border-emerald-500/40 text-foreground shadow-xs ring-1 ring-emerald-500/20"
                      : "bg-white/60 dark:bg-stone-900/40 border-stone-200 dark:border-white/[0.05] hover:bg-white dark:hover:bg-stone-800/50"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <ModelBadge modelId="echogpt" size="sm" />
                    <span className="text-foreground font-semibold">Turn 1: Distributed Mesh Architecture</span>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono">1,840 tokens</span>
                </div>

                <div
                  onClick={() => setActiveHandoffStep(2)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-xs",
                    activeHandoffStep === 2
                      ? "bg-white dark:bg-stone-800/80 border-emerald-500/40 text-foreground shadow-xs ring-1 ring-emerald-500/20"
                      : "bg-white/60 dark:bg-stone-900/40 border-stone-200 dark:border-white/[0.05] hover:bg-white dark:hover:bg-stone-800/50"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <ModelBadge modelId="deepseek-v4-pro" size="sm" />
                    <span className="text-foreground font-semibold">Turn 2: CAS Ring-Buffer Theorem Proof</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">+105 t/s</span>
                </div>

                <div
                  onClick={() => setActiveHandoffStep(3)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-xs",
                    activeHandoffStep === 3
                      ? "bg-white dark:bg-stone-800/80 border-emerald-500/40 text-foreground shadow-xs ring-1 ring-emerald-500/20"
                      : "bg-white/60 dark:bg-stone-900/40 border-stone-200 dark:border-white/[0.05] hover:bg-white dark:hover:bg-stone-800/50"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <ModelBadge modelId="opus-5-5" size="sm" />
                    <span className="text-foreground font-semibold">Turn 3: Memory Safety &amp; Code Synthesis</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">Verified Zero Leaks</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Persistent In-Page Sidebar */}
          <motion.div
            variants={revealItem}
            className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <PanelRight className="h-3 w-3" />
                <span>CHROME EXTENSION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Persistent In-Page Companion
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Summon with <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[11px] text-foreground">Ctrl+Shift+E</kbd>. Dock alongside any documentation, GitHub PR, or research paper without leaving your active tab.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-950/70 border border-stone-200/80 dark:border-white/[0.06] space-y-2.5 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DOM Context Hook</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Active</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-white/[0.06] text-[11px] text-text-secondary leading-relaxed">
                Automatically mounts to active tab DOM. Zero stylesheet bleeding via isolated shadow-root container.
              </div>
              <Link href="/extension" className="pt-1 block">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold inline-flex items-center gap-1.5 transition-colors">
                  Test In Simulator <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Floating Text Selection Tool */}
          <motion.div
            variants={revealItem}
            className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <MousePointerClick className="h-3 w-3" />
                <span>INSTANT INLINE QUERY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Highlight &amp; Ask EchoGPT
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Highlight any text on the web. A floating contextual chip appears instantly to explain, translate, or refute the passage without opening a new tab.
              </p>
            </div>

            {/* Interactive Highlight Demo */}
            <div
              onClick={() => setSimulatedHighlight((p) => !p)}
              className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-950/70 border border-stone-200/80 dark:border-white/[0.06] relative cursor-pointer group-hover:border-emerald-500/30 transition-colors backdrop-blur-xs"
              title="Click to simulate highlight"
            >
              <p className="text-xs text-text-secondary leading-relaxed">
                Decoupling the presentation tier from upstream LLM inference{" "}
                <span className={cn("rounded px-1.5 py-0.5 transition-colors font-medium", simulatedHighlight ? "bg-emerald-500/25 dark:bg-emerald-500/35 text-emerald-950 dark:text-emerald-100 border-b-2 border-emerald-500" : "bg-emerald-500/15 dark:bg-emerald-500/20 text-foreground")}>
                  cuts operational expenses by 42%
                </span>{" "}
                while maintaining failover reliability.
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white font-semibold shadow-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>Ask EchoGPT ✨</span>
                </span>
                <span className="text-[10px] text-text-muted">Click text to toggle</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Local-First Cryptographic Vault */}
          <motion.div
            variants={revealItem}
            className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <Lock className="h-3 w-3" />
                <span>PRIVACY &amp; SECURITY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Local-First Encrypted Vault
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Your conversations, custom quick prompts, and extension settings persist inside your local browser memory. Zero third-party model training on private code.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-950/70 border border-stone-200/80 dark:border-white/[0.06] space-y-2 text-xs backdrop-blur-xs">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Storage Engine</span>
                <span className="text-foreground font-semibold">IndexedDB / Local-First</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Telemetry Leaks</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.00% Zero</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Offline Search</span>
                <span className="text-foreground font-semibold">&lt; 5ms Indexing</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: MCP Tool Extensibility Hub */}
          <motion.div
            variants={revealItem}
            className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-stone-900/40 border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                <Cpu className="h-3 w-3" />
                <span>TOOL ECOSYSTEM</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Model Context Protocol (MCP)
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Equip any engine with native MCP connectors: DOM context reading, Python WASM execution sandboxes, and repository file system access.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-950/70 border border-stone-200/80 dark:border-white/[0.06] flex flex-wrap gap-2 text-[11px] font-mono backdrop-blur-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-white/[0.06] text-foreground font-mono">
                dom-reader-v2
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-white/[0.06] text-foreground font-mono">
                python-wasm
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-white/[0.06] text-foreground font-mono">
                github-octokit
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-white/[0.06] text-foreground font-mono">
                vector-cache
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
