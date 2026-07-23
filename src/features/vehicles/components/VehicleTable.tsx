"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import type { Vehicle } from "@/features/vehicles/types/vehicle";
import { VehicleStatusBadge } from "./VehicleStatusBadge";
import { TelemetryPendingBadge } from "./TelemetryPendingPanel";
import { VehicleRowActionsMenu } from "./VehicleRowActionsMenu";

interface VehicleTableProps {
  vehicles: Vehicle[];
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export function VehicleTable({
  vehicles,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  const router = useRouter();
  const allSelected = vehicles.length > 0 && selectedIds.size === vehicles.length;

  const goToDetail = (vehicle: Vehicle) => {
    router.push(`/vehicles/${vehicle.id}`);
  };

  return (
    <table className="w-full min-w-180 border-collapse text-left">
      <thead>
        <tr className="border-b border-border">
          <th className="w-10 px-4 py-2.5">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleAll}
              className="h-3.5 w-3.5 rounded border-border accent-primary"
              aria-label="Select all vehicles"
            />
          </th>
          <th className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">
            REGISTRATION
          </th>
          <th className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">
            OPERATOR
          </th>
          <th className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">
            STATUS
          </th>
          <th className="px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">
            TELEMETRY
          </th>
          <th className="w-10 px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => {
          const selected = selectedIds.has(vehicle.id);
          return (
            <tr
              key={vehicle.id}
              role="link"
              tabIndex={0}
              onClick={() => goToDetail(vehicle)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToDetail(vehicle);
                }
              }}
              aria-label={`View details for ${vehicle.license_plate}`}
              className={`group cursor-pointer border-b border-border/60 outline-none transition-colors last:border-0 focus-visible:bg-muted/50 ${
                selected ? "bg-primary/6" : "hover:bg-muted/40"
              }`}
            >
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggleRow(vehicle.id)}
                  className="h-3.5 w-3.5 rounded border-border accent-primary"
                  aria-label={`Select ${vehicle.license_plate}`}
                />
              </td>
              <td className="px-3 py-3">
                <div className="text-[13px] font-semibold text-foreground group-hover:text-primary">
                  {vehicle.license_plate}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </div>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15">
                    <Star className="h-3 w-3 text-success" fill="currentColor" />
                  </span>
                  <span className="text-[13px] text-foreground">
                    {vehicle.organization?.name ?? "—"}
                  </span>
                </div>
              </td>
              <td className="px-3 py-3">
                <VehicleStatusBadge status={vehicle.status} />
              </td>
              <td className="px-3 py-3">
                <TelemetryPendingBadge />
              </td>
              <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                <VehicleRowActionsMenu vehicle={vehicle} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default VehicleTable;