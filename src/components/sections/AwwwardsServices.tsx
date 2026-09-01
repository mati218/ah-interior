"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import * as Icons from "lucide-react";

interface Service {
  slug: string;
  title: string;
  summary: string;
  icon: string | null;
}

function ServiceIcon({ name }: { name: string | null }) {
  const Icon = (name && (Icons as any)[name]) || Icons.Sparkles;
  return <Icon size={32} strokeWidth={1} />;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;
    
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="group relative"
    >
      <Link
        href={`/services/${service.slug}`}
        className="block"
        data-cursor-text="EXPLORE"
      >
        <div className="relative overflow-hidden border border-border-subtle/30 bg-ivory p-10 transition-all duration-1000 group-hover:border-gold-subtle/60 group-hover:bg-cream lg:p-14">
          {/* Animated Background Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-subtle/5"
          />

          {/* Service Number */}
          <div className="absolute right-8 top-8 font-display text-8xl text-obsidian/5 transition-all duration-1000 group-hover:text-gold/10 lg:text-9xl">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="relative z-10">
            {/* Icon with Animated Circle */}
            <div className="mb-8 flex h-16 w-16 items-center justify-center lg:mb-10">
              <motion.div
                animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <motion.div
                  animate={isHovered ? { scale: 1.2, opacity: 0.8 } : { scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-full bg-gold-subtle blur-xl"
                />
                <div className="relative text-gold">
                  <ServiceIcon name={service.icon} />
                </div>
              </motion.div>
            </div>

            {/* Title - Large Editorial */}
            <motion.h3
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 font-display text-3xl font-normal leading-tight tracking-tight text-obsidian transition-colors duration-700 group-hover:text-gradient-gold lg:text-4xl"
            >
              {service.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
              transition={{ duration: 0.6 }}
              className="mb-8 font-sans text-base font-light leading-relaxed text-taupe lg:text-lg"
            >
              {service.summary}
            </motion.p>

            {/* Explore Link */}
            <motion.div
              animate={isHovered ? { x: 10, opacity: 1 } : { x: 0, opacity: 0.7 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-charcoal"
            >
              <span>Explore Service</span>
              <motion.div
                animate={isHovered ? { width: 60 } : { width: 30 }}
                transition={{ duration: 0.6 }}
                className="h-px bg-current"
              />
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.div>
          </div>

          {/* Corner Accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-gold/10 to-transparent"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function AwwwardsServices({ services }: { services: Service[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  if (services.length === 0) return null;

  return (
    <section ref={ref} className="relative overflow-hidden bg-warm-white py-32 lg:py-48">
      {/* Ambient Background Elements */}
      <div className="absolute right-0 top-1/3 h-[800px] w-[800px] bg-gradient-to-bl from-gold-subtle/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-gradient-to-tr from-obsidian/3 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-[1900px] px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-24 lg:mb-32"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-gold-subtle" />
            <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-gold">
              What We Do
            </span>
          </div>
          <h2 className="font-display text-7xl font-normal leading-[0.9] tracking-tight text-obsidian lg:text-8xl xl:text-9xl">
            Services
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-taupe lg:text-xl"
          >
            Comprehensive design solutions tailored to create spaces that inspire and endure.
          </motion.p>
        </motion.div>

        {/* Services Grid - Bento-style Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
