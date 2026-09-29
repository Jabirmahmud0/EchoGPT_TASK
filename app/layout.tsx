import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/lib/chat-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoGPT — Multi-AI Workspace & Browser Companion",
  description:
    "Orchestrate top-tier AI models (EchoGPT default engine, DeepSeek V4 Pro, Qwen 3.8 Plus, Kimi 3, Gemini 3.8 Flash, GPT-5.6, Opus 5.5) in one unified workspace and persistent browser extension sidebar.",
  keywords: [
    "EchoGPT",
    "Multi-AI",
    "AI Workspace",
    "ChatGPT",
    "Claude",
    "Gemini",
    "Chrome Extension",
    "AI Sidebar",
  ],
  authors: [{ name: "AppifyDevs Engineering Assignment" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <SmoothScrollProvider>
          <ThemeProvider>
            <ChatProvider>{children}</ChatProvider>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
