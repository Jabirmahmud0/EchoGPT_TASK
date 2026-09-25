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
  const model = MODELS[modelId] || MODELS["gpt-4o"];

  const getModelIcon = () => {
    switch (model.id) {
      case "claude-3-5-sonnet":
        return <Sparkles className="h-3 w-3 text-emerald-500" />;
      case "gpt-4o":
        return <Zap className="h-3 w-3 text-emerald-500" />;
      case "gemini-1-5-pro":
        return <Layers className="h-3 w-3 text-emerald-500" />;
      case "llama-3-1-70b":
        return <Cpu className="h-3 w-3 text-emerald-500" />;
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
