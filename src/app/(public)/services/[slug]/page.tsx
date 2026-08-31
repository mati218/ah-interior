import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import * as Icons from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTABanner } from "@/components/sections/CTABanner";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const Icon =
    (service.icon && (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon]) ||
    Icons.Sparkles;

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pt-40 pb-20 lg:px-12 lg:pt-48">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="text-gold">
              <Icon size={32} strokeWidth={1.5} />
            </span>
            <h1 className="mt-6 font-display text-4xl text-charcoal sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {service.description}
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact" size="lg">
                Enquire About This Service
              </ButtonLink>
            </div>
          </FadeIn>

          {service.image && (
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
