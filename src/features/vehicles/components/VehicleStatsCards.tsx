import { Monitor, HeartPulse, Wind } from "lucide-react";

interface VehicleStatsCardsProps {
  totalVehicles: number;
  activeVehicles: number;
}

export function VehicleStatsCards({ totalVehicles, activeVehicles }: VehicleStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Fleet */}
      <div className="flex items-start justify-between rounded-xl border border-border bg-card p-5">
        <div>
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            TOTAL FLEET
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold text-foreground">
              {totalVehicles.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-success">
              {activeVehicles.toLocaleString()} Active
            </span>
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Registered vehicles across your organization.
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Monitor className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
        </div>
      </div>

      {/* Fleet Health - pending telemetry integration */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            FLEET HEALTH
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <HeartPulse className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </div>
        </div>
        <div className="mt-2 text-2xl font-semibold text-muted-foreground">—</div>
        <div className="mt-2 text-[11px] text-muted-foreground">
          Awaiting device/telemetry integration.
        </div>
      </div>

      {/* Avg Emissions - pending telemetry integration */}
      <div className="flex items-start justify-between rounded-xl border border-border bg-card p-5">
        <div>
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            AVG EMISSIONS
          </div>
          <div className="mt-2 text-2xl font-semibold text-muted-foreground">—</div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Awaiting device/telemetry integration.
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Wind className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

export default VehicleStatsCards;