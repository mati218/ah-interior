import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { LusionAboutSection } from "@/components/sections/LusionAboutSection";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the studio behind A&H Interiors — our story, our philosophy, and the team that brings every project to life.",
};

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="Our Studio"
        title="Designing spaces that feel like you"
        description="A boutique interior design studio founded on the belief that a well-designed home is one that quietly disappears into daily life."
        image="https://images.unsplash.com/photo-1691036561573-4b76998b60de?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="bg-black">
        <div className="mx-auto max-w-[1800px] px-8 py-24 lg:px-12 lg:py-32">
          <LusionAboutSection
            eyebrow="Our Story"
            title="Founded on restraint, built on craft."
            content={[
              "A&H Interiors began in 2013 with a simple frustration: too much interior design felt like decoration for its own sake — trend-driven, over-styled, and disconnected from how people actually live.",
              "We set out to build a studio around the opposite instinct. Every project starts with how a space is used, not how it photographs. Material honesty, considered light, and a warm, editorial palette carry through everything we design — residential or commercial.",
              "Over a decade later, that same philosophy shapes every project we take on, from single-room refreshes to full home renovations."
            ]}
            image="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </section>

      <section className="bg-obsidian">
        <div className="mx-auto max-w-[1800px] px-8 py-24 lg:px-12 lg:py-32">
          <LusionAboutSection
            eyebrow="Our Approach"
            title="Material honesty meets timeless design."
            content={[
              "We choose materials that age gracefully and tell the truth about what they are. Natural stone, solid wood, linen, and steel — materials that develop character over time rather than looking dated.",
              "Every room is built for an ordinary Tuesday, not just a photograph. Beautiful spaces should serve daily life, not interrupt it.",
              "We plan lighting before furniture — it changes everything about how a room feels. Natural light, layered artificial sources, and careful shadow create depth and atmosphere."
            ]}
            image="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=1200&q=80"
            reverse
          />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
