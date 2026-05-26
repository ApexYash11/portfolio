"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QUOTES } from "@/data/quotes";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function DailyQuoteCard() {
  const quote = useMemo(() => {
    const today = new Date().toDateString();
    const index = hashCode(today) % QUOTES.length;
    return QUOTES[index];
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 h-full flex flex-col">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <h3 className="text-lg font-semibold mb-4 relative z-10">Daily Quote</h3>

      <div className="flex-1 flex flex-col justify-center relative">
        <div className="absolute top-1 left-0 text-5xl leading-none text-muted-foreground/[0.06] select-none pointer-events-none font-serif">
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-4"
          >
            <p className="text-base md:text-lg leading-relaxed text-foreground/85 font-light italic tracking-wide">
              {quote.text}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">
                Tech &amp; Code
              </span>
              <p className="text-sm text-muted-foreground/70 font-medium">
                &mdash; {quote.author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
