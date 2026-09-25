"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/chat-context";
import { QUICK_PROMPTS, MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { ArrowUp, Sparkles, StopCircle, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComposerProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  className?: string;
}

export function Composer({
  initialPrompt = "",
  onClearInitialPrompt,
  className,
}: ComposerProps) {
  const { sendMessage, isStreaming, activeModelId } = useChat();
  const [prompt, setPrompt] = useState(initialPrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentModel = MODELS[activeModelId] || MODELS["claude-3-5-sonnet"];

  // Update prompt if external initialPrompt changes (e.g. from empty state suggestion click)
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      onClearInitialPrompt?.();
      textareaRef.current?.focus();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || isStreaming) return;

    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4 pb-4 pt-1", className)}>
      {/* Quick Action Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-none select-none">
        <span className="text-[11px] font-medium text-text-muted flex items-center gap-1 pl-1 shrink-0">
          <Sparkles className="h-3 w-3 text-primary" />
          Quick:
        </span>

        {QUICK_PROMPTS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={isStreaming}
            onClick={() => {
              setPrompt(action.prompt);
              textareaRef.current?.focus();
            }}
            className="px-2.5 py-1 rounded-full text-xs font-medium glass-card border border-border-subtle hover:border-primary/40 hover:text-foreground text-text-secondary transition-all shrink-0 hover:bg-surface-elevated flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <span>{action.title}</span>
          </button>
        ))}
      </div>

      {/* Main Composer Box */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl glass-card border border-border-subtle focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-lg p-2.5 bg-surface-elevated/40"
      >
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${currentModel.name}... (Press Enter to send, Shift+Enter for newline)`}
          rows={1}
          disabled={isStreaming}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-text-muted resize-none px-2 py-1 focus:outline-none max-h-[180px] leading-relaxed"
        />

        {/* Bottom Bar inside Composer */}
        <div className="flex items-center justify-between pt-2 px-1 border-t border-border-subtle/50 text-[11px] text-text-muted select-none">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10px]">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: currentModel.accentColor }}
              />
              {currentModel.name}
            </span>
            <span>•</span>
            <span className="hidden sm:inline">
              {prompt.length > 0 ? `${prompt.length} chars` : "Markdown supported"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted/80 hidden sm:inline-flex items-center gap-0.5">
              <span>Send</span>
              <CornerDownLeft className="h-2.5 w-2.5" />
            </span>

            <Button
              type="submit"
              size="icon"
              disabled={!prompt.trim() || isStreaming}
              className={cn(
                "h-8 w-8 rounded-xl transition-all",
                prompt.trim() && !isStreaming
                  ? "bg-primary text-white shadow-md shadow-primary/25 hover:scale-105"
                  : "bg-surface-elevated text-text-muted opacity-50"
              )}
              aria-label="Send prompt"
            >
              {isStreaming ? (
                <StopCircle className="h-4 w-4 animate-pulse text-amber-400" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
