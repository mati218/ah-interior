import { FadeIn } from "@/components/motion/FadeIn";

const STATS = [
  { label: "Years of Craft", value: "12+" },
  { label: "Projects Completed", value: "180+" },
  { label: "Cities Served", value: "9" },
  { label: "Client Satisfaction", value: "98%" },
];

export function StatsBand() {
  return (
    <section className="border-y border-border bg-charcoal text-cream">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4 lg:px-12">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-4xl text-gold sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-cream/70">
              {stat.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
