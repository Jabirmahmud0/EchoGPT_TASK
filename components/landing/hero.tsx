"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Terminal,
  Zap,
  Copy,
  Check,
  Code2,
  Lock,
} from "lucide-react";

const HERO_PREVIEWS: Record<
  ModelId,
  {
    response: string;
    speed: string;
    focus: string;
    codeSnippet?: string;
  }
> = {
  "claude-3-5-sonnet": {
    focus: "Architectural Rigor & Nuance",
    speed: "92 t/s",
    response:
      "To eliminate p99 latency spikes in your distributed event bus, decouple synchronous downstream write locks using an atomic ring buffer with batched flushing.",
    codeSnippet: `// Zero-allocation ring buffer channel
export function createFastRingBuffer<T>(capacity: number) {
  const buffer = new Array<T>(capacity);
  let head = 0, tail = 0;
  return {
    push: (item: T) => { buffer[tail++ % capacity] = item; },
    drain: () => buffer.splice(0, tail - head)
  };
}`,
  },
  "gpt-4o": {
    focus: "Multimodal Inference & General Speed",
    speed: "85 t/s",
    response:
      "Parallelize your telemetry fan-out across worker threads. By partitioning messages by tenant ID, you guarantee in-order delivery while scaling consumer groups horizontally.",
    codeSnippet: `// Parallelized worker dispatch
const cluster = new WorkerCluster({ minWorkers: 4 });
await cluster.map(partitions, async (partition) => {
  return await processPartitionBatch(partition.id);
});`,
  },
  "gemini-1-5-pro": {
    focus: "Extreme 2M-Token Context Retrieval",
    speed: "78 t/s",
    response:
      "Ingesting your entire 800-page legacy architecture specification. Cross-referencing Section 4.2 with current service topology: 3 redundant circular dependencies identified.",
    codeSnippet: `// Deep cross-document analysis
const analysis = await gemini.analyzeContext({
  corpusSize: "1.8M tokens",
  crossReferences: ["spec_v1.pdf", "topology.json"]
});`,
  },
  "llama-3-1-70b": {
    focus: "Open-Weights Independence & Math",
    speed: "110 t/s",
    response:
      "Applying stochastic queueing theory: optimal throughput is achieved when buffer saturation remains strictly below 78% capacity under synthetic load spikes.",
    codeSnippet: `// Stochastic queue saturation model
function calculateOptimumLoad(arrivalRate: number, serviceRate: number) {
  const rho = arrivalRate / serviceRate;
  return Math.min(0.78, rho);
}`,
  },
};

export function LandingHero() {
  const [activePreviewModel, setActivePreviewModel] =
    useState<ModelId>("claude-3-5-sonnet");
  const [copied, setCopied] = useState(false);

  const previewData = HERO_PREVIEWS[activePreviewModel];

  const handleCopyCode = () => {
    if (previewData.codeSnippet) {
      navigator.clipboard.writeText(previewData.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-background">
      {/* Background Subtle Geometry (Strictly anti-slop, no generic blobs) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow Chip */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-xs text-xs font-medium text-text-secondary"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground">Next-Gen Multi-AI</span>
            <span className="text-text-muted">•</span>
            <span>GPT-4o, Claude 3.5 Sonnet, Gemini & Llama</span>
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] sm:leading-[1.08]"
          >
            Switch AI models mid-thought.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
              Zero tab sprawl.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-6 text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Orchestrate top-tier reasoning engines in one unified workspace and
            extract live DOM context directly from any web page using our persistent
            browser sidebar.
          </motion.p>
        </div>

        {/* Dual Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <Link href="/app" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Open Web App Workspace
            </Button>
          </Link>

          <Link href="/extension" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium border border-border hover:border-emerald-500/40 hover:bg-surface-elevated text-foreground"
              leftIcon={<PanelRight className="h-4 w-4 text-emerald-500" />}
            >
              <span>See Extension Concept</span>
              <kbd className="ml-2 font-mono text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-surface border border-border hidden sm:inline">
                Ctrl+Shift+E
              </kbd>
            </Button>
          </Link>
        </motion.div>

        {/* Micro-proof Trust Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-text-muted mb-16 select-none"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Zero API Keys Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Local Session Persistence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Sub-50ms Typewriter Streaming</span>
          </div>
        </motion.div>

        {/* Interactive Product Preview Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="w-full max-w-4xl mx-auto rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden"
        >
          {/* Mock Window Top Bar */}
          <div className="h-11 border-b border-border bg-surface-elevated/70 px-4 flex items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/70 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-text-muted hidden sm:inline">
                echogpt-orchestrator.workspace
              </span>
            </div>

            {/* Model Switcher Tabs inside the preview */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              {MODELS_LIST.map((model) => {
                const isSelected = model.id === activePreviewModel;
                return (
                  <button
                    key={model.id}
                    onClick={() => setActivePreviewModel(model.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
                      isSelected
                        ? "bg-surface border border-emerald-500/40 text-foreground shadow-xs"
                        : "text-text-muted hover:text-foreground hover:bg-surface/50"
                    )}
                  >
                    <ModelBadge
                      modelId={model.id}
                      size="sm"
                      className="border-0 bg-transparent shadow-none p-0 text-[10px]"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Zap className="h-3 w-3" />
                {previewData.speed}
              </span>
            </div>
          </div>

          {/* Interactive Preview Body */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Prompt Preview */}
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-surface-elevated border border-border flex items-center justify-center shrink-0 text-text-secondary text-xs font-semibold">
                You
              </div>
              <div className="flex-1 p-3 rounded-xl bg-surface-elevated/80 border border-border-subtle text-xs sm:text-sm font-medium text-foreground">
                How should we refactor our distributed event pipeline to reduce p99
                tail latency without inflating operational expenses?
              </div>
            </div>

            {/* Model Response Preview */}
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-foreground">
                      {MODELS[activePreviewModel].name}
                    </span>
                    <span className="text-[11px] text-text-muted hidden sm:inline">
                      • {previewData.focus}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-mono">
                    Token Stream Complete
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                  {previewData.response}
                </p>

                {/* Syntax Highlighted Code Box */}
                {previewData.codeSnippet && (
                  <div className="rounded-xl bg-neutral-950 dark:bg-black border border-neutral-800 p-3 sm:p-4 text-neutral-200 text-xs font-mono relative overflow-hidden">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                        pipeline.optimization.ts
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
                        title="Copy code"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto scrollbar-thin text-[11px] sm:text-xs leading-relaxed">
                      <code>{previewData.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
