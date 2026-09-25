import Link from "next/link";
import { Sparkles, MessageSquare, PanelRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ModelBadge } from "@/components/chat/model-badge";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Temporary Navbar Preview */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">EchoGPT</span>
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              2.0 Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/app">
              <Button size="sm" variant="primary" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Preview */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 border border-border-subtle">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-text-secondary">
            Multi-AI Ecosystem Active
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-foreground via-foreground to-text-secondary bg-clip-text text-transparent">
          Orchestrate Leading AI Models in One Unified Workspace
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mb-8 leading-relaxed">
          Switch seamlessly between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Llama 3.1. 
          Persistent web chat and browser sidebar assistance.
        </p>

        {/* Model badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <ModelBadge modelId="claude-3-5-sonnet" showProvider />
          <ModelBadge modelId="gpt-4o" showProvider />
          <ModelBadge modelId="gemini-1-5-pro" showProvider />
          <ModelBadge modelId="llama-3-1-70b" showProvider />
        </div>

        {/* Direct Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
          <Link href="/app" className="group">
            <div className="p-5 rounded-2xl glass-card border border-border-subtle hover:border-primary/40 transition-all duration-200 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Web App Workspace
              </h3>
              <p className="text-xs text-text-secondary">
                Full-featured chat stage with model switching, syntax highlighting, and conversation history.
              </p>
            </div>
          </Link>

          <Link href="/extension" className="group">
            <div className="p-5 rounded-2xl glass-card border border-border-subtle hover:border-secondary/40 transition-all duration-200 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                  <PanelRight className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Chrome Extension Concept
              </h3>
              <p className="text-xs text-text-secondary">
                Interactive simulator for the 380px Popup and docked Sidebar View (Ctrl+Shift+E).
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
