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
      <h3 className="text-lg font-semibold mb-5">Daily Quote</h3>

      <div className="flex-1 flex flex-col justify-center relative">
        <div className="absolute top-0 left-0 text-6xl leading-none text-muted-foreground/10 select-none pointer-events-none font-serif">
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-light italic">
              {quote.text}
            </p>
            <p className="text-sm text-muted-foreground text-right">
              &mdash; {quote.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
