import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().trim().min(2).required("Name is required"),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .required("Slug is required"),
});

export type CategoryFormValues = yup.InferType<typeof categorySchema>;
