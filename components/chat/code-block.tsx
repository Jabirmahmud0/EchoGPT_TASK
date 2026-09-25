"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "typescript", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Fast, lightweight syntax highlighter
  const highlightCode = (rawCode: string) => {
    const lines = rawCode.split("\n");
    return lines.map((line, lineIndex) => {
      // Tokenize line with regex
      const parts = line.split(
        /(\b(?:import|from|export|default|const|let|var|function|return|interface|type|class|async|await|if|else|switch|case|try|catch|new|typeof|extends|implements)\b|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\/\/[^\n]*|\b\d+\b)/g
      );

      return (
        <div key={lineIndex} className="table-row leading-relaxed">
          <span className="table-cell pr-4 text-right select-none text-text-muted/60 text-xs font-mono">
            {lineIndex + 1}
          </span>
          <span className="table-cell font-mono text-xs whitespace-pre">
            {parts.map((part, partIndex) => {
              if (
                /^(import|from|export|default|const|let|var|function|return|interface|type|class|async|await|if|else|switch|case|try|catch|new|typeof|extends|implements)$/.test(
                  part
                )
              ) {
                return (
                  <span key={partIndex} className="text-purple-400 font-semibold">
                    {part}
                  </span>
                );
              }
              if (/^["'`].*["'`]$/.test(part)) {
                return (
                  <span key={partIndex} className="text-emerald-300">
                    {part}
                  </span>
                );
              }
              if (/^\/\/.*/.test(part)) {
                return (
                  <span key={partIndex} className="text-text-muted italic">
                    {part}
                  </span>
                );
              }
              if (/^\d+$/.test(part)) {
                return (
                  <span key={partIndex} className="text-amber-300">
                    {part}
                  </span>
                );
              }
              return (
                <span key={partIndex} className="text-foreground">
                  {part}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "my-3 rounded-xl overflow-hidden border border-border-subtle bg-[#0B0D14] text-xs font-mono shadow-md",
        className
      )}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-surface-elevated/80 border-b border-border-subtle text-text-secondary select-none">
        <span className="text-[11px] font-medium tracking-wide uppercase text-text-muted">
          {language}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-surface-hover text-text-secondary hover:text-foreground transition-colors text-[11px]"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-3 overflow-x-auto max-h-[480px]">
        <div className="table w-full">{highlightCode(code)}</div>
      </div>
    </div>
  );
}
