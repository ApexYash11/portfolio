"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { DATA } from "@/data/resume";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socials = [
  { key: "GitHub" as const, label: "GitHub" },
  { key: "LinkedIn" as const, label: "LinkedIn" },
  { key: "X" as const, label: "X / Twitter" },
  { key: "email" as const, label: "Email" },
];

const positions = [
  { x: 0, y: -64 },
  { x: 64, y: 0 },
  { x: 0, y: 64 },
  { x: -64, y: 0 },
];

const connectorEnds = [
  { x1: "50%", y1: "50%", x2: "50%", y2: "22%" },
  { x1: "50%", y1: "50%", x2: "78%", y2: "50%" },
  { x1: "50%", y1: "50%", x2: "50%", y2: "78%" },
  { x1: "50%", y1: "50%", x2: "22%", y2: "50%" },
];

export default function SocialNetworkCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
        }}
      />

      <h3 className="text-lg font-semibold mb-5 relative z-10">Developer Ecosystem</h3>

      <div className="relative w-full flex items-center justify-center" style={{ height: 200 }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connectorEnds.map((pos, i) => (
            <motion.line
              key={i}
              x1={pos.x1}
              y1={pos.y1}
              x2={pos.x2}
              y2={pos.y2}
              stroke="currentColor"
              className="text-border/50"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </svg>

        <CenterCore mouseX={mousePos.x} mouseY={mousePos.y} />

        {socials.map((social, i) => {
          const entry = DATA.contact.social[social.key];
          if (!entry) return null;
          const pos = positions[i];
          return (
            <SocialNode
              key={social.key}
              entry={entry}
              label={social.label}
              x={pos.x}
              y={pos.y}
              index={i}
            />
          );
        })}
      </div>
    </div>
  );
}

function CenterCore({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const rotateX = mouseY * -20;
  const rotateY = mouseX * 20;

  return (
    <motion.div
      className="relative z-10"
      style={{ perspective: 800, rotateX, rotateY }}
    >
      <motion.div
        className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg"
        style={{ boxShadow: "0 0 30px -5px hsl(var(--primary) / 0.2)" }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-lg font-bold text-primary tracking-wide">{DATA.initials}</span>
      </motion.div>
      <motion.div
        className="absolute -inset-3 rounded-3xl border border-primary/10"
        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-6 rounded-[2rem] border border-primary/5"
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.08, 0.2] }}
        transition={{ duration: 3, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function SocialNode({
  entry,
  label,
  x,
  y,
  index,
}: {
  entry: { url: string; icon: React.ComponentType<{ className?: string }> };
  label: string;
  x: number;
  y: number;
  index: number;
}) {
  const IconComponent = entry.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute"
          style={{ translateX: x, translateY: y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.15 }}
        >
          <div className="size-10 rounded-xl bg-card border border-border/60 flex items-center justify-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_-8px_hsl(var(--primary)/0.4)] hover:bg-primary/5">
            <IconComponent className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
          </div>
        </motion.a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}
