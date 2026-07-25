"use client";

import { motionTokens } from "@/lib/motion";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  suffix = "",
  format = (current) => current.toLocaleString(),
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-32px" });
  const reduced = Boolean(useReducedMotion());
  const raw = useMotionValue(reduced ? value : 0);
  const spring = useSpring(raw, motionTokens.transitions.gentle);
  const display = useTransform(
    reduced ? raw : spring,
    (current) => `${format(Math.round(current))}${suffix}`
  );

  useEffect(() => {
    if (reduced || inView) raw.set(value);
  }, [inView, raw, reduced, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
