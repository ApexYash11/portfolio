"use client";

import { motion } from "motion/react";
import { useRef, useState, type ComponentType } from "react";
import { DATA } from "@/data/resume";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SocialKey = keyof typeof DATA.contact.social;

const socials: { key: SocialKey; label: string; subtitle: string }[] = [
  { key: "GitHub", label: "GitHub", subtitle: "120+ repositories" },
  { key: "LinkedIn", label: "LinkedIn", subtitle: "Open to opportunities" },
  { key: "X", label: "X / Twitter", subtitle: "Daily tech insights" },
  { key: "email", label: "Email", subtitle: "Get in touch" },
];

const roles = ["AI/ML Engineer", "Open Source Builder", "Building Wealthify"];

export default function SocialNetworkCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight({ x: 50, y: 50 })}
      className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        animate={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary) / 0.1) 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <h3 className="text-lg font-semibold mb-4 relative z-10">Developer Ecosystem</h3>

      <div className="relative" style={{ height: 260 }}>
        <SoftBeams />

        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 20 }}>
          <div className="relative flex flex-col items-center gap-5">
            <TerminalCore />
            <RoleLabels />
          </div>
        </div>

        {socials.map((social, i) => {
          const entry = DATA.contact.social[social.key];
          if (!entry) return null;
          return (
            <SocialNode
              key={social.key}
              entry={entry}
              label={social.label}
              subtitle={social.subtitle}
              position={i}
              isGitHub={social.key === "GitHub"}
            />
          );
        })}
      </div>
    </div>
  );
}

function TerminalCore() {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg"
          style={{ boxShadow: "0 0 40px -8px hsl(var(--primary) / 0.2)" }}
        >
          <div className="flex items-baseline gap-0.5">
            <span className="text-base font-bold text-primary font-mono">&gt;</span>
            <motion.span
              className="text-base font-bold text-primary font-mono"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], ease: "linear" }}
            >
              _
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="absolute -inset-3 rounded-3xl border border-primary/15"
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-6 rounded-[2rem] border border-primary/8"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.06, 0.2] }}
          transition={{ duration: 3.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-9 rounded-[2.5rem] border border-primary/5"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.03, 0.1] }}
          transition={{ duration: 4, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

function RoleLabels() {
  return (
    <div className="flex flex-col items-center gap-0.5 relative z-10">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          className="text-xs text-muted-foreground/80 font-medium tracking-wide"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
}

function SocialNode({
  entry,
  label,
  subtitle,
  position,
  isGitHub,
}: {
  entry: { url: string; icon: ComponentType<{ className?: string }> };
  label: string;
  subtitle: string;
  position: number;
  isGitHub: boolean;
}) {
  const IconComponent = entry.icon;

  const positions = [
    { top: "7%", left: isGitHub ? "44%" : "50%" },
    { top: "48%", left: isGitHub ? "86%" : "88%" },
    { top: "76%", left: isGitHub ? "56%" : "50%" },
    { top: "48%", left: isGitHub ? "14%" : "12%" },
  ];

  const pos = positions[position];
  const floatDelay = position * 0.25;
  const floatDir = position % 2 === 0 ? 1 : -1;

  const nodeSize = isGitHub ? "size-12" : "size-10";
  const iconSize = isGitHub ? "size-6" : "size-5";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute z-20"
          style={{ top: pos.top, left: pos.left, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + position * 0.1, type: "spring", stiffness: 200, damping: 18 }}
          whileHover={{ scale: isGitHub ? 1.2 : 1.15 }}
        >
          <motion.div
            className={`${nodeSize} rounded-xl bg-card border border-border/60 flex items-center justify-center transition-all duration-300`}
            whileHover={{
              borderColor: "hsl(var(--primary) / 0.4)",
              backgroundColor: "hsl(var(--primary) / 0.05)",
              boxShadow: isGitHub
                ? "0 0 28px -4px hsl(var(--primary) / 0.35)"
                : "0 0 20px -6px hsl(var(--primary) / 0.2)",
            }}
            animate={{ y: [0, floatDir * -2.5, 0] }}
            transition={{
              duration: 3.5 + floatDelay,
              delay: floatDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconComponent className={`${iconSize} text-muted-foreground transition-colors duration-300`} />
          </motion.div>
        </motion.a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p className="font-medium">{label}</p>
        <p className="text-[11px] text-primary-foreground/70 mt-0.5">{subtitle}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

function SoftBeams() {
  const beams = [
    { x1: "50%", y1: "29%", x2: "47%", y2: "11%" },
    { x1: "52%", y1: "36%", x2: "84%", y2: "48%" },
    { x1: "50%", y1: "55%", x2: "53%", y2: "73%" },
    { x1: "48%", y1: "36%", x2: "16%", y2: "48%" },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.18)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
        <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
        <linearGradient id="sg3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
        <linearGradient id="sg4" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
      </defs>
      {beams.map((beam, i) => (
        <motion.line
          key={i}
          x1={beam.x1}
          y1={beam.y1}
          x2={beam.x2}
          y2={beam.y2}
          stroke={`url(#sg${i + 1})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.3, 0.55, 0.3] }}
          transition={{
            pathLength: { delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" },
            opacity: { delay: 0.8 + i * 0.12, duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ filter: "blur(2px)" }}
        />
      ))}
    </svg>
  );
}
