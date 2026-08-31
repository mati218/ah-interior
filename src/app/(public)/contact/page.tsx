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

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <FadeIn className="flex flex-col gap-10">
            {info.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="mt-1 text-gold">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-taupe">{item.label}</p>
                  <p className="mt-1 text-sm text-charcoal">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 border-t border-border pt-8">
              <p className="text-xs uppercase tracking-wider text-taupe">Studio Hours</p>
              <p className="mt-2 text-sm text-charcoal">Monday – Friday, 9am – 6pm</p>
              <p className="text-sm text-charcoal">By appointment on weekends</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="border border-border bg-white p-8 lg:p-10">
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
