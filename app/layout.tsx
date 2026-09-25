import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/lib/chat-context";

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
    "Orchestrate top-tier AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1) in one unified workspace and persistent browser extension sidebar.",
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
        <ThemeProvider>
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
