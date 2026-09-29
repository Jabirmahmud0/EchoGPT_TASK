"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { MessageFeed } from "@/components/chat/message-feed";
import { Composer } from "@/components/chat/composer";
import { useChat } from "@/lib/chat-context";
import { PanelLeft, Plus, Layers } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const { createNewChat } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Minimal top bar */}
        <header className="h-12 px-4 border-b border-border-subtle bg-surface/80 backdrop-blur-md flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              aria-label="Open sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => createNewChat()}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border-subtle text-xs font-semibold text-text-muted hover:text-foreground hover:bg-surface-elevated transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            <Link href="/extension">
              <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-xs font-semibold text-text-muted hover:text-foreground transition-all">
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Extension</span>
              </button>
            </Link>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-hidden">
          <MessageFeed onSelectPrompt={(p) => setSelectedPrompt(p)} />
        </main>

        <footer className="shrink-0">
          <Composer
            initialPrompt={selectedPrompt}
            onClearInitialPrompt={() => setSelectedPrompt("")}
          />
        </footer>
      </div>
    </div>
  );
}
