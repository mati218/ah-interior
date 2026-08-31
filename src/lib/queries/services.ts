import type { Service } from "@prisma/client";
import { createEntityHooks } from "./createEntityHooks";
import type { ServiceFormValues } from "@/lib/validation/service";

export const serviceHooks = createEntityHooks<Service, ServiceFormValues>(
  "/api/services",
  "services"
);
