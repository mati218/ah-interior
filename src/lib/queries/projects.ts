import type { Prisma } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { ProjectFormValues } from "@/lib/validation/project";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: { category: true; images: true };
}>;

export type ProjectInput = ProjectFormValues & { images: string[] };

export const projectHooks = createEntityHooks<ProjectWithRelations, ProjectInput>(
  "/api/projects",
  "projects"
);
