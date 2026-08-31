import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CTABanner } from "@/components/sections/CTABanner";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      testimonials: true,
    },
  });
  if (!project || project.status !== "PUBLISHED") notFound();

  const nextProject = await prisma.project.findFirst({
    where: { status: "PUBLISHED", id: { not: project.id } },
    orderBy: { createdAt: "desc" },
  });

  const details = [
    { label: "Location", value: project.location },
    { label: "Area", value: project.area },
    { label: "Year", value: project.year?.toString() },
    { label: "Category", value: project.category?.name },
  ].filter((d) => d.value);

  return (
    <>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-charcoal">
        <Image src={project.coverImage} alt={project.title} fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-14 lg:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cream/80 hover:text-gold"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <h1 className="mt-4 max-w-2xl font-display text-4xl text-cream sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Overview</p>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">{project.summary}</p>
            <p className="mt-6 text-sm leading-relaxed text-taupe">{project.description}</p>
          </FadeIn>

          <FadeIn delay={0.15} className="h-fit border border-border p-8">
            <p className="text-xs uppercase tracking-wider text-taupe">Project Details</p>
            <dl className="mt-6 flex flex-col gap-4">
              {details.map((d) => (
                <div key={d.label} className="flex justify-between border-b border-border pb-3 text-sm">
                  <dt className="text-taupe">{d.label}</dt>
                  <dd className="text-charcoal">{d.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {project.images.length > 0 && (
          <StaggerGroup className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.images.map((image, i) => (
              <StaggerItem
                key={image.id}
                className={i % 3 === 0 ? "sm:col-span-2" : ""}
              >
                <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <Image
                    src={image.url}
                    alt={image.alt ?? project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {project.testimonials[0] && (
          <FadeIn className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-display text-2xl leading-relaxed text-charcoal">
              &ldquo;{project.testimonials[0].message}&rdquo;
            </p>
            <p className="mt-6 text-sm text-taupe">— {project.testimonials[0].clientName}</p>
          </FadeIn>
        )}
      </section>

      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group relative flex h-[45vh] min-h-[320px] items-center justify-center overflow-hidden bg-charcoal"
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="relative z-10 text-center text-cream">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Next Project</p>
            <p className="mt-4 font-display text-4xl">{nextProject.title}</p>
          </div>
        </Link>
      )}

      <CTABanner />
    </>
  );
}
