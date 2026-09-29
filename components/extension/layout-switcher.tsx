"use client";

import React from "react";
import { ExtensionLayout } from "@/lib/types";
import { PanelRight, AppWindow } from "lucide-react";
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
        "inline-flex items-center p-1 rounded-xl bg-surface-elevated/70 border border-border-subtle shadow-xs select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onLayoutChange("popup")}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          currentLayout === "popup"
            ? "bg-surface text-foreground shadow-sm border border-border-subtle"
            : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
        )}
      >
        <AppWindow className="h-3.5 w-3.5 text-primary" />
        <span>Popup</span>
        <span className="text-[10px] text-text-muted font-mono hidden sm:inline">380px</span>
      </button>

      <button
        type="button"
        onClick={() => onLayoutChange("sidebar")}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          currentLayout === "sidebar"
            ? "bg-surface text-foreground shadow-sm border border-border-subtle"
            : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
        )}
      >
        <PanelRight className="h-3.5 w-3.5 text-primary" />
        <span>Docked Browser</span>
        <span className="text-[10px] text-text-muted font-mono hidden sm:inline">Split</span>
      </button>

      <button
        type="button"
        onClick={() => onLayoutChange("standalone")}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          currentLayout === "standalone"
            ? "bg-surface text-foreground shadow-sm border border-border-subtle"
            : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
        )}
      >
        <PanelRight className="h-3.5 w-3.5 text-emerald-500" />
        <span>Native 1:1</span>
        <span className="text-[10px] text-text-muted font-mono hidden sm:inline">Sidebar</span>
      </button>
    </div>
  );
}
