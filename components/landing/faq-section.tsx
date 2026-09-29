"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Puzzle,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FAQItem {
  id: string;
  category: "Engines" | "Extension" | "Privacy" | "Billing";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "keys",
    category: "Engines",
    question: "Do I need to supply my own API keys to use EchoGPT?",
    answer:
      "No. EchoGPT comes pre-wired with direct enterprise access to all 7 frontier models: EchoGPT default auto-router, DeepSeek V4 Pro, Qwen 3.8 Plus, Kimi 3, Gemini 3.8 Flash, GPT-5.6, and Opus 5.5. You do not need to sign up for OpenAI, Anthropic, or Google Cloud API consoles, manage usage quotas, or pay per-token surcharges.",
  },
  {
    id: "switching",
    category: "Engines",
    question: "How does mid-conversation model switching work without losing context?",
    answer:
      "EchoGPT normalizes conversation state across divergent engine APIs using our unified schema router. When you switch from EchoGPT or Opus 5.5 to DeepSeek V4 Pro or Kimi 3 mid-thread, the complete message history, code blocks, and system instructions are dynamically re-tokenized and formatted into the target engine's native dialect with zero context loss.",
  },
  {
    id: "router",
    category: "Engines",
    question: "What is the EchoGPT default auto-router?",
    answer:
      "EchoGPT acts as an intelligent traffic orchestrator. When active, it calculates query complexity, token density, and reasoning requirements. Code architecture and math proofs are routed to DeepSeek V4 Pro or Opus 5.5, massive documents up to 5M tokens are dispatched to Kimi 3 or Gemini 3.8 Flash, and rapid conversational tasks stream instantly from Gemini 3.8 Flash at sub-20ms latency.",
  },
  {
    id: "extension",
    category: "Extension",
    question: "How does the Chrome Extension interact with web pages and code repos?",
    answer:
      "The EchoGPT extension operates in dual mode: a compact 380px popup for instant lookups, and a docked sidebar (Ctrl+Shift+E). When viewing GitHub PRs, documentation, or technical papers, highlight any text to summon the floating 'Ask EchoGPT' chip. It captures DOM text context and feeds it directly into your active model without switching tabs.",
  },
  {
    id: "shadow-dom",
    category: "Extension",
    question: "Will the browser extension clash with website styling or break pages?",
    answer:
      "No. The EchoGPT in-page UI renders inside an isolated Shadow DOM container with closed encapsulation. Webpage CSS cannot bleed into the extension, and EchoGPT styling will never mutate the host webpage's layout, events, or DOM structure.",
  },
  {
    id: "privacy",
    category: "Privacy",
    question: "Where are my conversations and private codebase snippets stored?",
    answer:
      "EchoGPT utilizes a strict local-first cryptographic storage architecture. Your chat histories, prompt presets, and highlighted snippets persist directly inside your browser's encrypted localStorage and IndexedDB. We do not sell your prompts, log private credentials, or train machine learning models on your proprietary code.",
  },
  {
    id: "downtime",
    category: "Privacy",
    question: "What happens if an upstream provider like OpenAI or Anthropic suffers an outage?",
    answer:
      "Because EchoGPT aggregates multiple independent frontier providers across different datacenters, your workflow is resilient. If OpenAI experiences elevated error rates, EchoGPT auto-router automatically falls back to DeepSeek V4 Pro or Opus 5.5 in milliseconds, ensuring your engineering pipeline stays unblocked.",
  },
  {
    id: "billing",
    category: "Billing",
    question: "Can I cancel my subscription or change team seats anytime?",
    answer:
      "Yes. There are zero long-term commitments or lock-in contracts. You can upgrade, downgrade, or cancel your subscription with 1 click directly in your settings. If you cancel, your Pro access remains active through the end of your billing cycle.",
  },
];

const CATEGORIES = ["All", "Engines", "Extension", "Privacy", "Billing"] as const;

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["keys", "switching"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={18} duration={0.5} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Clear answers. <span className="text-emerald-600 dark:text-emerald-400">Zero ambiguity.</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Everything you need to know about models, browser extension architecture, security, and billing.
          </p>

          {/* Search Filter Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions (e.g. models, extension, privacy...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-stone-50 dark:bg-stone-900/60 text-xs sm:text-sm text-foreground focus:outline-hidden focus:border-emerald-500/60 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  activeCategory === cat
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                    : "bg-stone-100 dark:bg-stone-800/60 text-muted-foreground hover:text-foreground hover:bg-stone-200 dark:hover:bg-stone-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQs Accordion with Scroll Reveal */}
        <ScrollReveal yOffset={16} duration={0.48} delay={0.04} className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search term or category.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "rounded-xl border transition-all overflow-hidden",
                    isOpen
                      ? "border-emerald-500/30 bg-stone-50/80 dark:bg-stone-900/50 shadow-xs"
                      : "border-border bg-card hover:border-stone-400 dark:hover:border-stone-700"
                  )}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-foreground focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-200/60 dark:bg-stone-800 text-muted-foreground font-semibold">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-semibold leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-emerald-500"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </ScrollReveal>

        {/* Live Support / Inquiry Card with Scroll Reveal */}
        <ScrollReveal yOffset={16} duration={0.48} delay={0.05} className="mt-12 p-6 rounded-2xl border border-border bg-stone-50/70 dark:bg-stone-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Still have questions?</h4>
              <p className="text-xs text-muted-foreground">
                Join our developer Discord community or speak directly with our engineering team.
              </p>
            </div>
          </div>
          <Link href="/app">
            <Button variant="outline" size="sm" className="text-xs font-semibold shrink-0 gap-1.5 cursor-pointer">
              <span>Open Support Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
