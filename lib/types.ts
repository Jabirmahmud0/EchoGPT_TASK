export type ModelId =
  | "echogpt"
  | "deepseek-v4-pro"
  | "qwen-3-8-plus"
  | "kimi-3"
  | "gemini-3-8-flash"
  | "gpt-5-6"
  | "opus-5-5"
  // Legacy / fallback compatibility
  | "claude-3-7-sonnet"
  | "gpt-4-5"
  | "gemini-2-0-pro"
  | "deepseek-r1"
  | "llama-3-3-70b"
  | "gpt-4o"
  | "claude-3-5-sonnet"
  | "gemini-1-5-pro"
  | "llama-3-1-70b";

export type ModelProvider =
  | "EchoGPT"
  | "DeepSeek"
  | "Alibaba"
  | "Moonshot"
  | "Google"
  | "OpenAI"
  | "Anthropic"
  | "Meta";

export interface ModelInfo {
  id: ModelId;
  name: string;
  provider: ModelProvider;
  description: string;
  contextWindow: string;
  tag: string;
  badgeVariant: "echogpt" | "deepseek" | "qwen" | "kimi" | "google" | "openai" | "anthropic" | "meta";
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

export type ExtensionLayout = "popup" | "sidebar" | "standalone";
export type ExtensionView = "chat" | "history" | "settings";
