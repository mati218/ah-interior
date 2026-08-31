"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

interface TestimonialItem {
  id: string;
  clientName: string;
  role: string | null;
  message: string;
  avatar: string | null;
}

export function TestimonialSlider({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
      <FadeIn className="flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Client Words</p>
        <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
          What They Say
        </h2>
      </FadeIn>

      <div className="relative mx-auto mt-14 max-w-2xl text-center">
        <Quote className="mx-auto text-gold/40" size={40} />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <p className="font-display text-2xl leading-relaxed text-charcoal sm:text-3xl">
              &ldquo;{current.message}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              {current.avatar && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={current.avatar} alt={current.clientName} fill className="object-cover" />
                </div>
              )}
              <div className="text-left">
                <p className="text-sm text-charcoal">{current.clientName}</p>
                {current.role && <p className="text-xs text-taupe">{current.role}</p>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button onClick={prev} aria-label="Previous" className="text-charcoal/60 hover:text-gold">
              <ChevronLeft size={22} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === index ? "bg-gold" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="text-charcoal/60 hover:text-gold">
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
