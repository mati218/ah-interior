import type { BlogPost } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { BlogPostFormValues } from "@/lib/validation/blog";

export const blogHooks = createEntityHooks<BlogPost, BlogPostFormValues>(
  "/api/blog",
  "blog"
);
