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
import { SidebarShell } from "@/components/extension/sidebar-shell";

export default function ExtensionPage() {
  const [layout, setLayout] = useState<ExtensionLayout>("popup");
  const [view, setView] = useState<ExtensionView>("chat");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 h-14 border-b border-border-subtle bg-surface/85 backdrop-blur-md px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            title="Return to Home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight leading-none text-foreground">EchoGPT</span>
              <span className="text-xs text-text-muted leading-tight mt-0.5">Extension Simulator</span>
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
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-xs transition-colors">
              <span className="sm:hidden">App</span>
              <span className="hidden sm:inline">Open Web App</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Interactive Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Informational Subtitle */}
          <div className="mb-6 text-center max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-2.5">
              <span>Chrome Web Store Concept</span>
              <span>•</span>
              <span className="font-mono">v1.0.5 Redesign</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {layout === "popup"
                ? "Chrome Extension Toolbar Popup"
                : layout === "standalone"
                ? "Native 1:1 Browser Sidebar"
                : "In-Page Docked Web Companion"}
            </h1>
            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
              {layout === "popup"
                ? "Simulating the 380×590px compact browser toolbar extension interface."
                : layout === "standalone"
                ? "1:1 pixel-perfect standalone sidebar scale matching native Chrome/Edge extensions with full vertical height."
                : "Simulating the in-page docked companion drawer alongside active webpage reading with text selection triggers."}
            </p>
          </div>

          {/* Interactive Extension Viewport */}
          <div
            id="extension-viewport"
            className={cn(
              "w-full transition-all duration-300 flex items-center justify-center",
              layout === "popup"
                ? "max-w-[420px]"
                : layout === "standalone"
                ? "max-w-[460px]"
                : "max-w-7xl"
            )}
          >
            {layout === "popup" ? (
              <PopupShell onViewChange={setView} />
            ) : layout === "standalone" ? (
              <SidebarShell onViewChange={setView} standalone={true} />
            ) : (
              <SidebarShell onViewChange={setView} standalone={false} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
