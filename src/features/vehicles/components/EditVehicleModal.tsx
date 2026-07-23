"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";

import { Modal } from "@/components/shared/Modal";
import { useUpdateVehicle } from "@/features/vehicles/hooks/useVehicles";
import {
  updateVehicleSchema,
  type UpdateVehicleFormValues,
} from "@/features/vehicles/schemas/updateVehicle.schema";
import type { Vehicle, VehicleStatus } from "@/features/vehicles/types/vehicle";

interface EditVehicleModalProps {
  vehicle: Vehicle | null;
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
      return "You don't have permission to edit this vehicle.";
    }
  }
  return "Something went wrong updating this vehicle. Please try again.";
}

export function EditVehicleModal({ vehicle, onClose }: EditVehicleModalProps) {
  const updateVehicle = useUpdateVehicle();
  const open = vehicle !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateVehicleFormValues>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      vin: "",
      license_plate: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      status: "active",
    },
  });

  // Re-populate the form whenever a different vehicle is opened for editing.
  useEffect(() => {
    if (vehicle) {
      reset({
        vin: vehicle.vin,
        license_plate: vehicle.license_plate,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        status: vehicle.status,
      });
      updateVehicle.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle]);

  const onSubmit = (values: UpdateVehicleFormValues) => {
    if (!vehicle) return;

    updateVehicle.mutate(
      { id: vehicle.id, payload: values },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Vehicle"
      description={vehicle ? `Update details for ${vehicle.license_plate}.` : undefined}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="edit_license_plate" className="text-[12px] font-medium text-foreground">
            License Plate
          </label>
          <input
            id="edit_license_plate"
            {...register("license_plate")}
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
          />
          {errors.license_plate && (
            <p className="mt-1 text-[11px] text-destructive">{errors.license_plate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="edit_vin" className="text-[12px] font-medium text-foreground">
            VIN
          </label>
          <input
            id="edit_vin"
            {...register("vin")}
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
          />
          {errors.vin && <p className="mt-1 text-[11px] text-destructive">{errors.vin.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="edit_make" className="text-[12px] font-medium text-foreground">
              Make
            </label>
            <input
              id="edit_make"
              {...register("make")}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
            />
            {errors.make && <p className="mt-1 text-[11px] text-destructive">{errors.make.message}</p>}
          </div>
          <div>
            <label htmlFor="edit_model" className="text-[12px] font-medium text-foreground">
              Model
            </label>
            <input
              id="edit_model"
              {...register("model")}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
            />
            {errors.model && (
              <p className="mt-1 text-[11px] text-destructive">{errors.model.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="edit_year" className="text-[12px] font-medium text-foreground">
              Year
            </label>
            <input
              id="edit_year"
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary/50"
            />
            {errors.year && <p className="mt-1 text-[11px] text-destructive">{errors.year.message}</p>}
          </div>
          <div>
            <label htmlFor="edit_status" className="text-[12px] font-medium text-foreground">
              Status
            </label>
            <select
              id="edit_status"
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

        {updateVehicle.isError && (
          <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-[13px] text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {getErrorMessage(updateVehicle.error)}
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
            disabled={updateVehicle.isPending}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {updateVehicle.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {updateVehicle.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditVehicleModal;