"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  Activity,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Command,
} from "lucide-react";
import { MODELS_LIST } from "@/lib/models";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-stone-100/70 dark:bg-stone-950 text-foreground transition-colors">
      {/* Real-time Engine Health Telemetry Strip */}
      <div className="border-b border-border/60 bg-stone-200/40 dark:bg-stone-900/50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-foreground">Operational Status:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              All 7 Frontier Engines 100% Operational &bull; 99.98% SLA
            </span>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground font-mono text-[11px]">
            <span>Router Dispatch: &lt;28ms</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">P99 Latency: 420ms</span>
            <span>&bull;</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Telemetry Leaks</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal yOffset={16} duration={0.48}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
            {/* Brand Info & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-xl tracking-tight">EchoGPT</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              The unified multi-model frontier workspace and browser companion. Switch between frontier models mid-conversation with zero tab sprawl and zero vendor lock-in.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-900 border border-border text-[11px] font-mono text-muted-foreground">
                <Command className="w-3 h-3" />
                <span>Ctrl + K for launcher</span>
              </div>
            </div>
          </div>

          {/* Col 1: Supported Engines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Frontier Engines
            </h4>
            <ul className="space-y-2 text-xs">
              {MODELS_LIST.map((model) => (
                <li key={model.id}>
                  <Link
                    href={`/app?model=${model.id}`}
                    className="text-muted-foreground hover:text-emerald-500 transition-colors flex items-center justify-between"
                  >
                    <span>{model.name}</span>
                    <span className="text-[10px] font-mono opacity-60">
                      {model.id === "echogpt" ? "Default" : model.contextWindow.replace(" tokens", "")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Workspace & Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/app" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Web Workspace (`/app`)
                </Link>
              </li>
              <li>
                <Link href="/extension" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Chrome Extension Demo
                </Link>
              </li>
              <li>
                <Link href="/#product-preview" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Dual Consensus Arena
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  In-Page Text Highlight
                </Link>
              </li>
              <li>
                <Link href="/#why-choose-us" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Savings Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Local-First Encrypted Vault
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Sub-30ms Mesh Router
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Shadow DOM Encapsulation
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                5M Token Context Pipeline
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Zero Data Training Guarantee
              </li>
            </ul>
          </div>

          {/* Col 4: Plans & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              EchoGPT Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Pricing Plans &amp; Tiers
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Verified Testimonials
                </Link>
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                API Documentation (v4.8)
              </li>
              <li className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Enterprise BAA &amp; SLA
              </li>
            </ul>
          </div>
        </div>
        </ScrollReveal>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} EchoGPT Inc. All rights reserved. Built for high-velocity engineering workflows.
          </p>

          <div className="flex items-center gap-6 text-xs">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Status Page</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
