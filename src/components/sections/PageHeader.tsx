"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

export function PageHeader({ eyebrow, title, description, image }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Scroll parallax
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // 3D transforms
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative flex h-[70vh] min-h-[500px] w-full items-end overflow-hidden bg-obsidian"
    >
      {/* 3D Image layer */}
      {image && (
        <motion.div
          className="absolute inset-0 perspective-2000"
          style={{ y }}
        >
          <motion.div
            className="relative h-full w-full scale-[1.08] overflow-hidden preserve-3d"
            style={{
              rotateX,
              rotateY,
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              priority
              quality={90}
              className="scale-[1.12] object-cover saturate-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-transparent" />
          </motion.div>
        </motion.div>
      )}

      {/* Overlay with mouse spotlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
      
      <motion.div
        animate={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 195, 147, 0.06), transparent 80%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        className="absolute inset-0"
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <div className="h-full w-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-[1800px] px-8 pb-20 lg:px-12 lg:pb-24"
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-gold-subtle/60 to-transparent" />
              <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-champagne/90">
                {eyebrow}
              </span>
            </div>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-normal leading-tight tracking-tight text-ivory sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-stone lg:text-lg"
          >
            {description}
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isMounted ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-gold-subtle/60 to-transparent"
        />
      </motion.div>

      {/* Corner accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <motion.div
          initial={{ opacity: 0, x: -10, y: -10 }}
          animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="absolute left-6 top-6 flex gap-1.5 lg:left-8 lg:top-8"
        >
          <div className="h-px w-6 bg-gradient-to-r from-gold-subtle/50 to-transparent" />
          <div className="h-6 w-px bg-gradient-to-b from-gold-subtle/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10, y: -10 }}
          animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute right-6 top-6 flex gap-1.5 lg:right-8 lg:top-8"
        >
          <div className="h-6 w-px bg-gradient-to-b from-gold-subtle/50 to-transparent" />
          <div className="h-px w-6 bg-gradient-to-l from-gold-subtle/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
