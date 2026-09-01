import Link from "next/link";
import * as Icons from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  icon: string | null;
}

function ServiceIcon({ name }: { name: string | null }) {
  const Icon = (name && (Icons as unknown as Record<string, Icons.LucideIcon>)[name]) || Icons.Sparkles;
  return <Icon size={28} strokeWidth={1.5} />;
}

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-b from-ivory via-white to-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
        <FadeIn className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-xs uppercase tracking-[0.25em] text-gold">What We Do</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="mt-6 font-display text-5xl font-light text-charcoal sm:text-6xl lg:text-[4rem]">
            Our Services
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-taupe lg:text-lg">
            Comprehensive design solutions tailored to your unique vision and lifestyle
          </p>
        </FadeIn>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-2xl shadow-charcoal/5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col gap-5 overflow-hidden bg-white p-10 transition-all duration-500 hover:bg-gradient-to-br hover:from-ivory hover:to-white hover:shadow-xl"
              >
                {/* Decorative Corner Accent */}
                <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:from-gold/30 group-hover:to-gold/20">
                  <ServiceIcon name={service.icon} />
                </span>
                
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-light text-charcoal transition-colors duration-500 group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-taupe">
                    {service.summary}
                  </p>
                </div>
                
                <span className="relative z-10 mt-auto flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal/60 transition-all duration-500 group-hover:gap-3 group-hover:text-gold">
                  Learn More 
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
