import { ShieldCheck } from "lucide-react";
import type { ComplianceZone } from "@/features/vehicles/types/fleetInsights";

function zoneColorClass(percent: number): string {
  if (percent >= 85) return "bg-success";
  if (percent >= 60) return "bg-warning";
  return "bg-destructive";
}

export function ComplianceRadarCard({ zones }: { zones: ComplianceZone[] }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
          COMPLIANCE RADAR
        </div>
        <ShieldCheck className="h-4 w-4 text-primary" />
      </div>

      <div className="mt-4 flex-1 space-y-4">
        {zones.map((zone) => (
          <div key={zone.id}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-foreground">{zone.label}</span>
              <span className="font-medium text-muted-foreground">{zone.percent}%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${zoneColorClass(zone.percent)}`}
                style={{ width: `${zone.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplianceRadarCard;