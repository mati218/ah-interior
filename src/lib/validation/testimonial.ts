import * as yup from "yup";

export const testimonialSchema = yup.object({
  clientName: yup.string().trim().min(2).required("Client name is required"),
  role: yup.string().trim().optional(),
  message: yup.string().trim().min(10).required("Message is required"),
  avatar: yup.string().trim().url("Must be a valid URL").optional(),
  rating: yup.number().min(1).max(5).default(5),
  featured: yup.boolean().default(false),
  projectId: yup.string().trim().optional(),
});

export type TestimonialFormValues = yup.InferType<typeof testimonialSchema>;
