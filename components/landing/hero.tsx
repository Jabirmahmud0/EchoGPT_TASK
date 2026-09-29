"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModelBadge } from "@/components/chat/model-badge";
import { ModelId } from "@/lib/types";
import { MODELS, MODELS_LIST } from "@/lib/models";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  PanelRight,
  CheckCircle2,
  Zap,
  Copy,
  Check,
  Code2,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Lock,
  Workflow,
  ChevronRight,
} from "lucide-react";

interface HeroPreviewConfig {
  speed: string;
  latency: string;
  focus: string;
  query: string;
  response: string;
  codeSnippet: string;
}

const HERO_PREVIEWS: Record<ModelId, HeroPreviewConfig> = {
  echogpt: {
    speed: "140+ t/s",
    latency: "18ms",
    focus: "Dynamic Multi-Model Auto-Router",
    query: "How should our distributed event bus handle tail latency spikes under peak load?",
    response:
      "EchoGPT adaptive router analyzed query intent and dispatched across engines: DeepSeek V4 Pro proved lock-free invariant CAS guarantees, while Opus 5.5 synthesized the zero-allocation telemetry pipeline.",
    codeSnippet: `// EchoGPT Adaptive Multi-Model Dispatcher
import { createEchoRouter } from "@echogpt/core";

export const router = createEchoRouter({
  strategy: "adaptive-consensus",
  primary: "echogpt-v4",
  fallback: ["deepseek-v4-pro", "opus-5-5"],
  maxLatencyMs: 35
});

const result = await router.orchestrate({
  intent: "distributed-architecture",
  stream: true
});`,
  },
  "deepseek-v4-pro": {
    speed: "105 t/s",
    latency: "22ms",
    focus: "Open Deep Reasoning & Symbolic Proofs",
    query: "Formally verify that ring-buffer channel queue saturation remains strictly bounded.",
    response:
      "Theorem verification complete: Head-of-line blocking is eliminated using atomic CAS ring buffers with Lamport logical clocks. Invariant holds across parallel thread contention.",
    codeSnippet: `// Lock-Free Atomic CAS Ring Buffer
export function createLockFreeChannel<T>(capacity: number) {
  const buf = new SharedArrayBuffer(capacity * 8);
  const ring = new Int32Array(buf);
  return {
    push: (v: number) => Atomics.store(ring, 0, v),
    pop: () => Atomics.load(ring, 0)
  };
}`,
  },
  "qwen-3-8-plus": {
    speed: "95 t/s",
    latency: "24ms",
    focus: "Enterprise Multilingual & Agentic Execution",
    query: "Automate cross-service canary deployment reconciliations across Kubernetes clusters.",
    response:
      "Generated autonomous reconciler manifest with real-time health telemetry polling and automatic rollback triggers based on p99 error budget degradation.",
    codeSnippet: `// Agentic Canary Deployment Orchestrator
const agent = new QwenAgent({
  tools: [k8sOperator, prometheusMetricTool],
  consensusThreshold: 0.99
});
await agent.executeWorkflow("zero-downtime-rebalance");`,
  },
  "kimi-3": {
    speed: "90 t/s",
    latency: "28ms",
    focus: "5M Token Infinite Context Repository Indexing",
    query: "Index all 1,400 microservice spec files and isolate queue saturation bottlenecks.",
    response:
      "Scanned 4.8M tokens across monorepo tree. Isolated 3 circular dependency leaks in /packages/event-bus/v2 and synthesized optimized dependency graph.",
    codeSnippet: `// Kimi 3 5M-Token Monorepo Indexer
const index = await kimi.indexRepository({
  depth: "exhaustive",
  tokenVolume: "4.8M tokens",
  query: "identify tail latency bottlenecks"
});`,
  },
  "gemini-3-8-flash": {
    speed: "180 t/s",
    latency: "12ms",
    focus: "Sub-30ms Multimodal Real-Time Streaming",
    query: "Stream live distributed flame graphs and isolate database lock contention.",
    response:
      "Real-time DOM trace streaming active at 60fps. Database mutex contention pinpointed at line 142 within 18ms of trace ingestion.",
    codeSnippet: `// Real-Time Flamegraph DOM Ingestion
gemini.streamTelemetryFeed(traceSocket, {
  frameRate: "60fps",
  maxLatencyMs: 25,
  multimodal: true
});`,
  },
  "gpt-5-6": {
    speed: "92 t/s",
    latency: "26ms",
    focus: "Autonomous Frontier World Simulation",
    query: "Simulate distributed network topology under 100,000 req/sec synthetic chaos load.",
    response:
      "Executed distributed network topology simulation across 512 virtualized nodes. Confirmed fault tolerance and self-healing partitioning across regions.",
    codeSnippet: `// Autonomous Mesh Network Chaos Simulation
const simulation = await gpt56.simulateMeshNetwork({
  nodes: 512,
  concurrency: 100000,
  chaosEvents: ["packet-loss-15%"]
});`,
  },
  "opus-5-5": {
    speed: "88 t/s",
    latency: "32ms",
    focus: "Dense Thinking, Reflection & Code Rigor",
    query: "Review the concurrent ring buffer implementation for memory leaks and race conditions.",
    response:
      "Exhaustive code verification complete: Synchronous downstream write locks decoupled. Zero-allocation telemetry ring buffer decreases p99 latency from 420ms to 12ms.",
    codeSnippet: `// Zero-Allocation Ring Buffer Channel
export function createFastRingBuffer<T>(capacity: number) {
  const buffer = new Array<T>(capacity);
  let head = 0, tail = 0;
  return {
    push: (item: T) => { buffer[tail++ % capacity] = item; },
    drain: () => buffer.splice(0, tail - head)
  };
}`,
  },
  // Backward compatibility keys
  "claude-3-7-sonnet": {
    speed: "88 t/s",
    latency: "32ms",
    focus: "Dense Thinking & Code Rigor",
    query: "Review concurrent ring buffer implementation.",
    response: "Exhaustive code verification complete.",
    codeSnippet: "// Zero-Allocation Ring Buffer\nexport const buffer = [];",
  },
  "gpt-4-5": {
    speed: "92 t/s",
    latency: "26ms",
    focus: "Autonomous Frontier Simulation",
    query: "Simulate distributed network.",
    response: "Simulation complete.",
    codeSnippet: "// Simulation\nconst sim = {};",
  },
  "gemini-2-0-pro": {
    speed: "180 t/s",
    latency: "12ms",
    focus: "Sub-30ms Multimodal",
    query: "Stream live trace.",
    response: "Streaming active.",
    codeSnippet: "// Stream\nconst stream = {};",
  },
  "deepseek-r1": {
    speed: "105 t/s",
    latency: "22ms",
    focus: "Open Deep Reasoning",
    query: "Verify invariant.",
    response: "Invariant holds.",
    codeSnippet: "// Invariant\nconst inv = true;",
  },
  "llama-3-3-70b": {
    speed: "95 t/s",
    latency: "24ms",
    focus: "Agentic Execution",
    query: "Reconcile deployment.",
    response: "Deployment reconciled.",
    codeSnippet: "// Reconcile\nconst r = {};",
  },
  "claude-3-5-sonnet": {
    speed: "88 t/s",
    latency: "32ms",
    focus: "Dense Thinking",
    query: "Audit code.",
    response: "Code audited.",
    codeSnippet: "// Audit\nconst a = {};",
  },
  "gpt-4o": {
    speed: "92 t/s",
    latency: "26ms",
    focus: "Simulation",
    query: "Simulate mesh.",
    response: "Mesh simulated.",
    codeSnippet: "// Mesh\nconst m = {};",
  },
  "gemini-1-5-pro": {
    speed: "180 t/s",
    latency: "12ms",
    focus: "Multimodal",
    query: "Stream DOM.",
    response: "Stream active.",
    codeSnippet: "// DOM\nconst d = {};",
  },
  "llama-3-1-70b": {
    speed: "95 t/s",
    latency: "24ms",
    focus: "Agentic Execution",
    query: "Execute plan.",
    response: "Plan executed.",
    codeSnippet: "// Plan\nconst p = {};",
  },
};

export function LandingHero() {
  const [activeModel, setActiveModel] = useState<ModelId>("echogpt");
  const [copied, setCopied] = useState(false);

  const preview = HERO_PREVIEWS[activeModel] || HERO_PREVIEWS["echogpt"];
  const currentModelInfo = MODELS[activeModel] || MODELS["echogpt"];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(preview.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-background border-b border-border-subtle">
      {/* Subtle Geometric Anti-Slop Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Operational Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-border-subtle/60 text-xs text-text-muted">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground tracking-tight">EchoGPT Mesh v4.8</span>
            <span className="text-text-muted">•</span>
            <span>7 Frontier Engines Live</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-3 w-3" />
              <span>Sub-30ms Dispatch</span>
            </span>
            <span className="text-text-muted">•</span>
            <span>Zero Outbound Telemetry</span>
            <span className="text-text-muted">•</span>
            <span className="text-foreground font-semibold">100% Local Encrypted</span>
          </div>
        </div>

        {/* Asymmetric 2-Column Hero Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Surgical Typography & Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle text-xs font-semibold text-foreground shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>The Multi-AI Operating System</span>
              <span className="text-text-muted">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">Replaces 4 Silos</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              Switch AI models mid-thought.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400">
                Zero tab sprawl.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              Never copy-paste prompts between browser tabs again. EchoGPT unifies{" "}
              <strong className="text-foreground font-semibold">DeepSeek V4 Pro, GPT-5.6, Opus 5.5, Kimi 3</strong>, and our default adaptive router into one persistent memory graph and in-page browser sidebar.
            </p>

            {/* Tactile Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/app" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Web Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/extension" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold border-border hover:border-emerald-500/40 hover:bg-surface-elevated text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PanelRight className="h-4 w-4 text-emerald-500" />
                  <span>Extension Simulator</span>
                  <kbd className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-text-muted hidden sm:inline">
                    Ctrl+Shift+E
                  </kbd>
                </Button>
              </Link>
            </div>

            {/* Micro-Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-border-subtle/80">
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">0 ms</div>
                <div className="text-[11px] text-text-muted font-medium">Handoff Friction</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">5M</div>
                <div className="text-[11px] text-text-muted font-medium">Max Token Window</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">75%</div>
                <div className="text-[11px] text-text-muted font-medium">Subscription Savings</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Multi-Model Workbench Console */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-white/[0.08] shadow-2xl overflow-hidden text-left relative group">
              {/* Window Header */}
              <div className="h-12 border-b border-stone-200/80 dark:border-white/[0.08] bg-stone-100/90 dark:bg-stone-900/80 px-4 flex items-center justify-between gap-3 select-none backdrop-blur-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block shadow-2xs" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block shadow-2xs" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block shadow-2xs" />
                  <span className="ml-2 font-mono text-[11px] text-text-muted hidden sm:inline">
                    echogpt.orchestrator // live-bench
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Activity className="h-3 w-3" />
                    <span>{preview.latency}</span>
                  </span>
                  <span className="text-text-muted hidden sm:inline">•</span>
                  <span className="text-text-secondary hidden sm:inline">{preview.speed}</span>
                </div>
              </div>

              {/* Model Switcher Rail */}
              <div className="p-2 border-b border-border-subtle bg-surface-elevated/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {MODELS_LIST.map((model) => {
                  const isSelected = model.id === activeModel;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setActiveModel(model.id)}
                      className={cn(
                        "px-2.5 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                        isSelected
                          ? "bg-surface border border-emerald-500/40 text-foreground shadow-xs font-semibold"
                          : "text-text-muted hover:text-foreground hover:bg-surface/50 border border-transparent"
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: model.accentColor }}
                      />
                      <span>{model.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Workbench Feed */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="p-5 sm:p-6 space-y-4"
                >
                  {/* Active Model Specialization Pill */}
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <ModelBadge modelId={activeModel} size="sm" />
                      <span className="text-[11px] text-text-muted truncate">• {preview.focus}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {currentModelInfo.contextWindow}
                    </span>
                  </div>

                  {/* Prompt Query Preview */}
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-surface-elevated border border-border flex items-center justify-center shrink-0 text-text-secondary text-xs font-semibold">
                      You
                    </div>
                    <div className="flex-1 p-3 rounded-2xl bg-surface-elevated/70 border border-border-subtle text-xs sm:text-sm font-medium text-foreground">
                      {preview.query}
                    </div>
                  </div>

                  {/* Model Response Preview */}
                  <div className="flex items-start gap-3">
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: `${currentModelInfo.accentColor}20`, border: `1px solid ${currentModelInfo.accentColor}40` }}
                    >
                      <Sparkles className="h-4 w-4" style={{ color: currentModelInfo.accentColor }} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {preview.response}
                      </p>

                      {/* Interactive Code Container */}
                      <div className="rounded-xl bg-neutral-950 text-neutral-200 border border-neutral-800 p-3.5 relative overflow-hidden font-mono text-[11px]">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80 mb-2 text-neutral-400">
                          <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-400">
                            <Terminal className="h-3 w-3" />
                            <span>SYNTHESIZED CODE ARTIFACT</span>
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px]"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto scrollbar-thin text-neutral-300 leading-relaxed">
                          <code>{preview.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
