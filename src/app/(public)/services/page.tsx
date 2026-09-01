import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { AwwwardsServices } from "@/components/sections/AwwwardsServices";
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

      <section className="relative overflow-hidden bg-obsidian py-24 text-ivory lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,195,147,0.12),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[1800px] gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-subtle">
              Design Process
            </p>
            <h2 className="font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
              Thoughtful design, from first sketch to final styling.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
            {[
              ["01", "Consultation", "We listen closely to how you live, work, and move through your home."],
              ["02", "Concept", "We shape a clear direction rooted in light, material, proportion, and story."],
              ["03", "Realisation", "We refine every detail and deliver a space that feels calm, layered, and complete."],
            ].map(([step, title, copy]) => (
              <div key={step} className="border border-white/10 bg-white/3 p-5 backdrop-blur-sm">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-subtle">{step}</p>
                <h3 className="mt-5 font-display text-2xl text-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AwwwardsServices services={services} />
      <CTABanner />
    </>
  );
}
