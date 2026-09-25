"use client";

import * as React from "react";
import { ModelId } from "@/lib/types";
import { MODELS, MODELS_LIST } from "@/lib/models";
import { ModelBadge } from "./model-badge";
import { ChevronDown, Check, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  selectedModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
  className?: string;
  size?: "sm" | "md";
}

export function ModelSelector({
  selectedModelId,
  onSelectModel,
  className,
  size = "md",
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentModel = MODELS[selectedModelId] || MODELS["claude-3-5-sonnet"];

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn("relative inline-block", className)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select AI Model, current model is ${currentModel.name}`}
        className={cn(
          "flex items-center gap-2 rounded-xl bg-surface border border-emerald-500/25 hover:border-emerald-500/40 text-foreground transition-all duration-150 shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500",
          size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
        )}
      >
        <ModelBadge modelId={currentModel.id} size={size === "sm" ? "sm" : "md"} className="border-0 bg-transparent shadow-none p-0" />
        <span className="text-text-muted text-xs font-mono font-medium hidden sm:inline">
          {currentModel.contextWindow}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-text-secondary transition-transform duration-200 ml-0.5",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute left-0 z-50 mt-2 w-72 sm:w-80 rounded-2xl bg-surface p-2 shadow-xl border border-border space-y-1 focus:outline-none"
          >
            <div className="px-2.5 py-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Available AI Models
            </div>

            {MODELS_LIST.map((model) => {
              const isSelected = model.id === selectedModelId;
              return (
                <button
                  key={model.id}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-start gap-3 p-2.5 rounded-xl transition-colors text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500",
                    isSelected
                      ? "bg-primary/10 border border-primary/25"
                      : "hover:bg-surface-elevated border border-transparent"
                  )}
                >
                  <div className="mt-0.5">
                    <ModelBadge modelId={model.id} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {model.tag}
                      </span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                      {model.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-text-muted">
                      <span>{model.contextWindow}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-2.5 w-2.5 text-emerald-500" />
                        {model.speed}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
