"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import { DATA } from "@/data/resume";

type SocialKey = keyof typeof DATA.contact.social;

interface NodeConfig {
  key: SocialKey;
  label: string;
  ring: "inner" | "outer";
  angle: number;
}

const nodes: NodeConfig[] = [
  { key: "GitHub", label: "GitHub", ring: "inner", angle: 45 },
  { key: "LinkedIn", label: "LinkedIn", ring: "inner", angle: 135 },
  { key: "X", label: "X / Twitter", ring: "outer", angle: 225 },
  { key: "email", label: "Email", ring: "outer", angle: 315 },
];

const INNER_RADIUS = 90;
const OUTER_RADIUS = 140;
const NODE_SIZE = 48;

export default function DeveloperEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ cx: 0, cy: 0, width: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setStage({
        cx: rect.width / 2,
        cy: rect.height / 2,
        width: rect.width,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold mb-4 relative z-10">Developer Ecosystem</h3>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: 320 }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${stage.width || 400} 320`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={stage.cx || 200}
            cy={160}
            r={INNER_RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-border/30"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <circle
            cx={stage.cx || 200}
            cy={160}
            r={OUTER_RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-border/20"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>

        <TerminalCore cx={stage.cx} cy={160} />

        {nodes.map((node) => {
          const entry = DATA.contact.social[node.key];
          if (!entry) return null;
          return (
            <OrbitalNode
              key={node.key}
              entry={entry}
              label={node.label}
              cx={stage.cx}
              cy={160}
              radius={node.ring === "inner" ? INNER_RADIUS : OUTER_RADIUS}
              angle={node.angle}
            />
          );
        })}
      </div>
    </div>
  );
}

function TerminalCore({ cx, cy }: { cx: number; cy: number }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: cx - 28,
        top: cy - 28,
        width: 56,
        height: 56,
      }}
    >
      <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg">
        <div className="flex items-baseline gap-px">
          <span className="text-base font-bold text-primary font-mono">&gt;</span>
          <span className="text-base font-bold text-primary font-mono terminal-cursor">_</span>
        </div>
      </div>
      <style>{`
        .terminal-cursor {
          animation: blink 1s steps(2) infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function OrbitalNode({
  entry,
  label,
  cx,
  cy,
  radius,
  angle,
}: {
  entry: { url: string; icon: ComponentType<{ className?: string }> };
  label: string;
  cx: number;
  cy: number;
  radius: number;
  angle: number;
}) {
  const IconComponent = entry.icon;
  const rad = (angle * Math.PI) / 180;
  const x = cx + radius * Math.cos(rad) - NODE_SIZE / 2;
  const y = cy + radius * Math.sin(rad) - NODE_SIZE / 2;

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute group"
      style={{ left: x, top: y, width: NODE_SIZE }}
    >
      <div
        className="rounded-full bg-card border border-border/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.3)]"
        style={{ width: NODE_SIZE, height: NODE_SIZE }}
      >
        <IconComponent className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
      </div>
      <span
        className="absolute left-1/2 -translate-x-1/2 mt-1.5 text-[10px] text-muted-foreground/0 text-center whitespace-nowrap transition-all duration-300 group-hover:text-muted-foreground/80"
        style={{ top: "100%" }}
      >
        {label}
      </span>
    </a>
  );
}
