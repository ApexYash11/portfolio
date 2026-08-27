"use client";

import { getGithubStatTiles } from "@/lib/github-stats-view.mjs";
import snapshot from "@/data/github-stats.json";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const snapshotDate = new Date(snapshot.generatedAt).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function GithubStatsCard() {
  const statTiles = getGithubStatTiles(snapshot);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

      <div className="relative p-5 sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image
              src={`https://github.com/${snapshot.username}.png`}
              alt={snapshot.displayName}
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full bg-muted ring-2 ring-border"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">
                {snapshot.displayName}
              </p>
              <a
                href={`https://github.com/${snapshot.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                @{snapshot.username}
                <ExternalLink className="size-3" />
              </a>
            </div>
            <div className="flex-1" />
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              <p>Member since {snapshot.memberSince}</p>
              <time dateTime={snapshot.generatedAt}>Updated {snapshotDate}</time>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {statTiles.map((stat) => (
              <StatBox key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>

          {snapshot.languages.length > 0 && (
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Top languages across public repositories
              </p>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div
                  className="flex h-5 w-full overflow-hidden rounded"
                  aria-label="Language usage"
                >
                  {snapshot.languages.map((language) => (
                    <div
                      key={language.name}
                      style={{
                        width: `${language.percentage}%`,
                        backgroundColor: language.color,
                      }}
                      title={`${language.name}: ${language.percentage}%`}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {snapshot.languages.map((language) => (
                    <span
                      key={language.name}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: language.color }}
                      />
                      <span className="truncate">{language.name}</span>
                      <span className="ml-auto text-foreground/65">
                        {language.percentage}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-lg border border-border bg-muted/40 p-2">
            <Image
              src={`https://ghchart.rshah.org/6366f1/${snapshot.username}`}
              alt={`${snapshot.displayName}'s GitHub contribution graph`}
              width={700}
              height={110}
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/40 p-4 text-center">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-2xl font-bold text-foreground">
        {value.toLocaleString("en-US")}
      </span>
    </div>
  );
}
