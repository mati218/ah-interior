import Link from "next/link";
import { ProjectCard } from "@/components/project/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface FeaturedProject {
  slug: string;
  title: string;
  coverImage: string;
  location: string | null;
  category: { name: string } | null;
}

export function FeaturedProjects({ projects }: { projects: FeaturedProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-6 py-28 lg:px-12 lg:py-40">
      {/* Decorative Background Element */}
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-gold/5 via-gold/10 to-transparent blur-3xl" />
      
      <FadeIn className="relative flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Selected Work</p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <h2 className="mt-6 font-display text-5xl font-light text-charcoal sm:text-6xl lg:text-[4rem]">
          Recent Projects
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-taupe lg:text-lg">
          Explore our portfolio of thoughtfully designed spaces that balance aesthetics with functionality
        </p>
      </FadeIn>

      <StaggerGroup className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard
              slug={project.slug}
              title={project.title}
              coverImage={project.coverImage}
              categoryName={project.category?.name}
              location={project.location}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn className="mt-16 flex justify-center lg:mt-20">
        <ButtonLink href="/projects" variant="outline" size="lg" className="group">
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </ButtonLink>
      </FadeIn>
    </section>
  );
}
