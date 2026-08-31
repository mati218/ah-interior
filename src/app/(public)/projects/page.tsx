import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectsFilterGrid } from "@/components/project/ProjectsFilterGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the portfolio of residential and commercial interiors designed by A&H Interiors.",
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    prisma.project.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Every project, a little different"
        description="A collection of residential and commercial interiors — each one shaped around how our clients actually live and work."
        image="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <ProjectsFilterGrid projects={projects} categories={categories} />
      </section>

      <CTABanner />
    </>
  );
}
