"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/chat-context";
import { MODELS, MODELS_LIST } from "@/lib/models";
import { ModelId } from "@/lib/types";
import { ArrowUp, StopCircle, Mic, Paperclip, ChevronDown, Zap, Bot, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const { sendMessage, isStreaming, activeModelId, setActiveModelId } = useChat();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [modelOpen, setModelOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const currentModel = MODELS[activeModelId] || MODELS["echogpt"];

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      onClearInitialPrompt?.();
      textareaRef.current?.focus();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [prompt]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    };
    if (modelOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [modelOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || isStreaming) return;
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasPrompt = prompt.trim().length > 0;

  return (
    <div className={cn("w-full max-w-3xl mx-auto px-4 pb-5 pt-1", className)}>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-surface border border-border-subtle focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px] focus-within:shadow-primary/8 transition-all shadow-sm overflow-visible"
      >
        {/* Input row: [Globe + Paperclip] [textarea] */}
        <div className="flex items-start gap-1.5 px-3 pt-3 pb-1">
          <div className="flex items-center gap-0.5 mt-0.5 shrink-0">
            <button
              type="button"
              title="Web search"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Globe className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              title="Attach file"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Paperclip className="h-[18px] w-[18px]" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            rows={1}
            disabled={isStreaming}
            className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-text-muted resize-none py-1 focus:outline-none max-h-[160px] leading-relaxed"
          />
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          {/* Left: model selector + action icons */}
          <div className="flex items-center gap-1.5">
            <div ref={modelRef} className="relative">
              <button
                type="button"
                onClick={() => setModelOpen((p) => !p)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border-subtle text-[13px] font-medium text-text-secondary hover:text-foreground hover:bg-surface-elevated hover:border-border-strong transition-all"
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: currentModel.accentColor }}
                />
                <span className="max-w-[120px] truncate">{currentModel.name}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-text-muted transition-transform", modelOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {modelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 mb-2 w-64 bg-surface border border-border-subtle rounded-2xl shadow-xl p-1.5 z-50 space-y-0.5"
                  >
                    <div className="px-2.5 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Select Model
                    </div>
                    {MODELS_LIST.map((model) => {
                      const isSelected = model.id === activeModelId;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => {
                            setActiveModelId(model.id as ModelId);
                            setModelOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-sm transition-colors",
                            isSelected
                              ? "bg-primary/10 text-foreground border border-primary/20"
                              : "hover:bg-surface-elevated text-text-secondary hover:text-foreground border border-transparent"
                          )}
                        >
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: model.accentColor }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground truncate">{model.name}</div>
                            <div className="text-xs text-text-muted truncate">{model.contextWindow}</div>
                          </div>
                          {isSelected && (
                            <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              title="AI Agent"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Bot className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Boost"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Zap className="h-4 w-4" />
            </button>
          </div>

          {/* Right: mic + send */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              title="Voice input"
              className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!hasPrompt || isStreaming}
              aria-label="Send message"
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-lg transition-all",
                hasPrompt && !isStreaming
                  ? "bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary-hover hover:scale-105 active:scale-95"
                  : "text-text-muted opacity-40 cursor-not-allowed"
              )}
            >
              {isStreaming ? (
                <StopCircle className="h-4 w-4 text-amber-400 animate-pulse" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
