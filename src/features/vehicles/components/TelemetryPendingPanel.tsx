import { RadioTower } from "lucide-react";

export function TelemetryPendingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
      <RadioTower className="h-3.5 w-3.5" strokeWidth={1.75} />
      No device paired
    </span>
  );
}

export function TelemetryPendingPanel() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="radar-ring absolute inset-0 rounded-full border border-primary/50" />
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
          <RadioTower className="h-4 w-4 text-primary" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 text-[13px] font-medium text-foreground">No telemetry yet</p>
      <p className="mt-1 max-w-xs text-[12px] text-muted-foreground">
        Emissions, maintenance, sensor, and trip data will appear here once a DVIU is paired
        with this vehicle.
      </p>
    </div>
  );
}

export default TelemetryPendingPanel;