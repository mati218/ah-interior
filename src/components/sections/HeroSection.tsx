"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

const Hero3D = dynamic(() => import("@/components/motion/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ image }: { image: string }) {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-charcoal">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt="A&H Interiors — signature interior design"
          fill
          priority
          className="object-cover opacity-55"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/10" />

      <div className="pointer-events-none absolute right-0 top-20 hidden h-[calc(100%-5rem)] w-1/2 lg:block">
        <Hero3D />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12"
      >
        <motion.p variants={item} className="text-xs uppercase tracking-[0.3em] text-gold">
          A&amp;H Interiors — Est. 2013
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl lg:text-7xl"
        >
          Spaces shaped by light, material &amp; calm.
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">
          A boutique interior design studio crafting warm, timeless homes and
          commercial spaces — built around how you actually live.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/projects" size="lg">
            View Our Work
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="border-cream text-cream hover:bg-cream hover:text-charcoal"
          >
            Book a Consultation
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
