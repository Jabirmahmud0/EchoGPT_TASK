"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExtensionView, ModelId } from "@/lib/types";
import { useChat } from "@/lib/chat-context";
import { MODELS, MODELS_LIST } from "@/lib/models";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";
import { ExtensionHistory } from "./extension-history";
import { ExtensionSettings } from "./extension-settings";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  History,
  Settings,
  ExternalLink,
  Code2,
  Zap,
  BookOpen,
  Cpu,
  ArrowUp,
  RotateCcw,
  Copy,
  Check,
  Globe,
  Paperclip,
  Mic,
  ChevronDown,
  Plus,
  StopCircle,
} from "lucide-react";

interface PopupShellProps {
  onViewChange?: (view: ExtensionView) => void;
  className?: string;
  initialPrompt?: string;
}

const SUGGESTIONS = [
  {
    icon: Code2,
    title: "Summarize Page",
    desc: "3-bullet takeaway of this tab",
    prompt: "Provide a concise 3-bullet summary of this page with key takeaways.",
    accent: "#10B981",
  },
  {
    icon: Zap,
    title: "Explain Concepts",
    desc: "Simplify technical ideas",
    prompt: "Explain the core concepts discussed in this page in simple terms.",
    accent: "#6366F1",
  },
  {
    icon: BookOpen,
    title: "Key Insights",
    desc: "Architectural trade-offs",
    prompt: "What are the primary architectural trade-offs discussed on this page?",
    accent: "#F59E0B",
  },
  {
    icon: Cpu,
    title: "Review & Polish",
    desc: "Feedback on code or text",
    prompt: "Analyze the code or content on this page for best practices and performance.",
    accent: "#EC4899",
  },
];

export function PopupShell({
  onViewChange,
  className,
  initialPrompt = "",
}: PopupShellProps) {
  const {
    activeConversation,
    activeModelId,
    setActiveModelId,
    sendMessage,
    isStreaming,
    createNewChat,
  } = useChat();

  const [view, setView] = useState<ExtensionView>("chat");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelOpen, setModelOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS[activeModelId] || MODELS["echogpt"];
  const hasMessages = (activeConversation?.messages.length ?? 0) > 0;

  // Auto-scroll chat feed on new messages or streaming
  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, isStreaming, hasMessages]);

  // Click outside model dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    };
    if (modelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modelOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        80
      )}px`;
    }
  }, [prompt]);

  // Handle external initialPrompt updates
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      textareaRef.current?.focus();
    }
  }, [initialPrompt]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
        "w-full max-w-[390px] h-[590px] rounded-3xl bg-background border border-border-subtle shadow-2xl flex flex-col overflow-hidden select-none font-sans relative",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {view === "chat" ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.16 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden relative"
          >
            {/* Top Header Bar */}
            <header className="h-13 border-b border-border-subtle bg-surface/90 backdrop-blur-md px-3.5 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tight leading-none text-foreground">
                    EchoGPT
                  </span>
                  <span className="text-[10px] text-text-muted flex items-center gap-1 mt-0.5 leading-tight">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    active-tab.html
                  </span>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-0.5 text-text-muted">
                <button
                  onClick={handleNewChat}
                  title="New Chat"
                  aria-label="New chat"
                  className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setView("history");
                    onViewChange?.("history");
                  }}
                  title="Chat History"
                  aria-label="View history"
                  className="p-1.5 rounded-lg hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <History className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setView("settings");
                    onViewChange?.("settings");
                  }}
                  title="Extension Settings"
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
              </div>
            </header>

            {/* Main Stage (Empty State vs Message Feed) */}
            <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-3 relative">
              {!hasMessages ? (
                /* Empty State: Center Hero + 4 Cards (Fits 100% without scrollbar) */
                <div className="h-full flex flex-col items-center justify-center text-center">
                  {/* Central Glowing Logo */}
                  <div className="relative mb-3">
                    <div
                      className="h-13 w-13 rounded-2xl flex items-center justify-center mx-auto shadow-md"
                      style={{
                        backgroundColor: `${currentModel.accentColor}18`,
                        border: `1px solid ${currentModel.accentColor}30`,
                        boxShadow: `0 8px 24px -4px ${currentModel.accentColor}25`,
                      }}
                    >
                      <Sparkles className="h-6 w-6" style={{ color: currentModel.accentColor }} />
                    </div>
                    <div
                      className="absolute -inset-2 rounded-2xl opacity-20 blur-xl"
                      style={{ backgroundColor: currentModel.accentColor }}
                    />
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">
                    How can I help you?
                  </h2>
                  <p className="text-xs text-text-secondary max-w-[280px] mb-4 leading-relaxed">
                    Ask anything about this page or trigger quick workflows.
                  </p>

                  {/* 4 Suggestion Cards (2x2) */}
                  <div className="grid grid-cols-2 gap-2 w-full text-left">
                    {SUGGESTIONS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPrompt(item.prompt);
                            textareaRef.current?.focus();
                          }}
                          className="group relative p-2.5 rounded-xl bg-surface border border-border-subtle hover:border-primary/40 transition-all duration-200 text-left overflow-hidden hover:shadow-sm focus-visible:outline-none"
                        >
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(ellipse at top left, ${item.accent}0a, transparent 70%)`,
                            }}
                          />
                          <div className="relative">
                            <div
                              className="h-7 w-7 rounded-lg flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105"
                              style={{ backgroundColor: `${item.accent}18` }}
                            >
                              <Icon className="h-3.5 w-3.5" style={{ color: item.accent }} />
                            </div>
                            <div className="text-xs font-semibold text-foreground mb-0.5 truncate">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-text-muted leading-tight line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Message Feed */
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1 text-[11px] text-text-muted border-b border-border-subtle pb-1">
                    <span>{activeConversation?.messages.length} messages</span>
                    <button
                      onClick={handleNewChat}
                      className="text-primary hover:underline font-medium"
                    >
                      Clear & New Chat
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
                            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-white px-3.5 py-2 text-xs leading-relaxed shadow-sm shadow-primary/20">
                              {message.content}
                            </div>
                          ) : (
                            <div className="max-w-[96%] rounded-2xl rounded-tl-sm bg-surface border border-border-subtle p-3 text-xs text-foreground space-y-1.5 shadow-xs">
                              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-1 text-[11px]">
                                <span className="font-semibold text-foreground">
                                  {currentModel.name}
                                </span>
                                <button
                                  onClick={() => handleCopy(message.content, message.id)}
                                  className="text-text-muted hover:text-foreground p-1 rounded"
                                  title="Copy response"
                                >
                                  {copiedId === message.id ? (
                                    <Check className="h-3 w-3 text-emerald-400" />
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
                                <span className="inline-block h-3 w-1.5 bg-primary animate-pulse ml-0.5 rounded-xs" />
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

            {/* Bottom Unified Composer */}
            <footer className="p-3 pt-1 shrink-0 z-20">
              <form
                onSubmit={handleSendMessage}
                className="rounded-2xl bg-surface border border-border-subtle focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px] focus-within:shadow-primary/8 transition-all shadow-sm overflow-visible"
              >
                {/* Input row: [Globe + Paperclip] [textarea] */}
                <div className="flex items-start gap-1 px-2.5 pt-2 pb-0.5">
                  <div className="flex items-center gap-0.5 mt-0.5 shrink-0">
                    <button
                      type="button"
                      title="Web context"
                      className="h-7 w-7 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Attach tab context"
                      className="h-7 w-7 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                    >
                      <Paperclip className="h-4 w-4" />
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
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-text-muted resize-none py-1 focus:outline-none max-h-24 leading-relaxed"
                  />
                </div>

                {/* Bottom toolbar */}
                <div className="flex items-center justify-between px-2 pb-1.5 pt-0.5">
                  {/* Model selector dropdown */}
                  <div ref={modelRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setModelOpen((p) => !p)}
                      className="flex items-center gap-1.5 h-6.5 px-2 rounded-lg border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-all"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: currentModel.accentColor }}
                      />
                      <span className="max-w-[100px] truncate">{currentModel.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-text-muted transition-transform",
                          modelOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {modelOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full left-0 mb-1.5 w-56 bg-surface border border-border-subtle rounded-2xl shadow-xl p-1.5 z-50 space-y-0.5"
                        >
                          <div className="px-2 py-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
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
                                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-left text-xs transition-colors",
                                  isSelected
                                    ? "bg-primary/10 text-foreground border border-primary/20"
                                    : "hover:bg-surface-elevated text-text-secondary hover:text-foreground border border-transparent"
                                )}
                              >
                                <span
                                  className="h-2 w-2 rounded-full shrink-0"
                                  style={{ backgroundColor: model.accentColor }}
                                />
                                <span className="flex-1 truncate font-medium">{model.name}</span>
                                {isSelected && (
                                  <Check className="h-3 w-3 text-primary shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right: Mic + Send button */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Voice input"
                      className="h-6.5 w-6.5 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                    >
                      <Mic className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="submit"
                      disabled={!prompt.trim() || isStreaming}
                      aria-label="Send message"
                      className={cn(
                        "h-6.5 w-6.5 flex items-center justify-center rounded-lg transition-all",
                        prompt.trim() && !isStreaming
                          ? "bg-primary text-white shadow-xs hover:bg-primary-hover active:scale-95"
                          : "text-text-muted opacity-40 cursor-not-allowed"
                      )}
                    >
                      {isStreaming ? (
                        <StopCircle className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                      ) : (
                        <ArrowUp className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </footer>
          </motion.div>
        ) : view === "history" ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.16 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            <ExtensionHistory
              onBack={() => {
                setView("chat");
                onViewChange?.("chat");
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.16 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            <ExtensionSettings
              onBack={() => {
                setView("chat");
                onViewChange?.("chat");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
