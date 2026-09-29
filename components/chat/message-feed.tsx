"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@/lib/chat-context";
import { ChatMessage, ModelId } from "@/lib/types";
import { MODELS } from "@/lib/models";
import { ModelBadge } from "./model-badge";
import { MarkdownRenderer } from "./markdown-renderer";
import { cn } from "@/lib/utils";
import { Copy, Check, Sparkles, User, RotateCcw, Zap, Code2, BookOpen, Cpu } from "lucide-react";

interface MessageFeedProps {
  onSelectPrompt?: (prompt: string) => void;
  className?: string;
}

export function MessageFeed({ onSelectPrompt, className }: MessageFeedProps) {
  const { activeConversation, activeModelId, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full overflow-y-auto",
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="h-full px-4">
          <EmptyChatState
            modelId={activeModelId}
            onSelectPrompt={onSelectPrompt}
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 w-full">
          {messages.map((message) => (
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
          ))}
          <div ref={bottomRef} className="h-1" />
        </div>
      )}
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
  const modelId = (message.modelId || "echogpt") as ModelId;
  const modelInfo = MODELS[modelId] || MODELS["echogpt"];

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
      <div className="flex items-end justify-end gap-3 group">
        <div className="flex flex-col items-end max-w-[80%]">
          <div className="px-4 py-3 rounded-2xl rounded-br-sm bg-primary text-white text-[15px] leading-relaxed shadow-lg shadow-primary/15">
            {message.content}
          </div>
          <span className="text-xs text-text-muted mt-1.5 mr-1" suppressHydrationWarning>
            {formattedTime}
          </span>
        </div>
        <div className="h-8 w-8 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-secondary shrink-0 mb-5">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 group">
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${modelInfo?.accentColor}18`, border: `1px solid ${modelInfo?.accentColor}30` }}
      >
        <Sparkles className="h-4 w-4" style={{ color: modelInfo?.accentColor }} />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <ModelBadge modelId={modelId} size="sm" />
          <span className="text-xs text-text-muted" suppressHydrationWarning>{formattedTime}</span>
          {message.isStreaming && (
            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              Generating
            </span>
          )}
        </div>

        <div
          aria-live="polite"
          aria-atomic="false"
          className="rounded-2xl rounded-tl-sm bg-surface border border-border-subtle text-[15px] leading-relaxed p-4 shadow-sm"
        >
          <MarkdownRenderer content={message.content} />

          {message.isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse align-middle rounded-sm" />
          )}

          {!message.isStreaming && message.content && (
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border-subtle/50 text-text-muted">
              <button
                onClick={handleCopyMessage}
                aria-label="Copy response"
                className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={onRegenerate}
                aria-label="Regenerate response"
                className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  {
    icon: Code2,
    title: "Analyze Architecture",
    desc: "Compare Server Components vs Client Islands",
    prompt: "Can you analyze the performance trade-offs between React Server Components and Client Islands in Next.js 16?",
    accent: "#10B981",
  },
  {
    icon: Zap,
    title: "Write TypeScript Hook",
    desc: "Event-driven data streaming custom hook",
    prompt: "Write a production-grade TypeScript custom hook for real-time WebSocket data streaming with exponential backoff.",
    accent: "#6366F1",
  },
  {
    icon: BookOpen,
    title: "Explain Concept",
    desc: "Shadow DOM isolation in Chrome Extensions",
    prompt: "Explain how Chrome extensions use Shadow DOM to prevent host webpage CSS bleeding into sidebar widgets.",
    accent: "#F59E0B",
  },
  {
    icon: Cpu,
    title: "Review My Code",
    desc: "Get feedback on performance & best practices",
    prompt: "Please review the following code for performance issues, best practices, and potential bugs:\n\n",
    accent: "#EC4899",
  },
];

function EmptyChatState({
  modelId,
  onSelectPrompt,
}: {
  modelId: ModelId;
  onSelectPrompt?: (prompt: string) => void;
}) {
  const model = MODELS[modelId] || MODELS["echogpt"];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto">
      {/* Logo mark */}
      <div className="relative mb-6">
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
          style={{
            backgroundColor: `${model.accentColor}15`,
            border: `1px solid ${model.accentColor}30`,
            boxShadow: `0 8px 32px -4px ${model.accentColor}20`,
          }}
        >
          <Sparkles className="h-8 w-8" style={{ color: model.accentColor }} />
        </div>
        <div
          className="absolute -inset-3 rounded-3xl opacity-20 blur-xl"
          style={{ backgroundColor: model.accentColor }}
        />
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2.5">
        How can I help you?
      </h2>
      <p className="text-[15px] text-text-secondary max-w-lg mb-8 leading-relaxed">
        {model.description}
      </p>

      {/* Suggestion grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-2xl text-left">
        {SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt?.(item.prompt)}
              className="group relative p-4.5 rounded-2xl bg-surface border border-border-subtle hover:border-primary/30 transition-all duration-200 text-left overflow-hidden hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top left, ${item.accent}08, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${item.accent}15` }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: item.accent }} />
                </div>
                <div className="text-[15px] font-semibold text-foreground group-hover:text-foreground mb-1">
                  {item.title}
                </div>
                <div className="text-[13px] text-text-muted leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
