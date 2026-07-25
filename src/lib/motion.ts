export const motionTokens = {
  transitions: {
    snap: { type: "spring", stiffness: 620, damping: 38, mass: 0.55 },
    ui: { type: "spring", stiffness: 305, damping: 33, mass: 0.7 },
    gentle: { type: "spring", stiffness: 110, damping: 20, mass: 0.9 },
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    relaxed: 0.14,
  },
  travel: {
    hover: 4,
    enter: 24,
    section: 48,
  },
} as const;

export const reducedMotionTransition = { duration: 0.01 } as const;
