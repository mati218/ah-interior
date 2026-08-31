import type { TeamMember } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { TeamMemberFormValues } from "@/lib/validation/team";

export const teamHooks = createEntityHooks<TeamMember, TeamMemberFormValues>(
  "/api/team",
  "team"
);
