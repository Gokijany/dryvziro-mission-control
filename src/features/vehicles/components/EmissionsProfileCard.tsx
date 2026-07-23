import { TrendingDown, TrendingUp } from "lucide-react";
import type { EmissionsProfile } from "@/features/vehicles/types/vehicleDetail";

export function EmissionsProfileCard({ emissions }: { emissions: EmissionsProfile }) {
  const improving = emissions.netImpactKgPerDay < 0;
  const maxValue = Math.max(...emissions.chart.map((p) => p.value), 1);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="text-[13px] font-medium text-foreground">Emissions Profile</div>
        {improving ? (
          <TrendingDown className="h-4 w-4 text-success" />
        ) : (
          <TrendingUp className="h-4 w-4 text-destructive" />
        )}
      </div>
      <div className="mt-1 text-[11px] text-muted-foreground">{emissions.impactLabel}</div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className={`text-3xl font-semibold ${improving ? "text-foreground" : "text-destructive"}`}>
          {improving ? "" : "+"}
          {emissions.netImpactKgPerDay}
        </span>
        <span className="text-[12px] text-muted-foreground">kg CO2/day</span>
      </div>

      <div className="mt-auto flex h-24 items-end gap-2 pt-6">
        {emissions.chart.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`w-full rounded-sm ${improving ? "bg-success/70" : "bg-destructive/60"}`}
              style={{ height: `${Math.max(8, (point.value / maxValue) * 100)}%` }}
            />
            <span className="text-[9px] text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmissionsProfileCard;