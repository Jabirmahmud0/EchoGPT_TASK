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
import { ExtensionHistory } from "./extension-history";
import { ExtensionSettings } from "./extension-settings";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  History,
  Settings,
  ExternalLink,
  HelpCircle,
  FileText,
  Wand2,
  Languages,
  ArrowUp,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  Clock,
  Globe,
  Plus,
  ArrowRight,
} from "lucide-react";

interface PopupShellProps {
  onViewChange?: (view: ExtensionView) => void;
  className?: string;
  initialPrompt?: string;
}

interface QuickAction {
  id: string;
  label: string;
  sublabel: string;
  template: string;
  icon: React.ComponentType<{ className?: string }>;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "explain",
    label: "Explain",
    sublabel: "Clarify concepts simply",
    template: "Explain this concept in simple terms: ",
    icon: HelpCircle,
  },
  {
    id: "summarize",
    label: "Summarize",
    sublabel: "3-bullet takeaway of page",
    template: "Provide a concise 3-bullet summary of this page:",
    icon: FileText,
  },
  {
    id: "rewrite",
    label: "Rewrite",
    sublabel: "Polish tone & clarity",
    template: "Rewrite the following clearly and professionally: ",
    icon: Wand2,
  },
  {
    id: "translate",
    label: "Translate",
    sublabel: "Convert text to English",
    template: "Translate the following text into English: ",
    icon: Languages,
  },
];

export function PopupShell({
  onViewChange,
  className,
  initialPrompt = "",
}: PopupShellProps) {
  const {
    conversations,
    activeConversation,
    activeModelId,
    setActiveModelId,
    sendMessage,
    isStreaming,
    createNewChat,
    selectChat,
  } = useChat();

  const [view, setView] = useState<ExtensionView>("chat");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS[activeModelId] || MODELS["claude-3-5-sonnet"];

  // Find recent conversation for the snippet card (excluding current active if empty)
  const recentConversation = conversations.find(
    (c) => c.messages.length > 0 && c.id !== activeConversation?.id
  ) || conversations.find((c) => c.messages.length > 0);

  const hasMessages = (activeConversation?.messages.length ?? 0) > 0;

  // Auto-scroll chat feed on new messages or streaming
  useEffect(() => {
    if (hasMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, isStreaming, hasMessages]);

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
      textareaRef.current?.focus();
    }
  }, [initialPrompt]);

  const handleQuickAction = (action: QuickAction) => {
    setPrompt(action.template);
    textareaRef.current?.focus();
  };

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

  const handleLoadRecentSnippet = (convId: string) => {
    selectChat(convId);
  };

  return (
    <div
      className={cn(
        "w-full max-w-[380px] h-[560px] rounded-2xl bg-surface border border-border shadow-2xl flex flex-col overflow-hidden select-none font-sans relative",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {view === "chat" ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.16 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            {/* 1. Extension Header Bar */}
            <header className="h-12 border-b border-border bg-surface px-3 flex items-center justify-between shrink-0 z-10">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs tracking-tight text-foreground">
                    EchoGPT
                  </span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1 text-text-secondary">
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

            {/* 2. Model Selector & Simulated Tab Context Strip */}
      <div className="px-3 py-2 border-b border-border-subtle bg-surface-elevated/40 flex items-center justify-between gap-2 shrink-0">
        <ModelSelector
          selectedModelId={activeModelId}
          onSelectModel={setActiveModelId}
          size="sm"
        />

        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] text-text-secondary truncate max-w-[150px]">
          <Globe className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="truncate">active-tab.html</span>
        </div>
      </div>

      {/* 3. Main Content Stage */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {!hasMessages ? (
          /* Empty State: Quick Actions + Recent Conversation Snippet */
          <div className="space-y-3.5 pt-1">
            {/* Welcoming Sub-banner */}
            <div className="p-3 rounded-xl bg-surface-elevated/60 border border-border-subtle">
              <div className="text-xs font-semibold text-foreground">
                Page Assistant
              </div>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Execute instant actions on this tab or ask {currentModel.name} anything.
              </p>
            </div>

            {/* 4 Quick Actions (Grid) */}
            <div>
              <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5 px-0.5">
                Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="group p-2.5 rounded-xl bg-surface border border-border hover:border-emerald-500/40 hover:bg-emerald-500/5 text-left transition-all duration-150 flex flex-col justify-between shadow-xs"
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className="h-6 w-6 rounded-lg bg-surface-elevated border border-border group-hover:border-emerald-500/30 group-hover:text-emerald-500 flex items-center justify-center transition-colors">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <ArrowUp className="h-3 w-3 text-text-muted group-hover:text-emerald-500 rotate-45 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                          {action.label}
                        </div>
                        <div className="text-[10px] text-text-muted line-clamp-1">
                          {action.sublabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Conversation Snippet Card */}
            {recentConversation && recentConversation.messages.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5 px-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Recent Conversation
                  </span>
                  <button
                    onClick={() => {
                      setView("history");
                      onViewChange?.("history");
                    }}
                    className="hover:text-foreground text-[10px] lowercase transition-colors"
                  >
                    view all
                  </button>
                </div>

                <div
                  onClick={() => handleLoadRecentSnippet(recentConversation.id)}
                  className="group p-2.5 rounded-xl bg-surface border border-border hover:border-border-subtle hover:bg-surface-elevated/70 cursor-pointer transition-all shadow-xs text-left"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="text-xs font-semibold text-foreground truncate group-hover:text-emerald-600 transition-colors">
                      {recentConversation.title}
                    </div>
                    <ModelBadge
                      modelId={recentConversation.modelId}
                      size="sm"
                      className="shrink-0 text-[9px] px-1.5 py-0"
                    />
                  </div>
                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {recentConversation.messages[
                      recentConversation.messages.length - 1
                    ]?.content.replace(/```[\s\S]*?```/g, "[Code]") ||
                      "No messages"}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-text-muted pt-1 border-t border-border-subtle">
                    <span>
                      {recentConversation.messages.length} message
                      {recentConversation.messages.length === 1 ? "" : "s"}
                    </span>
                    <span className="flex items-center gap-0.5 text-emerald-600 font-medium group-hover:translate-x-0.5 transition-transform">
                      Resume <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Chat Thread */
          <div className="space-y-3">
            {/* Header controls inside thread */}
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

            {/* Messages */}
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

      {/* 4. Bottom Composer & Quick Action Ribbon */}
      <footer className="p-2.5 border-t border-border bg-surface shrink-0 space-y-2">
        {/* Quick-action pill row (available in both states) */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-elevated hover:bg-emerald-500/10 hover:text-emerald-600 border border-border text-text-secondary hover:border-emerald-500/30 whitespace-nowrap transition-colors shrink-0"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSendMessage} className="relative flex items-end gap-1.5">
          <div className="relative flex-1 rounded-xl bg-surface-elevated border border-border focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask EchoGPT or run action..."
              rows={1}
              className="w-full resize-none bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:outline-none max-h-24 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isStreaming}
            className="h-8 w-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
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
          <span className="font-mono">Shift+Enter newline</span>
        </div>
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
