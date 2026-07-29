"use client";

import { useState } from "react";
import { useAssignDevice } from "../hooks/useDevices";
import type { DeviceResponse } from "../types/devices";
import { X, Link2, Unlink, Loader2 } from "lucide-react";

interface Props {
  device: DeviceResponse;
  onClose: () => void;
}

export function AssignDeviceModal({ device, onClose }: Props) {
  const [vehicleId, setVehicleId] = useState(device.vehicle_id || "");
  const [reason, setReason] = useState("");
  const assignMutation = useAssignDevice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignMutation.mutate(
      {
        deviceId: device.id,
        payload: {
          vehicle_id: vehicleId.trim() === "" ? null : vehicleId.trim(),
          reason: reason || undefined,
        },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-border/80 bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            {device.vehicle_id ? (
              <Unlink className="h-4 w-4 text-amber-400" />
            ) : (
              <Link2 className="h-4 w-4 text-primary" />
            )}
            Manage Device Pairing
          </h3>
          <button onClick={onClose} className="text-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              Target Device Serial
            </label>
            <p className="text-xs font-mono font-bold text-foreground mt-1">
              {device.device_serial}
            </p>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              Vehicle UUID
            </label>
            <input
              type="text"
              placeholder="Leave empty to unassign device"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-foreground focus:outline-none focus:border-primary shadow-sm"
            />
            <span className="text-[10px] text-foreground mt-1 block">
              Provide a valid Vehicle UUID to pair, or clear the input to unassign.
            </span>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              Reason / Audit Log Note
            </label>
            <input
              type="text"
              placeholder="e.g. Initial installation or Device swap"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-foreground focus:outline-none focus:border-primary shadow-sm"
            />
          </div>

          {assignMutation.isError && (
            <p className="text-xs font-semibold text-rose-400">
              {(assignMutation.error as Error).message}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={assignMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {assignMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save
              Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
