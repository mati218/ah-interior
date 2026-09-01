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
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-ivory to-cream-dark">
      {/* Decorative Elements */}
      <div className="absolute left-[-5%] top-[10%] h-80 w-80 rounded-full bg-gradient-to-br from-gold/10 to-transparent blur-3xl" />
      <div className="absolute bottom-[10%] right-[-5%] h-80 w-80 rounded-full bg-gradient-to-tl from-bronze/10 to-transparent blur-3xl" />
      
      <div className="relative mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
        <FadeIn className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Client Words</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="mt-6 font-display text-5xl font-light text-charcoal sm:text-6xl lg:text-[4rem]">
            What They Say
          </h2>
        </FadeIn>

        <div className="relative mx-auto mt-20 max-w-4xl text-center">
          {/* Quote Icon */}
          <div className="absolute left-1/2 top-[-2rem] -translate-x-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-bronze/10 backdrop-blur-sm">
              <Quote className="h-8 w-8 text-gold" strokeWidth={1.5} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-4"
            >
              <p className="font-display text-3xl font-light leading-relaxed text-charcoal sm:text-4xl lg:text-[2.75rem]">
                &ldquo;{current.message}&rdquo;
              </p>
              
              <div className="mt-12 flex items-center justify-center gap-4">
                {current.avatar && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/20 ring-offset-4">
                    <Image src={current.avatar} alt={current.clientName} fill className="object-cover" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-lg font-medium text-charcoal">{current.clientName}</p>
                  {current.role && <p className="text-sm text-taupe">{current.role}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="mt-14 flex items-center justify-center gap-8">
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white/50 text-charcoal/60 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2.5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === index ? "w-10 bg-gradient-to-r from-gold to-bronze" : "w-2 bg-border hover:bg-gold/40"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={next}
                aria-label="Next"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white/50 text-charcoal/60 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
