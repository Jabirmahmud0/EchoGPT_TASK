"use client";

import React from "react";
import { Clock, User, Bookmark, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockArticleProps {
  className?: string;
  articleRef?: React.RefObject<HTMLDivElement | null>;
  onMouseUp?: () => void;
  onSelectSnippet?: (text: string) => void;
}

export function MockArticle({
  className,
  articleRef,
  onMouseUp,
  onSelectSnippet,
}: MockArticleProps) {
  return (
    <article
      ref={articleRef}
      onMouseUp={onMouseUp}
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none text-foreground select-text relative",
        className
      )}
    >
      {/* Interactive Selection Guide Hint */}
      <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 not-prose">
        <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
          <Sparkles className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>
            Highlight any text in this article to trigger the floating{" "}
            <strong className="text-foreground font-semibold">Ask EchoGPT ✨</strong> chip.
          </span>
        </div>
        <button
          type="button"
          onClick={() =>
            onSelectSnippet?.(
              "Decoupling the presentation tier from upstream LLM inference cuts operational expenses by up to 42% while providing failover redundancy."
            )
          }
          className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors font-medium whitespace-nowrap shadow-xs"
        >
          Sample Highlight
        </button>
      </div>

      {/* Category & Read Time */}
      <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-600 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          SYSTEM ARCHITECTURE
        </span>
        <span className="text-text-muted">•</span>
        <span className="flex items-center gap-1 text-text-muted">
          <Clock className="h-3 w-3" /> 6 min read
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3 leading-snug">
        Why Multi-Model Orchestration is Replacing Single-LLM Stacks
      </h1>

      {/* Author & Actions Bar */}
      <div className="flex items-center justify-between border-y border-border-subtle py-2.5 mb-5 text-xs text-text-muted not-prose">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-medium text-foreground text-[10px]">
            <User className="h-3.5 w-3.5 text-text-secondary" />
          </div>
          <div>
            <span className="font-semibold text-foreground">Elena Vance</span>
            <span className="mx-1.5">•</span>
            <span>Sept 24, 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 rounded text-text-muted hover:text-foreground transition-colors"
            title="Bookmark"
            aria-label="Bookmark article"
          >
            <Bookmark className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded text-text-muted hover:text-foreground transition-colors"
            title="Share"
            aria-label="Share article"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-text-secondary">
        <p className="font-medium text-foreground leading-relaxed">
          Engineering teams are rapidly abandoning single-provider AI lock-in. Instead of routing all application queries through one rigid endpoint, modern browser extensions and enterprise workflows dynamically dispatch requests across specialized models.
        </p>

        <h2 className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2">
          1. The Latency and Intelligence Trade-off
        </h2>
        <p>
          Not every task requires a heavy reasoning engine. Routine tasks such as text summarization, regex generation, or language translation are efficiently handled by lightweight, low-latency models with sub-50ms token output. Conversely, architectural refactoring and complex logic debugging demand dense reasoning benchmarks like Claude 3.5 Sonnet.
        </p>

        {/* Highlighted Quote Box */}
        <div
          onClick={() =>
            onSelectSnippet?.(
              "Decoupling the presentation tier from upstream LLM inference cuts operational expenses by up to 42% while providing failover redundancy when provider outages occur."
            )
          }
          className="my-4 p-3.5 rounded-xl bg-surface-elevated/70 border-l-4 border-emerald-500 hover:border-emerald-400 not-prose cursor-pointer transition-colors group"
          title="Click to test EchoGPT selection explain"
        >
          <p className="italic text-xs text-foreground leading-relaxed font-sans">
            &ldquo;Decoupling the presentation tier from upstream LLM inference cuts operational expenses by up to 42% while providing failover redundancy when provider outages occur.&rdquo;
          </p>
          <span className="block mt-1 text-[11px] text-text-muted font-medium flex items-center justify-between">
            <span>— Cloud Infrastructure Report, Q3 2026</span>
            <span className="text-emerald-600 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-sans">
              <Sparkles className="h-3 w-3" /> Click to Explain
            </span>
          </span>
        </div>

        <h2 className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2">
          2. Zero-Friction In-Page Context
        </h2>
        <p>
          Traditional workflows require engineers to copy text from their browser, navigate to a separate tab, paste the snippet, and wait for inference. Browser extensions that dock alongside the DOM—such as EchoGPT&apos;s persistent sidebar—eliminate this cognitive tax by extracting highlighted tokens directly via universal keyboard shortcuts like <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px] text-foreground">Ctrl+Shift+E</kbd>.
        </p>

        <h2 className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2">
          3. Dynamic Memory & Local State
        </h2>
        <p>
          By maintaining indexed conversation sessions on client-side storage, developers retain instant recall without sending unnecessary context over the wire. This privacy-first posture ensures corporate internal documentation remains secure during web research.
        </p>
      </div>
    </article>
  );
}
