import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TeamCard } from "@/components/ui/TeamCard";
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

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80"
                alt="A&H Interiors studio"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Our Story</p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
              Founded on restraint, built on craft.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-taupe">
              <p>
                A&amp;H Interiors began in 2013 with a simple frustration: too much
                interior design felt like decoration for its own sake — trend-driven,
                over-styled, and disconnected from how people actually live.
              </p>
              <p>
                We set out to build a studio around the opposite instinct. Every
                project starts with how a space is used, not how it photographs.
                Material honesty, considered light, and a warm, editorial palette
                carry through everything we design — residential or commercial.
              </p>
              <p>
                Over a decade later, that same philosophy shapes every project we
                take on, from single-room refreshes to full home renovations.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Our Philosophy</p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
              Three ideas guide every project
            </h2>
          </FadeIn>

          <StaggerGroup className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              {
                title: "Material Honesty",
                copy: "We choose materials that age gracefully and tell the truth about what they are.",
              },
              {
                title: "Designed for Living",
                copy: "Every room is built for an ordinary Tuesday, not just a photograph.",
              },
              {
                title: "Light First",
                copy: "We plan lighting before furniture — it changes everything about how a room feels.",
              },
            ].map((item) => (
              <StaggerItem key={item.title} className="text-center">
                <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{item.copy}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {team.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
          <FadeIn className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Meet the Team</p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
              The People Behind the Work
            </h2>
          </FadeIn>

          <StaggerGroup className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  photo={member.photo}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      <CTABanner />
    </>
  );
}
