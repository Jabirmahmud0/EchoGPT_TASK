"use client";

import React from "react";
import { CodeBlock } from "./code-block";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Split content by code blocks: ```lang\ncode\n```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  let partIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const textBefore = content.substring(lastIndex, match.index);
    if (textBefore) {
      elements.push(
        <RenderFormattedText key={`text-${partIndex++}`} text={textBefore} />
      );
    }

    const language = match[1] || "typescript";
    const code = match[2];
    elements.push(
      <CodeBlock
        key={`code-${partIndex++}`}
        code={code}
        language={language}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingText = content.substring(lastIndex);
  if (remainingText) {
    elements.push(
      <RenderFormattedText key={`text-${partIndex++}`} text={remainingText} />
    );
  }

  return <div className={className}>{elements}</div>;
}

function RenderFormattedText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // H3 Header: ### Title
        if (line.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="text-base font-bold text-foreground mt-4 mb-2 tracking-tight"
            >
              {parseInlineMarkdown(line.replace("### ", ""))}
            </h3>
          );
        }

        // H4 Header: #### Title
        if (line.startsWith("#### ")) {
          return (
            <h4
              key={idx}
              className="text-sm font-bold text-foreground mt-3 mb-1 tracking-tight"
            >
              {parseInlineMarkdown(line.replace("#### ", ""))}
            </h4>
          );
        }

        // Blockquote: > Quote
        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-primary/60 pl-3.5 my-2 italic text-text-secondary bg-surface-elevated/40 py-1 rounded-r-lg"
            >
              {parseInlineMarkdown(line.replace(/^>\s*/, ""))}
            </blockquote>
          );
        }

        // Numbered list: 1. Item
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+)\.\s(.*)/);
          if (match) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 my-1">
                <span className="text-primary font-semibold text-xs mt-0.5 shrink-0 select-none">
                  {match[1]}.
                </span>
                <span className="flex-1 text-text-secondary">
                  {parseInlineMarkdown(match[2])}
                </span>
              </div>
            );
          }
        }

        // Bulleted list: * Item or - Item
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 my-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0 select-none" />
              <span className="flex-1 text-text-secondary">
                {parseInlineMarkdown(content)}
              </span>
            </div>
          );
        }

        return <p key={idx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Matches `code`, **bold**, *italic*
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, i) => {
    // Inline code: `code`
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded-md bg-surface-elevated text-primary font-mono text-[12px] border border-border-subtle"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    // Bold: **text**
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }
    // Italic: *text*
    if (token.startsWith("*") && token.endsWith("*")) {
      return (
        <em key={i} className="italic text-text-secondary">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}
