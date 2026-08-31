import Link from "next/link";
import { ProjectCard } from "@/components/project/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ButtonLink } from "@/components/ui/Button";

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
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
      <FadeIn className="flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Selected Work</p>
        <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
          Recent Projects
        </h2>
      </FadeIn>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <FadeIn className="mt-14 flex justify-center">
        <ButtonLink href="/projects" variant="outline" size="lg">
          View All Projects
        </ButtonLink>
      </FadeIn>
    </section>
  );
}
