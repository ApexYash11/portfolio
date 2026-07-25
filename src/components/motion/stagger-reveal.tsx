"use client";

import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { createContext, useContext, useRef } from "react";

type StaggerSpeed = keyof typeof motionTokens.stagger;

interface StaggerContextValue {
  reduced: boolean;
}

const StaggerContext = createContext<StaggerContextValue>({ reduced: false });

interface StaggerRevealProps extends HTMLMotionProps<"div"> {
  speed?: StaggerSpeed;
  margin?: string;
}

export function StaggerReveal({
  children,
  className,
  speed = "base",
  margin = "-64px",
  ...props
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });
  const reduced = Boolean(useReducedMotion());

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0 }
        : {
            delayChildren: motionTokens.stagger.tight,
            staggerChildren: motionTokens.stagger[speed],
          },
    },
  };

  return (
    <StaggerContext.Provider value={{ reduced }}>
      <motion.div
        ref={ref}
        initial={reduced ? false : "hidden"}
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  y?: number;
  blur?: number;
}

export function StaggerItem({
  children,
  className,
  y = motionTokens.travel.enter,
  blur = 8,
  ...props
}: StaggerItemProps) {
  const { reduced } = useContext(StaggerContext);
  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduced
        ? { duration: 0.01 }
        : motionTokens.transitions.gentle,
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
