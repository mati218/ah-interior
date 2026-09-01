"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      <motion.div
        className="group relative overflow-hidden rounded-lg bg-cream-dark shadow-lg shadow-charcoal/5 transition-shadow duration-700 hover:shadow-2xl hover:shadow-charcoal/10"
        whileHover="hover"
      >
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden"
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
          <div className="translate-y-0 transition-transform duration-700 group-hover:-translate-y-1">
            {categoryName && (
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-6 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light">
                  {categoryName}
                </p>
              </div>
            )}
            <p className="font-display text-2xl font-light leading-tight">
              {title}
            </p>
            {location && (
              <p className="mt-2 text-sm text-ivory/70">{location}</p>
            )}
          </div>

          {/* Arrow Icon */}
          <motion.div
            className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-gold/90 backdrop-blur-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            variants={{ hover: { rotate: 45 } }}
            transition={{ duration: 0.4 }}
          >
            <ArrowUpRight className="h-5 w-5 text-charcoal" strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
