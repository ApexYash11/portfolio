/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { GitMerge, GitPullRequestArrow } from "lucide-react";

const PREVIEW_COUNT = 4;

export default function OpenSourceSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  type OsRepo = (typeof DATA.openSource)[number];
type OsPr = OsRepo["prs"][number];

const repos: OsRepo[] = [...DATA.openSource];
  const totalPrs = repos.reduce((sum, r) => sum + r.prs.length, 0);
  const totalMerged = repos.reduce(
    (sum, r) => sum + r.prs.filter((p) => p.merged).length,
    0
  );

  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <BlurFade inView>
          <h2 className="text-xl font-bold tracking-tight">Open Source</h2>
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <p className="text-sm text-muted-foreground">
            Patches I&apos;ve shipped to projects I don&apos;t own.{" "}
            <span className="text-foreground font-medium">{totalMerged} merged</span>{" "}
            of <span className="text-foreground font-medium">{totalPrs}</span> across{" "}
            <span className="text-foreground font-medium">{repos.length} repos</span>.
          </p>
        </BlurFade>
      </div>
      <div className="flex flex-col gap-4">
        {repos.map((repo, index) => {
          const isOpen = expanded === repo.repo;
          const visiblePrs = isOpen ? repo.prs : repo.prs.slice(0, PREVIEW_COUNT);
          const mergedCount = repo.prs.filter((p) => p.merged).length;
          return (
            <BlurFade key={repo.repo} inView delay={index * 0.06}>
              <div className="group rounded-xl border border-border/70 bg-card/40 p-4 md:p-5 transition-colors hover:border-primary/40 hover:bg-card/60">
                <div className="flex items-center gap-x-3">
                  <img
                    src={repo.logoUrl}
                    alt={repo.repo}
                    className="size-9 p-1 border rounded-lg ring-1 ring-border object-contain bg-background/60"
                  />
                  <div className="flex-1 min-w-0">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold leading-tight hover:text-primary transition-colors truncate block w-fit max-w-full"
                    >
                      {repo.fullName}
                    </a>
                    <p className="text-xs text-muted-foreground">Open Source</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground flex-none">
                    <GitMerge className="size-3.5 text-primary" />
                    {mergedCount}/{repo.prs.length} merged
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {visiblePrs.map((pr) => (
                    <li key={pr.id} className="flex items-center gap-2 text-sm min-w-0">
                      <GitPullRequestArrow
                        className={
                          pr.merged
                            ? "size-3.5 flex-none text-primary"
                            : "size-3.5 flex-none text-muted-foreground/60"
                        }
                      />
                      <span
                        className={
                          pr.merged
                            ? "inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary tabular-nums flex-none"
                            : "inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums flex-none"
                        }
                      >
                        {pr.merged ? "Merged" : "Closed"}
                      </span>
                      <a
                        href={`https://github.com/${repo.fullName}/pull/${pr.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors truncate hover:underline underline-offset-4"
                      >
                        {pr.title}
                      </a>
                      <span className="ml-auto text-xs text-muted-foreground/70 tabular-nums flex-none">
                        #{pr.id}
                      </span>
                    </li>
                  ))}
                </ul>
                {repo.prs.length > PREVIEW_COUNT && (
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : repo.repo)}
                    className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {isOpen
                      ? "Show less"
                      : `Show all ${repo.prs.length}`}
                  </button>
                )}
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
