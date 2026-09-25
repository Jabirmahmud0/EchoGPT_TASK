import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "glow"
    | "openai"
    | "anthropic"
    | "google"
    | "meta";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variants = {
    default: "bg-surface-elevated text-text-secondary border border-border-subtle",
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    outline: "text-foreground border border-border-strong",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    glow: "bg-primary/20 text-white border border-primary/40 shadow-sm shadow-primary/30",
    openai: "bg-[#10A37F]/10 text-[#10A37F] border border-[#10A37F]/30",
    anthropic: "bg-[#D97706]/10 text-[#F59E0B] border border-[#D97706]/30",
    google: "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/30",
    meta: "bg-[#0284C7]/10 text-[#38BDF8] border border-[#0284C7]/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
