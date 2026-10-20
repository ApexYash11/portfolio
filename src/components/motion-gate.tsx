"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for the reveal animations.
 *
 * Server HTML renders reveal elements at opacity 0 (motion's initial state).
 * If hydration never happens — JS disabled, delayed or failing — that content
 * would stay invisible. An inline head script arms a timer that forces the
 * content visible again; this component cancels that timer once React mounts,
 * so a normal load never sees the fallback.
 */
export default function MotionGate() {
  useEffect(() => {
    const w = window as Window & { __motionFallback?: number };
    if (w.__motionFallback) {
      window.clearTimeout(w.__motionFallback);
      w.__motionFallback = undefined;
    }
    document.documentElement.setAttribute("data-motion-ready", "");
  }, []);

  return null;
}
