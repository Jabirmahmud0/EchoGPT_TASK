import * as React from "react";
import { ModelId } from "@/lib/types";
import { MODELS } from "@/lib/models";
import { cn } from "@/lib/utils";
import { Sparkles, Cpu, Layers, Zap } from "lucide-react";

interface ModelBadgeProps {
  modelId: ModelId;
  showProvider?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function ModelBadge({
  modelId,
  showProvider = false,
  size = "md",
  className,
}: ModelBadgeProps) {
  const model = MODELS[modelId] || MODELS["echogpt"];

  const getModelIcon = () => {
    switch (model.id) {
      case "echogpt":
        return <Sparkles className="h-3 w-3 text-emerald-500" />;
      case "deepseek-v4-pro":
      case "deepseek-r1":
        return <Cpu className="h-3 w-3 text-indigo-500" />;
      case "qwen-3-8-plus":
      case "llama-3-3-70b":
      case "llama-3-1-70b":
        return <Layers className="h-3 w-3 text-purple-500" />;
      case "kimi-3":
        return <Sparkles className="h-3 w-3 text-sky-500" />;
      case "gemini-3-8-flash":
      case "gemini-2-0-pro":
      case "gemini-1-5-pro":
        return <Zap className="h-3 w-3 text-blue-500" />;
      case "gpt-5-6":
      case "gpt-4-5":
      case "gpt-4o":
        return <Zap className="h-3 w-3 text-emerald-500" />;
      case "opus-5-5":
      case "claude-3-7-sonnet":
      case "claude-3-5-sonnet":
        return <Sparkles className="h-3 w-3 text-amber-500" />;
      default:
        return <Sparkles className="h-3 w-3 text-emerald-500" />;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-surface border border-emerald-500/20 text-foreground font-medium select-none shadow-xs transition-colors",
        size === "sm" ? "px-2 py-0.5 text-[11px] gap-1.5" : "px-2.5 py-1 text-xs gap-1.5",
        className
      )}
    >
      {getModelIcon()}
      <span className="font-semibold tracking-tight">
        {showProvider ? `${model.provider} ` : ""}
        {model.name}
      </span>
    </span>
  );
}
