"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

const GITHUB_USERNAME = "ApexYash11";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  "Jupyter Notebook": "#DA5B0B",
  CSS: "#563D7C",
};

function getLangColor(name: string): string {
  return LANGUAGE_COLORS[name] || `hsl(${name.length * 37 % 360}, 55%, 50%)`;
}

interface LangEntry {
  name: string;
  percentage: number;
  color: string;
}

export default function GithubStatsCard() {
  const [user, setUser] = useState<{ name: string | null; created_at: string } | null>(null);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [languageData, setLanguageData] = useState<LangEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!cancelled) {
          if (userRes.ok) {
            const d = await userRes.json();
            setUser({ name: d.name, created_at: d.created_at });
          }
          if (reposRes.ok) {
            const repos: any[] = await reposRes.json();
            setTotalStars(repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0));

            // Fetch language breakdown per repo
            try {
              const langResults = await Promise.all(
                repos.map((r: any) =>
                  fetch(r.languages_url).then((res) => (res.ok ? res.json() : {}))
                )
              );
              const langBytes: Record<string, number> = {};
              langResults.forEach((ld: Record<string, number>) => {
                Object.entries(ld).forEach(([lang, bytes]) => {
                  langBytes[lang] = (langBytes[lang] || 0) + (bytes as number);
                });
              });
              const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
              if (totalBytes > 0) {
                setLanguageData(
                  Object.entries(langBytes)
                    .map(([name, bytes]) => ({
                      name,
                      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
                      color: getLangColor(name),
                    }))
                    .filter((l) => l.percentage >= 1)
                    .sort((a, b) => b.percentage - a.percentage)
                );
              }
            } catch {}
          }
        }

          try {
          const r = await fetch(
            `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true`
          );
          if (r.ok && !cancelled) {
            const svg = await r.text();
            const m = svg.match(/Rank:\s*(\w+)/i);
            if (m) setGrade(m[1]);
          }
        } catch {}

        try {
          const r = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`);
          if (r.ok && !cancelled) {
            const events: any[] = await r.json();
            const pushDays = new Set<string>();
            events.forEach((e: any) => {
              if (e.type === "PushEvent" && e.created_at) {
                pushDays.add(e.created_at.slice(0, 10));
              }
            });
            const today = new Date();
            let streakCount = 0;
            for (let i = 0; i < 365; i++) {
              const d = new Date(today);
              d.setDate(d.getDate() - i);
              const key = d.toISOString().slice(0, 10);
              if (pushDays.has(key)) {
                streakCount++;
              } else if (i > 0) {
                break;
              }
            }
            if (streakCount > 0) setStreak(streakCount);
          }
        } catch {}
      } catch {} finally {
        if (!cancelled) setReady(true);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  const displayName = user?.name || "Yash Maheshwari";
  const memberSince = user?.created_at ? new Date(user.created_at).getFullYear() : null;
  const dataAvailable = totalStars !== null || streak !== null || grade !== null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl w-full">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

        <div className="p-8">
        <div className="flex flex-col gap-6">
        {/* Profile Row */}
        <div className="flex items-center gap-4">
          <img
            src={`https://github.com/${GITHUB_USERNAME}.png`}
            alt={displayName}
            className="size-14 rounded-full ring-2 ring-border shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-base truncate">{displayName}</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              @{GITHUB_USERNAME}
              <ExternalLink className="size-3" />
            </a>
          </div>
          <div className="flex-1" />
          {memberSince && (
            <p className="text-xs text-muted-foreground/60 whitespace-nowrap">
              Member since {memberSince}
            </p>
          )}
        </div>

        {/* Stats Row */}
        {streak !== null && grade !== null ? (
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="Stars" value={totalStars !== null ? totalStars.toLocaleString() : "—"} />
            <StatBox label="Streak" value={`${streak} days`} />
            <StatBox label="Grade" value={grade} />
          </div>
        ) : ready ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/40 overflow-hidden bg-black/[0.03] dark:bg-white/[0.03]">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&icon_color=6366f1&text_color=888&title_color=ccc`}
                alt="GitHub Stats"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg border border-border/40 overflow-hidden bg-black/[0.03] dark:bg-white/[0.03]">
              <img
                src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=dark&hide_border=true`}
                alt="GitHub Streak"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-4 min-h-[80px] justify-center items-center text-center">
              <div className="w-3/4 h-3 rounded animate-pulse bg-muted/20" />
              <div className="w-1/2 h-6 rounded animate-pulse bg-muted/20 mt-1" />
            </div>
            <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-4 min-h-[80px] justify-center items-center text-center">
              <div className="w-3/4 h-3 rounded animate-pulse bg-muted/20" />
              <div className="w-1/2 h-6 rounded animate-pulse bg-muted/20 mt-1" />
            </div>
            <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-4 min-h-[80px] justify-center items-center text-center">
              <div className="w-3/4 h-3 rounded animate-pulse bg-muted/20" />
              <div className="w-1/2 h-6 rounded animate-pulse bg-muted/20 mt-1" />
            </div>
          </div>
        )}

        {/* Top Languages */}
        {languageData.length > 0 && (
          <div>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-3">
              TOP LANGUAGES ACROSS OWN REPOS
            </p>
            <div className="rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-4">
              <div className="flex w-full h-5 rounded overflow-hidden">
                {languageData.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {languageData.map((lang) => (
                  <span
                    key={lang.name}
                    className="text-xs text-muted-foreground inline-flex items-center gap-1.5"
                  >
                    <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                    {lang.name}
                    <span className="text-muted-foreground/60">{lang.percentage}%</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contribution Graph */}
        <div className="rounded-lg border border-border/40 overflow-x-auto bg-black/[0.03] dark:bg-white/[0.03]">
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            className="min-w-[700px] w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/40 bg-black/[0.03] dark:bg-white/[0.03] p-4 min-h-[80px] justify-center items-center text-center">
      <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
        {label}
      </span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
  );
}
