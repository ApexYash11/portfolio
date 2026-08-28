/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import snapshotJson from "@/data/github-stats.json";
import { FileText, Sparkles } from "lucide-react";

interface GithubSnapshot {
  username: string;
  displayName: string;
  followers?: number;
  totalStars: number;
  contributions?: {
    totalContributions: number;
    totalPullRequests?: number;
    totalIssues?: number;
    weeks: { days: { date: string; count: number }[] }[];
  } | null;
  languages: { name: string; percentage: number; color: string }[];
}

const snapshot = snapshotJson as GithubSnapshot;

const tileBase =
  "group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_-8px] hover:shadow-primary/30";

function heatmapLevel(count: number) {
  if (count <= 0) return "bg-foreground/[0.06]";
  if (count <= 2) return "bg-primary/30";
  if (count <= 5) return "bg-primary/55";
  if (count <= 9) return "bg-primary/80";
  return "bg-primary";
}

function Heatmap({
  contributions,
}: {
  contributions: NonNullable<GithubSnapshot["contributions"]>;
}) {
  const weeks = contributions.weeks.slice(-40);
  return (
    <div className="flex-1 min-h-0 flex items-center">
      <div
        className="grid grid-flow-col grid-rows-7 gap-[2px] w-full"
        aria-label={`Contribution heatmap, ${contributions.totalContributions} contributions in the last year`}
      >
        {weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              title={`${day.count} contributions on ${day.date}`}
              className={cn("aspect-square rounded-[2px]", heatmapLevel(day.count))}
            />
          )),
        )}
      </div>
    </div>
  );
}

function StatDot({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </span>
  );
}

function GithubTile() {
  const { contributions } = snapshot;

  return (
    <a
      href={`https://github.com/${snapshot.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(tileBase, "col-span-2 row-span-2 gap-3")}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />
      <div className="relative flex items-center gap-3">
        <img
          src={`https://github.com/${snapshot.username}.png`}
          alt={snapshot.displayName}
          className="size-10 rounded-full ring-2 ring-border object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight truncate">
            {snapshot.displayName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            @{snapshot.username}
          </p>
        </div>
      </div>

      {contributions && <Heatmap contributions={contributions} />}

      <div className="relative grid grid-cols-2 gap-x-3 gap-y-1.5">
        <StatDot color="#f87171" label="Stars" value={snapshot.totalStars} />
        <StatDot color="#c084fc" label="Followers" value={snapshot.followers ?? 0} />
        {contributions && (
          <>
            <StatDot
              color="#60a5fa"
              label="PRs"
              value={contributions.totalPullRequests ?? 0}
            />
            <StatDot
              color="#e5e7eb"
              label="Issues"
              value={contributions.totalIssues ?? 0}
            />
          </>
        )}
      </div>

      {snapshot.languages.length > 0 && (
        <div className="relative flex h-1.5 w-full overflow-hidden rounded-full">
          {snapshot.languages.slice(0, 6).map((language) => (
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
      )}
    </a>
  );
}

function SocialTile({
  href,
  label,
  caption,
  icon,
}: {
  href: string;
  label: string;
  caption: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(tileBase, "items-center justify-center gap-2 text-center")}
      aria-label={label}
    >
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {icon}
      </span>
      <span className="text-xs text-muted-foreground">({caption})</span>
    </a>
  );
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-fr">
      <GithubTile />
      <SocialTile
        href={DATA.contact.social.LinkedIn.url}
        label="LinkedIn"
        caption="let's connect;"
        icon={<Icons.linkedin className="size-5" />}
      />
      <SocialTile
        href={DATA.contact.social.X.url}
        label="X"
        caption="hot takes"
        icon={<Icons.x className="size-5" />}
      />
      <div className={cn(tileBase, "items-center justify-center gap-2 text-center")}>
        <Sparkles className="size-5 text-primary" />
        <span className="text-xs text-muted-foreground">
          building agentic AI workflows
        </span>
      </div>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(tileBase, "items-center justify-center gap-2 text-center")}
      >
        <FileText className="size-5 text-primary" />
        <span className="text-xs text-muted-foreground">grab my resume</span>
      </a>
    </div>
  );
}
