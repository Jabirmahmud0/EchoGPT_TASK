"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Compass,
  MessageSquare,
  Layers,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features", isAnchor: true },
  { label: "AI Models", href: "#models", isAnchor: true },
  { label: "Product Preview", href: "#preview", isAnchor: true },
  { label: "Pricing", href: "#pricing", isAnchor: true },
  { label: "FAQ", href: "#faq", isAnchor: true },
];

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Track scroll position for sticky background elevation & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Simple active section detection for anchor links
      const sections = NAV_LINKS.filter((l) => l.isAnchor).map((l) =>
        l.href.replace("#", "")
      );

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 select-none",
        isScrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-foreground">
              EchoGPT
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Redesign
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-elevated/60 border border-border-subtle backdrop-blur-sm"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.isAnchor && activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 relative",
                  isActive
                    ? "text-foreground bg-surface shadow-xs font-semibold"
                    : "text-text-secondary hover:text-foreground hover:bg-surface/50"
                )}
              >
                {isActive && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
                <span className={isActive ? "pl-2" : ""}>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action CTAs & Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />

          <Link href="/extension">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs h-9 px-3 font-medium text-text-secondary hover:text-foreground border border-border-subtle hover:border-border hover:bg-surface-elevated"
            >
              Extension Concept
            </Button>
          </Link>

          <Link href="/app">
            <Button
              size="sm"
              variant="primary"
              className="text-xs h-9 px-3.5 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Open Web App
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-surface-elevated border border-border transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sm:hidden border-b border-border bg-surface px-4 py-4 space-y-3 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.isAnchor && activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 font-semibold"
                        : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-border-subtle grid grid-cols-2 gap-2">
              <Link href="/extension" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs h-9 justify-center"
                >
                  Extension
                </Button>
              </Link>
              <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full text-xs h-9 justify-center bg-emerald-600 text-white"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Web App
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
