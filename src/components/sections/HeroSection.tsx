"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { useRef, useEffect, useState } from "react";

const textVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 3,
      duration: 2,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const metaVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 5,
      duration: 1.5,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

export function HeroSection({ image }: { image: string }) {
  const ref = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-obsidian"
      style={{ height: "100svh" }}
    >
      {/* Ultra-Cinematic Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 4.5,
            ease: [0.19, 1, 0.22, 1],
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
        </motion.div>
      </motion.div>

      {/* Dramatic Cinematic Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          delay: 0.8,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-black/70 to-obsidian/90"
      />

      {/* Sophisticated Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-obsidian/80" />

      {/* Subtle Gold Glow Accent (Top Right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 2 }}
        className="absolute right-0 top-0 h-[600px] w-[600px] bg-gradient-to-bl from-gold/5 via-transparent to-transparent blur-3xl"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex max-w-[1800px] flex-col items-start px-10 lg:px-20"
      >
        {/* Refined Eyebrow with Gold Accent */}
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          className="mb-12 flex items-center gap-6 lg:mb-16"
        >
          <div className="h-px w-16 bg-gradient-to-r from-gold via-gold-subtle to-transparent" />
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.35em] text-champagne lg:text-[10px]">
            Est. 2012 — Luxury Interior Architecture
          </span>
        </motion.div>

        {/* Oversized Editorial Headlines */}
        <div className="text-reveal mb-10 overflow-hidden lg:mb-14">
          <motion.h1
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 3 }}
            className="font-display text-[12vw] font-normal leading-[0.85] tracking-tighter text-ivory sm:text-[11vw] lg:text-[10vw] xl:text-[180px]"
          >
            SPACES
          </motion.h1>
        </div>

        <div className="text-reveal mb-10 overflow-hidden lg:mb-14">
          <motion.h1
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 3.3 }}
            className="font-display text-[12vw] font-normal leading-[0.85] tracking-tighter text-ivory sm:text-[11vw] lg:text-[10vw] xl:text-[180px]"
          >
            BEYOND
          </motion.h1>
        </div>

        <div className="text-reveal mb-20 overflow-hidden lg:mb-28">
          <motion.h1
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 3.6 }}
            className="text-gradient-gold font-display text-[12vw] font-normal leading-[0.85] tracking-tighter sm:text-[11vw] lg:text-[10vw] xl:text-[180px]"
          >
            EXPECTATION.
          </motion.h1>
        </div>

        {/* Refined Supporting Text */}
        <motion.p
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          transition={{ delay: 5 }}
          className="mb-6 max-w-md font-sans text-[10px] font-light uppercase tracking-[0.3em] text-stone lg:mb-8 lg:text-xs"
        >
          Residential · Hospitality · Commercial
        </motion.p>

        {/* Minimal CTAs */}
        <motion.div
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={metaVariants}
          transition={{ delay: 5.3 }}
          className="flex flex-col gap-5 sm:flex-row sm:gap-7"
        >
          <ButtonLink
            href="/projects"
            size="lg"
            className="group"
            data-cursor-text="EXPLORE"
          >
            EXPLORE OUR WORK
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="border-gold-subtle/40 bg-transparent text-champagne hover:border-gold hover:bg-gold/5 hover:text-ivory"
            data-cursor-text="DISCOVER"
          >
            DISCOVER THE STUDIO
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Refined Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{
          delay: 6,
          duration: 2,
        }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 lg:bottom-20"
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
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold-subtle/40 to-transparent" />
          <span className="font-sans text-[8px] font-light uppercase tracking-[0.35em] text-taupe-light/70">
            Scroll to Explore
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-gold-subtle/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
