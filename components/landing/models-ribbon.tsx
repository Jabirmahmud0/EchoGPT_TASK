"use client";

import React from "react";
import { motion } from "framer-motion";
import { ModelBadge } from "@/components/chat/model-badge";
import { MODELS_LIST } from "@/lib/models";
import { Sparkles, Zap, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ModelsRibbon() {
  return (
    <section
      id="models"
      className="py-16 sm:py-24 border-y border-border-subtle bg-surface-elevated/30 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Multi-Model Engine Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Top-tier frontier models.{" "}
            <span className="text-text-secondary font-medium">
              Zero vendor lock-in.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Every model possesses distinct reasoning competencies and context
            capacities. EchoGPT gives you instant access to all four leading
            architectures in one unified workspace.
          </p>
        </div>

        {/* 4 Models Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELS_LIST.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Provider & Model Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <ModelBadge modelId={model.id} size="md" />
                  <span className="text-[11px] font-mono font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {model.contextWindow}
                  </span>
                </div>

                {/* Name & Tag */}
                <h3 className="text-base font-bold text-foreground group-hover:text-emerald-600 transition-colors mb-1">
                  {model.name}
                </h3>
                <div className="text-[11px] font-semibold text-text-secondary mb-2.5">
                  {model.tag}
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {model.description}
                </p>
              </div>

              {/* Strengths Pills & Speed Footer */}
              <div className="pt-3 border-t border-border-subtle space-y-2.5">
                <div className="flex flex-wrap gap-1">
                  {model.strengths.map((str) => (
                    <span
                      key={str}
                      className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border-subtle text-[10px] text-text-muted font-medium"
                    >
                      {str}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Zap className="h-3 w-3 text-emerald-500" />
                    {model.speed}
                  </span>
                  <Link
                    href={`/app`}
                    className="text-emerald-600 hover:text-emerald-500 font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                  >
                    Test <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
