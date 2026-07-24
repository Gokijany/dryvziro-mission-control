"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isAxiosError } from "axios";

import { Modal } from "@/components/shared/Modal";
import { FormErrorBanner } from "@/components/shared/FormErrorBanner";
import { useAuthStore } from "@/store/auth.store";
import { isCrossOrganizationRole } from "@/lib/roles";
import { useCreateVehicle } from "@/features/vehicles/hooks/useVehicles";
import { useOrganizations } from "@/features/organizations/hooks/useOrganizations";
import {
  createVehicleSchema,
  type CreateVehicleFormValues,
} from "@/features/vehicles/schemas/createVehicle.schema";
import type { VehicleStatus } from "@/features/vehicles/types/vehicle";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: VehicleStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
  { value: "decommissioned", label: "Decommissioned" },
];

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (error.response?.status === 409) return "That VIN or license plate is already in use.";
    if (error.response?.status === 403) {
      return "You don't have permission to add a vehicle for this organization.";
    }
  }
  return "Something went wrong creating this vehicle. Please try again.";
}

export function AddVehicleModal({ open, onClose }: AddVehicleModalProps) {
  const user = useAuthStore((state) => state.user);
  const crossOrg = isCrossOrganizationRole(user?.role);

  // Platform-level roles (gokijany_admin, napta_admin, government_auditor)
  // aren't tied to a single organization, so they pick one explicitly.
  // Org-scoped roles (sacco_admin, etc.) get their own org auto-filled.
  const organizationsQuery = useOrganizations(open && crossOrg);
  const organizations = organizationsQuery.data ?? [];

  const defaultOrganizationId = crossOrg ? "" : (user?.organization_id ?? "");

  const createVehicle = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      organization_id: defaultOrganizationId,
      vin: "",
      license_plate: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      status: "active",
    },
  });

  // Reset the form each time the modal opens, in case the account or
  // available organizations changed since the last time it was open.
  useEffect(() => {
    if (open) {
      reset({
        organization_id: defaultOrganizationId,
        vin: "",
        license_plate: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        status: "active",
      });
      createVehicle.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultOrganizationId]);

  const onSubmit = (values: CreateVehicleFormValues) => {
    createVehicle.mutate(
      {
        ...values,
        organization_id: values.organization_id === "" ? null : values.organization_id,
      },
      { onSuccess: () => onClose() },
    );
  };

  // Genuine edge case: an org-scoped role with no organization_id set on
  // their account. Not expected in normal operation, but fail clearly
  // rather than silently submitting an empty organization_id.
  const accountHasNoOrg = !crossOrg && !user?.organization_id;

  const noOrganizationsAvailable = crossOrg && !organizationsQuery.isLoading && organizations.length === 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Vehicle"
      description="Register a new vehicle to your fleet."
    >
      {accountHasNoOrg ? (
        <FormErrorBanner>
          Your account isn&apos;t associated with an organization, so vehicle creation isn&apos;t
          available here yet.
        </FormErrorBanner>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {crossOrg && (
            <div>
              <label htmlFor="organization_id" className="text-[12px] font-medium text-foreground">
                Organization
              </label>
              <select
                id="organization_id"
                {...register("organization_id")}
                disabled={organizationsQuery.isLoading}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50 disabled:opacity-60"
              >
                <option value="">No organization (personal vehicle)</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
              {organizationsQuery.isLoading && (
                <p className="mt-1 text-[11px] text-muted-foreground">Loading organizations...</p>
              )}
              {errors.organization_id && (
                <p className="mt-1 text-[11px] text-destructive">
                  {errors.organization_id.message}
                </p>
              )}
              {organizationsQuery.isError && (
                <p className="mt-1 text-[11px] text-destructive">
                  Couldn&apos;t load organizations. Try closing and reopening this form.
                </p>
              )}
              {noOrganizationsAvailable && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  No organizations exist yet.
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="license_plate" className="text-[12px] font-medium text-foreground">
              License Plate
            </label>
            <input
              id="license_plate"
              {...register("license_plate")}
              placeholder="KDL 214M"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
            />
            {errors.license_plate && (
              <p className="mt-1 text-[11px] text-destructive">{errors.license_plate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="vin" className="text-[12px] font-medium text-foreground">
              VIN
            </label>
            <input
              id="vin"
              {...register("vin")}
              placeholder="1HGCM82633A004352"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
            />
            {errors.vin && <p className="mt-1 text-[11px] text-destructive">{errors.vin.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="make" className="text-[12px] font-medium text-foreground">
                Make
              </label>
              <input
                id="make"
                {...register("make")}
                placeholder="Scania"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
              />
              {errors.make && <p className="mt-1 text-[11px] text-destructive">{errors.make.message}</p>}
            </div>
            <div>
              <label htmlFor="model" className="text-[12px] font-medium text-foreground">
                Model
              </label>
              <input
                id="model"
                {...register("model")}
                placeholder="P360"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
              />
              {errors.model && (
                <p className="mt-1 text-[11px] text-destructive">{errors.model.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="year" className="text-[12px] font-medium text-foreground">
                Year
              </label>
              <input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
              />
              {errors.year && <p className="mt-1 text-[11px] text-destructive">{errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="status" className="text-[12px] font-medium text-foreground">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {createVehicle.isError && <FormErrorBanner>{getErrorMessage(createVehicle.error)}</FormErrorBanner>}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createVehicle.isPending}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {createVehicle.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {createVehicle.isPending ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default AddVehicleModal;