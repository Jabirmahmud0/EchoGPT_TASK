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
  Home,
  Check,
  X,
  AlertTriangle,
  Layers,
} from "lucide-react";

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

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
        <div className="h-16 px-4 flex items-center justify-between border-b border-border-subtle shrink-0">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-foreground">
                  EchoGPT
                </span>
                <span className="text-[10px] text-text-muted leading-none">
                  Workspace
                </span>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close mobile sidebar"
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-border-subtle shrink-0">
          <Button
            onClick={() => {
              createNewChat();
              if (window.innerWidth < 1024) setIsMobileOpen(false);
            }}
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            className={cn("w-full justify-start font-semibold text-xs", isCollapsed && "px-0 justify-center")}
          >
            {!isCollapsed && <span>New Chat</span>}
          </Button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full h-8 pl-8 pr-7 text-xs bg-surface-elevated/70 border border-border-subtle rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-text-muted hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
          {!isCollapsed &&
            groupedChats.map((group) => (
              <div key={group.label} className="space-y-0.5">
                <div className="px-2 py-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
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
                        "group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-150",
                        isActive
                          ? "bg-surface-elevated text-foreground border border-border-strong/70 shadow-sm"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <MessageSquare
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
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
                            className="bg-surface-elevated text-foreground text-xs px-1.5 py-0.5 rounded border border-primary/50 focus:outline-none w-full"
                          />
                        ) : (
                          <span className="truncate flex-1">{chat.title}</span>
                        )}
                      </div>

                      {/* Action buttons */}
                      {isEditing ? (
                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          <button
                            onClick={(e) => handleSaveRename(e, chat.id)}
                            className="p-1 hover:text-emerald-400 text-text-muted"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            className="p-1 hover:text-red-400 text-text-muted"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePinChat(chat.id);
                            }}
                            title={chat.isPinned ? "Unpin chat" : "Pin chat"}
                            className={cn(
                              "p-1 rounded hover:bg-surface-hover transition-colors",
                              chat.isPinned ? "text-primary" : "text-text-muted hover:text-foreground"
                            )}
                          >
                            <Pin className="h-3 w-3" />
                          </button>

                          <button
                            onClick={(e) => handleStartRename(e, chat)}
                            title="Rename chat"
                            className="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-foreground transition-colors"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            title="Delete chat"
                            className="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

          {/* Empty search state */}
          {!isCollapsed && filteredConversations.length === 0 && (
            <div className="p-4 text-center text-xs text-text-muted">
              No conversations found.
            </div>
          )}
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-2 border-t border-border-subtle shrink-0 space-y-1">
          {!isCollapsed ? (
            <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-surface-elevated/40">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <span className="text-xs text-text-secondary">Theme</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSettings(true)}
                  title="Settings"
                  className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <Link
                  href="/"
                  title="Landing Page"
                  className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <ThemeToggle />
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors"
              >
                <Settings className="h-4 w-4" />
              </button>
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
