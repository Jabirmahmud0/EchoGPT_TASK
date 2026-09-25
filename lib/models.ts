import { ModelId, ModelInfo, QuickPrompt } from "./types";

export const MODELS: Record<ModelId, ModelInfo> = {
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Flagship omni model with high intelligence and fast multimodal reasoning.",
    contextWindow: "128k tokens",
    tag: "High Intelligence & Speed",
    badgeVariant: "openai",
    accentColor: "#10A37F",
    speed: "Fast (85 t/s)",
    strengths: ["General reasoning", "Code generation", "Multilingual"],
  },
  "claude-3-5-sonnet": {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Industry benchmark for complex coding, architectural design, and nuanced writing.",
    contextWindow: "200k tokens",
    tag: "Coding & Deep Nuance",
    badgeVariant: "anthropic",
    accentColor: "#D97706",
    speed: "Very Fast (92 t/s)",
    strengths: ["Complex coding", "System architecture", "Creative tone"],
  },
  "gemini-1-5-pro": {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Breakthrough 2M-token context window with superior document analysis.",
    contextWindow: "2M tokens",
    tag: "Long-Context & Research",
    badgeVariant: "google",
    accentColor: "#3B82F6",
    speed: "Fast (78 t/s)",
    strengths: ["Massive documents", "Data extraction", "Cross-file analysis"],
  },
  "llama-3-1-70b": {
    id: "llama-3-1-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    description: "Leading open-weights model fine-tuned for versatile instruction and math.",
    contextWindow: "128k tokens",
    tag: "Open Weights & Privacy",
    badgeVariant: "meta",
    accentColor: "#0284C7",
    speed: "Ultra Fast (110 t/s)",
    strengths: ["Instruction following", "Math reasoning", "Unbiased output"],
  },
};

export const MODELS_LIST: ModelInfo[] = Object.values(MODELS);

export const DEFAULT_MODEL_ID: ModelId = "claude-3-5-sonnet";

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: "explain-code",
    title: "Explain Code",
    prompt: "Can you analyze this code, explain how it works step-by-step, and point out any potential edge cases?",
    category: "code",
    icon: "code",
  },
  {
    id: "summarize-key-points",
    title: "Summarize",
    prompt: "Provide a concise executive summary with the top 3 actionable takeaways and key risks.",
    category: "analysis",
    icon: "file-text",
  },
  {
    id: "refactor-clean",
    title: "Refactor Cleanly",
    prompt: "Refactor the following snippet following clean code principles, strict typing, and high performance.",
    category: "code",
    icon: "wrench",
  },
  {
    id: "write-tests",
    title: "Write Tests",
    prompt: "Write comprehensive unit and integration tests covering happy paths, edge cases, and failure scenarios.",
    category: "code",
    icon: "check-circle",
  },
];
