"use client";

import React from "react";
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
} from "lucide-react";
import Link from "next/link";
import { ModelBadge } from "@/components/chat/model-badge";

export function FeaturesBento() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built for Modern Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            A cohesive AI ecosystem.{" "}
            <span className="text-text-secondary font-medium">
              Not another isolated chatbot.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            From focused code synthesis in the full-screen web app to zero-friction
            DOM reading in the persistent extension drawer, EchoGPT adapts to your exact flow.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Multi-Model Chat Stage (Spans 2 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group overflow-hidden relative"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-semibold text-emerald-600 mb-3">
                <Sparkles className="h-3 w-3" />
                <span>UNIFIED REASONING</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Multi-Model Chat Stage with Zero Lost Context
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mb-6">
                Never start over in a different browser tab. Swap between Claude 3.5
                Sonnet for complex system design and GPT-4o for rapid syntax validation
                in the exact same conversation thread.
              </p>
            </div>

            {/* Interactive Visual Representation */}
            <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border-subtle space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-[11px] text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active Model Handoff
                </span>
                <span className="text-emerald-600 font-semibold">Live State Sync</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border text-[11px]">
                  <div className="flex items-center gap-2">
                    <ModelBadge modelId="claude-3-5-sonnet" size="sm" />
                    <span className="text-text-secondary truncate">
                      Architecture & Database Design
                    </span>
                  </div>
                  <span className="text-text-muted text-[10px]">Turn 1</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-emerald-500/30 text-[11px]">
                  <div className="flex items-center gap-2">
                    <ModelBadge modelId="gpt-4o" size="sm" />
                    <span className="text-foreground font-semibold truncate">
                      High-Throughput Parallel Worker Review
                    </span>
                  </div>
                  <span className="text-emerald-600 font-semibold text-[10px]">
                    Turn 2 (Current)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: In-Page Browser Extension Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-semibold text-emerald-600 mb-3">
                <PanelRight className="h-3 w-3" />
                <span>CHROME EXTENSION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Persistent In-Page Sidebar
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Dock alongside any documentation or pull request. Toggle instantly
                with universal hotkey <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border font-mono text-[11px] text-foreground">Ctrl+Shift+E</kbd>.
              </p>
            </div>

            {/* Visual representation */}
            <div className="p-3.5 rounded-xl bg-surface-elevated/70 border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    EchoGPT Sidebar
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    DOM Connected
                  </div>
                </div>
              </div>
              <kbd className="px-2 py-1 rounded bg-surface border border-border font-mono text-[11px] text-text-muted">
                Ctrl+Shift+E
              </kbd>
            </div>
          </motion.div>

          {/* Card 3: Floating Highlight & Explain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-semibold text-emerald-600 mb-3">
                <MousePointerClick className="h-3 w-3" />
                <span>CONTEXTUAL ASSIST</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Instant Text Highlight & Explain
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Select any text or code snippet on the web to reveal the floating
                &ldquo;Ask EchoGPT ✨&rdquo; action chip. Automatically populates prompt
                context.
              </p>
            </div>

            {/* Visual Highlight chip */}
            <div className="p-3 rounded-xl bg-surface-elevated/70 border border-border-subtle space-y-2">
              <div className="text-[11px] text-text-secondary line-through opacity-40">
                Traditional: Copy → Switch Tab → Paste → Wait
              </div>
              <div className="p-2 rounded-lg bg-surface border border-emerald-500/40 shadow-xs flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  Highlight snippet on page
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-semibold shadow-xs">
                  <Sparkles className="h-3 w-3" /> Ask EchoGPT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Universal Keyboard Ergonomics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-semibold text-emerald-600 mb-3">
                <Keyboard className="h-3 w-3" />
                <span>POWER-USER FLOW</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Universal Keyboard Shortcuts
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Engineered for speed. Never take your hands off the keyboard.
                Submit with Enter, format multiline prompts with Shift+Enter.
              </p>
            </div>

            {/* Visual keycaps */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-surface-elevated border border-border flex items-center justify-between">
                <span className="text-text-muted">Send:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-semibold text-foreground">
                  Enter ↵
                </kbd>
              </div>
              <div className="p-2 rounded-lg bg-surface-elevated border border-border flex items-center justify-between">
                <span className="text-text-muted">Newline:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-semibold text-foreground">
                  Shift+Enter
                </kbd>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Local-First Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-semibold text-emerald-600 mb-3">
                <ShieldCheck className="h-3 w-3" />
                <span>PRIVACY BY DEFAULT</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Client-Side Session Storage
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                All conversations, search queries, and pinned chats live exclusively
                in your browser&apos;s local storage. Zero corporate tracking or database leaks.
              </p>
            </div>

            {/* Visual badge */}
            <div className="p-2.5 rounded-xl bg-surface-elevated/70 border border-border-subtle flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Client-Side Persistence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
