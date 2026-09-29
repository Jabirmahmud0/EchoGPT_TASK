"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useChat } from "@/lib/chat-context";
import { Conversation } from "@/lib/types";
import { ModelBadge } from "./model-badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  MessageSquare,
  Pin,
  Trash2,
  Edit2,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  Settings,
  Check,
  X,
  AlertTriangle,
  Image,
  Video,
  GitCompare,
  Plug,
  History,
  ShoppingBag,
  ListTodo,
  BriefcaseBusiness,
  FileText,
  Crown,
  Zap,
  Home,
  Share2,
  Bell,
  MessageSquareText,
  Mail,
  Gem,
  Network,
} from "lucide-react";

function DiscordIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const NAV_ITEMS = [
  { icon: Image,            label: "Image Studio",    pro: true },
  { icon: Video,            label: "Video Studio",    pro: true },
  { icon: GitCompare,       label: "Compare",         pro: false },
  { icon: Plug,             label: "Connectors",      pro: false },
  { icon: History,          label: "History",         pro: false },
  { icon: ShoppingBag,      label: "Store",           pro: false },
  { icon: ListTodo,         label: "AI Tasks",        pro: false },
  { icon: BriefcaseBusiness,label: "AI Job Analysis", pro: true  },
  { icon: FileText,         label: "AI SOP Builder",  pro: true  },
];

const HELP_ITEMS = [
  { icon: MessageSquareText, label: "Support" },
  { icon: Mail,              label: "Newsletter" },
  { icon: Gem,               label: "Subscriptions" },
  { icon: Network,           label: "API Platform" },
  { icon: DiscordIcon,       label: "Discord", color: "#5865F2" },
];

export function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const {
    activeConversation,
    filteredConversations,
    searchQuery,
    setSearchQuery,
    createNewChat,
    selectChat,
    deleteChat,
    renameChat,
    togglePinChat,
    clearAllChats,
  } = useChat();

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"features" | "chats">("chats");

  // Group conversations by date
  const groupedChats = useMemo(() => {
    const pinned: Conversation[] = [];
    const today: Conversation[] = [];
    const pastWeek: Conversation[] = [];
    const older: Conversation[] = [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = todayStart - 6 * 86400000;

    filteredConversations.forEach((conv) => {
      if (conv.isPinned) {
        pinned.push(conv);
      } else if (conv.updatedAt >= todayStart) {
        today.push(conv);
      } else if (conv.updatedAt >= weekStart) {
        pastWeek.push(conv);
      } else {
        older.push(conv);
      }
    });

    return [
      { label: "Pinned", items: pinned },
      { label: "Today", items: today },
      { label: "Previous 7 Days", items: pastWeek },
      { label: "Older", items: older },
    ].filter((group) => group.items.length > 0);
  }, [filteredConversations]);

  const handleStartRename = (e: React.MouseEvent, chat: Conversation) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveRename = (e: React.MouseEvent | React.KeyboardEvent, id: string) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim());
    }
    setEditingChatId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(null);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={cn(
          "fixed lg:static top-0 bottom-0 left-0 z-40 flex flex-col bg-surface border-r border-border-subtle transition-all duration-300 ease-in-out select-none",
          isCollapsed ? "w-0 lg:w-16 overflow-hidden" : "w-72 sm:w-64 lg:w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Top Header */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-border-subtle shrink-0">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2.5 px-1">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] tracking-tight text-foreground leading-none">
                  EchoGPT
                </span>
                <span className="text-xs text-text-muted leading-tight mt-0.5">
                  Workspace
                </span>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close mobile sidebar"
              className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="px-3 py-2.5 border-b border-border-subtle shrink-0">
          <button
            onClick={() => {
              createNewChat();
              if (window.innerWidth < 1024) setIsMobileOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm",
              isCollapsed && "justify-center px-0"
            )}
          >
            <Plus className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>New Chat</span>}
          </button>
        </div>

        {/* Tab Switcher */}
        {!isCollapsed && (
          <div className="px-3 pt-2.5 pb-0 shrink-0">
            <div className="flex rounded-xl bg-surface-elevated/60 border border-border-subtle p-0.5">
              <button
                onClick={() => setActiveTab("chats")}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all",
                  activeTab === "chats"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-text-muted hover:text-foreground"
                )}
              >
                Chats
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all",
                  activeTab === "features"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-text-muted hover:text-foreground"
                )}
              >
                Features
              </button>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {!isCollapsed && activeTab === "features" && (
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNavItem(isActive ? null : item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group",
                    isActive
                      ? "bg-surface-elevated text-foreground"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-primary" : "text-text-muted group-hover:text-text-secondary")} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.pro && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary tracking-wide">
                      PRO
                    </span>
                  )}
                </button>
              );
            })}

            {/* Help & Support */}
            <div className="pt-2">
              <div className="border-t border-border-subtle my-2" />
              <div className="px-2.5 py-1 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                Help & Support
              </div>
            </div>

            {HELP_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNavItem(isActive ? null : item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors group",
                    isActive
                      ? "bg-surface-elevated text-foreground"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors",
                        item.color
                          ? ""
                          : isActive
                          ? "text-primary"
                          : "text-text-muted group-hover:text-text-secondary"
                      )}
                      style={item.color ? { color: item.color } : undefined}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Chats Tab */}
        {!isCollapsed && activeTab === "chats" && (
          <>
            {/* Search */}
            <div className="px-3 pt-2.5 pb-1 shrink-0">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full h-8.5 pl-8 pr-7 text-sm bg-surface-elevated/60 border border-border-subtle rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 text-text-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
          {groupedChats.map((group) => (
              <div key={group.label} className="space-y-0.5">
                <div className="px-2.5 py-1 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {group.label}
                </div>
                {group.items.map((chat) => {
                  const isActive = activeConversation?.id === chat.id;
                  const isEditing = editingChatId === chat.id;

                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        selectChat(chat.id);
                        if (window.innerWidth < 1024) setIsMobileOpen(false);
                      }}
                      className={cn(
                        "group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-150",
                        isActive
                          ? "bg-surface-elevated text-foreground border border-border-strong/70 shadow-sm"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <MessageSquare
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isActive ? "text-primary" : "text-text-muted"
                          )}
                        />

                        {isEditing ? (
                          <input
                            type="text"
                            autoFocus
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveRename(e, chat.id);
                              if (e.key === "Escape") setEditingChatId(null);
                            }}
                            className="bg-surface-elevated text-foreground text-sm px-1.5 py-0.5 rounded border border-primary/50 focus:outline-none w-full"
                          />
                        ) : (
                          <span className="truncate flex-1">{chat.title}</span>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          <button
                            onClick={(e) => handleSaveRename(e, chat.id)}
                            aria-label="Save new title"
                            className="p-1 hover:text-emerald-400 text-text-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            aria-label="Cancel rename"
                            className="p-1 hover:text-red-400 text-text-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0 ml-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePinChat(chat.id);
                            }}
                            title={chat.isPinned ? "Unpin" : "Pin"}
                            aria-label={chat.isPinned ? "Unpin chat" : "Pin chat"}
                            className={cn(
                              "p-1 rounded hover:bg-surface-hover transition-colors",
                              chat.isPinned ? "text-primary" : "text-text-muted hover:text-foreground"
                            )}
                          >
                            <Pin className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleStartRename(e, chat)}
                            title="Rename"
                            aria-label="Rename chat"
                            className="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-foreground transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            title="Delete"
                            aria-label="Delete chat"
                            className="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

          {filteredConversations.length === 0 && (
            <div className="p-4 text-center text-xs text-text-muted">
              No conversations found.
            </div>
          )}
        </div>
          </>
        )}

        {/* Collapsed icon nav */}
        {isCollapsed && (
          <div className="flex flex-col items-center gap-1 py-3 border-b border-border-subtle shrink-0 flex-1">
            {NAV_ITEMS.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  title={item.label}
                  className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        )}

        {/* Upgrade to Pro Card */}
        {!isCollapsed && (
          <div className="px-3 py-2 border-t border-border-subtle shrink-0">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent border border-primary/20 p-3 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Crown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-none">Unlock Pro</div>
                  <div className="text-xs text-text-muted mt-0.5">Image, Video & advanced models</div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm">
                <Zap className="h-3.5 w-3.5" />
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}

        {/* Bottom Icon Bar */}
        <div className="border-t border-border-subtle shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center justify-around px-2 py-2">
              <Link
                href="/"
                title="Home"
                aria-label="Go to home"
                className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              >
                <Home className="h-[18px] w-[18px]" />
              </Link>

              <button
                title="Share"
                aria-label="Share"
                className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              >
                <Share2 className="h-[18px] w-[18px]" />
              </button>

              <button
                onClick={() => setShowSettings(true)}
                title="Settings"
                aria-label="Open settings"
                className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              >
                <Settings className="h-[18px] w-[18px]" />
              </button>

              <div className="p-2">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 py-3 px-2">
              <Link href="/" title="Home" className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors">
                <Home className="h-[18px] w-[18px]" />
              </Link>
              <button title="Share" className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors">
                <Share2 className="h-[18px] w-[18px]" />
              </button>
              <button onClick={() => setShowSettings(true)} title="Settings" className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors">
                <Settings className="h-[18px] w-[18px]" />
              </button>
              <ThemeToggle />
            </div>
          )}
        </div>
      </aside>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Workspace Settings"
        description="Configure your EchoGPT preferences and local storage"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-border-subtle">
            <div>
              <div className="font-medium text-foreground">Theme Mode</div>
              <div className="text-text-muted">Toggle between dark obsidian and light mode</div>
            </div>
            <ThemeToggle />
          </div>

          <div className="py-2 border-b border-border-subtle">
            <div className="font-medium text-foreground mb-1">Local Storage Persistence</div>
            <div className="text-text-muted leading-relaxed">
              All chat conversations, active model preferences, and session histories are stored strictly client-side on your device.
            </div>
          </div>

          <div className="pt-2">
            {!showClearConfirm ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              >
                Clear All Conversations
              </Button>
            ) : (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-red-400 font-semibold text-xs">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Are you sure you want to delete all chats?
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      clearAllChats();
                      setShowClearConfirm(false);
                      setShowSettings(false);
                    }}
                  >
                    Confirm Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
