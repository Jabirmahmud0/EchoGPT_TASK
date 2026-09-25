import * as React from "react";
import { ModelId } from "@/lib/types";
import { MODELS } from "@/lib/models";
import { Badge } from "@/components/ui/badge";
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
        return <Sparkles className="h-3 w-3" />;
      case "gpt-4o":
        return <Zap className="h-3 w-3" />;
      case "gemini-1-5-pro":
        return <Layers className="h-3 w-3" />;
      case "llama-3-1-70b":
        return <Cpu className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  return (
    <Badge
      variant={model.badgeVariant}
      size={size}
      className={cn("font-medium tracking-tight", className)}
    >
      <span className="flex items-center gap-1.5">
        {getModelIcon()}
        <span>
          {showProvider ? `${model.provider} ` : ""}
          {model.name}
        </span>
      </span>
    </Badge>
  );
}
