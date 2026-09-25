"use client";

import React, { useState } from "react";
import { useChat } from "@/lib/chat-context";
import { useTheme } from "@/components/theme-provider";
import { MODELS_LIST } from "@/lib/models";
import { ModelId } from "@/lib/types";
import { ModelBadge } from "@/components/chat/model-badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Settings,
  Keyboard,
  Sun,
  Moon,
  Trash2,
  Check,
  Sparkles,
  Zap,
  Globe,
  Sliders,
} from "lucide-react";

interface ExtensionSettingsProps {
  onBack: () => void;
  className?: string;
}

export function ExtensionSettings({ onBack, className }: ExtensionSettingsProps) {
  const { activeModelId, setActiveModelId, clearAllChats } = useChat();
  const { theme, setTheme } = useTheme();

  const [domReading, setDomReading] = useState(true);
  const [autoHighlight, setAutoHighlight] = useState(true);
  const [streamingAnimation, setStreamingAnimation] = useState(true);
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all conversation history?")) {
      clearAllChats();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 2500);
    }
  };

  return (
    <div className={cn("h-full flex flex-col bg-surface select-none", className)}>
      {/* 1. Header Bar */}
      <header className="h-12 border-b border-border px-3 flex items-center justify-between shrink-0 bg-surface">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            title="Back to chat"
            aria-label="Back to chat"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5 text-emerald-500" />
            <span className="font-bold text-xs tracking-tight text-foreground">
              Settings
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-text-muted bg-surface-elevated border border-border">
          v1.0.5
        </span>
      </header>

      {/* 2. Scrollable Settings Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin text-xs text-foreground">
        {/* Section A: Global Keyboard Shortcuts */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5 flex items-center gap-1.5">
            <Keyboard className="h-3.5 w-3.5 text-emerald-500" />
            Keyboard Shortcuts
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated/60 border border-border-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Toggle Extension Sidebar</span>
              <kbd className="px-2 py-0.5 rounded-md bg-surface border border-border font-mono text-[11px] font-semibold text-emerald-600 shadow-xs">
                Ctrl + Shift + E
              </kbd>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-border-subtle">
              <span className="text-text-muted">Send prompt</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px] text-text-secondary">
                Enter ↵
              </kbd>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-text-muted">Insert newline</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px] text-text-secondary">
                Shift + Enter
              </kbd>
            </div>
          </div>
        </div>

        {/* Section B: Default Model Selection */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Default Active Model
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {MODELS_LIST.map((model) => {
              const isSelected = model.id === activeModelId;
              return (
                <button
                  key={model.id}
                  onClick={() => setActiveModelId(model.id)}
                  className={cn(
                    "w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between shadow-xs",
                    isSelected
                      ? "bg-emerald-500/5 border-emerald-500/40 text-foreground ring-1 ring-emerald-500/20"
                      : "bg-surface border-border hover:border-border-subtle hover:bg-surface-elevated/50 text-text-secondary"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ModelBadge
                      modelId={model.id}
                      size="sm"
                      className="text-[10px]"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-foreground truncate">
                        {model.name}
                      </div>
                      <div className="text-[10px] text-text-muted truncate">
                        {model.tag}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section C: In-Page Automation Preferences */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-emerald-500" />
            Browser Automation
          </div>

          <div className="p-2.5 rounded-xl bg-surface border border-border space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-xs text-foreground">
                  In-Page Text Highlight Chip
                </div>
                <div className="text-[10px] text-text-muted">
                  Show &ldquo;Ask EchoGPT ✨&rdquo; on text selection
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutoHighlight((prev) => !prev)}
                className={cn(
                  "w-9 h-5 rounded-full transition-colors relative focus:outline-none",
                  autoHighlight ? "bg-emerald-500" : "bg-surface-elevated border border-border"
                )}
              >
                <span
                  className={cn(
                    "block h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                    autoHighlight ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
              <div>
                <div className="font-medium text-xs text-foreground">
                  DOM Metadata Reading
                </div>
                <div className="text-[10px] text-text-muted">
                  Send active page context to model
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDomReading((prev) => !prev)}
                className={cn(
                  "w-9 h-5 rounded-full transition-colors relative focus:outline-none",
                  domReading ? "bg-emerald-500" : "bg-surface-elevated border border-border"
                )}
              >
                <span
                  className={cn(
                    "block h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                    domReading ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
              <div>
                <div className="font-medium text-xs text-foreground">
                  Typewriter Streaming
                </div>
                <div className="text-[10px] text-text-muted">
                  Simulate real-time token stream
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStreamingAnimation((prev) => !prev)}
                className={cn(
                  "w-9 h-5 rounded-full transition-colors relative focus:outline-none",
                  streamingAnimation ? "bg-emerald-500" : "bg-surface-elevated border border-border"
                )}
              >
                <span
                  className={cn(
                    "block h-4 w-4 rounded-full bg-white transition-transform shadow-xs",
                    streamingAnimation ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section D: Theme Appearance */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5 flex items-center gap-1.5">
            <Sun className="h-3.5 w-3.5 text-emerald-500" />
            Appearance
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all shadow-xs",
                theme === "light"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 font-semibold"
                  : "bg-surface border-border text-text-secondary hover:text-foreground"
              )}
            >
              <Sun className="h-3.5 w-3.5" />
              <span>Light Mode</span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all shadow-xs",
                theme === "dark"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 font-semibold"
                  : "bg-surface border-border text-text-secondary hover:text-foreground"
              )}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Section E: Session Storage & Cache */}
        <div className="space-y-2 pt-1 pb-2">
          <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5 flex items-center gap-1.5">
            <Trash2 className="h-3.5 w-3.5 text-text-muted" />
            Data & Privacy
          </div>

          <button
            onClick={handleClearHistory}
            className="w-full p-2.5 rounded-xl bg-surface border border-red-500/30 hover:bg-red-500/10 text-red-500 text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Local History & Cache</span>
          </button>

          {clearedNotice && (
            <p className="text-[11px] text-emerald-600 text-center font-medium">
              ✓ All local conversations cleared successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
