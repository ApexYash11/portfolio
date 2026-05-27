"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const GITHUB_USERNAME = "ApexYash11";

const statCards = [
  {
    label: "Streak",
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&card_width=250&stroke=888&ring=6366f1&fire=6366f1&currStreakLabel=6366f1&sideLabels=ccc&dates=888`,
    alt: "GitHub Streak",
  },
  {
    label: "Stats",
    src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&icon_color=6366f1&text_color=888&title_color=ccc`,
    alt: "GitHub Stats",
  },
  {
    label: "Top Languages",
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&text_color=888&title_color=ccc`,
    alt: "Top Languages",
  },
];

export default function GithubStatsCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">GitHub Activity</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
          <ContributionCount />
        </div>

        <ContributionGraph />
      </div>
    </div>
  );
}

function useImageLoader(src: string) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled) setState("loaded"); };
    img.onerror = () => { if (!cancelled) setState("error"); };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);

  const retry = useCallback(() => {
    setState("loading");
    const img = new Image();
    img.onload = () => setState("loaded");
    img.onerror = () => setState("error");
    img.src = src;
  }, [src]);

  return { state, retry };
}

function StatCard({ label, src, alt }: { label: string; src: string; alt: string }) {
  const { state, retry } = useImageLoader(src);

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-3 overflow-hidden relative min-h-[80px]">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider relative z-10">{label}</span>

      <AnimatePresence mode="wait">
        {state === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
          >
            <span className="text-[10px] text-muted-foreground/50">Failed to load</span>
            <button onClick={retry} className="text-[10px] text-primary/60 hover:text-primary/80 transition-colors underline underline-offset-2">
              Retry
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center"
          >
            {state === "loading" && (
              <div className="absolute inset-0 p-3 pt-6">
                <div className="w-full h-full rounded animate-pulse bg-muted/20" />
              </div>
            )}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto relative z-10"
              loading="lazy"
              style={{ opacity: state === "loaded" ? 1 : 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContributionCount() {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-3 min-h-[80px] justify-center">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Contributions</span>
      <span className="text-2xl font-bold text-foreground">500+</span>
      <span className="text-[10px] text-muted-foreground">Last 12 months</span>
    </div>
  );
}

function ContributionGraph() {
  const src = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;
  const { state, retry } = useImageLoader(src);

  return (
    <div className="rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-3 overflow-hidden relative min-h-[60px]">
      <AnimatePresence mode="wait">
        {state === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 py-4"
          >
            <span className="text-xs text-muted-foreground/50">Graph unavailable</span>
            <button onClick={retry} className="text-xs text-primary/60 hover:text-primary/80 transition-colors underline underline-offset-2">
              Retry
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {state === "loading" && (
              <div className="absolute inset-0 p-3">
                <div className="w-full h-full rounded animate-pulse bg-muted/20" />
              </div>
            )}
            <img
              src={src}
              alt="GitHub Contribution Graph"
              className="w-full h-auto relative z-10"
              loading="lazy"
              style={{ opacity: state === "loaded" ? 1 : 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
