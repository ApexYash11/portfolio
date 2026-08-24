/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { GitPullRequestArrow, GitMerge } from "lucide-react";

type OsEntry = (typeof DATA.work)[number];

function extractPrs(entry: OsEntry) {
  const matches = [...entry.description.matchAll(/\(#(\d+(?:,\s*#\d+)*)\)/g)];
  const prs: { id: string; repo: string }[] = [];
  for (const match of matches) {
    for (const raw of match[1].split(",")) {
      const num = raw.replace(/#\s*/g, "").trim();
      if (num) prs.push({ id: num, repo: entry.company });
    }
  }
  return prs;
}

export default function OpenSourceSection() {
  const osEntries = DATA.work.filter((w) => w.title === "Open Source Contributor");
  if (osEntries.length === 0) return null;

  const totalPrs = osEntries.reduce(
    (sum, entry) => sum + Math.max(extractPrs(entry).length, 1),
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
            <span className="text-foreground font-medium">{totalPrs} merged</span> across{" "}
            <span className="text-foreground font-medium">{osEntries.length} repos</span>.
          </p>
        </BlurFade>
      </div>
      <div className="flex flex-col gap-4">
        {osEntries.map((entry, index) => {
          const prs = extractPrs(entry);
          const summary = entry.description
            .split("•")
            .map((p) => p.trim())
            .filter((p) => p && !/\(#\d+(?:,\s*#\d+)*\)$/.test(p))
            .slice(0, 3);
          return (
            <BlurFade key={entry.company} inView delay={index * 0.06}>
              <div className="group rounded-xl border border-border/70 bg-card/40 p-4 md:p-5 transition-colors hover:border-primary/40 hover:bg-card/60">
                <div className="flex items-center gap-x-3">
                  {entry.logoUrl ? (
                    <img
                      src={entry.logoUrl}
                      alt={entry.company}
                      className="size-9 p-1 border rounded-lg ring-1 ring-border object-contain bg-background/60"
                    />
                  ) : (
                    <div className="size-9 border rounded-lg ring-1 ring-border bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold leading-tight hover:text-primary transition-colors truncate block w-fit max-w-full"
                    >
                      {entry.company}
                    </a>
                    <p className="text-xs text-muted-foreground">Open Source</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground flex-none">
                    <GitMerge className="size-3.5 text-primary" />
                    {Math.max(prs.length, 1)} merged
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {(prs.length > 0 ? prs : [{ id: "", repo: "" }]).slice(0, 4).map((pr, i) => (
                    <li key={`${entry.company}-pr-${i}`} className="flex items-center gap-2 text-sm min-w-0">
                      <GitPullRequestArrow className="size-3.5 flex-none text-primary" />
                      <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary tabular-nums">
                        Merged
                      </span>
                      {summary[i] ? (
                        <span className="text-muted-foreground truncate">{summary[i]}</span>
                      ) : (
                        <span className="text-muted-foreground truncate">
                          {entry.title} contribution
                        </span>
                      )}
                      {pr.id && (
                        <span className="ml-auto text-xs text-muted-foreground/70 tabular-nums flex-none">
                          #{pr.id}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
