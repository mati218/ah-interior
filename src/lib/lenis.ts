"use client";

import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId: number | null = null;

export function initLenis() {
  if (typeof window === "undefined") return null;

  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    infinite: false,
    lerp: 0.08,
    syncTouch: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  return lenis;
}

export function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}
