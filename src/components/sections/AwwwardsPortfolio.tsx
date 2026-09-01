"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  coverImage: string;
  location: string | null;
  category: { name: string } | null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        scale,
        opacity,
      }}
      className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* Image Side - Cinematic Reveal */}
      <Link
        href={`/projects/${project.slug}`}
        className={`group relative aspect-[4/3] overflow-hidden ${
          isEven ? "" : "lg:col-start-2"
        }`}
        data-cursor-text="VIEW"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-all duration-1000"
          />
        </motion.div>

        {/* Overlay with Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent"
        />

        {/* Animated Border Frame */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-4 border border-gold-subtle/30"
        />

        {/* Project Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute right-8 top-8 font-display text-6xl text-gold-subtle/20 lg:text-8xl"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
      </Link>

      {/* Content Side - Editorial Layout */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="flex flex-col justify-center space-y-8"
      >
        {/* Category with Line */}
        {project.category && (
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="h-px bg-gold-subtle"
            />
            <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-gold">
              {project.category.name}
            </span>
          </div>
        )}

        {/* Project Title - Large Editorial */}
        <h3 className="font-display text-5xl font-normal leading-[0.95] tracking-tight text-obsidian lg:text-6xl xl:text-7xl">
          {project.title}
        </h3>

        {/* Location */}
        {project.location && (
          <p className="font-sans text-sm font-light tracking-wide text-taupe">
            {project.location}
          </p>
        )}

        {/* Explore Link with Arrow */}
        <Link
          href={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-4 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-charcoal transition-colors duration-700 hover:text-gold"
          data-cursor-text="EXPLORE"
        >
          <span>Explore Project</span>
          <motion.div
            whileHover={{ x: 10 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="h-px w-12 bg-current transition-all duration-700 group-hover:w-20" />
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function AwwwardsPortfolio({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  if (projects.length === 0) return null;

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-32 lg:py-48">
      {/* Ambient Background Glow */}
      <div className="absolute left-0 top-1/4 h-[600px] w-[600px] bg-gradient-to-br from-gold/3 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-[1900px] px-12 lg:px-24">
        {/* Section Header - Cinematic Entrance */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-24 lg:mb-32"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-gold-subtle" />
                <span className="font-sans text-[9px] font-light uppercase tracking-[0.4em] text-gold">
                  Selected Work
                </span>
              </div>
              <h2 className="font-display text-7xl font-normal leading-[0.9] tracking-tight text-obsidian lg:text-8xl xl:text-9xl">
                Portfolio
              </h2>
            </div>

            {/* View All Link */}
            <Link
              href="/projects"
              className="group hidden items-center gap-3 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-charcoal transition-colors duration-700 hover:text-gold lg:flex"
              data-cursor-text="VIEW ALL"
            >
              <span>View All Projects</span>
              <div className="h-px w-16 bg-current transition-all duration-700 group-hover:w-24" />
            </Link>
          </div>
        </motion.div>

        {/* Projects Grid - Alternating Layout */}
        <div className="space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex justify-center lg:hidden"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-charcoal"
          >
            <span>View All Projects</span>
            <div className="h-px w-12 bg-current transition-all duration-700 group-hover:w-20" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
