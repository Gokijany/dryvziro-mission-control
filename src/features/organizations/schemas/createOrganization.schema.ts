import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters"),

  registration_number: z
    .string()
    .min(2, "Registration number is required"),

  org_type: z.enum([
    "sacco",
    "napta",
    "government",
  ]),
});


export type CreateOrganizationFormValues =
  z.infer<typeof createOrganizationSchema>;