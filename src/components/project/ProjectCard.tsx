"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  slug: string;
  title: string;
  coverImage: string;
  categoryName?: string | null;
  location?: string | null;
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  coverImage,
  categoryName,
  location,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className={className}>
      <motion.div className="group relative overflow-hidden bg-cream-dark" whileHover="hover">
        <motion.div
          className="relative aspect-[4/5] w-full"
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-cream opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {categoryName && (
            <p className="text-xs uppercase tracking-wider text-gold">{categoryName}</p>
          )}
          <p className="mt-1 font-display text-xl">{title}</p>
          {location && <p className="mt-0.5 text-xs text-cream/80">{location}</p>}
        </div>
      </motion.div>
    </Link>
  );
}
