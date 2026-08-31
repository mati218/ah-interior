import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with A&H Interiors.",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Client Words"
        title="Stories from our clients"
        image="https://images.unsplash.com/photo-1663811397443-2d058a628295?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id} className="flex flex-col gap-4 border border-border bg-white p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-charcoal">&ldquo;{t.message}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-4">
                {t.avatar && (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.clientName} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-charcoal">{t.clientName}</p>
                  {t.role && <p className="text-xs text-taupe">{t.role}</p>}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CTABanner />
    </>
  );
}
