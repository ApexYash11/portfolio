"use client";

import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: motionTokens.transitions.gentle,
  },
};

export function HeroMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = Boolean(useReducedMotion());

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : motionTokens.stagger.base,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = Boolean(useReducedMotion());
  const words = text.split(" ");

  return (
    <motion.h1
      variants={{ hidden: {}, visible: {} }}
      className={cn("flex flex-wrap gap-x-[0.24em]", className)}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={
              reduced
                ? { duration: 0.01 }
                : {
                    ...motionTokens.transitions.gentle,
                    delay: index * motionTokens.stagger.tight,
                  }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export function HeroItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = Boolean(useReducedMotion());
  return (
    <motion.div
      variants={
        reduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : itemVariants
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HeroAvatar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.div
      ref={ref}
      variants={
        reduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : itemVariants
      }
      className={className}
    >
      <motion.div style={{ y: reduced ? 0 : drift }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = Boolean(useReducedMotion());
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionTokens.transitions.ui);
  const springY = useSpring(y, motionTokens.transitions.ui);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const nextY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    x.set(nextX);
    y.set(nextY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}
