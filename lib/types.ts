export type ModelId =
  | "gpt-4o"
  | "claude-3-5-sonnet"
  | "gemini-1-5-pro"
  | "llama-3-1-70b";

export type ModelProvider = "OpenAI" | "Anthropic" | "Google" | "Meta";

export interface ModelInfo {
  id: ModelId;
  name: string;
  provider: ModelProvider;
  description: string;
  contextWindow: string;
  tag: string;
  badgeVariant: "openai" | "anthropic" | "google" | "meta";
  accentColor: string;
  speed: string;
  strengths: string[];
}

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  modelId?: ModelId;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  modelId: ModelId;
  messages: ChatMessage[];
  isPinned?: boolean;
}

export interface QuickPrompt {
  id: string;
  title: string;
  prompt: string;
  category: "code" | "writing" | "analysis" | "general";
  icon: string;
}

export type ExtensionLayout = "popup" | "sidebar";
export type ExtensionView = "chat" | "history" | "settings";
