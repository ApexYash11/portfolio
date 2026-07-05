/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt, aspectRatio = "16 / 9" }: { src: string; alt: string; aspectRatio?: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className="flex w-full items-center justify-center bg-linear-to-br from-muted/80 via-muted to-muted/60 px-6 text-center"
        style={{ aspectRatio }}
      >
        <div className="space-y-2">
          <div className="text-sm font-semibold tracking-wide text-foreground/90">No preview available</div>
          <div className="text-xs text-muted-foreground">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  mediaAspectRatio?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  mediaAspectRatio,
  links,
  className,
}: Props) {
  const openHref = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    if (!href || href === "#") return;
    // If the click originates from an anchor inside the card, let that anchor handle it
    const target = (e as React.MouseEvent | undefined)?.target as HTMLElement | undefined;
    if (target && typeof target.closest === "function" && target.closest("a")) return;
    // open in new tab
    window.open(href, "_blank", "noopener,noreferrer");
  }, [href]);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openHref}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openHref(e);
      }}
      className={cn(
        "flex flex-col h-full min-h-0 border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={(e) => {
            // prevent outer onClick from firing when clicking the link directly
            e.stopPropagation();
          }}
        >
          {video ? (
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: mediaAspectRatio || "16 / 9" }}>
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
className="absolute inset-0 h-full w-full object-contain object-center"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ) : image ? (
            <div className="relative w-full">
              <ProjectImage src={image} alt={title} aspectRatio={mediaAspectRatio || "16 / 9"} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ) : (
            <div className="relative w-full">
              <ProjectImage src="" alt={title} aspectRatio={mediaAspectRatio || "16 / 9"} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1 min-h-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-1 font-semibold text-base md:text-lg">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-sm flex-1 min-h-0 prose max-w-full text-foreground/90 dark:prose-invert leading-relaxed break-words line-clamp-3">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
