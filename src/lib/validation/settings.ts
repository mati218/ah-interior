import * as yup from "yup";

export const settingsSchema = yup.object({
  companyPhone: yup.string().trim().optional(),
  companyEmail: yup.string().trim().email("Enter a valid email").optional(),
  companyAddress: yup.string().trim().optional(),
  instagram: yup.string().trim().optional(),
  facebook: yup.string().trim().optional(),
  linkedin: yup.string().trim().optional(),
  pinterest: yup.string().trim().optional(),
});

export type SettingsFormValues = yup.InferType<typeof settingsSchema>;
