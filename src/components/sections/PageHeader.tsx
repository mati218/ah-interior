import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

export function PageHeader({ eyebrow, title, description, image }: PageHeaderProps) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] w-full items-end overflow-hidden bg-charcoal">
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover opacity-45"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-12">
        <FadeIn>
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
          )}
          <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/75">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
