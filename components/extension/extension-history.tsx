"use client";

import React, { useState, useEffect } from "react";
import { useChat } from "@/lib/chat-context";
import { ModelBadge } from "@/components/chat/model-badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Search,
  X,
  Trash2,
  Clock,
  MessageSquare,
  Plus,
  Sparkles,
} from "lucide-react";

interface ExtensionHistoryProps {
  onBack: () => void;
  className?: string;
}

export function ExtensionHistory({ onBack, className }: ExtensionHistoryProps) {
  const {
    conversations,
    activeConversation,
    selectChat,
    deleteChat,
    createNewChat,
    activeModelId,
  } = useChat();

  const [searchQuery, setSearchQuery] = useState("");
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});

  // Client-side timestamp formatting to prevent hydration mismatch
  useEffect(() => {
    const dates: Record<string, string> = {};
    conversations.forEach((c) => {
      dates[c.id] = new Date(c.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    });
    setFormattedDates(dates);
  }, [conversations]);

  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = c.title.toLowerCase().includes(q);
    const messageMatch = c.messages.some((m) =>
      m.content.toLowerCase().includes(q)
    );
    return titleMatch || messageMatch;
  });

  const handleSelect = (id: string) => {
    selectChat(id);
    onBack();
  };

  const handleNewChat = () => {
    createNewChat(activeModelId);
    onBack();
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
            <Clock className="h-3.5 w-3.5 text-emerald-500" />
            <span className="font-bold text-xs tracking-tight text-foreground">
              History
            </span>
          </div>
        </div>

        <button
          onClick={handleNewChat}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
        >
          <Plus className="h-3 w-3" />
          <span>New Chat</span>
        </button>
      </header>

      {/* 2. Search Bar */}
      <div className="p-2.5 border-b border-border-subtle bg-surface-elevated/30">
        <div className="relative flex items-center">
          <Search className="h-3.5 w-3.5 absolute left-2.5 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past conversations..."
            className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-surface border border-border text-xs text-foreground placeholder:text-text-muted focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 p-0.5 text-text-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Conversation List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 scrollbar-thin">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-text-muted">
            <MessageSquare className="h-8 w-8 mb-2 opacity-30 text-emerald-500" />
            <p className="text-xs font-medium text-foreground">
              {searchQuery ? "No matches found" : "No conversation history"}
            </p>
            <p className="text-[11px] text-text-secondary mt-1 max-w-[200px]">
              {searchQuery
                ? `No chats match "${searchQuery}"`
                : "Your past interactions across models will appear here."}
            </p>
          </div>
        ) : (
          filteredConversations.map((c) => {
            const isActive = c.id === activeConversation?.id;
            const lastMessage = c.messages[c.messages.length - 1];
            const dateStr = formattedDates[c.id] || "";

            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={cn(
                  "group relative p-2.5 rounded-xl border transition-all cursor-pointer text-left shadow-xs",
                  isActive
                    ? "bg-emerald-500/5 border-emerald-500/30"
                    : "bg-surface border-border hover:border-border-subtle hover:bg-surface-elevated/60"
                )}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <ModelBadge
                      modelId={c.modelId}
                      size="sm"
                      className="text-[9px] px-1.5 py-0 shrink-0"
                    />
                    <span className="font-semibold text-xs text-foreground truncate group-hover:text-emerald-600 transition-colors">
                      {c.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-text-muted font-mono">
                      {dateStr}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(c.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-red-500 transition-all rounded"
                      title="Delete chat"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                  {lastMessage
                    ? lastMessage.content.replace(/```[\s\S]*?```/g, "[Code]")
                    : "Empty conversation"}
                </p>

                <div className="mt-1.5 flex items-center justify-between text-[10px] text-text-muted">
                  <span>
                    {c.messages.length} message{c.messages.length === 1 ? "" : "s"}
                  </span>
                  {isActive && (
                    <span className="text-emerald-600 font-medium text-[10px]">
                      Current
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
