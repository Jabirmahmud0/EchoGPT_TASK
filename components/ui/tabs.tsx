"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  size = "md",
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-surface-elevated/70 border border-border-subtle backdrop-blur-md",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative z-10 flex items-center justify-center font-medium transition-colors select-none rounded-lg",
              size === "sm" ? "px-3 py-1 text-xs gap-1.5" : "px-4 py-1.5 text-sm gap-2",
              isActive
                ? "text-foreground font-semibold"
                : "text-text-secondary hover:text-foreground"
            )}
          >
            {tab.icon && <span className="text-current">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px]",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-hover text-text-muted"
                )}
              >
                {tab.badge}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                className="absolute inset-0 z-[-1] rounded-lg bg-surface shadow-sm border border-border-strong/60"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
