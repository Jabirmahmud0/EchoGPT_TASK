"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ModelSelector } from "@/components/chat/model-selector";
import { useChat } from "@/lib/chat-context";
import { Button } from "@/components/ui/button";
import { PanelLeft, Sparkles, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeConversation, activeModelId, setActiveModelId } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Collapsible Left Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Workspace Stage */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top App Bar */}
        <header className="h-16 px-4 border-b border-border-subtle bg-surface/50 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
              aria-label="Open sidebar"
            >
              <PanelLeft className="h-5 w-5" />
            </button>

            <Link
              href="/"
              className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="h-4 w-px bg-border-subtle hidden sm:block" />

            <ModelSelector
              selectedModelId={activeModelId}
              onSelectModel={setActiveModelId}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted hidden md:inline-block">
              {activeConversation?.messages.length || 0} messages
            </span>
            <Link href="/extension">
              <Button variant="secondary" size="sm" className="text-xs">
                Extension Simulator
              </Button>
            </Link>
          </div>
        </header>

        {/* Temporary Chat Stage Placeholder (Will be completed in Task 2.4 & 2.5) */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
          <div className="max-w-md w-full text-center space-y-4 glass-card p-8 rounded-2xl border border-border-subtle">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {activeConversation?.title || "EchoGPT Workspace"}
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Sidebar connected with persistent sessions and date grouping.
              </p>
            </div>
            <div className="text-[11px] text-text-muted p-2 rounded-xl bg-surface-elevated">
              Active Session: <span className="font-mono text-primary">{activeConversation?.id}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
