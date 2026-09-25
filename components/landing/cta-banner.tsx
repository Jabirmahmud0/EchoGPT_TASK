"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Puzzle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-stone-100 p-8 sm:p-14 text-center shadow-2xl">
          {/* Subtle background glow effect */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Config Multi-Model Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to unify your entire AI workflow?
            </h2>

            <p className="mt-4 text-stone-300 text-base sm:text-lg leading-relaxed">
              Join thousands of developers, researchers, and creators switching seamlessly between GPT-4o, Claude 3.5, Gemini 1.5, and Llama 3.1.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-6 text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                  Launch Web Workspace
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/extension" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 hover:text-white px-6 py-6 text-base flex items-center justify-center gap-2"
                >
                  <Puzzle className="w-4 h-4 text-emerald-400" />
                  Try Extension Simulation
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Instant setup, no API keys
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Local-first privacy storage
              </span>
              <span>Free forever starter available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
