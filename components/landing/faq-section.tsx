"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Star, Quote, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Models & Architecture",
    question: "Do I need my own API keys to use EchoGPT?",
    answer:
      "No. EchoGPT includes direct access to all flagship frontier models (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, and Meta Llama 3.1) out of the box. You don't need to generate, manage, or pay for individual API keys.",
  },
  {
    category: "Extension & Browser",
    question: "How does the Chrome Extension interact with web pages?",
    answer:
      "The EchoGPT extension runs in two modes: a lightweight popup (380px) for quick prompts, and a docked sidebar (Ctrl+Shift+E). When browsing any website, you can highlight text to trigger the floating 'Ask EchoGPT' chip, which instantly sends the selected DOM content directly into your active model's conversation without leaving your tab.",
  },
  {
    category: "Workflow",
    question: "Can I switch models mid-conversation without losing context?",
    answer:
      "Yes! That is one of EchoGPT's core superpowers. You can begin a complex reasoning problem with Claude 3.5 Sonnet for code architecture, switch to GPT-4o for refactoring, or query Gemini 1.5 Pro for massive documentation analysis—all within the exact same chat thread with full context preservation.",
  },
  {
    category: "Privacy & Security",
    question: "Is my chat data and code snippets kept private?",
    answer:
      "EchoGPT operates with a local-first storage architecture. Your conversations, custom prompt templates, and extension settings persist inside your browser's encrypted localStorage. We do not sell your prompts or use your private queries to train third-party machine learning models.",
  },
  {
    category: "Billing",
    question: "What is the difference between the Free tier and Pro?",
    answer:
      "The Free tier gives you 30 daily prompts across fast models (GPT-4o mini and Gemini 1.5 Flash) plus the popup extension. The Pro tier ($15/mo) unlocks unlimited queries on all 4 flagship frontier models, the full docked sidebar with in-page DOM text selection, split-view comparison, and priority fast-lane streaming.",
  },
  {
    category: "Reliability",
    question: "What happens if an upstream model provider experiences downtime?",
    answer:
      "Because EchoGPT aggregates multiple independent frontier providers (OpenAI, Anthropic, Google, and Meta), you never get blocked. If one vendor encounters latency or rate limits, you can switch to an alternative flagship model with one click.",
  },
];

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  favoriteModel: string;
  content: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Rivera",
    role: "Staff Software Engineer",
    company: "Vercel Ecosystem",
    avatar: "AR",
    favoriteModel: "Claude 3.5 Sonnet",
    content:
      "I used to keep three browser windows open just to cross-check Claude's TypeScript refactors against GPT-4o. EchoGPT unified my entire developer loop into one sidebar. Saved me $45/mo on subscriptions alone.",
  },
  {
    name: "Elena Rostova",
    role: "AI Research Fellow",
    company: "Stanford NLP Lab",
    avatar: "ER",
    favoriteModel: "Gemini 1.5 Pro",
    content:
      "The ability to highlight documentation on any arXiv paper and query Gemini with 2M token context without leaving the PDF reader has fundamentally sped up our literature review cycles.",
  },
  {
    name: "Marcus Vance",
    role: "Founding Engineer",
    company: "HyperScale Data",
    avatar: "MV",
    favoriteModel: "GPT-4o + Llama 3.1",
    content:
      "Being able to toggle instantly between closed frontier models and open-weights Llama 3.1 gives our engineering team the exact calibration we need for benchmarking prompt outputs.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to know about <span className="text-emerald-500">EchoGPT</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Clear answers about multi-model routing, browser extension mechanics, and unified billing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-border border-y border-border mb-24">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemId = `faq-item-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  id={itemId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left py-2 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
                >
                  <span className="text-base sm:text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-border transition-all ${
                      isOpen
                        ? "bg-emerald-500 text-white border-emerald-500 rotate-180"
                        : "bg-stone-100 dark:bg-stone-800 text-muted-foreground group-hover:border-stone-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={itemId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-3 pr-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Social Proof / Testimonials */}
        <div className="pt-12 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3 text-stone-600 dark:text-stone-300 border-border bg-stone-100 dark:bg-stone-800 px-3 py-0.5 text-xs">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
              Trusted by 10,000+ Engineers &amp; Researchers
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Loved by professionals who build with AI every day
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-6 bg-card border-border hover:border-stone-400 dark:hover:border-stone-700 transition-all rounded-2xl flex flex-col justify-between shadow-xs relative"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-sm text-foreground leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-[11px] text-muted-foreground">{testimonial.role} • {testimonial.company}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-stone-500 dark:text-stone-400 border-border bg-stone-100 dark:bg-stone-900 hidden sm:inline-flex">
                    {testimonial.favoriteModel}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
