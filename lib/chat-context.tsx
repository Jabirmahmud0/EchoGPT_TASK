"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ChatMessage, Conversation, ModelId } from "./types";
import { DEFAULT_MODEL_ID } from "./models";
import { generateMockAIResponse } from "./mock-responses";

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeModelId: ModelId;
  isStreaming: boolean;
  searchQuery: string;
  filteredConversations: Conversation[];
  setActiveModelId: (modelId: ModelId) => void;
  setSearchQuery: (query: string) => void;
  createNewChat: (modelId?: ModelId) => string;
  selectChat: (id: string) => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  togglePinChat: (id: string) => void;
  sendMessage: (content: string, overrideModelId?: ModelId) => Promise<void>;
  clearAllChats: () => void;
}

const STORAGE_KEY = "echogpt-conversations-v1";
const ACTIVE_CHAT_KEY = "echogpt-active-chat-id-v1";

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-initial-1",
    title: "Next.js 16 App Router Architecture",
    createdAt: 1727258400000,
    updatedAt: 1727258400000,
    modelId: "claude-3-5-sonnet",
    isPinned: true,
    messages: [
      {
        id: "msg-1-1",
        role: "user",
        content: "What are the core performance advantages of Next.js with React 19 and Turbopack?",
        timestamp: 1727258400000,
      },
      {
        id: "msg-1-2",
        role: "assistant",
        modelId: "claude-3-5-sonnet",
        content: `Next.js 16 leverages React 19's streaming primitives and Turbopack compilation:

1. **Turbopack Compiler Speeds:** Up to **10x faster HMR** (Hot Module Replacement) and sub-second cold starts.
2. **React 19 Actions & Transitions:** Built-in optimistic updates without manual boilerplate.
3. **Partial Prerendering (PPR):** Statically shells the page layout while streaming dynamic user widgets concurrently.

This guarantees sub-second First Contentful Paint (FCP) and zero Cumulative Layout Shift (CLS).`,
        timestamp: 1727258403000,
      },
    ],
  },
  {
    id: "conv-initial-2",
    title: "Chrome Extension Multi-Model Sidebar",
    createdAt: 1727172000000,
    updatedAt: 1727172000000,
    modelId: "gpt-4o",
    messages: [
      {
        id: "msg-2-1",
        role: "user",
        content: "How should an in-page browser sidebar capture DOM context without blocking the main thread?",
        timestamp: 1727172000000,
      },
      {
        id: "msg-2-2",
        role: "assistant",
        modelId: "gpt-4o",
        content: `To ensure 60fps scrolling on target web pages:

* Use \`requestIdleCallback\` for text extraction.
* Never clone large subtrees synchronously.
* Communicate via \`chrome.runtime.sendMessage\` with decoupled payload batches.
* Wrap the docked panel in an isolated Shadow DOM container to prevent host stylesheet leakage.`,
        timestamp: 1727172002500,
      },
    ],
  },
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string>("conv-initial-1");
  const [activeModelId, setActiveModelId] = useState<ModelId>(DEFAULT_MODEL_ID);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedActiveId = localStorage.getItem(ACTIVE_CHAT_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Conversation[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          if (storedActiveId && parsed.some((c) => c.id === storedActiveId)) {
            setActiveChatId(storedActiveId);
          } else {
            setActiveChatId(parsed[0].id);
          }
        }
      }
    } catch {
      // Fallback to initial
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
      localStorage.setItem(ACTIVE_CHAT_KEY, activeChatId);
    } catch {
      // Ignore quota errors
    }
  }, [conversations, activeChatId, isInitialized]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeChatId) || conversations[0] || null;
  }, [conversations, activeChatId]);

  // Keep activeModelId synced with active conversation
  useEffect(() => {
    if (activeConversation) {
      setActiveModelId(activeConversation.modelId);
    }
  }, [activeConversation]);

  const createNewChat = useCallback((modelId?: ModelId): string => {
    const chosenModel = modelId || activeModelId || DEFAULT_MODEL_ID;
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      modelId: chosenModel,
      messages: [],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveChatId(newId);
    return newId;
  }, [activeModelId]);

  const selectChat = useCallback((id: string) => {
    setActiveChatId(id);
  }, []);

  const deleteChat = useCallback((id: string) => {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const fallbackId = `conv-${Date.now()}`;
        return [
          {
            id: fallbackId,
            title: "New Conversation",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            modelId: DEFAULT_MODEL_ID,
            messages: [],
          },
        ];
      }
      return next;
    });

    if (activeChatId === id) {
      setTimeout(() => {
        setConversations((latest) => {
          setActiveChatId(latest[0]?.id || "");
          return latest;
        });
      }, 0);
    }
  }, [activeChatId]);

  const renameChat = useCallback((id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle.trim(), updatedAt: Date.now() } : c))
    );
  }, []);

  const togglePinChat = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
  }, []);

  const clearAllChats = useCallback(() => {
    const freshId = `conv-${Date.now()}`;
    const freshConv: Conversation = {
      id: freshId,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      modelId: DEFAULT_MODEL_ID,
      messages: [],
    };
    setConversations([freshConv]);
    setActiveChatId(freshId);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(ACTIVE_CHAT_KEY, freshId);
    } catch {
      // Ignore
    }
  }, []);

  const handleModelChange = useCallback((modelId: ModelId) => {
    setActiveModelId(modelId);
    if (activeChatId) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, modelId } : c))
      );
    }
  }, [activeChatId]);

  // Send message with lightweight typewriter streaming
  const sendMessage = useCallback(
    async (content: string, overrideModelId?: ModelId) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;

      const targetModelId = overrideModelId || activeModelId;
      let targetConvId = activeChatId;

      // If active conversation doesn't exist, create one
      if (!activeConversation) {
        targetConvId = createNewChat(targetModelId);
      }

      const userMsgId = `msg-user-${Date.now()}`;
      const userMessage: ChatMessage = {
        id: userMsgId,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const assistantMsgId = `msg-asst-${Date.now()}`;
      const assistantMessage: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        modelId: targetModelId,
        content: "",
        timestamp: Date.now(),
        isStreaming: true,
      };

      // Auto-title conversation if it's the first message
      const shouldUpdateTitle =
        activeConversation &&
        (activeConversation.title === "New Conversation" || activeConversation.messages.length === 0);
      const generatedTitle = shouldUpdateTitle
        ? trimmed.length > 32
          ? trimmed.slice(0, 32) + "..."
          : trimmed
        : undefined;

      // Add user message & empty assistant message placeholder
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              title: generatedTitle || c.title,
              updatedAt: Date.now(),
              modelId: targetModelId,
              messages: [...c.messages, userMessage, assistantMessage],
            };
          }
          return c;
        })
      );

      setIsStreaming(true);

      // Generate complete response text
      const fullResponse = generateMockAIResponse(trimmed, targetModelId);
      const words = fullResponse.split(" ");
      let currentWordIndex = 0;

      // Typewriter streaming loop (interval pushing words for 60fps smooth reveal)
      await new Promise<void>((resolve) => {
        const intervalId = setInterval(() => {
          // Push 2 words per tick for realistic fast reading pace
          currentWordIndex += 2;

          if (currentWordIndex >= words.length) {
            clearInterval(intervalId);
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id === targetConvId) {
                  return {
                    ...c,
                    messages: c.messages.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: fullResponse, isStreaming: false }
                        : m
                    ),
                  };
                }
                return c;
              })
            );
            setIsStreaming(false);
            resolve();
          } else {
            const partialContent = words.slice(0, currentWordIndex).join(" ");
            setConversations((prev) =>
              prev.map((c) => {
                if (c.id === targetConvId) {
                  return {
                    ...c,
                    messages: c.messages.map((m) =>
                      m.id === assistantMsgId ? { ...m, content: partialContent } : m
                    ),
                  };
                }
                return c;
              })
            );
          }
        }, 35);
      });
    },
    [activeChatId, activeConversation, activeModelId, createNewChat, isStreaming]
  );

  // Search filter
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  }, [conversations, searchQuery]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        activeModelId,
        isStreaming,
        searchQuery,
        filteredConversations,
        setActiveModelId: handleModelChange,
        setSearchQuery,
        createNewChat,
        selectChat,
        deleteChat,
        renameChat,
        togglePinChat,
        sendMessage,
        clearAllChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
