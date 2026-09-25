"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExtensionView, ModelId } from "@/lib/types";
import { useChat } from "@/lib/chat-context";
import { MODELS } from "@/lib/models";
import { ModelSelector } from "@/components/chat/model-selector";
import { ModelBadge } from "@/components/chat/model-badge";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";
import { MockArticle } from "./mock-article";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  History,
  Settings,
  ExternalLink,
  ArrowUp,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  PanelRightClose,
  PanelRightOpen,
  Lock,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Plus,
  Compass,
} from "lucide-react";

interface SidebarShellProps {
  onViewChange?: (view: ExtensionView) => void;
  className?: string;
  initialPrompt?: string;
  onSelectText?: (text: string) => void;
}

const SIDEBAR_QUICK_ACTIONS = [
  {
    id: "summarize",
    label: "Summarize Article",
    prompt: "Provide a comprehensive 3-bullet summary of this article with key architectural takeaways.",
  },
  {
    id: "key-tradeoffs",
    label: "Key Trade-offs",
    prompt: "What are the primary trade-offs between single-LLM and multi-model orchestration discussed in this text?",
  },
  {
    id: "explain-latency",
    label: "Explain Latency Impact",
    prompt: "Explain how multi-model routing impacts token latency and cost according to the author.",
  },
];

export function SidebarShell({
  onViewChange,
  className,
  initialPrompt = "",
}: SidebarShellProps) {
  const {
    activeConversation,
    activeModelId,
    setActiveModelId,
    sendMessage,
    isStreaming,
    createNewChat,
  } = useChat();

  const [isOpen, setIsOpen] = useState(true);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectionChip, setSelectionChip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS[activeModelId] || MODELS["claude-3-5-sonnet"];
  const hasMessages = (activeConversation?.messages.length ?? 0) > 0;

  // Auto-scroll chat feed
  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, isStreaming, hasMessages]);

  // Handle Ctrl+Shift+E shortcut to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle mouseup inside article to detect text selection
  const handleArticleMouseUp = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectionChip(null);
        return;
      }

      const text = selection.toString().trim();
      if (!text || text.length < 3) {
        setSelectionChip(null);
        return;
      }

      if (
        articleContainerRef.current &&
        articleContainerRef.current.contains(selection.anchorNode)
      ) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const containerRect = articleContainerRef.current.getBoundingClientRect();

          const scrollLeft = articleContainerRef.current.scrollLeft;
          const scrollTop = articleContainerRef.current.scrollTop;

          const rawX = rect.left - containerRect.left + scrollLeft + rect.width / 2;
          const rawY = rect.top - containerRect.top + scrollTop - 42;

          const clampedX = Math.max(90, Math.min(rawX, containerRect.width - 90));
          const clampedY = Math.max(12, rawY);

          setSelectionChip({
            text,
            x: clampedX,
            y: clampedY,
          });
        } catch {
          setSelectionChip(null);
        }
      } else {
        setSelectionChip(null);
      }
    }, 10);
  };

  const handleExplainSelection = (text: string) => {
    setPrompt(`Explain: "${text}"`);
    if (!isOpen) setIsOpen(true);
    setSelectionChip(null);
    window.getSelection()?.removeAllRanges();

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 120);
  };

  const handleSummarizeSelection = (text: string) => {
    setPrompt(`Summarize this passage: "${text}"`);
    if (!isOpen) setIsOpen(true);
    setSelectionChip(null);
    window.getSelection()?.removeAllRanges();

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 120);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        96
      )}px`;
    }
  }, [prompt]);

  // Handle external initialPrompt updates
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (!isOpen) setIsOpen(true);
      textareaRef.current?.focus();
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || isStreaming) return;

    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    await sendMessage(trimmed);
  };

  const handleQuickAction = (actionPrompt: string) => {
    setPrompt(actionPrompt);
    textareaRef.current?.focus();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    createNewChat(activeModelId);
    setPrompt("");
    textareaRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col font-sans transition-all",
        className
      )}
    >
      {/* 1. Simulated Browser Chrome & Address Bar */}
      <div className="h-11 border-b border-border bg-surface-elevated/80 px-3 sm:px-4 flex items-center justify-between gap-3 shrink-0 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
        </div>

        {/* Browser Navigation buttons */}
        <div className="hidden sm:flex items-center gap-1 text-text-muted">
          <button
            type="button"
            className="p-1 rounded hover:bg-surface hover:text-foreground transition-colors"
            title="Back"
            disabled
          >
            <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-surface hover:text-foreground transition-colors"
            title="Forward"
            disabled
          >
            <ArrowRight className="h-3.5 w-3.5 opacity-40" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-surface hover:text-foreground transition-colors"
            title="Reload page"
          >
            <RotateCw className="h-3 w-3" />
          </button>
        </div>

        {/* Omnibox / Address Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface border border-border text-xs text-text-secondary">
          <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-text-muted select-none">https://</span>
          <span className="text-foreground truncate font-mono text-[11px]">
            techinsights.dev/deep-dive/modern-ai-orchestration
          </span>
        </div>

        {/* Extension trigger button in browser toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all shadow-xs",
              isOpen
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                : "bg-surface border border-border text-text-secondary hover:text-foreground"
            )}
            title="Toggle EchoGPT Sidebar (Ctrl+Shift+E)"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span className="hidden sm:inline">EchoGPT</span>
            <kbd className="hidden md:inline-block font-mono text-[10px] text-text-muted px-1 rounded bg-surface border border-border-subtle">
              Ctrl+Shift+E
            </kbd>
          </button>
        </div>
      </div>

      {/* 2. Main Split Stage: Mock Article (Left) + Docked Sidebar (Right) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[580px] max-h-[640px] overflow-hidden">
        {/* Left Pane: In-page Simulated DOM Content */}
        <div
          ref={articleContainerRef}
          onMouseUp={handleArticleMouseUp}
          className="relative flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-surface-elevated/20 scrollbar-thin select-text"
        >
          {/* Floating 'Ask EchoGPT ✨' chip on highlighted text */}
          <AnimatePresence>
            {selectionChip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 4 }}
                transition={{ duration: 0.12 }}
                style={{
                  position: "absolute",
                  left: `${selectionChip.x}px`,
                  top: `${selectionChip.y}px`,
                  transform: "translateX(-50%)",
                  zIndex: 40,
                }}
                className="flex items-center gap-1.5 p-1 rounded-xl bg-surface/95 backdrop-blur-md border border-emerald-500/40 shadow-xl select-none"
              >
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleExplainSelection(selectionChip.text)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ask EchoGPT</span>
                </button>

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSummarizeSelection(selectionChip.text)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-elevated hover:bg-surface text-text-secondary hover:text-foreground text-xs font-medium border border-border transition-colors"
                  title="Summarize selected text"
                >
                  <span>Summarize</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <MockArticle
            onMouseUp={handleArticleMouseUp}
            onSelectSnippet={handleExplainSelection}
          />
        </div>

        {/* Right Pane: Docked EchoGPT Extension Sidebar */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full md:w-[380px] lg:w-[420px] border-t md:border-t-0 md:border-l border-border bg-surface flex flex-col h-[520px] md:h-auto shrink-0 shadow-lg relative z-10"
            >
              {/* Sidebar Header Bar */}
              <header className="h-12 border-b border-border px-3.5 flex items-center justify-between shrink-0 bg-surface">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs tracking-tight text-foreground block">
                      EchoGPT Sidebar
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-text-muted bg-surface-elevated border border-border">
                    Ctrl+Shift+E
                  </span>
                </div>

                <div className="flex items-center gap-1 text-text-secondary">
                  <button
                    onClick={() => onViewChange?.("history")}
                    title="History"
                    aria-label="View history"
                    className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                  >
                    <History className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onViewChange?.("settings")}
                    title="Settings"
                    aria-label="View settings"
                    className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                  </button>

                  <Link
                    href="/app"
                    title="Open Full Web App"
                    aria-label="Open web app"
                    className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    title="Dock / Collapse Sidebar"
                    aria-label="Collapse sidebar"
                    className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                  >
                    <PanelRightClose className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Sub-header: Model Selector & Page Context status */}
              <div className="px-3 py-2 border-b border-border-subtle bg-surface-elevated/40 flex items-center justify-between gap-2 shrink-0">
                <ModelSelector
                  selectedModelId={activeModelId}
                  onSelectModel={setActiveModelId}
                  size="sm"
                />

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] text-emerald-600 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DOM Reading Ready</span>
                </div>
              </div>

              {/* Chat Feed Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                {!hasMessages ? (
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-surface-elevated/60 border border-border-subtle">
                      <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 text-emerald-500" />
                        In-Page Companion
                      </div>
                      <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                        EchoGPT is actively linked to this article. Ask questions or click a quick action below to analyze the page.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider px-0.5">
                        Suggested Actions
                      </div>
                      {SIDEBAR_QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action.prompt)}
                          className="w-full text-left p-2.5 rounded-xl bg-surface border border-border hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-xs text-foreground group flex items-center justify-between"
                        >
                          <span className="font-medium group-hover:text-emerald-600 transition-colors">
                            {action.label}
                          </span>
                          <ArrowRight className="h-3 w-3 text-text-muted group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1 py-0.5 text-[11px] text-text-muted border-b border-border-subtle">
                      <span>{activeConversation?.messages.length} messages</span>
                      <button
                        onClick={handleNewChat}
                        className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        New Chat
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {activeConversation?.messages.map((message) => {
                        const isUser = message.role === "user";
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                              "flex flex-col select-text",
                              isUser ? "items-end" : "items-start"
                            )}
                          >
                            {isUser ? (
                              <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-emerald-600 text-white px-3 py-2 text-xs leading-relaxed shadow-xs">
                                {message.content}
                              </div>
                            ) : (
                              <div className="max-w-[96%] rounded-2xl rounded-tl-xs bg-surface-elevated border border-border p-3 text-xs text-foreground space-y-2 shadow-xs">
                                <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-1.5">
                                  <ModelBadge
                                    modelId={message.modelId || activeModelId}
                                    size="sm"
                                    className="text-[10px]"
                                  />
                                  <button
                                    onClick={() => handleCopy(message.content, message.id)}
                                    className="text-text-muted hover:text-foreground transition-colors p-1 rounded"
                                    title="Copy response"
                                  >
                                    {copiedId === message.id ? (
                                      <Check className="h-3 w-3 text-emerald-500" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </button>
                                </div>
                                <MarkdownRenderer
                                  content={message.content}
                                  className="prose-xs"
                                />
                                {message.isStreaming && (
                                  <span className="inline-block h-3 w-1.5 bg-emerald-500 animate-pulse ml-0.5" />
                                )}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Bottom Composer */}
              <footer className="p-3 border-t border-border bg-surface shrink-0 space-y-2">
                <form onSubmit={handleSendMessage} className="relative flex items-end gap-1.5">
                  <div className="relative flex-1 rounded-xl bg-surface-elevated border border-border focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <textarea
                      ref={textareaRef}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask EchoGPT about this page..."
                      rows={1}
                      className="w-full resize-none bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:outline-none max-h-24 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!prompt.trim() || isStreaming}
                    className="h-8 w-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors shrink-0"
                    title="Send prompt (Enter)"
                    aria-label="Send prompt"
                  >
                    {isStreaming ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] text-text-muted px-1 select-none">
                  <span>Press Enter to send</span>
                  <span className="font-mono">Ctrl+Shift+E toggles</span>
                </div>
              </footer>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Collapsed sidebar restore pill (when sidebar is closed) */}
        {!isOpen && (
          <div className="p-2 border-t md:border-t-0 md:border-l border-border bg-surface flex md:flex-col items-center justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-surface-elevated hover:bg-emerald-500/10 hover:text-emerald-600 border border-border text-text-secondary transition-all shadow-xs flex items-center gap-1.5 text-xs font-medium"
              title="Open EchoGPT Sidebar (Ctrl+Shift+E)"
            >
              <PanelRightOpen className="h-4 w-4 text-emerald-500" />
              <span className="hidden md:inline text-[11px]">Open EchoGPT</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
