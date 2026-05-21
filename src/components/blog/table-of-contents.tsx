"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TocItem } from "@/lib/article-markdown";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

function getIndentClass(level: number) {
  if (level === 3) return "pl-4";
  if (level === 4) return "pl-8";
  if (level >= 5) return "pl-10";
  return "";
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (itemIds.length === 0) {
      return;
    }

    const headingElements = itemIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headingElements.length === 0) {
      return;
    }

    const activationLine = 140;
    let frameId = 0;

    const updateActiveHeading = () => {
      const headingsInView = headingElements.filter(
        (element) => element.getBoundingClientRect().top <= activationLine
      );

      const nextActiveHeading = headingsInView.at(-1) ?? headingElements[0];

      if (nextActiveHeading?.id) {
        setActiveId(nextActiveHeading.id);
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [itemIds]);

  useEffect(() => {
    const activeElement = itemRefs.current[activeId];

    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeId]);

  return (
    <nav aria-label="Table of contents" className={className}>
      <ol className="space-y-2 text-sm leading-6">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={`${item.id}-${item.level}`} className={getIndentClass(item.level)}>
              <a
                ref={(node) => {
                  itemRefs.current[item.id] = node;
                }}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "block rounded-md border-l-2 pl-3 transition-colors",
                  isActive
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                ].join(" ")}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}