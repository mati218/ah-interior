import { prisma } from "@/lib/prisma";
import { LusionHero } from "@/components/sections/LusionHero";
import { LusionPortfolio } from "@/components/sections/LusionPortfolio";
import { AwwwardsServices } from "@/components/sections/AwwwardsServices";
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
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2400&q=90";

  return (
    <>
      <LusionHero image={heroImage} />
      <LusionPortfolio projects={featuredProjects} />
      <AwwwardsServices services={services} />
      <StatsBand />
      <TestimonialSlider testimonials={testimonials} />
      <CTABanner />
    </>
  );
}
