import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-cream-dark">
      <div className="mx-auto max-w-[1440px] px-6 py-24 text-center lg:px-12 lg:py-32">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Let&apos;s Begin</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl text-charcoal sm:text-5xl">
            Ready to transform your space into something timeless?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-taupe">
            Book a complimentary consultation with our design team and let&apos;s
            bring your vision to life.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact" size="lg">
              Book a Consultation
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
