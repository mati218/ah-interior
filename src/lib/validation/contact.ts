import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().trim().min(2, "Please enter your full name").required("Name is required"),
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  phone: yup.string().trim().optional(),
  projectType: yup.string().trim().optional(),
  message: yup
    .string()
    .trim()
    .min(10, "Tell us a little more about your project")
    .required("Message is required"),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
