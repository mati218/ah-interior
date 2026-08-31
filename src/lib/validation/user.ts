import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().trim().min(2).required("Name is required"),
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  role: yup.mixed<"OWNER" | "ADMIN" | "EDITOR">().oneOf(["OWNER", "ADMIN", "EDITOR"]).required(),
});

export type UserFormValues = yup.InferType<typeof userSchema>;
