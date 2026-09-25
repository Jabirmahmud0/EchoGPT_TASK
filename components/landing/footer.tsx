"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, Activity } from "lucide-react";

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
    <footer className="border-t border-border bg-stone-100/60 dark:bg-stone-950/80 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>EchoGPT</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The unified multi-model intelligence workspace and browser companion. Switch between frontier models mid-conversation with zero tab sprawl.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All 4 Models Operational</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Product Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/app" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Web App Workspace
                </Link>
              </li>
              <li>
                <Link href="/extension" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Chrome Extension Simulation
                </Link>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Features Bento
                </a>
              </li>
              <li>
                <a href="#preview" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Interactive Product Tour
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Subscription Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Engines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Supported Engines
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>OpenAI GPT-4o</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Anthropic Claude 3.5 Sonnet</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Google Gemini 1.5 Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Meta Llama 3.1 70B</span>
              </li>
            </ul>
          </div>

          {/* Assignment & Project Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Assignment &amp; Source
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/Jabirmahmud0/EchoGPT_TASK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-emerald-500 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/60" />
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  FAQ &amp; Architecture
                </a>
              </li>
              <li className="text-xs text-muted-foreground/80 leading-relaxed pt-1">
                Candidate submission for the <strong>AppifyDevs</strong> Frontend Software Engineering Internship.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} EchoGPT Ecosystem. Designed with Graphite + Emerald design standard.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy First</span>
            <span>•</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <a
              href="https://github.com/Jabirmahmud0/EchoGPT_TASK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
