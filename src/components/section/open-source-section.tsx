/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import githubStats from "@/data/github-stats.json";
import { GitMerge, Star } from "lucide-react";

interface FeaturedContribution {
  repo: string;
  fullName: string;
  repoUrl: string;
  prId: number;
  title: string;
  summary: string;
  url: string;
}

/**
 * Hand-picked, substantive contributions shown first. Each summary describes
 * the problem and the fix in the linked PR; low-signal activity stays in the
 * expandable full list below.
 */
const FEATURED: FeaturedContribution[] = [
  {
    repo: "agent-orchestrator",
    fullName: "Untrivial-ai/agent-orchestrator",
    repoUrl: "https://github.com/Untrivial-ai/agent-orchestrator",
    prId: 3084,
    title: "fix: isolate session kill state across worker switches",
    summary:
      "Kill confirmation, pending and error state leaked from one session into the next because the app shell reused the same TopbarKillButton instance. Keyed it by session ID and added a regression test.",
    url: "https://github.com/Untrivial-ai/agent-orchestrator/pull/3084",
  },
  {
    repo: "cognee",
    fullName: "topoteretes/cognee",
    repoUrl: "https://github.com/topoteretes/cognee",
    prId: 4290,
    title: "fix(skills): make ingest idempotent by name and add delete endpoint",
    summary:
      "Re-ingesting a skill duplicated the node because every POST materialized it in a fresh temp dir, randomizing the supposedly deterministic skill ID. Made ingest idempotent by name and added a delete endpoint.",
    url: "https://github.com/topoteretes/cognee/pull/4290",
  },
  {
    repo: "NVSentinel",
    fullName: "NVIDIA/NVSentinel",
    repoUrl: "https://github.com/NVIDIA/NVSentinel",
    prId: 1726,
    title:
      "fix(health-events-analyzer): skip XID events with nil GeneratedTimestamp instead of panicking",
    summary:
      "An XID health event without a timestamp panicked the analyzer, and with no checkpointing or recover() on the path one event meant a permanent crash loop. It now skips the event with a warning log.",
    url: "https://github.com/NVIDIA/NVSentinel/pull/1726",
  },
];

interface OpenSourcePr {
  id: number;
  title: string;
  mergedAt?: string;
  url?: string;
}

interface OpenSourceRepo {
  repo: string;
  fullName: string;
  url: string;
  stars: number;
  prs: OpenSourcePr[];
}

function formatMergedAt(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function OpenSourceSection() {
  const [showAll, setShowAll] = useState(false);

  const manualLogos = useMemo(() => {
    const logos: Record<string, string> = {};
    for (const repo of DATA.openSource) {
      logos[repo.fullName] = repo.logoUrl;
    }
    return logos;
  }, []);

  const repositories: OpenSourceRepo[] = useMemo(() => {
    const fromGitHub = githubStats.openSource;
    if (Array.isArray(fromGitHub) && fromGitHub.length > 0) {
      return fromGitHub as OpenSourceRepo[];
    }

    // Fallback to the hand-maintained list when the snapshot has no data yet.
    return DATA.openSource
      .map((repo) => ({
        repo: repo.repo,
        fullName: repo.fullName,
        url: repo.url,
        stars: 0,
        prs: repo.prs.filter((pr) => pr.merged),
      }))
      .filter((repo) => repo.prs.length > 0);
  }, []);

  const totalMerged = repositories.reduce(
    (sum, repository) => sum + repository.prs.length,
    0,
  );

  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <BlurFade inView>
          <h2 className="text-xl font-bold tracking-tight">Open Source</h2>
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <p className="text-sm text-muted-foreground">
            Merged patches I&apos;ve shipped to projects I don&apos;t own, synced
            from the GitHub API.{" "}
            <span className="text-foreground font-medium">{totalMerged} merged</span>{" "}
            PRs across{" "}
            <span className="text-foreground font-medium">
              {repositories.length} repos
            </span>
            .
          </p>
        </BlurFade>
      </div>
      <div className="flex flex-col gap-3">
        {FEATURED.map((contribution, index) => (
          <BlurFade key={contribution.url} inView delay={index * 0.06}>
            <div className="group rounded-xl border border-border/70 bg-card/40 p-4 md:p-5 transition-colors hover:border-primary/40 hover:bg-card/60">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a
                  href={contribution.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold leading-tight hover:text-primary transition-colors break-words"
                >
                  {contribution.fullName}
                </a>
                <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary tabular-nums">
                  <GitMerge className="size-3" aria-hidden />
                  Merged
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  #{contribution.prId}
                </span>
              </div>
              <a
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-medium text-foreground/90 transition-colors hover:text-primary break-words"
              >
                {contribution.title}
              </a>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-words">
                {contribution.summary}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>

      <BlurFade inView delay={0.1}>
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          aria-controls="open-source-full-list"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 px-4 text-sm font-medium text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          {showAll ? "Show less" : "Show all contributions"}
        </button>
      </BlurFade>

      {showAll && (
      <div id="open-source-full-list" className="flex flex-col gap-4">
        {repositories.map((repo, index) => {
          const logo =
            manualLogos[repo.fullName] ??
            `https://github.com/${repo.fullName.split("/")[0]}.png?size=80`;
          return (
            <BlurFade key={repo.fullName} inView delay={index * 0.06}>
              <div className="group rounded-xl border border-border/70 bg-card/40 p-4 md:p-5 transition-colors hover:border-primary/40 hover:bg-card/60">
                <div className="flex items-center gap-x-3">
                  <img
                    src={logo}
                    alt={repo.repo}
                    loading="lazy"
                    className="size-9 p-1 border rounded-lg ring-1 ring-border object-contain bg-background/60"
                  />
                  <div className="flex-1 min-w-0">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold leading-tight hover:text-primary transition-colors break-words block w-fit max-w-full"
                    >
                      {repo.fullName}
                    </a>
                    <p className="text-xs text-muted-foreground">Open Source</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground flex-none">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 tabular-nums">
                        <Star className="size-3.5" aria-hidden />
                        {repo.stars >= 1000
                          ? `${(repo.stars / 1000).toFixed(1)}k`
                          : repo.stars}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <GitMerge className="size-3.5 text-primary" aria-hidden />
                      {repo.prs.length} merged
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {repo.prs.map((pr) => (
                    <li key={pr.id} className="flex flex-wrap items-start gap-2 text-sm min-w-0">
                      <GitMerge className="size-3.5 flex-none text-primary mt-1" aria-hidden />
                      <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary tabular-nums flex-none">
                        Merged
                      </span>
                      <a
                        href={pr.url ?? `https://github.com/${repo.fullName}/pull/${pr.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors break-words min-w-0 hover:underline underline-offset-4"
                      >
                        {pr.title}
                      </a>
                      <span className="ml-auto text-xs text-muted-foreground tabular-nums flex-none">
                        {formatMergedAt(pr.mergedAt) ?? `#${pr.id}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          );
        })}
      </div>
      )}
    </div>
  );
}