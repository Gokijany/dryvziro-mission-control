import { Truck } from "lucide-react";
import type { Vehicle } from "@/features/vehicles/types/vehicle";
import { VehicleStatusBadge } from "./VehicleStatusBadge";

interface VehicleHeroCardProps {
  vehicle: Vehicle;
}

export function VehicleHeroCard({ vehicle }: VehicleHeroCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-start">
      {/* Image placeholder — no fleet photo source exists yet */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-56">
        <div className="flex h-full w-full items-center justify-center">
          <Truck className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.25} />
        </div>
        <span className="absolute bottom-2 left-2">
          <VehicleStatusBadge status={vehicle.status} />
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl font-semibold text-foreground">{vehicle.license_plate}</h2>
            <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            <div>
              <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                VIN
              </div>
              <div className="mt-0.5 truncate text-[13px] font-medium text-foreground">
                {vehicle.vin}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                OPERATOR
              </div>
              <div className="mt-0.5 text-[13px] font-medium text-foreground">
                {vehicle.organization?.name ?? "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                STATUS
              </div>
              <div className="mt-0.5">
                <VehicleStatusBadge status={vehicle.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleHeroCard;