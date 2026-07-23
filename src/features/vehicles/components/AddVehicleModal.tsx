"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";

import { Modal } from "@/components/shared/Modal";
import { useAuthStore } from "@/store/auth.store";
import { useCreateVehicle } from "@/features/vehicles/hooks/useVehicles";
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
  const organizationId = useAuthStore((state) => state.user?.organization_id ?? null);
  const createVehicle = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      organization_id: organizationId ?? "",
      vin: "",
      license_plate: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      status: "active",
    },
  });

  // Reset the form each time the modal opens, in case organization_id
  // changes (e.g. switching accounts) or a previous attempt left stale data.
  useEffect(() => {
    if (open) {
      reset({
        organization_id: organizationId ?? "",
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
  }, [open, organizationId]);

  const onSubmit = (values: CreateVehicleFormValues) => {
    createVehicle.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!organizationId) {
    return (
      <Modal open={open} onClose={onClose} title="Add Vehicle">
        <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-[13px] text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Your account isn&apos;t associated with an organization, so vehicle creation isn&apos;t
          available here yet.
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Vehicle"
      description="Register a new vehicle to your fleet."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {createVehicle.isError && (
          <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-[13px] text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {getErrorMessage(createVehicle.error)}
          </div>
        )}

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
    </Modal>
  );
}

export default AddVehicleModal;