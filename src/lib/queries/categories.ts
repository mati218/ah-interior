import type { Category } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { CategoryFormValues } from "@/lib/validation/category";

export const categoryHooks = createEntityHooks<Category, CategoryFormValues>(
  "/api/categories",
  "categories"
);
