"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";

import { Modal } from "@/components/shared/Modal";
import { FormErrorBanner } from "@/components/shared/FormErrorBanner";
import { useDeleteVehicle } from "@/features/vehicles/hooks/useVehicles";
import type { Vehicle } from "@/features/vehicles/types/vehicle";

interface DeleteVehicleDialogProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onDeleted?: () => void;
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (error.response?.status === 403) {
      return "You don't have permission to delete this vehicle.";
    }
  }
  return "Something went wrong deleting this vehicle. Please try again.";
}

export function DeleteVehicleDialog({ vehicle, onClose, onDeleted }: DeleteVehicleDialogProps) {
  const deleteVehicle = useDeleteVehicle();
  const open = vehicle !== null;

  const handleConfirm = () => {
    if (!vehicle) return;

    deleteVehicle.mutate(vehicle.id, {
      onSuccess: () => {
        onClose();
        onDeleted?.();
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete Vehicle" maxWidthClassName="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/15">
            <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
          </div>
          <p className="text-[13px] leading-relaxed text-foreground">
            Remove <span className="font-semibold">{vehicle?.license_plate}</span> from the
            active fleet? It will be archived, not permanently erased — an administrator can
            restore it later if needed.
          </p>
        </div>

        {deleteVehicle.isError && (
          <FormErrorBanner>{getErrorMessage(deleteVehicle.error)}</FormErrorBanner>
        )}

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleteVehicle.isPending}
            className="flex items-center gap-1.5 rounded-lg bg-destructive px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {deleteVehicle.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {deleteVehicle.isPending ? "Removing..." : "Remove Vehicle"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteVehicleDialog;