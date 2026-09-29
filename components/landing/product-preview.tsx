"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelBadge } from "@/components/chat/model-badge";
import {
  Sparkles,
  ArrowRight,
  PanelRight,
  Zap,
  Check,
  Lock,
  RotateCw,
  ExternalLink,
  MessageSquare,
  PenLine,
  FileText,
  Languages,
  Image as ImageIcon,
  Columns2,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type PreviewMode = "workspace" | "extension" | "arena";

export function ProductPreview() {
  const [activeMode, setActiveMode] = useState<PreviewMode>("workspace");

  return (
    <section id="preview" className="py-20 sm:py-28 bg-background relative select-none border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal yOffset={18} duration={0.5} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Experience EchoGPT in action.{" "}
            <span className="text-text-secondary font-medium">
              Zero setup required.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Test the interfaces before installing: switch between our full-screen workspace, persistent browser sidebar companion, and multi-model consensus arena.
          </p>

          {/* Segmented Mode Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-surface-elevated/70 border border-border-subtle shadow-xs mt-8 gap-1">
            {[
              { id: "workspace", label: "01 / Web Workspace" },
              { id: "extension", label: "02 / Browser Extension" },
              { id: "arena", label: "03 / Multi-Model Arena" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMode(tab.id as PreviewMode)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                  activeMode === tab.id
                    ? "bg-surface text-foreground shadow-sm border border-border-subtle"
                    : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dynamic Interactive Preview Canvas with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} delay={0.04} className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-white/[0.08] shadow-2xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {/* View 1: Web App Workspace */}
            {activeMode === "workspace" && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[560px] flex flex-col font-sans text-left"
              >
                {/* Simulated Chrome Bar */}
                <div className="h-11 border-b border-stone-200/80 dark:border-white/[0.08] bg-stone-100/90 dark:bg-stone-900/80 px-4 flex items-center justify-between text-xs text-text-muted backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block shadow-2xs" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block shadow-2xs" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block shadow-2xs" />
                    <span className="ml-2 font-mono text-[11px] text-text-muted">echogpt.app/workspace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Online • 7 Engines</span>
                  </div>
                </div>

                {/* Workspace Split Layout */}
                <div className="flex-1 min-h-0 flex overflow-hidden">
                  {/* Left Mini Sidebar */}
                  <div className="w-64 border-r border-border-subtle bg-surface-elevated/30 p-3 hidden sm:flex flex-col justify-between shrink-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-foreground pb-2 border-b border-border-subtle">
                        <span>Pinned Chats</span>
                        <span className="text-[10px] text-text-muted font-mono">3 Active</span>
                      </div>
                      <div className="space-y-1">
                        <div className="p-2 rounded-xl bg-surface border border-emerald-500/30 text-xs font-medium text-foreground shadow-2xs truncate">
                          Distributed Mesh Architecture
                        </div>
                        <div className="p-2 rounded-xl text-xs text-text-secondary hover:bg-surface/50 truncate">
                          CAS Ring Buffer Proofs
                        </div>
                        <div className="p-2 rounded-xl text-xs text-text-secondary hover:bg-surface/50 truncate">
                          Next.js 16 Streaming PPR
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border-subtle text-[11px] text-text-muted flex items-center justify-between">
                      <span>Pro Workspace</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Main Chat Stage */}
                  <div className="flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-6 bg-surface-elevated/10">
                    {/* Model Picker Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-border-subtle shrink-0">
                      <div className="flex items-center gap-2">
                        <ModelBadge modelId="echogpt" size="sm" />
                        <span className="text-xs text-text-muted font-mono hidden md:inline">Adaptive Context</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Typewriter Streaming Active
                      </span>
                    </div>

                    {/* Messages Feed Preview */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-3.5 scrollbar-thin">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] sm:max-w-md rounded-2xl rounded-tr-xs bg-emerald-600 text-white px-3.5 py-2 text-xs leading-relaxed shadow-xs">
                          How do we achieve zero-downtime model fallback in distributed architectures?
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 max-w-xl">
                        <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="p-3.5 rounded-2xl rounded-tl-xs bg-surface border border-border shadow-xs space-y-2 text-xs text-foreground flex-1">
                          <div className="flex items-center justify-between text-[11px] text-text-muted pb-1 border-b border-border-subtle">
                            <span className="font-semibold text-foreground">EchoGPT (Auto-Router)</span>
                            <span>Dynamic 140+ t/s</span>
                          </div>
                          <p className="text-text-secondary leading-relaxed">
                            Decouple API routing from presentation state using a resilient circuit breaker with automatic failover across DeepSeek V4 Pro, Opus 5.5, and GPT-5.6:
                          </p>
                          <div className="p-2.5 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-[11px] overflow-hidden">
                            <code>
                              const model = await router.getHealthyWorker([
                              &apos;echogpt&apos;, &apos;deepseek-v4-pro&apos;, &apos;gpt-5-6&apos;]);
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Composer Bar */}
                    <div className="pt-2 border-t border-border-subtle shrink-0">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-surface border border-border shadow-xs">
                        <input
                          type="text"
                          readOnly
                          value="Ask EchoGPT or switch model..."
                          className="flex-1 bg-transparent text-xs text-text-muted outline-none px-2"
                        />
                        <div className="h-7 w-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View 2: Persistent Browser Extension */}
            {activeMode === "extension" && (
              <motion.div
                key="extension"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[560px] flex flex-col font-sans text-left"
              >
                {/* Browser Top Chrome */}
                <div className="h-11 border-b border-border bg-surface-elevated/80 px-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 font-mono text-[11px] text-text-muted">https://docs.anthropic.com/en/overview</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                    <PanelRight className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Sidebar Docked (Ctrl+Shift+E)</span>
                  </div>
                </div>

                {/* Split Page + Extension Sidebar View */}
                <div className="flex-1 min-h-0 flex overflow-hidden">
                  {/* Left Mock Webpage */}
                  <div className="flex-1 p-6 bg-background overflow-y-auto space-y-4 text-xs text-text-secondary leading-relaxed">
                    <h1 className="text-base font-bold text-foreground">API Reference: Claude 3.5 &amp; Next-Gen Models</h1>
                    <p>
                      Anthropic reasoning models provide deep analytical capabilities for code refactoring and mathematical proofs.
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border-l-4 border-emerald-500 text-foreground font-medium">
                      &ldquo;Decoupling the presentation tier from upstream LLM inference cuts operational expenses by 42%.&rdquo;
                    </div>
                    <p>
                      Integrating persistent browser assistants removes the friction of copying and pasting code snippets between browser tabs.
                    </p>
                  </div>

                  {/* Right Docked Extension Sidebar Preview */}
                  <div className="w-80 border-l border-border bg-surface flex flex-col justify-between shrink-0 p-3.5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-xs font-semibold text-foreground">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                          <span>EchoGPT Companion</span>
                        </span>
                        <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border font-mono text-[10px] text-text-muted">
                          Ctrl+Shift+E
                        </kbd>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <ModelBadge modelId="echogpt" size="sm" />
                        <span className="text-emerald-600 font-medium">DOM Linked</span>
                      </div>

                      {/* Mock assistant message */}
                      <div className="p-3 rounded-xl bg-surface-elevated/70 border border-border-subtle text-xs space-y-1.5">
                        <div className="text-[10px] font-semibold text-foreground">Context Summary</div>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                          Highlighted passage emphasizes provider decoupling to prevent vendor lock-in and optimize token spending.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border-subtle">
                      <div className="p-2 rounded-lg bg-surface-elevated border border-border text-[11px] text-text-muted flex items-center justify-between">
                        <span>Explain highlighted text...</span>
                        <div className="h-5 w-5 rounded bg-emerald-600 text-white flex items-center justify-center">
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View 3: Multi-Model Consensus Arena */}
            {activeMode === "arena" && (
              <motion.div
                key="arena"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[560px] flex flex-col font-sans text-left"
              >
                {/* Arena Header */}
                <div className="h-11 border-b border-border bg-surface-elevated/80 px-4 flex items-center justify-between text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <Columns2 className="h-3.5 w-3.5 text-cyan-500" />
                    <span className="font-semibold text-foreground">Multi-Model Arena: Side-by-Side Consensus</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-600 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                    Benchmarking Mode
                  </span>
                </div>

                {/* Split Dual Arena Output */}
                <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle overflow-y-auto">
                  {/* Pane A: Opus 5.5 */}
                  <div className="p-5 space-y-3 bg-surface">
                    <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                      <ModelBadge modelId="opus-5-5" size="sm" />
                      <span className="text-[10px] font-mono text-text-muted">88 t/s • 32ms</span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground">Architectural Analysis:</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      To eliminate tail latency, implement an atomic CAS ring buffer channel. Decoupling downstream write locks prevents cascade failure under p99 load.
                    </p>
                    <div className="p-2.5 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-[10px]">
                      <code>export function createCASRing() &#123; ... &#125;</code>
                    </div>
                  </div>

                  {/* Pane B: GPT-5.6 */}
                  <div className="p-5 space-y-3 bg-surface-elevated/30">
                    <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                      <ModelBadge modelId="gpt-5-6" size="sm" />
                      <span className="text-[10px] font-mono text-text-muted">92 t/s • 26ms</span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground">Throughput Optimization:</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Parallelize worker threads by tenant partitions to preserve in-order delivery while scaling consumer groups horizontally.
                    </p>
                    <div className="p-2.5 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-[10px]">
                      <code>const cluster = new WorkerCluster();</code>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="h-12 border-t border-border-subtle px-4 flex items-center justify-between text-xs text-text-secondary bg-surface">
                  <span>Consensus score: <strong className="text-emerald-600 font-semibold">98.4% agreement on decoupling writes</strong></span>
                  <Link href="/app">
                    <span className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                      Run in Workspace <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
