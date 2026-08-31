import { createEntityHooks } from "./createEntityHooks";
import type { UserFormValues } from "@/lib/validation/user";

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "EDITOR";
  createdAt: string;
}

export const userHooks = createEntityHooks<SafeUser, UserFormValues>("/api/users", "users");
