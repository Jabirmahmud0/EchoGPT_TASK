"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Puzzle,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Layers,
  Cpu,
  CheckCircle2,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SAMPLE_PROMPTS = [
  "Benchmark Opus 5.5 vs GPT-5.6 on lock-free queue concurrency",
  "Route 20,000 token system spec to Kimi 3 for architecture validation",
  "Synthesize low-latency WebSocket connection manager in TypeScript",
];

export function CtaBanner() {
  const router = useRouter();
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(SAMPLE_PROMPTS[0]);

  const handleSelectSample = (idx: number) => {
    setActivePromptIndex(idx);
    setCustomPrompt(SAMPLE_PROMPTS[idx]);
  };

  const handleLaunchWithPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(customPrompt.trim());
    router.push(`/app?prompt=${encoded}`);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border relative overflow-hidden">
      {/* Background glow and subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal yOffset={18} duration={0.5} className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-stone-100 p-8 sm:p-14 lg:p-16 shadow-2xl">
          {/* Ambient lighting spheres */}
          <div className="absolute -top-32 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Operational pill badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All 7 Frontier Engines Online &bull; Mesh Dispatch Ready</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Data Training
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Sub-30ms Dispatch
              </span>
            </div>
          </div>

          {/* Main Headline & Pitch */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Eliminate tab sprawl. <br />
                <span className="text-emerald-400">Deploy unified intelligence.</span>
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Experience EchoGPT, DeepSeek V4 Pro, Qwen 3.8 Plus, Kimi 3, Gemini 3.8 Flash, GPT-5.6, and Opus 5.5 within a single unthrottled workspace and docked browser companion.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/app">
                  <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-6 text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group">
                    <span>Launch Web Workspace</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/extension">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white px-6 py-6 text-sm flex items-center justify-center gap-2"
                  >
                    <Puzzle className="w-4 h-4 text-emerald-400" />
                    <span>Open Extension Simulator</span>
                    <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-stone-800 text-stone-300 rounded border border-stone-700">
                      Ctrl+Shift+E
                    </kbd>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Interactive Prompt Runner Terminal */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-stone-800 bg-stone-950/80 backdrop-blur-md p-5 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono font-semibold text-stone-200">Test Dispatch Console</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Router
                  </span>
                </div>

                {/* Prompt Presets */}
                <div className="space-y-1.5 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    Select Quick Test Benchmark:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {SAMPLE_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSample(idx)}
                        className={cn(
                          "w-full text-left text-[11px] p-2 rounded-lg transition-colors truncate border",
                          activePromptIndex === idx
                            ? "bg-stone-900 text-emerald-300 border-emerald-500/40"
                            : "bg-stone-900/40 text-stone-400 border-stone-800/80 hover:text-stone-200"
                        )}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form to submit prompt */}
                <form onSubmit={handleLaunchWithPrompt} className="space-y-3">
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono text-stone-200 focus:outline-hidden focus:border-emerald-500/50 resize-none leading-relaxed"
                      placeholder="Type custom task to auto-route..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 text-xs font-semibold bg-emerald-500/90 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Query in Web Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Micro trust indicators footer */}
          <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant zero-setup access &bull; No API keys required</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free tier available forever &bull; 14-day Pro trial</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Local-first encrypted browser storage</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
