import type { VehicleTrackingStatus } from "@/features/tracking/types/telemetry";

export const STATUS_COLORS: Record<VehicleTrackingStatus, string> = {
  optimal: "#aee420", // brand lime
  idle: "#e8c547", // amber/yellow
  heavy_load: "#e17f25", // brand amber
  issue: "#e0453c", // red
};

const LEGEND_ITEMS: { status: VehicleTrackingStatus; label: string }[] = [
  { status: "optimal", label: "Optimal" },
  { status: "idle", label: "Idle" },
  { status: "heavy_load", label: "Heavy Load" },
  { status: "issue", label: "Issue" },
];

export function MapLegend() {
  return (
    <div className="flex items-center gap-4 rounded-full border border-white/10 bg-[#0b100c]/90 px-4 py-2 backdrop-blur-sm">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.status} className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: STATUS_COLORS[item.status] }}
          />
          <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MapLegend;