"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExtensionView, ModelId } from "@/lib/types";
import { useChat } from "@/lib/chat-context";
import { MODELS, MODELS_LIST } from "@/lib/models";
import { MarkdownRenderer } from "@/components/chat/markdown-renderer";
import { MockArticle } from "./mock-article";
import { ExtensionHistory } from "./extension-history";
import { ExtensionSettings } from "./extension-settings";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Settings,
  ExternalLink,
  Copy,
  Check,
  PanelRightClose,
  Lock,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Plus,
  Zap,
  Globe,
  Paperclip,
  ChevronDown,
  StopCircle,
  MessageSquare,
  PenLine,
  FileText,
  Languages,
  Image as ImageIcon,
  Video,
  Columns2,
  Workflow,
  Crown,
  AtSign,
  Send,
  Clock,
  CheckCircle2,
  Scissors,
  User,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export type SidebarRailTab =
  | "chat"
  | "write"
  | "read"
  | "translate"
  | "image"
  | "video"
  | "compare"
  | "mcp"
  | "history"
  | "settings";

interface SidebarShellProps {
  onViewChange?: (view: ExtensionView) => void;
  className?: string;
  initialPrompt?: string;
  onSelectText?: (text: string) => void;
  standalone?: boolean;
}

const CAPABILITIES = [
  {
    id: "write",
    title: "Write",
    icon: PenLine,
    accent: "#8B5CF6",
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    action: "tab",
  },
  {
    id: "translate",
    title: "Translate",
    icon: Languages,
    accent: "#3B82F6",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    action: "tab",
  },
  {
    id: "read",
    title: "Read page",
    icon: FileText,
    accent: "#10B981",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    action: "tab",
  },
  {
    id: "image",
    title: "Image",
    icon: ImageIcon,
    accent: "#EC4899",
    bg: "bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    action: "tab",
  },
  {
    id: "video",
    title: "Video",
    icon: Video,
    accent: "#F59E0B",
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    action: "tab",
  },
  {
    id: "compare",
    title: "Compare",
    icon: Columns2,
    accent: "#06B6D4",
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    action: "tab",
  },
  {
    id: "mcp",
    title: "MCP",
    icon: Workflow,
    accent: "#6366F1",
    bg: "bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    action: "tab",
  },
  {
    id: "deep-think",
    title: "Deep Think",
    icon: Sparkles,
    accent: "#10B981",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    action: "prompt",
    prompt: "Execute recursive deep thinking and architectural critique on modern multi-agent systems.",
  },
];

const QUICK_PROMPTS = [
  "Tell me an interesting fun fact",
  "Explain quantum computing in simple terms",
  "Recommend 5 great sci-fi movies",
  "How can I improve my English speaking skills?",
];

const RAIL_ITEMS = [
  { id: "chat" as SidebarRailTab, label: "Chat", icon: MessageSquare },
  { id: "write" as SidebarRailTab, label: "Write", icon: PenLine },
  { id: "read" as SidebarRailTab, label: "Read", icon: FileText },
  { id: "translate" as SidebarRailTab, label: "Translate", icon: Languages },
  { id: "image" as SidebarRailTab, label: "Image", icon: ImageIcon },
  { id: "video" as SidebarRailTab, label: "Video", icon: Video },
  { id: "compare" as SidebarRailTab, label: "Compare", icon: Columns2 },
  { id: "mcp" as SidebarRailTab, label: "MCP", icon: Workflow },
];

export function SidebarShell({
  onViewChange,
  className,
  initialPrompt = "",
  standalone = false,
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
  const [activeTab, setActiveTab] = useState<SidebarRailTab>("chat");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [selectionChip, setSelectionChip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Write Mode State
  const [writeFormat, setWriteFormat] = useState("Email");
  const [writeTone, setWriteTone] = useState("Professional");
  const [writeTopic, setWriteTopic] = useState("");
  const [writeGenerated, setWriteGenerated] = useState("");

  // Translate Mode State
  const [targetLang, setTargetLang] = useState("Spanish");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Compare Mode State
  const [comparePrompt, setComparePrompt] = useState("");
  const [compareOutput, setCompareOutput] = useState<{
    modelA?: string;
    modelB?: string;
  } | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  // Image Mode State
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("Photorealistic 8K");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageResult, setImageResult] = useState<string | null>(null);

  // Video Mode State
  const [videoTopic, setVideoTopic] = useState("");
  const [videoDuration, setVideoDuration] = useState("60s Short");
  const [videoScript, setVideoScript] = useState<string | null>(null);

  // MCP State
  const [mcpTools, setMcpTools] = useState({
    domReader: true,
    fileSystem: false,
    pythonSandbox: true,
    githubApi: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const currentModel = MODELS[activeModelId] || MODELS["echogpt"];
  const hasMessages = (activeConversation?.messages.length ?? 0) > 0;

  // Auto-scroll chat feed
  useEffect(() => {
    if (hasMessages && activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, isStreaming, hasMessages, activeTab]);

  // Click outside model dropdown & profile popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfilePopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Hi, good morning";
    if (hour < 18) return "Hi, good afternoon";
    return "Hi, good evening";
  };

  // Detect text selection inside article
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
    setActiveTab("chat");
    setPrompt(`Explain this snippet from the page: "${text}"`);
    if (!isOpen) setIsOpen(true);
    setSelectionChip(null);
    window.getSelection()?.removeAllRanges();

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 120);
  };

  const handleSummarizeSelection = (text: string) => {
    setActiveTab("chat");
    setPrompt(`Summarize this passage concisely: "${text}"`);
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
      const frameId = requestAnimationFrame(() => {
        setActiveTab("chat");
        setPrompt(initialPrompt);
        setIsOpen(true);
        textareaRef.current?.focus();
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || prompt).trim();
    if (!textToSend || isStreaming) return;

    if (activeTab !== "chat") {
      setActiveTab("chat");
    }

    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const prefix = webSearchEnabled ? "[Web Grounding: Enabled] " : "";
    await sendMessage(`${prefix}${textToSend}`);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    createNewChat(activeModelId);
    setPrompt("");
    setActiveTab("chat");
    textareaRef.current?.focus();
  };

  // Run multi-model arena comparison
  const handleRunComparison = () => {
    if (!comparePrompt.trim()) return;
    setIsComparing(true);
    setTimeout(() => {
      setCompareOutput({
        modelA:
          "Opus 5.5: Decoupling frontend presentation from inference reduces vendor lock-in. For heavy logical tasks, Opus 5.5 provides superior architectural reasoning with dense syntax accuracy and formal invariance.",
        modelB:
          "GPT-5.6: Multi-model orchestration ensures sub-50ms routing for lightweight tasks while maintaining failover reliability. It cuts operational expenses significantly via token budgeting and speculative decoding.",
      });
      setIsComparing(false);
    }, 600);
  };

  // Generate Write tool draft
  const handleGenerateWrite = () => {
    if (!writeTopic.trim()) return;
    setWriteGenerated(
      `Subject: ${writeTopic}\n\nDear Team,\n\nFollowing our review of the modern orchestration stack, decoupling client-side state from upstream inference reduces latency while providing failover redundancy across our microservices.\n\nBest regards,\nEngineering Team`
    );
  };

  // The actual Sidebar Panel (used both in standalone mode and docked inside the browser)
  const renderSidebarPanel = () => (
    <div className="flex-1 min-h-0 flex flex-col h-full overflow-hidden bg-surface">
      {/* Header Bar */}
      <header className="h-14 border-b border-border-subtle px-4 flex items-center justify-between shrink-0 bg-surface select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-bold text-base tracking-tight text-foreground capitalize">
            {activeTab === "chat"
              ? "Chat"
              : activeTab === "write"
              ? "Write Studio"
              : activeTab === "read"
              ? "Read Page"
              : activeTab === "translate"
              ? "Translate"
              : activeTab === "image"
              ? "Image Studio"
              : activeTab === "video"
              ? "Video Script"
              : activeTab === "compare"
              ? "Multi-Model Arena"
              : activeTab === "mcp"
              ? "MCP Tools"
              : activeTab === "history"
              ? "History"
              : "Settings"}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>EchoGPT</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Start fresh conversation"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>New Chat</span>
          </button>

          <button
            onClick={() => {
              setActiveTab(activeTab === "history" ? "chat" : "history");
              onViewChange?.(activeTab === "history" ? "chat" : "history");
            }}
            title="Session History"
            className={cn(
              "p-1.5 rounded-xl transition-colors cursor-pointer",
              activeTab === "history"
                ? "bg-primary/10 text-primary"
                : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
            )}
          >
            <Clock className="h-4 w-4" />
          </button>

          <Link
            href="/app"
            title="Open Full Web App"
            className="p-1.5 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>

          {!standalone && (
            <button
              onClick={() => setIsOpen(false)}
              title="Collapse Sidebar (Ctrl+Shift+E)"
              className="p-1.5 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Body Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3.5 relative flex flex-col scrollbar-thin">
        {/* Mode 1: Chat Feed or Empty State */}
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {!hasMessages ? (
              <div className="my-auto flex flex-col text-left py-2">
                {/* Greeting & Header */}
                <div className="text-xs font-medium text-text-muted mb-1">
                  {getGreeting()}
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-4">
                  How can I help you?
                </h2>

                {/* 8 Capability Capsule Cards (2 columns, single-line, perfectly balanced) */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {CAPABILITIES.map((cap) => {
                    const Icon = cap.icon;
                    return (
                      <button
                        key={cap.id}
                        type="button"
                        onClick={() => {
                          if (cap.action === "tab") {
                            setActiveTab(cap.id as SidebarRailTab);
                          } else if (cap.prompt) {
                            handleSendMessage(cap.prompt);
                          }
                        }}
                        className="group h-11 px-3 rounded-2xl bg-surface-elevated/60 hover:bg-surface-elevated border border-border-subtle hover:border-emerald-500/40 transition-all duration-200 text-left flex items-center gap-2.5 shadow-2xs hover:shadow-xs hover:translate-y-[-1px] cursor-pointer"
                      >
                        <div
                          className={cn(
                            "h-7 w-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                            cap.bg
                          )}
                        >
                          <Icon className={cn("h-3.5 w-3.5", cap.text)} />
                        </div>
                        <span className="text-xs font-semibold text-foreground truncate tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {cap.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 4 Stacked Clean Prompt Suggestion Pills */}
                <div className="space-y-2">
                  {QUICK_PROMPTS.map((qPrompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(qPrompt)}
                      className="w-full text-left py-2.5 px-3.5 rounded-xl bg-surface-elevated/40 hover:bg-surface-elevated border border-border-subtle hover:border-emerald-500/30 text-xs text-text-secondary hover:text-foreground font-medium transition-all duration-150 flex items-center justify-between group shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <span className="truncate">{qPrompt}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity shrink-0 ml-1.5" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 py-1">
                <div className="flex items-center justify-between px-1 text-[11px] text-text-muted border-b border-border-subtle pb-1.5">
                  <span>{activeConversation?.messages.length} messages</span>
                  <button
                    onClick={handleNewChat}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
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
                          <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-emerald-600 text-white px-3.5 py-2 text-[13px] leading-relaxed shadow-sm">
                            {message.content}
                          </div>
                        ) : (
                          <div className="max-w-[96%] rounded-2xl rounded-tl-xs bg-surface border border-border-subtle p-3.5 text-[13px] text-foreground space-y-2 shadow-xs">
                            <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-1.5 text-xs">
                              <span className="font-semibold text-foreground flex items-center gap-1.5">
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: currentModel.accentColor }}
                                />
                                {currentModel.name}
                              </span>
                              <button
                                onClick={() => handleCopy(message.content, message.id)}
                                className="text-text-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-surface-elevated cursor-pointer"
                                title="Copy response"
                              >
                                {copiedId === message.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                            <MarkdownRenderer
                              content={message.content}
                              className="prose-xs"
                            />
                            {message.isStreaming && (
                              <span className="inline-block h-3.5 w-1.5 bg-emerald-500 animate-pulse ml-0.5 rounded-xs" />
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
        )}

        {/* Mode 2: Dedicated Write Assistant */}
        {activeTab === "write" && (
          <div className="space-y-3.5 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <PenLine className="h-4 w-4 text-purple-500" />
                <span>AI Writing Studio</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium text-text-muted block">Format</label>
                <div className="grid grid-cols-4 gap-1">
                  {["Email", "Article", "Tweet", "Refactor"].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setWriteFormat(fmt)}
                      className={cn(
                        "py-1 text-[11px] rounded-lg font-medium transition-all text-center",
                        writeFormat === fmt
                          ? "bg-purple-600 text-white font-semibold shadow-xs"
                          : "bg-surface-elevated text-text-secondary hover:text-foreground"
                      )}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium text-text-muted block">Tone</label>
                <div className="grid grid-cols-3 gap-1">
                  {["Professional", "Direct", "Casual"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setWriteTone(t)}
                      className={cn(
                        "py-1 text-[11px] rounded-lg font-medium transition-all text-center",
                        writeTone === t
                          ? "bg-purple-600 text-white font-semibold shadow-xs"
                          : "bg-surface-elevated text-text-secondary hover:text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-text-muted block">Subject / Instructions</label>
                <textarea
                  rows={2}
                  value={writeTopic}
                  onChange={(e) => setWriteTopic(e.target.value)}
                  placeholder="What would you like EchoGPT to write?"
                  className="w-full p-2 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground focus:outline-hidden resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateWrite}
                disabled={!writeTopic.trim()}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-40"
              >
                Generate Draft
              </button>

              {writeGenerated && (
                <div className="mt-3 p-3 rounded-xl bg-surface-elevated border border-border-subtle text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-text-muted border-b border-border-subtle pb-1">
                    <span className="font-semibold text-foreground">Generated Draft</span>
                    <button
                      onClick={() => handleCopy(writeGenerated, "write")}
                      className="hover:text-foreground"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-text-secondary leading-relaxed">
                    {writeGenerated}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 3: Read Page / DOM Inspector */}
        {activeTab === "read" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-emerald-500" />
                  <span>Active Page Context</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  DOM Hook Active
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5 text-xs">
                <div className="text-[11px] font-bold text-foreground">Title</div>
                <div className="text-text-secondary">Modern AI Multi-Model Orchestration & Decoupled Inference</div>
                <div className="text-[11px] text-text-muted pt-1 border-t border-border-subtle flex items-center justify-between">
                  <span>Tokens: ~1,420</span>
                  <span>Read Time: 6 min</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-foreground">Key Takeaways</div>
                <div className="space-y-1 text-xs text-text-secondary">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Single-provider lock-in creates severe vulnerability to downtime.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>In-page sidebars eliminate 100% of copy-paste tab switching friction.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Local-first encrypted storage ensures enterprise privacy compliance.</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSendMessage("Analyze the active page and provide 3 critical architectural critiques.")}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Summarize in Chat
              </button>
            </div>
          </div>
        )}

        {/* Mode 4: Bilingual Translator */}
        {activeTab === "translate" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-blue-500" />
                <span>Instant Page Translator</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Target:</span>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="flex-1 py-1 px-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-foreground"
                >
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                  <option value="German">German (Deutsch)</option>
                  <option value="Japanese">Japanese (日本語)</option>
                  <option value="Chinese">Chinese (简体中文)</option>
                </select>
              </div>

              <textarea
                rows={3}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste or highlight text to translate..."
                className="w-full p-2 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground focus:outline-hidden resize-none"
              />

              <button
                type="button"
                onClick={() => {
                  if (!sourceText.trim()) return;
                  setIsTranslating(true);
                  setTimeout(() => {
                    setTranslatedText(
                      `[Traducido a ${targetLang}]: ${sourceText} — El desacoplamiento de la inferencia reduce la latencia en un 42%.`
                    );
                    setIsTranslating(false);
                  }, 400);
                }}
                disabled={!sourceText.trim() || isTranslating}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-40"
              >
                {isTranslating ? "Translating..." : `Translate to ${targetLang}`}
              </button>

              {translatedText && (
                <div className="p-3 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground">
                  <div className="text-[10px] font-semibold text-blue-500 mb-1">Translation Result</div>
                  <p className="text-text-secondary leading-relaxed">{translatedText}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 5: Image Studio */}
        {activeTab === "image" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-pink-500" />
                <span>AI Image Studio</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-text-muted block">Image Prompt</label>
                <textarea
                  rows={2}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-2 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground focus:outline-hidden resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {["Photorealistic", "Cyberpunk", "3D Render", "Minimalist"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setImageStyle(style)}
                    className={cn(
                      "py-1 text-[11px] rounded-lg font-medium transition-all text-center",
                      imageStyle === style
                        ? "bg-pink-600 text-white font-semibold shadow-xs"
                        : "bg-surface-elevated text-text-secondary hover:text-foreground"
                    )}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!imagePrompt.trim()) return;
                  setIsGeneratingImage(true);
                  setTimeout(() => {
                    setImageResult("Visual concept prompt compiled and queued for high-res generation.");
                    setIsGeneratingImage(false);
                  }, 500);
                }}
                disabled={!imagePrompt.trim() || isGeneratingImage}
                className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-40"
              >
                {isGeneratingImage ? "Rendering Concept..." : "Generate Concept"}
              </button>

              {imageResult && (
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-foreground space-y-1">
                  <div className="text-[11px] font-semibold text-pink-500">Generation Status</div>
                  <p className="text-text-secondary text-[11px]">{imageResult}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 6: Video Script Studio */}
        {activeTab === "video" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Video className="h-4 w-4 text-amber-500" />
                <span>Video Script Generator</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-text-muted block">Video Topic</label>
                <input
                  type="text"
                  value={videoTopic}
                  onChange={(e) => setVideoTopic(e.target.value)}
                  placeholder="e.g. Next.js 16 Performance Tips"
                  className="w-full py-1.5 px-2.5 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-1">
                {["60s Short", "3m Explainer", "10m Deep Dive"].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setVideoDuration(dur)}
                    className={cn(
                      "py-1 text-[11px] rounded-lg font-medium transition-all text-center",
                      videoDuration === dur
                        ? "bg-amber-600 text-white font-semibold shadow-xs"
                        : "bg-surface-elevated text-text-secondary hover:text-foreground"
                    )}
                  >
                    {dur}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!videoTopic.trim()) return;
                  setVideoScript(
                    `[0:00-0:05] HOOK: "Stop paying $60/month for separate AI subscriptions!"\n[0:05-0:20] PROBLEM: Show browser tabs freezing from context switching.\n[0:20-0:50] SOLUTION: Introduce EchoGPT docked sidebar with instant model routing.\n[0:50-1:00] CTA: "Install the extension at echogpt.app!"`
                  );
                }}
                disabled={!videoTopic.trim()}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-40"
              >
                Generate Video Script
              </button>

              {videoScript && (
                <div className="p-3 rounded-xl bg-surface-elevated border border-border-subtle text-xs space-y-1.5">
                  <div className="text-[10px] font-semibold text-amber-500">Timeline Script</div>
                  <pre className="whitespace-pre-wrap font-mono text-[11px] text-text-secondary leading-relaxed">
                    {videoScript}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 7: Compare Multi-Model Arena */}
        {activeTab === "compare" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Columns2 className="h-4 w-4 text-cyan-500" />
                  <span>Multi-Model Arena</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-600 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                  Real-Time Benchmarking
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Benchmark Opus 5.5 against GPT-5.6 on the exact same prompt simultaneously.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={comparePrompt}
                  onChange={(e) => setComparePrompt(e.target.value)}
                  placeholder="Prompt to benchmark..."
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-foreground focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleRunComparison}
                  disabled={isComparing || !comparePrompt.trim()}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs disabled:opacity-40 cursor-pointer"
                >
                  Compare
                </button>
              </div>

              {compareOutput && (
                <div className="space-y-2 pt-1">
                  <div className="p-3 rounded-xl bg-surface-elevated border border-border-subtle text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-amber-500">Opus 5.5</span>
                      <span className="text-[10px] text-text-muted font-mono">88 t/s • 1M ctx</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-[12px]">
                      {compareOutput.modelA}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-elevated border border-border-subtle text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-500">GPT-5.6</span>
                      <span className="text-[10px] text-text-muted font-mono">92 t/s • 512k ctx</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-[12px]">
                      {compareOutput.modelB}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 8: MCP Tools */}
        {activeTab === "mcp" && (
          <div className="space-y-3 py-1">
            <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle space-y-3 shadow-xs">
              <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Workflow className="h-4 w-4 text-indigo-500" />
                  <span>Model Context Protocol (MCP)</span>
                </div>
                <span className="text-[10px] font-mono text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  v2.0 Client
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { id: "domReader", name: "DOM Context Extractor", desc: "Extract current browser tab DOM directly into context", icon: FileText },
                  { id: "pythonSandbox", name: "Python Code Sandbox", desc: "Execute safe calculations in an isolated WASM container", icon: Cpu },
                  { id: "githubApi", name: "GitHub Connector", desc: "Inspect PRs, file trees, and commit histories", icon: Globe },
                  { id: "fileSystem", name: "Local Workspace Access", desc: "Read and write project files with explicit permission", icon: Lock },
                ].map((tool) => (
                  <div
                    key={tool.id}
                    className="p-2.5 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <tool.icon className="h-3 w-3 text-indigo-500" />
                        <span>{tool.name}</span>
                      </div>
                      <p className="text-[10px] text-text-muted truncate mt-0.5">{tool.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={mcpTools[tool.id as keyof typeof mcpTools]}
                      onChange={() =>
                        setMcpTools((prev) => ({
                          ...prev,
                          [tool.id]: !prev[tool.id as keyof typeof mcpTools],
                        }))
                      }
                      className="rounded accent-emerald-500 cursor-pointer h-4 w-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mode 9: History View */}
        {activeTab === "history" && (
          <div className="flex-1 py-1">
            <ExtensionHistory onBack={() => setActiveTab("chat")} />
          </div>
        )}

        {/* Mode 10: Settings View */}
        {activeTab === "settings" && (
          <div className="flex-1 py-1">
            <ExtensionSettings onBack={() => setActiveTab("chat")} />
          </div>
        )}
      </div>

      {/* Floating Modern Composer Footer */}
      <footer className="p-3 border-t border-border-subtle bg-surface shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="border border-border/70 rounded-2xl bg-surface-elevated/40 hover:bg-surface focus-within:bg-surface focus-within:border-emerald-500/40 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all shadow-xs p-1.5 space-y-1 relative"
        >
          {/* Top toolbar of composer: Model Selector & Quick Tools */}
          <div className="flex items-center justify-between px-2 pt-1">
            {/* Model Selector Pill */}
            <div className="relative" ref={modelRef}>
              <button
                type="button"
                onClick={() => setModelOpen((p) => !p)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold bg-surface hover:bg-surface-elevated text-foreground border border-border-subtle shadow-2xs transition-colors cursor-pointer"
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: currentModel.accentColor }}
                />
                <span className="font-semibold text-foreground tracking-tight">{currentModel.name}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 text-text-muted transition-transform duration-200",
                    modelOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {modelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    className="absolute bottom-full left-0 mb-2 w-64 rounded-2xl bg-surface border border-border p-1.5 shadow-xl z-50 space-y-0.5"
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Switch Active Model
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
                            "w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer",
                            isSelected
                              ? "bg-primary/10 text-foreground font-semibold border border-primary/20"
                              : "hover:bg-surface-elevated text-text-secondary hover:text-foreground"
                          )}
                        >
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: model.accentColor }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{model.name}</div>
                            <div className="text-[10px] text-text-muted truncate">{model.contextWindow}</div>
                          </div>
                          {isSelected && <Check className="h-3 w-3 text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accessory Action Icons */}
            <div className="flex items-center gap-0.5 text-text-muted">
              <button
                type="button"
                onClick={() =>
                  handleExplainSelection("Highlighting page content allows EchoGPT to digest DOM structure instantly.")
                }
                title="Capture screen snippet"
                className="h-6 w-6 flex items-center justify-center rounded-md hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <Scissors className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Read and analyze the current webpage DOM context.")}
                title="Read active webpage DOM"
                className="h-6 w-6 flex items-center justify-center rounded-md hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Attach context file"
                className="h-6 w-6 flex items-center justify-center rounded-md hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Mention model or agent"
                className="h-6 w-6 flex items-center justify-center rounded-md hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <AtSign className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Textarea input */}
          <div className="px-2 pt-1 pb-1">
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
              placeholder="Ask EchoGPT a question or type '/' for prompts..."
              rows={1}
              disabled={isStreaming}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-text-muted resize-none focus:outline-none max-h-24 leading-relaxed"
            />
          </div>

          {/* Bottom row: [Search toggle] [Enter hint] [Send button] */}
          <div className="flex items-center justify-between px-2 pb-1 pt-0.5">
            <button
              type="button"
              onClick={() => setWebSearchEnabled((p) => !p)}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer shadow-2xs",
                webSearchEnabled
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-surface hover:bg-surface-elevated text-text-secondary hover:text-foreground border border-border-subtle"
              )}
              title="Toggle live web search context"
            >
              <Globe className="h-3 w-3" />
              <span>Search</span>
            </button>

            <span className="hidden sm:inline text-[10px] text-text-muted select-none">
              Enter to send • Shift + Enter new line
            </span>

            <button
              type="submit"
              disabled={!prompt.trim() || isStreaming}
              aria-label="Send message"
              className={cn(
                "h-7 w-7 flex items-center justify-center rounded-full transition-all cursor-pointer",
                prompt.trim() && !isStreaming
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs active:scale-95"
                  : "bg-surface-elevated text-text-muted opacity-40 cursor-not-allowed"
              )}
            >
              {isStreaming ? (
                <StopCircle className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );

  // The Signature Right Vertical Tool Rail
  const renderToolRail = () => (
    <div className="w-[54px] border-l border-border-subtle bg-surface-elevated/40 flex flex-col items-center justify-between py-2 shrink-0 select-none">
      {/* Top tool navigation icons */}
      <div className="flex flex-col items-center gap-1 w-full px-1">
        {RAIL_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={cn(
                "w-full py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-150 relative group cursor-pointer",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px] mt-0.5 leading-none tracking-tight">
                {item.label}
              </span>

              {/* Active vertical indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="rail-indicator"
                  className="absolute right-0 top-1.5 bottom-1.5 w-0.5 rounded-l-full bg-emerald-500"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom tool rail items: Upgrade, Settings, Profile Avatar */}
      <div className="flex flex-col items-center gap-1.5 w-full px-1 pt-1 border-t border-border-subtle/50 relative">
        <button
          type="button"
          onClick={() => setShowUpgradeModal(true)}
          className="w-full py-1.5 rounded-xl flex flex-col items-center justify-center text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
          title="EchoGPT Pro Upgrade"
        >
          <Crown className="h-4 w-4" />
          <span className="text-[9px] mt-0.5 font-medium leading-none">Upgrade</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("settings");
            onViewChange?.("settings");
          }}
          className={cn(
            "w-full py-1.5 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer",
            activeTab === "settings"
              ? "bg-primary/10 text-primary"
              : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
          )}
          title="Extension Settings"
        >
          <Settings className="h-4 w-4" />
          <span className="text-[9px] mt-0.5 leading-none">Settings</span>
        </button>

        {/* User Profile Avatar & Credits Popover Trigger */}
        <div className="relative w-full flex justify-center pt-1" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfilePopover((p) => !p)}
            className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
            title="User Profile & Credits"
          >
            J
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-surface" />
          </button>

          {/* Profile & Credits Popover */}
          <AnimatePresence>
            {showProfilePopover && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                className="absolute bottom-0 right-full mr-2 w-60 rounded-2xl bg-surface border border-border p-3 shadow-xl z-50 space-y-2.5 text-xs text-foreground"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-border-subtle">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Jabir Mahmud</div>
                    <div className="text-[10px] text-emerald-600 font-medium">Free Tier • 5/30 Credits</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Daily Pro Queries</span>
                    <span className="font-mono font-medium text-foreground">5 / 30 used</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[17%]" />
                  </div>
                  <div className="text-[10px] text-text-muted pt-0.5">Resets midnight UTC</div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfilePopover(false);
                      setShowUpgradeModal(true);
                    }}
                    className="w-full py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    Upgrade to Unlimited Pro
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  // If in Standalone Mode: Render pure 1:1 sidebar panel at full height
  if (standalone) {
    return (
      <div
        className={cn(
          "w-full max-w-[460px] h-[780px] sm:h-[840px] rounded-3xl bg-surface border border-border-subtle shadow-2xl overflow-hidden flex flex-row font-sans transition-all relative",
          className
        )}
      >
        {renderSidebarPanel()}
        {renderToolRail()}

        {/* Upgrade Modal Simulation */}
        <AnimatePresence>
          {showUpgradeModal && (
            <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm rounded-3xl bg-surface border border-border-subtle p-5 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">EchoGPT Pro</h3>
                      <p className="text-[11px] text-text-muted">Unlimited multi-model superpowers</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="p-1 rounded-lg text-text-muted hover:text-foreground cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Unlimited EchoGPT, GPT-5.6 & Opus 5.5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Real-time web search grounding with citations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Full DOM context reading without truncation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Priority access to custom MCP tools</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUpgradeModal(false)}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-colors text-center cursor-pointer"
                  >
                    Upgrade to Pro ($12/mo)
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default In-Page Docked Browser Simulation Mode
  return (
    <div
      className={cn(
        "w-full min-h-[760px] h-[820px] max-h-[880px] rounded-3xl bg-surface border border-border-subtle shadow-2xl overflow-hidden flex flex-col font-sans transition-all relative",
        className
      )}
    >
      {/* 1. Simulated Browser Chrome & Address Bar */}
      <div className="h-12 border-b border-border-subtle bg-surface-elevated/70 px-4 flex items-center justify-between gap-3 shrink-0 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block shadow-xs" />
        </div>

        {/* Browser Navigation buttons */}
        <div className="hidden sm:flex items-center gap-1 text-text-muted">
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-surface hover:text-foreground transition-colors"
            title="Back"
            disabled
          >
            <ArrowLeft className="h-3.5 w-3.5 opacity-40" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-surface hover:text-foreground transition-colors"
            title="Forward"
            disabled
          >
            <ArrowRight className="h-3.5 w-3.5 opacity-40" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
            title="Reload page"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Omnibox / Address Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border-subtle text-xs text-text-secondary shadow-xs">
          <Lock className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-text-muted select-none">https://</span>
          <span className="text-foreground truncate font-mono text-[11px]">
            techinsights.dev/deep-dive/modern-ai-orchestration
          </span>
        </div>

        {/* Extension trigger button in browser toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle EchoGPT Sidebar"
            aria-expanded={isOpen}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
              isOpen
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-surface border border-border-subtle text-text-secondary hover:text-foreground"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span className="hidden sm:inline">EchoGPT</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border-subtle text-[10px] font-mono text-text-muted">
              Ctrl+Shift+E
            </kbd>
          </button>
        </div>
      </div>

      {/* 2. Main Content Split View (Left: Webpage Article, Right: Extension Sidebar) */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Pane: Host Webpage Viewport */}
        <div
          ref={articleContainerRef}
          onMouseUp={handleArticleMouseUp}
          className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background relative select-text scrollbar-thin"
        >
          {/* Floating Context Highlight Action Chip */}
          <AnimatePresence>
            {selectionChip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  left: `${selectionChip.x}px`,
                  top: `${selectionChip.y}px`,
                  transform: "translateX(-50%)",
                }}
                className="z-40 flex items-center gap-1 p-1 rounded-2xl bg-surface border border-emerald-500/40 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => handleExplainSelection(selectionChip.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  title="Send selection to EchoGPT Sidebar"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ask EchoGPT</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSummarizeSelection(selectionChip.text)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-surface-elevated hover:bg-surface text-text-secondary hover:text-foreground text-xs font-medium border border-border-subtle transition-colors cursor-pointer"
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

        {/* Right Pane: Docked EchoGPT Extension Sidebar (With Rightmost Tool Rail) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full md:w-[440px] lg:w-[460px] border-t md:border-t-0 md:border-l border-border-subtle bg-surface flex h-full min-h-0 shrink-0 relative z-10"
            >
              {renderSidebarPanel()}
              {renderToolRail()}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Collapsed sidebar restore tab (when sidebar is closed) */}
        {!isOpen && (
          <div className="p-2 border-t md:border-t-0 md:border-l border-border-subtle bg-surface flex md:flex-col items-center justify-center shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-surface-elevated hover:bg-primary/10 hover:text-primary border border-border-subtle text-text-secondary transition-all shadow-xs flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Open EchoGPT Sidebar (Ctrl+Shift+E)"
            >
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="hidden md:inline text-[11px] font-medium">Open Sidebar</span>
            </button>
          </div>
        )}
      </div>

      {/* Upgrade Modal Simulation */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-surface border border-border-subtle p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">EchoGPT Pro</h3>
                    <p className="text-[11px] text-text-muted">Unlimited multi-model superpowers</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-foreground cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Unlimited EchoGPT, GPT-5.6 & Opus 5.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Real-time web search grounding with citations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Full DOM context reading without truncation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Priority access to custom MCP tools</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-colors text-center cursor-pointer"
                >
                  Upgrade to Pro ($12/mo)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
