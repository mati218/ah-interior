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
  return <Icon size={26} strokeWidth={1.5} />;
}

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <FadeIn className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">What We Do</p>
          <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
            Our Services
          </h2>
        </FadeIn>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-4 bg-ivory p-8 transition-colors hover:bg-white"
              >
                <span className="text-gold">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="font-display text-xl text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed text-taupe">{service.summary}</p>
                <span className="mt-auto text-xs uppercase tracking-wider text-charcoal/60 transition-colors group-hover:text-gold">
                  Learn More →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
