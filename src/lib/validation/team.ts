import * as yup from "yup";

export const teamMemberSchema = yup.object({
  name: yup.string().trim().min(2).required("Name is required"),
  role: yup.string().trim().min(2).required("Role is required"),
  bio: yup.string().trim().optional(),
  photo: yup.string().trim().url("Must be a valid URL").optional(),
  sortOrder: yup.number().default(0),
});

export type TeamMemberFormValues = yup.InferType<typeof teamMemberSchema>;
