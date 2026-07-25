"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
  active?: boolean;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  reduced: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const reduced = Boolean(useReducedMotion());

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, reduced }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduced ? { duration: 0.01 } : motionTokens.transitions.gentle}
        className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children, active = false }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, reduced } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      reduced
        ? [BASE_SIZE, BASE_SIZE, BASE_SIZE]
        : [BASE_SIZE, magnification, BASE_SIZE]
    ),
    motionTokens.transitions.ui
  );
  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      reduced
        ? [BASE_ICON_SIZE, BASE_ICON_SIZE, BASE_ICON_SIZE]
        : [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]
    ),
    motionTokens.transitions.ui
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
      {active && (
        <motion.span
          layoutId="dock-active-route"
          className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-foreground"
          transition={reduced ? { duration: 0.01 } : motionTokens.transitions.snap}
        />
      )}
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
