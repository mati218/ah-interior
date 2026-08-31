import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From first consultation to full renovation — explore the services offered by A&H Interiors.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="What We Offer"
        title="Services built around how you live"
        description="From a single consultation to a full home renovation, every service is shaped around your space and your everyday life."
        image="https://images.unsplash.com/photo-1663811397219-c572550dffc5?auto=format&fit=crop&w=2000&q=80"
      />
      <ServicesGrid services={services} />
      <CTABanner />
    </>
  );
}
