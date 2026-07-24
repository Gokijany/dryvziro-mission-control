import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createVehicleSchema = z.object({
  // Empty string = unaffiliated/personal vehicle (no organization).
  // Converted to null before hitting the API — see AddVehicleModal's
  // onSubmit. Kept as a plain string here (not z.string().uuid().nullable())
  // to avoid an input/output type mismatch between react-hook-form and
  // the zod resolver.
  organization_id: z
    .string()
    .refine((value) => value === "" || z.string().uuid().safeParse(value).success, {
      message: "Invalid organization selected.",
    }),
  vin: z
    .string()
    .trim()
    .min(5, "VIN must be at least 5 characters.")
    .max(50, "VIN must be 50 characters or fewer."),
  license_plate: z
    .string()
    .trim()
    .min(2, "License plate is required.")
    .max(20, "License plate must be 20 characters or fewer."),
  make: z.string().trim().min(1, "Make is required.").max(100),
  model: z.string().trim().min(1, "Model is required.").max(100),
  year: z
    .number()
    .int("Year must be a whole number.")
    .min(1980, "Year seems too old.")
    .max(currentYear + 1, `Year can't be later than ${currentYear + 1}.`),
  status: z.enum(["active", "inactive", "maintenance", "decommissioned"]),
});

export type CreateVehicleFormValues = z.infer<typeof createVehicleSchema>;