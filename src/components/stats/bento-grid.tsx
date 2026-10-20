/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import snapshotJson from "@/data/github-stats.json";
import { FileText, Sparkles } from "lucide-react";

interface GithubSnapshot {
  username: string;
  displayName: string;
}

const snapshot = snapshotJson as GithubSnapshot;

const tileBase =
  "group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_-8px] hover:shadow-primary/30";

function EvidenceTile() {
  const items = [
    {
      label: "Gatewise",
      caption: "typed decision layer for agent actions",
      href: "https://github.com/ApexYash11/Gatewise",
    },
    {
      label: "ClaimWise",
      caption: "policy analysis + RAG chat, live demo",
      href: "https://claimwise-fht9.vercel.app/",
    },
    {
      label: "cognee #4290",
      caption: "merged — idempotent skills ingest + delete API",
      href: "https://github.com/topoteretes/cognee/pull/4290",
    },
    {
      label: "NVSentinel #1726",
      caption: "merged — fixed nil-timestamp XID crash",
      href: "https://github.com/NVIDIA/NVSentinel/pull/1726",
    },
  ];

  return (
    <div className={cn(tileBase, "col-span-2 row-span-2 gap-2.5")}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />
      <div className="relative flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Shipped &amp; merged</p>
        <a
          href={`https://github.com/${snapshot.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <img
            src={`https://github.com/${snapshot.username}.png`}
            alt=""
            className="size-5 rounded-full ring-1 ring-border object-cover"
          />
          @{snapshot.username}
        </a>
      </div>
      <ul className="relative flex flex-col gap-2 mt-0.5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/item flex flex-col gap-0.5 rounded-lg border border-border/50 bg-background/40 px-3 py-2 transition-colors hover:border-primary/40 hover:bg-card"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                {item.label}
                <span className="text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100">
                  ↗
                </span>
              </span>
              <span className="text-[11px] leading-snug text-muted-foreground">
                {item.caption}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
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
      <EvidenceTile />
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
