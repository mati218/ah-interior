import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage() {
  const [featuredProjects, services, testimonials] = await Promise.all([
    prisma.project.findMany({
      where: { status: "PUBLISHED", featured: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const heroImage =
    featuredProjects[0]?.coverImage ??
    "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?auto=format&fit=crop&w=2000&q=80";

  return (
    <>
      <HeroSection image={heroImage} />
      <FeaturedProjects projects={featuredProjects} />
      <ServicesGrid services={services} />
      <StatsBand />
      <TestimonialSlider testimonials={testimonials} />
      <CTABanner />
    </>
  );
}
