"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import { DATA } from "@/data/resume";

type SocialKey = keyof typeof DATA.contact.social;

interface NodeConfig {
  key: SocialKey;
  label: string;
  ring: "inner" | "outer";
  angle: number;
  accentColor: string;
}

const nodes: NodeConfig[] = [
  { key: "GitHub", label: "GitHub", ring: "inner", angle: 45, accentColor: "#22C55E" },
  { key: "email", label: "Email", ring: "inner", angle: 225, accentColor: "#A855F7" },
  { key: "LinkedIn", label: "LinkedIn", ring: "outer", angle: 135, accentColor: "#0EA5E9" },
  { key: "X", label: "X / Twitter", ring: "outer", angle: 315, accentColor: "#1DA1F2" },
];

const INNER_RADIUS = 80;
const OUTER_RADIUS = 130;
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
    <div className="relative rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold mb-4 relative z-10">Developer Ecosystem</h3>

      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center"
        style={{ height: 300 }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${stage.width || 400} 300`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={stage.cx || 200}
            cy={150}
            r={INNER_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <circle
            cx={stage.cx || 200}
            cy={150}
            r={OUTER_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>

        <TerminalCore />

        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            animation: "orbit-ccw 8s linear infinite",
            transformOrigin: "center center",
          }}
        >
          {nodes.filter((n) => n.ring === "inner").map((node) => {
            const entry = DATA.contact.social[node.key];
            if (!entry) return null;
            return (
              <div
                key={node.key}
                className="absolute"
                style={{
                  left: -NODE_SIZE / 2,
                  top: -NODE_SIZE / 2,
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  transform: `rotate(${node.angle}deg) translateX(${INNER_RADIUS}px) rotate(${-node.angle}deg)`,
                }}
              >
                <OrbitalNode
                  entry={entry}
                  label={node.label}
                  accentColor={node.accentColor}
                  ring="inner"
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            animation: "orbit-cw 12s linear infinite",
            transformOrigin: "center center",
          }}
        >
          {nodes.filter((n) => n.ring === "outer").map((node) => {
            const entry = DATA.contact.social[node.key];
            if (!entry) return null;
            return (
              <div
                key={node.key}
                className="absolute"
                style={{
                  left: -NODE_SIZE / 2,
                  top: -NODE_SIZE / 2,
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  transform: `rotate(${node.angle}deg) translateX(${OUTER_RADIUS}px) rotate(${-node.angle}deg)`,
                }}
              >
                <OrbitalNode
                  entry={entry}
                  label={node.label}
                  accentColor={node.accentColor}
                  ring="outer"
                />
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes orbit-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes orbit-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counter-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counter-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

function TerminalCore() {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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
  accentColor,
  ring,
}: {
  entry: { url: string; icon: ComponentType<{ className?: string }> };
  label: string;
  accentColor: string;
  ring: "inner" | "outer";
}) {
  const IconComponent = entry.icon;
  const counterAnim =
    ring === "inner" ? "counter-ccw 8s linear infinite" : "counter-cw 12s linear infinite";

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex flex-col items-center group"
      style={{ animation: counterAnim }}
    >
      <div
        className="rounded-full bg-card border border-border/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.3)]"
        style={{
          width: NODE_SIZE,
          height: NODE_SIZE,
          boxShadow: `0 0 0 1.5px ${accentColor}`,
        }}
      >
        <IconComponent className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
      </div>
      <span
        className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-[10px] text-muted-foreground/0 text-center whitespace-nowrap transition-all duration-300 group-hover:text-muted-foreground/80"
      >
        {label}
      </span>
    </a>
  );
}
