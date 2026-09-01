"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectItem {
  slug: string;
  title: string;
  coverImage: string;
  location: string | null;
  categoryId: string | null;
  category: { id: string; name: string } | null;
}

interface CategoryItem {
  id: string;
  name: string;
}

function LusionProjectCard({ project, index }: { project: ProjectItem; index: number }) {
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

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
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
      <Link href={`/projects/${project.slug}`} className="block">
        <motion.div
          style={{
            rotateX: smoothY,
            rotateY: smoothX,
          }}
          className="preserve-3d relative aspect-[4/3] overflow-hidden bg-obsidian"
        >
          <motion.div className="absolute inset-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent"
          />

          <motion.div
            animate={{
              background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 195, 147, 0.12), transparent 70%)`,
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            {project.category && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="mb-3"
              >
                <span className="inline-block border border-gold-subtle/30 bg-gold/8 px-2.5 py-1 font-sans text-[8px] font-light uppercase tracking-[0.3em] text-gold backdrop-blur-sm">
                  {project.category.name}
                </span>
              </motion.div>
            )}

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-2 font-display text-2xl font-normal leading-tight tracking-tight text-ivory transition-transform duration-500 group-hover:translate-x-1 lg:text-3xl"
            >
              {project.title}
            </motion.h3>

            {project.location && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="font-sans text-xs font-light tracking-wide text-stone transition-transform duration-500 group-hover:translate-x-1"
              >
                {project.location}
              </motion.p>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute left-3 top-3 h-8 w-8 border-l border-t border-gold-subtle/40" />
            <div className="absolute right-3 top-3 h-8 w-8 border-r border-t border-gold-subtle/40" />
            <div className="absolute bottom-3 left-3 h-8 w-8 border-b border-l border-gold-subtle/40" />
            <div className="absolute bottom-3 right-3 h-8 w-8 border-b border-r border-gold-subtle/40" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function LusionProjectsGrid({
  projects,
  categories,
}: {
  projects: ProjectItem[];
  categories: CategoryItem[];
}) {
  const [active, setActive] = useState<string | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.categoryId === active)),
    [projects, active]
  );

  return (
    <div>
      {/* Filter buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <button
          onClick={() => setActive("all")}
          className={cn(
            "group relative overflow-hidden border px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.3em] transition-all duration-500",
            active === "all"
              ? "border-gold bg-gold/10 text-gold"
              : "border-ivory/20 text-ivory/70 hover:border-gold-subtle/50 hover:text-ivory"
          )}
        >
          <span className="relative z-10">All</span>
          {active !== "all" && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              "group relative overflow-hidden border px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.3em] transition-all duration-500",
              active === cat.id
                ? "border-gold bg-gold/10 text-gold"
                : "border-ivory/20 text-ivory/70 hover:border-gold-subtle/50 hover:text-ivory"
            )}
          >
            <span className="relative z-10">{cat.name}</span>
            {active !== cat.id && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            )}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div layout className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LusionProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center font-sans text-sm font-light text-stone"
        >
          No projects in this category yet.
        </motion.p>
      )}
    </div>
  );
}
