/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import snapshotJson from "@/data/github-stats.json";
import { FileText } from "lucide-react";
import ContributionGraph from "./contribution-graph";

interface GithubSnapshot {
  username: string;
  displayName: string;
  publicRepositoryCount: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  mergedPullRequestCount: number;
  contributions: {
    totalContributions: number;
  };
}

const snapshot = snapshotJson as GithubSnapshot;

const tileBase =
  "group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_-8px] hover:shadow-primary/30";

function StatCard({
  value,
  label,
  icon,
  iconColor,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  iconColor: string;
}) {
  return (
    <div
      className={cn(
        tileBase,
        "flex flex-col gap-2 items-start justify-between p-5"
      )}
    >
      <div className="flex items-center gap-2">
        <span className={`size-5 rounded p-1.5 ${iconColor}`}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-fr">
      <StatCard
        value={snapshot.contributions.totalContributions.toLocaleString()}
        label="contributions last year"
        icon={<FileText className="size-4" />}
        iconColor="bg-primary/10 text-primary"
      />
      <StatCard
        value={snapshot.mergedPullRequestCount.toLocaleString()}
        label="pull requests merged"
        icon={<Icons.github className="size-4" />}
        iconColor="bg-green/10 text-green"
      />
      <StatCard
        value={snapshot.publicRepositoryCount.toLocaleString()}
        label="repositories"
        icon={<Icons.github className="size-4" />}
        iconColor="bg-muted/50 text-muted-foreground"
      />
      <ContributionGraph
        className="col-span-1 row-span-2 md:col-span-1 md:row-span-2"
        cellSize={8}
      />
    </div>
  );
}
