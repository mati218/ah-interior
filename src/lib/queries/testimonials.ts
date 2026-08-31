import type { Testimonial } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { TestimonialFormValues } from "@/lib/validation/testimonial";

export const testimonialHooks = createEntityHooks<Testimonial, TestimonialFormValues>(
  "/api/testimonials",
  "testimonials"
);
