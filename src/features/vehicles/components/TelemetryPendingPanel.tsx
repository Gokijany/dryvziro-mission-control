import { RadioTower } from "lucide-react";
import type { DeviceSummary } from "@/features/vehicles/types/vehicle";

interface TelemetryPendingPanelProps {
  devices: DeviceSummary[];
}

interface TelemetryPendingBadgeProps {
  devices: DeviceSummary[];
}

export function TelemetryPendingBadge({
  devices,
}: TelemetryPendingBadgeProps) {
  const hasDevice = devices.length > 0;

  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-foreground">
      <RadioTower className="h-3.5 w-3.5" strokeWidth={1.75} />

      {hasDevice
        ? devices[0].device_serial
        : "No device paired"}
    </span>
  );
}

export function TelemetryPendingPanel({
  devices,
}: TelemetryPendingPanelProps) {
  const hasDevice = devices.length > 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="radar-ring absolute inset-0 rounded-full border border-primary/50" />

        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
          <RadioTower
            className="h-4 w-4 text-primary"
            strokeWidth={1.75}
          />
        </span>
      </div>

      {hasDevice ? (
        <>
          <p className="mt-4 text-[13px] font-medium text-foreground">
            Device Paired
          </p>

          <div className="mt-3 w-full max-w-sm space-y-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className="rounded-lg border border-border bg-card p-3 text-left"
              >
                <p className="text-[13px] font-medium text-foreground">
                  {device.device_serial}
                </p>

                <p className="text-[12px] text-muted-foreground">
                  Status: {device.status}
                </p>

                <p className="text-[12px] text-muted-foreground">
                  Firmware: {device.firmware_version ?? "Unknown"}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-[13px] font-medium text-foreground">
            No telemetry yet
          </p>

          <p className="mt-1 max-w-xs text-[12px] text-foreground">
            Emissions, maintenance, sensor, and trip data will appear here once
            a DVIU is paired with this vehicle.
          </p>
        </>
      )}
    </div>
  );
}

export default TelemetryPendingPanel;