"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface LusionAboutSectionProps {
  title: string;
  eyebrow: string;
  content: string[];
  image: string;
  reverse?: boolean;
}

export function LusionAboutSection({ title, eyebrow, content, image, reverse = false }: LusionAboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -3;
    const rotateYValue = ((x - centerX) / centerX) * 3;

    mouseX.set(rotateYValue);
    mouseY.set(rotateXValue);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={ref} className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? "lg:grid-flow-dense" : ""}`}>
      {/* Image side */}
      <motion.div
        className={`perspective-2000 group ${reverse ? "lg:col-start-2" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            y,
            rotateX: smoothY,
            rotateY: smoothX,
          }}
          className="preserve-3d relative aspect-4/5 overflow-hidden bg-obsidian"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </motion.div>

          {/* Hover overlay with spotlight */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-linear-to-t from-obsidian/60 via-transparent to-transparent"
          />

          <motion.div
            animate={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 195, 147, 0.1), transparent 70%)`,
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Corner frames */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute left-4 top-4 h-12 w-12 border-l border-t border-gold-subtle/40" />
            <div className="absolute right-4 top-4 h-12 w-12 border-r border-t border-gold-subtle/40" />
            <div className="absolute bottom-4 left-4 h-12 w-12 border-b border-l border-gold-subtle/40" />
            <div className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-gold-subtle/40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex flex-col justify-center"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-linear-to-r from-gold-subtle/60 to-transparent" />
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-gold">{eyebrow}</span>
        </div>

        <h2 className="mb-6 font-display text-3xl font-normal leading-tight tracking-tight text-ivory sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <div className="space-y-4 font-sans text-base font-light leading-relaxed text-stone">
          {content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
