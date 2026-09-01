"use client";

import { useCustomCursor } from "@/hooks/useCustomCursor";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const { position, isHovering, cursorText } = useCustomCursor();

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Refined cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 35,
          mass: 0.2,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ivory ring-1 ring-gold-subtle/30" />
      </motion.div>

      {/* Elegant cursor ring with text */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-difference"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: position.x - 45,
              y: position.y - 45,
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 30,
            }}
          >
            <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gold-subtle/60 bg-obsidian/95 backdrop-blur-md">
              <span className="text-[9px] font-light uppercase tracking-[0.35em] text-gold-subtle">
                {cursorText}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
