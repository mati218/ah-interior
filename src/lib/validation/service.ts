import * as yup from "yup";

export const serviceSchema = yup.object({
  title: yup.string().trim().min(2).required("Title is required"),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .required("Slug is required"),
  summary: yup.string().trim().min(10).required("Summary is required"),
  description: yup.string().trim().min(20).required("Description is required"),
  icon: yup.string().trim().optional(),
  image: yup.string().trim().url("Must be a valid URL").optional(),
  sortOrder: yup.number().default(0),
});

export type ServiceFormValues = yup.InferType<typeof serviceSchema>;
