"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModelBadge } from "@/components/chat/model-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  PanelRight,
  MessageSquare,
  Search,
  ExternalLink,
  Lock,
  RotateCw,
  Terminal,
  Copy,
  Plus,
  Clock,
  Pin,
  Check,
} from "lucide-react";

type PreviewTab = "workspace" | "extension";

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("workspace");

  return (
    <section
      id="preview"
      className="py-20 sm:py-28 border-b border-border-subtle bg-surface-elevated/20 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Interface Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Two distinct surfaces.{" "}
            <span className="text-text-secondary font-medium">
              One shared intelligence.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Switch between the full-screen engineering workspace and the docked
            browser companion with zero workflow friction.
          </p>
        </div>

        {/* Segmented Switcher Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-surface border border-border shadow-xs">
            <button
              onClick={() => setActiveTab("workspace")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150",
                activeTab === "workspace"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>Web App <span className="hidden sm:inline">Workspace (`/app`)</span></span>
            </button>

            <button
              onClick={() => setActiveTab("extension")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150",
                activeTab === "extension"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              <PanelRight className="h-4 w-4 shrink-0" />
              <span>Extension <span className="hidden sm:inline">Simulation (`/extension`)</span></span>
            </button>
          </div>
        </div>

        {/* High-Fidelity Preview Container */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === "workspace" ? (
              /* 1. Full Web App Workspace Preview */
              <motion.div
                key="preview-workspace"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-[520px] sm:h-[580px] bg-background text-foreground"
              >
                {/* Browser-style Top Bar */}
                <div className="h-10 border-b border-border bg-surface-elevated/70 px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    <span className="ml-2 font-mono text-[11px] text-text-muted hidden sm:inline">
                      echogpt.ai/app
                    </span>
                  </div>

                  <Link href="/app">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                      Open Live Workspace <ExternalLink className="h-3 w-3" />
                    </span>
                  </Link>
                </div>

                {/* Workspace Split Layout */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Left Mini Sidebar */}
                  <div className="w-56 border-r border-border bg-surface p-3 hidden sm:flex flex-col justify-between shrink-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-foreground">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                          EchoGPT
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-elevated border border-border text-text-muted">
                          New Chat
                        </span>
                      </div>

                      {/* Mock search */}
                      <div className="p-1.5 rounded-lg bg-surface-elevated border border-border-subtle flex items-center gap-1.5 text-text-muted text-[11px]">
                        <Search className="h-3 w-3" />
                        <span>Search chats...</span>
                      </div>

                      {/* Chat list */}
                      <div className="space-y-1 text-xs">
                        <div className="text-[10px] uppercase font-semibold text-text-muted px-1">
                          Pinned
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-medium text-emerald-600 flex items-center justify-between text-[11px]">
                          <span className="truncate">Next.js 16 Architecture</span>
                          <Pin className="h-2.5 w-2.5" />
                        </div>

                        <div className="text-[10px] uppercase font-semibold text-text-muted px-1 pt-2">
                          Recent
                        </div>
                        <div className="p-2 rounded-lg text-text-secondary hover:bg-surface-elevated text-[11px] truncate">
                          Distributed LLM Orchestration
                        </div>
                        <div className="p-2 rounded-lg text-text-secondary hover:bg-surface-elevated text-[11px] truncate">
                          Event Bus P99 Optimization
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border-subtle text-[11px] text-text-muted flex items-center justify-between">
                      <span>Pro Workspace</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Main Chat Stage */}
                  <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 bg-surface-elevated/20 overflow-hidden">
                    {/* Model Picker Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-border-subtle shrink-0">
                      <div className="flex items-center gap-2">
                        <ModelBadge modelId="claude-3-5-sonnet" size="sm" />
                        <span className="text-xs text-text-muted font-mono hidden md:inline">
                          200k tokens
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Typewriter Streaming Active
                      </span>
                    </div>

                    {/* Messages Feed Preview */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-3.5 scrollbar-thin">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] sm:max-w-md rounded-2xl rounded-tr-xs bg-emerald-600 text-white px-3.5 py-2 text-xs leading-relaxed shadow-xs">
                          How do we achieve zero-downtime model fallback in Next.js?
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 max-w-xl">
                        <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="p-3.5 rounded-2xl rounded-tl-xs bg-surface border border-border shadow-xs space-y-2 text-xs text-foreground flex-1">
                          <div className="flex items-center justify-between text-[11px] text-text-muted pb-1 border-b border-border-subtle">
                            <span className="font-semibold text-foreground">
                              Claude 3.5 Sonnet
                            </span>
                            <span>92 tokens/sec</span>
                          </div>
                          <p className="text-text-secondary leading-relaxed">
                            Decouple API routing from presentation state using a
                            resilient circuit breaker with automatic failover from
                            Claude to GPT-4o:
                          </p>
                          <div className="p-2.5 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-[11px] overflow-hidden">
                            <code>
                              const model = await router.getHealthyWorker([
                              &apos;claude&apos;, &apos;gpt-4o&apos;]);
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
                          value="Ask Claude 3.5 Sonnet or switch model..."
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
            ) : (
              /* 2. Chrome Extension Split Preview */
              <motion.div
                key="preview-extension"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-[520px] sm:h-[580px] bg-background text-foreground"
              >
                {/* Browser Window Header */}
                <div className="h-10 border-b border-border bg-surface-elevated/70 px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-surface border border-border text-[11px] text-text-secondary max-w-sm truncate">
                    <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>https://techinsights.dev/deep-dive/modern-ai</span>
                  </div>

                  <Link href="/extension">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                      Open Live Simulator <ExternalLink className="h-3 w-3" />
                    </span>
                  </Link>
                </div>

                {/* Article on Left + Docked Extension Sidebar on Right */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Left Mock Webpage */}
                  <div className="flex-1 p-6 overflow-y-auto bg-surface-elevated/30 relative">
                    <div className="max-w-md space-y-3 text-xs leading-relaxed text-text-secondary">
                      <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                        Live Web Page Context
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        Why Multi-Model Orchestration is Replacing Single-LLM Stacks
                      </h3>
                      <p>
                        Engineering teams are rapidly abandoning single-provider AI lock-in.
                        Instead of routing all queries through one endpoint, modern extensions
                        dispatch requests based on task specialization...
                      </p>
                      {/* Highlighted text with floating chip */}
                      <div className="relative p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-foreground font-medium">
                        &ldquo;Decoupling the presentation tier from upstream inference
                        cuts operational expenses by 42%.&rdquo;
                        <div className="absolute -top-3.5 right-4 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-semibold shadow-xs flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5" /> Ask EchoGPT
                        </div>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Select any text in the DOM to trigger instant contextual explain actions.
                      </p>
                    </div>
                  </div>

                  {/* Right Docked Extension Sidebar */}
                  <div className="w-72 sm:w-80 border-l border-border bg-surface flex flex-col justify-between shrink-0 p-3.5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-xs font-semibold text-foreground">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                          EchoGPT Sidebar
                        </span>
                        <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border font-mono text-[10px] text-text-muted">
                          Ctrl+Shift+E
                        </kbd>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <ModelBadge modelId="claude-3-5-sonnet" size="sm" />
                        <span className="text-emerald-600 font-medium">DOM Linked</span>
                      </div>

                      {/* Mock assistant message */}
                      <div className="p-3 rounded-xl bg-surface-elevated/70 border border-border-subtle text-xs space-y-1.5">
                        <div className="text-[10px] font-semibold text-foreground">
                          Context Summary
                        </div>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                          The highlighted passage emphasizes provider decoupling to prevent
                          vendor lock-in and optimize token spending.
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
