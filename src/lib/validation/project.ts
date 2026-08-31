import * as yup from "yup";

export const projectSchema = yup.object({
  title: yup.string().trim().min(2).required("Title is required"),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .required("Slug is required"),
  summary: yup.string().trim().min(10).required("Summary is required"),
  description: yup.string().trim().min(20).required("Description is required"),
  coverImage: yup.string().trim().url("Must be a valid URL").required("Cover image is required"),
  location: yup.string().trim().optional(),
  area: yup.string().trim().optional(),
  year: yup
    .number()
    .transform((v, orig) => (orig === "" ? undefined : v))
    .min(1990)
    .max(2100)
    .optional(),
  categoryId: yup.string().trim().optional(),
  featured: yup.boolean().default(false),
  status: yup.mixed<"DRAFT" | "PUBLISHED">().oneOf(["DRAFT", "PUBLISHED"]).required(),
});

export type ProjectFormValues = yup.InferType<typeof projectSchema>;
