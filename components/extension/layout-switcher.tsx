"use client";

import React from "react";
import { ExtensionLayout } from "@/lib/types";
import { PanelRight, Square, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutSwitcherProps {
  currentLayout: ExtensionLayout;
  onLayoutChange: (layout: ExtensionLayout) => void;
  className?: string;
}

export function LayoutSwitcher({
  currentLayout,
  onLayoutChange,
  className,
}: LayoutSwitcherProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-surface border border-border shadow-xs select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onLayoutChange("popup")}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          currentLayout === "popup"
            ? "bg-primary text-white shadow-xs"
            : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
        )}
      >
        <Square className="h-3.5 w-3.5" />
        <span>Popup</span>
        <span className="text-[10px] opacity-75 font-mono hidden sm:inline">380px</span>
      </button>

      <button
        type="button"
        onClick={() => onLayoutChange("sidebar")}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          currentLayout === "sidebar"
            ? "bg-primary text-white shadow-xs"
            : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
        )}
      >
        <PanelRight className="h-3.5 w-3.5" />
        <span>Sidebar</span>
        <span className="text-[10px] opacity-75 font-mono hidden sm:inline">Ctrl+Shift+E</span>
      </button>
    </div>
  );
}
