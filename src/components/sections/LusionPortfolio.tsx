"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  coverImage: string;
  location: string | null;
  category: { name: string } | null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Lusion-style 3D transforms
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    mouseX.set(rotateYValue);
    mouseY.set(rotateXValue);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        scale,
        opacity,
      }}
      className="perspective-2000 group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block"
      >
        <motion.div
          style={{
            rotateX: smoothY,
            rotateY: smoothX,
          }}
          className="preserve-3d relative aspect-[4/3] overflow-hidden bg-obsidian"
        >
          {/* Image layer */}
          <motion.div className="absolute inset-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"
          />

          {/* Mouse spotlight effect */}
          <motion.div
            animate={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 195, 147, 0.15), transparent 70%)`,
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            {/* Category badge */}
            {project.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <span className="inline-block border border-gold-subtle/30 bg-gold/10 px-3 py-1 font-sans text-[9px] font-light uppercase tracking-[0.3em] text-gold backdrop-blur-sm">
                  {project.category.name}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mb-3 font-display text-4xl font-normal leading-tight tracking-tight text-ivory transition-transform duration-500 group-hover:translate-x-2 lg:text-5xl"
            >
              {project.title}
            </motion.h3>

            {/* Location */}
            {project.location && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="font-sans text-sm font-light tracking-wide text-stone transition-transform duration-500 group-hover:translate-x-2"
              >
                {project.location}
              </motion.p>
            )}

            {/* Hover arrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 lg:right-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 bg-ivory/5 backdrop-blur-sm">
                <svg
                  className="h-5 w-5 text-ivory"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Corner frame */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute left-4 top-4 h-12 w-12 border-l border-t border-gold-subtle/50" />
            <div className="absolute right-4 top-4 h-12 w-12 border-r border-t border-gold-subtle/50" />
            <div className="absolute bottom-4 left-4 h-12 w-12 border-b border-l border-gold-subtle/50" />
            <div className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-gold-subtle/50" />
          </div>

          {/* Project number */}
          <div className="absolute left-6 top-6 font-display text-7xl font-normal text-ivory/5 transition-all duration-700 group-hover:text-gold/10 lg:left-8 lg:top-8 lg:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function LusionPortfolio({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  if (projects.length === 0) return null;

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32 lg:py-48">
      {/* Ambient background */}
      <div className="absolute left-1/4 top-0 h-[600px] w-[600px] bg-gradient-to-br from-gold/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] bg-gradient-to-tl from-gold-subtle/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-[1800px] px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-20 text-center lg:mb-32"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold-subtle to-transparent"
          />
          
          <h2 className="mb-6 font-display text-6xl font-normal leading-none tracking-tight text-ivory lg:text-7xl xl:text-8xl">
            Selected Works
          </h2>
          
          <p className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-stone lg:text-lg">
            Explore our portfolio of transformative interior spaces that blend
            architectural precision with artistic vision.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center lg:mt-32"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 font-sans text-xs font-light uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:text-gold"
          >
            <span>View All Projects</span>
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <div className="h-px w-16 bg-current transition-all duration-500 group-hover:w-24" />
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
