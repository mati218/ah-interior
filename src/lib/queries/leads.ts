import type { Lead } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";

export const leadHooks = createEntityHooks<Lead, { status: string }>(
  "/api/leads",
  "leads"
);
