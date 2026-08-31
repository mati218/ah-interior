"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project/ProjectCard";
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

export function ProjectsFilterGrid({
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
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "px-5 py-2 text-xs uppercase tracking-wider transition-colors",
            active === "all"
              ? "bg-charcoal text-cream"
              : "border border-border text-charcoal/70 hover:border-gold hover:text-gold"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              "px-5 py-2 text-xs uppercase tracking-wider transition-colors",
              active === cat.id
                ? "bg-charcoal text-cream"
                : "border border-border text-charcoal/70 hover:border-gold hover:text-gold"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                slug={project.slug}
                title={project.title}
                coverImage={project.coverImage}
                categoryName={project.category?.name}
                location={project.location}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-14 text-center text-sm text-taupe">No projects in this category yet.</p>
      )}
    </div>
  );
}
