import * as yup from "yup";

export const blogPostSchema = yup.object({
  title: yup.string().trim().min(2).required("Title is required"),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .required("Slug is required"),
  excerpt: yup.string().trim().min(10).required("Excerpt is required"),
  content: yup.string().trim().min(20).required("Content is required"),
  coverImage: yup.string().trim().url("Must be a valid URL").required("Cover image is required"),
  status: yup.mixed<"DRAFT" | "PUBLISHED">().oneOf(["DRAFT", "PUBLISHED"]).required(),
});

export type BlogPostFormValues = yup.InferType<typeof blogPostSchema>;
