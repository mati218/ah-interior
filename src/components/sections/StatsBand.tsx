import { FadeIn } from "@/components/motion/FadeIn";
import { Award, Building2, MapPin, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Years of Craft", value: "13+", icon: Award },
  { label: "Projects Completed", value: "200+", icon: Building2 },
  { label: "Cities Served", value: "12", icon: MapPin },
  { label: "Client Satisfaction", value: "98%", icon: TrendingUp },
];

export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal text-ivory">
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gold/5 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-bronze/5 to-transparent" />
      
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-6 py-20 sm:grid-cols-4 lg:gap-16 lg:px-12 lg:py-24">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={stat.label} delay={i * 0.15} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-bronze/10 backdrop-blur-sm">
                <Icon className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
              </div>
              <p className="bg-gradient-to-r from-gold-light via-gold to-bronze bg-clip-text font-display text-5xl font-light text-transparent sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ivory/70">
                {stat.label}
              </p>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
