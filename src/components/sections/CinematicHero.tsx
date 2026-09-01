"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

interface CinematicHeroProps {
  emptyRoomImage?: string;
  furnishedRoomImage?: string;
  finalRoomImage?: string;
}

export function CinematicHero({
  emptyRoomImage = "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2400&q=90",
  furnishedRoomImage = "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2400&q=90",
  finalRoomImage = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90",
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Scroll progress for the entire hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring physics for all transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Camera zoom - subtle forward movement
  const cameraZoom = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1, 1.02, 1.05, 1.08]);
  
  // Empty room opacity (fades out as furniture appears)
  const emptyRoomOpacity = useTransform(smoothProgress, [0, 0.15, 0.3], [1, 0.6, 0]);
  const emptyRoomScale = useTransform(smoothProgress, [0, 0.3], [1, 1.05]);
  
  // Furnished room opacity (main transformation phase)
  const furnishedRoomOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.65, 0.8], [0, 1, 1, 0]);
  const furnishedRoomScale = useTransform(smoothProgress, [0.15, 0.5], [0.98, 1]);
  
  // Final room opacity (complete design)
  const finalRoomOpacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const finalRoomScale = useTransform(smoothProgress, [0.65, 1], [0.98, 1]);

  // Lighting overlay - simulates lights turning on
  const lightingIntensity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.7], [0.7, 0.5, 0.3, 0.1]);
  
  // Ambient glow - warmth increases as room is furnished
  const ambientGlowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.3, 0.4]);
  
  // Vignette - reduces as room becomes brighter
  const vignetteIntensity = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 0.5, 0.3]);

  // Text reveal - only appears after transformation is complete
  const textY = useTransform(smoothProgress, [0.8, 0.95], [100, 0]);
  const textOpacity = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const textBlur = useTransform(smoothProgress, [0.8, 0.95], [20, 0]);

  // Stage indicators opacity
  const stage1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const stage2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.6], [0, 1, 0]);
  const stage3Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.85], [0, 1, 0]);

  // Dust particles effect
  const particleY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const particleOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.2, 0.4, 0.3, 0.1]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky container - pinned during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        
        {/* Main scene container with camera zoom */}
        <motion.div 
          style={{ scale: cameraZoom }}
          className="absolute inset-0"
        >
          {/* Layer 1: Empty Room - Initial state */}
          <motion.div
            style={{ 
              opacity: emptyRoomOpacity,
              scale: emptyRoomScale,
            }}
            className="absolute inset-0"
          >
            <Image
              src={emptyRoomImage}
              alt="Empty luxury architectural space"
              fill
              priority
              quality={95}
              className="object-cover"
            />
            {/* Deep atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian/70" />
          </motion.div>

          {/* Layer 2: Furnished Room - Transformation phase */}
          <motion.div
            style={{ 
              opacity: furnishedRoomOpacity,
              scale: furnishedRoomScale,
            }}
            className="absolute inset-0"
          >
            <Image
              src={furnishedRoomImage}
              alt="Furnished luxury interior"
              fill
              quality={95}
              className="object-cover"
            />
            {/* Lighter overlay as room becomes furnished */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian/50" />
          </motion.div>

          {/* Layer 3: Final Room - Complete design */}
          <motion.div
            style={{ 
              opacity: finalRoomOpacity,
              scale: finalRoomScale,
            }}
            className="absolute inset-0"
          >
            <Image
              src={finalRoomImage}
              alt="Complete luxury interior design"
              fill
              quality={95}
              className="object-cover"
            />
            {/* Minimal overlay for finished room */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-transparent to-obsidian/30" />
          </motion.div>

          {/* Dynamic lighting overlay - simulates lights turning on */}
          <motion.div
            style={{ opacity: lightingIntensity }}
            className="absolute inset-0 bg-obsidian pointer-events-none"
          />

          {/* Ambient warm glow - increases with furnishing */}
          <motion.div
            style={{ opacity: ambientGlowOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-gradient-to-bl from-gold/20 via-champagne/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-gradient-to-tr from-gold-subtle/15 to-transparent blur-3xl" />
          </motion.div>

          {/* Cinematic vignette - reduces as room brightens */}
          <motion.div
            style={{ opacity: vignetteIntensity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-obsidian/90" />
          </motion.div>

          {/* Subtle dust particles effect */}
          <motion.div
            style={{ 
              y: particleY,
              opacity: particleOpacity,
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-warm-white/40 blur-sm" />
            <div className="absolute left-[30%] top-[40%] h-1 w-1 rounded-full bg-warm-white/30 blur-sm" />
            <div className="absolute left-[60%] top-[25%] h-0.5 w-0.5 rounded-full bg-warm-white/50 blur-sm" />
            <div className="absolute left-[80%] top-[60%] h-1 w-1 rounded-full bg-warm-white/35 blur-sm" />
            <div className="absolute left-[20%] top-[70%] h-0.5 w-0.5 rounded-full bg-warm-white/40 blur-sm" />
            <div className="absolute left-[70%] top-[80%] h-1 w-1 rounded-full bg-warm-white/45 blur-sm" />
          </motion.div>

          {/* Subtle film grain texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
            <div className="h-full w-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
            }} />
          </div>
        </motion.div>

        {/* Minimal stage indicators - left side */}
        <div className="absolute left-8 top-1/2 z-20 -translate-y-1/2 lg:left-12">
          <div className="flex flex-col gap-8">
            {/* Stage 1: Empty */}
            <motion.div 
              style={{ opacity: stage1Opacity }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-gradient-to-r from-gold-subtle to-transparent" />
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-champagne/90">
                Empty Space
              </span>
            </motion.div>

            {/* Stage 2: Furnishing */}
            <motion.div 
              style={{ opacity: stage2Opacity }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-gold">
                Transformation
              </span>
            </motion.div>

            {/* Stage 3: Complete */}
            <motion.div 
              style={{ opacity: stage3Opacity }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-gradient-to-r from-gold-subtle to-transparent" />
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-champagne/90">
                Complete Design
              </span>
            </motion.div>
          </div>
        </div>

        {/* Final reveal text - appears only at the end */}
        <motion.div
          style={{ 
            y: textY,
            opacity: textOpacity,
            filter: textBlur.get() > 0 ? `blur(${textBlur.get()}px)` : "none",
          }}
          className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 text-center lg:bottom-32"
        >
          {/* Elegant divider line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            style={{ opacity: textOpacity }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="mx-auto mb-8 h-px w-20 origin-center bg-gradient-to-r from-transparent via-gold-subtle to-transparent"
          />

          {/* Refined typography - much smaller than before */}
          <h1 className="font-display text-4xl font-normal leading-tight tracking-tight text-ivory lg:text-5xl xl:text-6xl">
            Spaces Beyond
            <br />
            <span className="text-gradient-gold">Expectation.</span>
          </h1>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            style={{ opacity: textOpacity }}
            transition={{ delay: 1 }}
            className="mt-6 font-sans text-xs font-light uppercase tracking-[0.35em] text-stone"
          >
            Luxury Interior Architecture
          </motion.p>
        </motion.div>

        {/* Scroll indicator - only visible initially */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-sans text-[8px] font-light uppercase tracking-[0.4em] text-taupe-light/50">
              Scroll to Transform
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-gold-subtle/40 via-gold-subtle/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
