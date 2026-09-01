import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-dark via-ivory to-cream">
      {/* Decorative Elements */}
      <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-gradient-to-br from-gold/20 via-gold/10 to-transparent blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-gradient-to-tl from-bronze/20 via-gold/10 to-transparent blur-3xl" />
      
      <div className="relative mx-auto max-w-[1440px] px-6 py-28 text-center lg:px-12 lg:py-40">
        <FadeIn>
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-gold" />
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Let&apos;s Begin</p>
          </div>
          
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-light leading-tight text-charcoal sm:text-6xl lg:text-[4.5rem]">
            Ready to transform your space into something{" "}
            <span className="text-gradient-gold font-normal">timeless</span>?
          </h2>
          
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-taupe lg:text-lg">
            Book a complimentary consultation with our design team and let&apos;s
            bring your vision to life. Experience the art of thoughtful design.
          </p>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <ButtonLink href="/contact" size="lg" className="group">
              Book a Consultation
              <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/projects" variant="ghost" size="lg" className="group">
              View Our Portfolio
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
          
          <p className="mx-auto mt-10 text-sm text-taupe/70">
            ✓ Free initial consultation · ✓ Custom design proposals · ✓ No obligation
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
