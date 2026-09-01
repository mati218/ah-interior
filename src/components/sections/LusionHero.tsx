"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface LusionHeroProps {
  image?: string;
}

export function LusionHero({
  image = "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2400&q=90",
}: LusionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 80, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Image transforms - Lusion-style 3D depth
  const imageScale = useTransform(smoothScroll, [0, 1], [1, 1.3]);
  const imageY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);
  const imageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]);
  const imageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3]);

  // Content transforms
  const contentY = useTransform(smoothScroll, [0, 0.5], ["0%", "50%"]);
  const contentOpacity = useTransform(smoothScroll, [0, 0.3, 0.6], [1, 0.8, 0]);
  const contentScale = useTransform(smoothScroll, [0, 0.5], [1, 0.95]);

  // Overlay darkness
  const overlayOpacity = useTransform(smoothScroll, [0, 0.5], [0.6, 0.85]);

  // Title animation - staggered word reveal
  const titleWords = ["Spaces", "That", "Inspire"];
  
  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -0.5 to 0.5
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
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Sticky hero container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        
        {/* 3D Image layer with mouse parallax */}
        <motion.div
          className="absolute inset-0 perspective-2000"
          style={{
            scale: imageScale,
            y: imageY,
          }}
        >
          <motion.div
            className="relative h-full w-full preserve-3d"
            style={{
              rotateX: imageRotateX,
              rotateY: imageRotateY,
            }}
          >
            <Image
              src={image}
              alt="Luxury interior design"
              fill
              priority
              quality={95}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Dynamic overlay with mouse-reactive gradient */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-black/80 to-obsidian" />
          
          {/* Mouse-following spotlight effect */}
          <motion.div
            animate={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 195, 147, 0.08), transparent 80%)`,
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
            className="absolute inset-0"
          />
        </motion.div>

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Main content */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative z-10 px-8 text-center">
            
            {/* Eyebrow - minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-subtle to-transparent" />
                <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-champagne/80">
                  Interior Architecture
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-subtle to-transparent" />
              </div>
            </motion.div>

            {/* Main title - Lusion style staggered reveal */}
            <div className="mb-8 space-y-0 overflow-hidden">
              {titleWords.map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 120, opacity: 0, rotateX: 90 }}
                    animate={isMounted ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                    transition={{
                      delay: 0.5 + i * 0.15,
                      duration: 1.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-display text-[18vw] font-normal leading-[0.85] tracking-tighter text-ivory sm:text-[15vw] lg:text-[12vw] xl:text-[180px]"
                    style={{
                      transform: `translateX(${smoothMouseX.get() * (i + 1) * 15}px) translateY(${smoothMouseY.get() * (i + 1) * 10}px)`,
                    }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-stone lg:text-lg"
            >
              We transform architectural spaces into immersive experiences through
              <br className="hidden sm:block" />
              thoughtful design, premium materials, and meticulous craftsmanship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <a
                href="/projects"
                className="group relative overflow-hidden border border-gold-subtle/30 bg-gold/5 px-8 py-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-ivory transition-all duration-700 hover:border-gold hover:bg-gold/10"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              
              <a
                href="/contact"
                className="group relative overflow-hidden border border-ivory/20 bg-transparent px-8 py-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-ivory transition-all duration-700 hover:border-ivory/40 hover:bg-ivory/5"
              >
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ opacity: useTransform(smoothScroll, [0, 0.15], [1, 0]) }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-10 w-px bg-gradient-to-b from-gold-subtle/50 to-transparent" />
            <span className="font-sans text-[8px] font-light uppercase tracking-[0.4em] text-taupe-light/50">
              Scroll
            </span>
          </motion.div>
        </motion.div>

        {/* Corner accents */}
        <div className="pointer-events-none absolute inset-0">
          {/* Top left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ delay: 2, duration: 1.5 }}
            className="absolute left-8 top-8 flex gap-2 lg:left-12 lg:top-12"
          >
            <div className="h-px w-8 bg-gradient-to-r from-gold-subtle/40 to-transparent" />
            <div className="h-8 w-px bg-gradient-to-b from-gold-subtle/40 to-transparent" />
          </motion.div>

          {/* Top right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ delay: 2.1, duration: 1.5 }}
            className="absolute right-8 top-8 flex gap-2 lg:right-12 lg:top-12"
          >
            <div className="h-8 w-px bg-gradient-to-b from-gold-subtle/40 to-transparent" />
            <div className="h-px w-8 bg-gradient-to-l from-gold-subtle/40 to-transparent" />
          </motion.div>

          {/* Bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1.5 }}
            className="absolute bottom-8 left-8 flex gap-2 lg:bottom-12 lg:left-12"
          >
            <div className="h-px w-8 bg-gradient-to-r from-gold-subtle/40 to-transparent" />
            <div className="h-8 w-px bg-gradient-to-t from-gold-subtle/40 to-transparent" />
          </motion.div>

          {/* Bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={isMounted ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ delay: 2.3, duration: 1.5 }}
            className="absolute bottom-8 right-8 flex gap-2 lg:bottom-12 lg:right-12"
          >
            <div className="h-8 w-px bg-gradient-to-t from-gold-subtle/40 to-transparent" />
            <div className="h-px w-8 bg-gradient-to-l from-gold-subtle/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
