"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { useRef, useEffect, useState } from "react";

const textVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 3.5,
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 120, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 3 + i * 0.4,
      duration: 2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const metaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 6,
      duration: 2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function AdvancedHero({ image }: { image: string }) {
  const ref = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -1 to 1
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      
      mouseX.set(xPct * 30); // 30px max movement
      mouseY.set(yPct * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-obsidian"
      style={{ height: "100svh" }}
    >
      {/* Advanced Cinematic Background with Mouse Parallax */}
      <motion.div
        style={{ 
          y: imageY,
          scale: imageScale,
          x,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : "none"
        }}
        className="absolute inset-[-10%]"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative h-full w-full"
        >
          <Image
            src={image}
            alt="Luxury Interior Architecture"
            fill
            priority
            quality={100}
            className="object-cover"
          />
          
          {/* AI-Generated Subtle Movement Effect */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.6, 0.65, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-obsidian/40 via-transparent to-obsidian/60"
          />
        </motion.div>
      </motion.div>

      {/* Multi-Layer Cinematic Overlay with Depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3.5,
          delay: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        {/* Layer 1: Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-black/75 to-obsidian/95" />
        
        {/* Layer 2: Radial depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-obsidian/20 to-obsidian/80" />
        
        {/* Layer 3: Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-obsidian/90" />
      </motion.div>

      {/* Ambient Gold Glow with Pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] bg-gradient-to-bl from-gold/8 via-gold-subtle/4 to-transparent blur-3xl"
      />

      {/* Content with Mouse Parallax */}
      <motion.div
        style={{ 
          y: contentY, 
          opacity,
          x: useTransform(x, (value) => value * -0.5),
        }}
        className="relative z-10 mx-auto flex max-w-[1900px] flex-col items-start px-12 lg:px-24"
      >
        {/* Elegant Eyebrow with Line Animation */}
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          className="mb-16 flex items-center gap-8 lg:mb-20"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 2, delay: 6, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-gold via-gold-subtle to-transparent"
          />
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-champagne/90 lg:text-[10px]">
            Est. 2012 — Luxury Interior Architecture
          </span>
        </motion.div>

        {/* 3D Rotating Headlines - Awwwards Style */}
        <div className="perspective-1000 mb-12 space-y-8 lg:mb-16 lg:space-y-12">
          {["SPACES", "BEYOND", "EXPECTATION."].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                custom={i}
                initial="hidden"
                animate={isMounted ? "visible" : "hidden"}
                variants={wordVariants}
                style={{
                  x: useTransform(x, (value) => value * (0.3 + i * 0.1)),
                  y: useTransform(y, (value) => value * (0.2 + i * 0.1)),
                }}
                className={`font-display text-[13vw] font-normal leading-[0.8] tracking-tighter sm:text-[12vw] lg:text-[11vw] xl:text-[200px] ${
                  i === 2 ? "text-gradient-gold" : "text-ivory"
                }`}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Refined Metadata */}
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          transition={{ delay: 6.5 }}
          className="mb-8 flex items-center gap-6 lg:mb-10"
        >
          <div className="h-px w-1 bg-gold-subtle" />
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.35em] text-stone lg:text-xs">
            Residential · Hospitality · Commercial
          </p>
        </motion.div>

        {/* Interactive CTAs with Magnetic Effect */}
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          transition={{ delay: 7 }}
          className="flex flex-col gap-6 sm:flex-row sm:gap-8"
        >
          <ButtonLink
            href="/projects"
            size="lg"
            className="group magnetic-button"
            data-cursor-text="EXPLORE"
          >
            EXPLORE OUR WORK
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="magnetic-button border-gold-subtle/40 bg-transparent text-champagne hover:border-gold hover:bg-gold/8 hover:text-ivory"
            data-cursor-text="DISCOVER"
          >
            DISCOVER THE STUDIO
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with Animated Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{
          delay: 7.5,
          duration: 2.5,
        }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:bottom-24"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-5"
        >
          <div className="relative h-px w-24">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 8 }}
              className="h-full w-full origin-center bg-gradient-to-r from-transparent via-gold-subtle/50 to-transparent"
            />
          </div>
          <span className="font-sans text-[8px] font-light uppercase tracking-[0.4em] text-taupe-light/60">
            Scroll to Explore
          </span>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 50 }}
            transition={{ duration: 1.5, delay: 8.5 }}
            className="w-px bg-gradient-to-b from-gold-subtle/40 via-gold-subtle/20 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
