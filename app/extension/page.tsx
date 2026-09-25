"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExtensionLayout, ExtensionView } from "@/lib/types";
import { LayoutSwitcher } from "@/components/extension/layout-switcher";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, Sparkles, MessageSquare, Compass, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

import { PopupShell } from "@/components/extension/popup-shell";

export default function ExtensionPage() {
  const [layout, setLayout] = useState<ExtensionLayout>("popup");
  const [view, setView] = useState<ExtensionView>("chat");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/80 backdrop-blur-md px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            title="Return to Home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight">EchoGPT</span>
              <span className="text-xs text-text-secondary hidden sm:inline">•</span>
              <span className="text-xs text-text-secondary hidden sm:inline">Extension Simulator</span>
            </div>
          </div>
        </div>

        {/* Center Layout Switcher */}
        <div className="flex items-center">
          <LayoutSwitcher currentLayout={layout} onLayoutChange={setLayout} />
        </div>

        {/* Right Links & Theme */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/app">
            <Button size="sm" variant="secondary" className="text-xs h-8">
              Open Web App
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Interactive Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Informational Subtitle */}
          <div className="mb-6 text-center max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-2">
              <span>Chrome Web Store Concept</span>
              <span>•</span>
              <span className="font-mono">v1.0.5 Redesign</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {layout === "popup" ? "Chrome Extension Popup" : "In-Page Persistent Sidebar"}
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              {layout === "popup"
                ? "Simulating the 380×560px compact browser toolbar extension interface."
                : "Simulating the in-page docked drawer summoned via Ctrl+Shift+E with context reading."}
            </p>
          </div>

          {/* Interactive Extension Viewport */}
          <div
            id="extension-viewport"
            className={cn(
              "w-full transition-all duration-300 flex items-center justify-center",
              layout === "popup" ? "max-w-[420px]" : "max-w-5xl"
            )}
          >
            {layout === "popup" ? (
              <PopupShell onViewChange={setView} />
            ) : (
              <div className="w-full min-h-[520px] rounded-2xl bg-surface border border-border shadow-lg flex flex-col items-center justify-center p-8 text-center text-xs text-text-secondary">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="font-semibold text-foreground text-sm mb-1">
                  Sidebar View Container
                </div>
                <p className="text-[11px] text-text-muted max-w-sm">
                  Scaffolded in Task 3.1. Ready for Task 3.3 live mock article split with docked sidebar.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
