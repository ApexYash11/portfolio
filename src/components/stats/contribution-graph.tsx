"use client";

import { cn } from "@/lib/utils";
import snapshotJson from "@/data/github-stats.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

function levelForCount(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

const LEVEL_CLASSES = [
  "bg-[#ebedf0]",
  "bg-[#c6e48d]",
  "bg-[#7bc96f]",
  "bg-[#239a3b]",
  "bg-[#196127]",
];

export default function ContributionGraph({
  className,
  cellSize = 8,
}: {
  className?: string;
  cellSize?: number;
}) {
  const snapshot = snapshotJson as unknown as {
    username: string;
    contributions: {
      totalContributions: number;
      weeks: {
        week: string;
        days: { date: string; count: number }[];
      }[];
    };
  };

  const weeks = snapshot.contributions?.weeks ?? [];
  const total = snapshot.contributions?.totalContributions ?? 0;

  const allDays: ContributionDay[] = weeks.flatMap((w) =>
    w.days.map((d) => ({ ...d, level: levelForCount(d.count) }))
  );

  const latestDay = allDays[allDays.length - 1];
  const latestDate = latestDay
    ? new Date(latestDay.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "—";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section
      className={cn("flex flex-col gap-2 p-4", className)}
      aria-label="GitHub contribution graph"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">GitHub contributions</h3>
        <span className="text-[10px] text-muted-foreground">
          {total.toLocaleString()} in last year
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-end gap-0.5 h-20 text-[10px] text-muted-foreground">
          {dayNames.map((name) => (
            <span key={name} className="w-2 text-center">
              {name}
            </span>
          ))}
        </div>
        <div className="relative overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={week.week} className="flex gap-0.5">
              {week.days.map((d, di) => {
                const count = d.count;
                const level = levelForCount(count);
                const date = new Date(d.date);
                return (
                  <div
                    key={d.date}
                    className={cn(
                      "rounded transition-all duration-100 group-hover:scale-110",
                      cellSize
                        ? `w-[${cellSize}px] h-[${cellSize}px]`
                        : "size-2 rounded",
                      LEVEL_CLASSES[level],
                    )}
                    title={`${d.date}: ${count} contribution${count === 1 ? "" : "s"}`}
                  />
                );
              })}
            </div>
          ))}
          <div className="absolute inset-0 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="text-[10px] text-muted-foreground">
          Last updated: {latestDate}
        </span>
        <a
          href={`https://github.com/${snapshot.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
        >
          View profile
        </a>
      </div>
    </section>
  );
}
