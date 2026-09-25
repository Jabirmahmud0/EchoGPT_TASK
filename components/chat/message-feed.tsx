"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@/lib/chat-context";
import { ChatMessage, ModelId } from "@/lib/types";
import { MODELS } from "@/lib/models";
import { ModelBadge } from "./model-badge";
import { MarkdownRenderer } from "./markdown-renderer";
import { cn } from "@/lib/utils";
import { Copy, Check, Sparkles, User, RotateCcw } from "lucide-react";

interface MessageFeedProps {
  onSelectPrompt?: (prompt: string) => void;
  className?: string;
}

export function MessageFeed({ onSelectPrompt, className }: MessageFeedProps) {
  const { activeConversation, activeModelId, sendMessage, isStreaming } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation?.messages || [];

  // Auto-scroll to bottom on message change or streaming
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={cn("flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl w-full mx-auto", className)}
    >
      {messages.length === 0 ? (
        <EmptyChatState
          modelId={activeModelId}
          onSelectPrompt={onSelectPrompt}
        />
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onRegenerate={() => {
              if (message.role === "assistant") {
                const userMsgIndex = messages.findIndex((m) => m.id === message.id) - 1;
                if (userMsgIndex >= 0) {
                  sendMessage(messages[userMsgIndex].content, message.modelId);
                }
              }
            }}
          />
        ))
      )}

      {/* Auto-scroll anchor */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}

function MessageItem({
  message,
  onRegenerate,
}: {
  message: ChatMessage;
  onRegenerate: () => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const modelId = (message.modelId || "claude-3-5-sonnet") as ModelId;
  const modelInfo = MODELS[modelId] || MODELS["claude-3-5-sonnet"];

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    try {
      setFormattedTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date(message.timestamp))
      );
    } catch {
      // Fallback
    }
  }, [message.timestamp]);

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 group">
        <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%]">
          <div className="px-4 py-3 rounded-2xl bg-primary text-white text-sm leading-relaxed shadow-md shadow-primary/10 rounded-tr-sm">
            {message.content}
          </div>
          <span className="text-[10px] text-text-muted mt-1 mr-1" suppressHydrationWarning>
            {formattedTime}
          </span>
        </div>

        <div className="h-8 w-8 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-secondary shrink-0 shadow-sm">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3.5 group">
      <div
        className="h-8 w-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md mt-0.5"
        style={{ backgroundColor: modelInfo.accentColor }}
      >
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0 max-w-[90%] sm:max-w-[88%] space-y-2">
        {/* Header bar with model badge & timestamp */}
        <div className="flex items-center gap-2">
          <ModelBadge modelId={modelId} size="sm" />
          <span className="text-[11px] text-text-muted" suppressHydrationWarning>{formattedTime}</span>
          {message.isStreaming && (
            <span className="inline-flex items-center gap-1 text-[10px] text-primary font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              Generating...
            </span>
          )}
        </div>

        {/* Message Card */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-border-subtle text-foreground text-sm shadow-sm relative">
          <MarkdownRenderer content={message.content} />

          {/* Typewriter pulse cursor while streaming */}
          {message.isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse align-middle" />
          )}

          {/* Action toolbar */}
          {!message.isStreaming && message.content && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-subtle/60 text-text-muted text-xs">
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded hover:bg-surface-elevated"
                title="Copy entire response"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={onRegenerate}
                className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded hover:bg-surface-elevated"
                title="Regenerate response"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="text-[11px]">Regenerate</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyChatState({
  modelId,
  onSelectPrompt,
}: {
  modelId: ModelId;
  onSelectPrompt?: (prompt: string) => void;
}) {
  const model = MODELS[modelId] || MODELS["claude-3-5-sonnet"];

  const starterSuggestions = [
    {
      title: "Analyze Architecture",
      desc: "Compare Next.js 16 Server Components vs Client Islands",
      prompt: "Can you analyze the performance trade-offs between React Server Components and Client Islands in Next.js 16?",
    },
    {
      title: "Write TypeScript Hook",
      desc: "Generate an event-driven data streaming custom hook",
      prompt: "Write a production-grade TypeScript custom hook for real-time WebSocket data streaming with exponential backoff.",
    },
    {
      title: "Explain Concept",
      desc: "How Chrome Extension shadow DOM context isolation works",
      prompt: "Explain how Chrome extensions use Shadow DOM to prevent host webpage CSS bleeding into sidebar widgets.",
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 max-w-lg mx-auto">
      <div
        className="h-14 w-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl"
        style={{
          backgroundColor: model.accentColor,
          boxShadow: `0 8px 30px -4px ${model.accentColor}40`,
        }}
      >
        <Sparkles className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">
        How can {model.name} help today?
      </h2>
      <p className="text-xs text-text-secondary max-w-sm mb-8 leading-relaxed">
        {model.description}
      </p>

      {/* Suggestion cards */}
      <div className="grid grid-cols-1 gap-2.5 w-full text-left">
        {starterSuggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt?.(item.prompt)}
            className="p-3.5 rounded-xl glass-card border border-border-subtle hover:border-primary/50 transition-all duration-200 group text-left"
          >
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </div>
            <div className="text-[11px] text-text-secondary mt-0.5">
              {item.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
