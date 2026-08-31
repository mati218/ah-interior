import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the A&H Interiors studio.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Careers at A&H Interiors"
        description="We're a small, considered studio — we grow slowly and hire rarely, but we always want to hear from great people."
        image="https://images.unsplash.com/photo-1687075197041-91fba1013e1d?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-12 lg:py-32">
        <FadeIn>
          <h2 className="font-display text-3xl text-charcoal">No open roles right now</h2>
          <p className="mt-4 text-sm leading-relaxed text-taupe">
            We don&apos;t have any open positions at the moment, but we&apos;re always happy
            to hear from designers and project managers who share our approach. Feel
            free to reach out and introduce yourself.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg">
              Get in Touch
            </ButtonLink>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
