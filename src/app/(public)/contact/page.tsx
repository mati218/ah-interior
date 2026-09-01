import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with A&H Interiors to start your next project.",
};

export default async function ContactPage() {
  const rows = await prisma.siteSetting.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<
    string,
    string
  >;

  const info = [
    { icon: Phone, label: "Phone", value: settings.companyPhone ?? "+1 (512) 555-0148" },
    { icon: Mail, label: "Email", value: settings.companyEmail ?? "hello@ahinteriors.com" },
    {
      icon: MapPin,
      label: "Studio",
      value: settings.companyAddress ?? "412 Congress Ave, Suite 300, Austin, TX 78701",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's start your project"
        description="Tell us about your space and we'll be in touch within one business day to schedule a consultation."
        image="https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="relative overflow-hidden bg-ivory py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,195,147,0.10),_transparent_30%)]" />
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="mb-16 max-w-3xl">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">Book a consultation</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              We design calm, measured interiors for the life you actually live.
            </h2>
          </div>

          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <FadeIn className="space-y-6">
              <div className="rounded-[28px] border border-border bg-white p-7 shadow-[0_20px_60px_rgba(17,17,17,0.04)]">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 border-b border-border/80 py-5 first:pt-0 last:border-b-0 last:pb-0">
                    <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <item.icon size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-taupe">{item.label}</p>
                      <p className="mt-2 text-base text-charcoal">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-border bg-obsidian p-7 text-ivory">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold-subtle">Studio hours</p>
                <div className="mt-5 space-y-2 text-sm text-stone">
                  <p>Monday – Friday, 9am – 6pm</p>
                  <p>By appointment on weekends</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="rounded-[30px] border border-border bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)] lg:p-10">
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
