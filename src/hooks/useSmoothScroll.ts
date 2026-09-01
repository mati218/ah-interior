"use client";

import { useEffect } from "react";
import { destroyLenis, initLenis } from "@/lib/lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = initLenis();

    return () => {
      lenis?.destroy();
      destroyLenis();
    };
  }, []);
}
