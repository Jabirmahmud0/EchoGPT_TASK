"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ModelSelector } from "@/components/chat/model-selector";
import { MessageFeed } from "@/components/chat/message-feed";
import { Composer } from "@/components/chat/composer";
import { useChat } from "@/lib/chat-context";
import { Button } from "@/components/ui/button";
import { PanelLeft, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const { activeConversation, activeModelId, setActiveModelId, createNewChat } = useChat();

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
        <header className="h-16 px-4 border-b border-border-subtle bg-surface/50 backdrop-blur-md flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2.5">
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => createNewChat()}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              className="hidden sm:inline-flex text-xs h-8"
            >
              New Chat
            </Button>
            <button
              onClick={() => createNewChat()}
              className="sm:hidden h-8 w-8 rounded-lg border border-border-subtle flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
              title="New Chat"
              aria-label="New Chat"
            >
              <Plus className="h-4 w-4" />
            </button>

            <Link href="/extension">
              <Button variant="secondary" size="sm" className="text-xs h-8 px-2.5 sm:px-3">
                <span className="sm:hidden">Ext</span>
                <span className="hidden sm:inline">Extension Simulator</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Chat Message Feed Area */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <MessageFeed onSelectPrompt={(p) => setSelectedPrompt(p)} />
        </main>

        {/* Bottom Composer Dock */}
        <footer className="shrink-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-2">
          <Composer
            initialPrompt={selectedPrompt}
            onClearInitialPrompt={() => setSelectedPrompt("")}
          />
        </footer>
      </div>
    </div>
  );
}
