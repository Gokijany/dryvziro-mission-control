import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { MaintenanceHealth } from "@/features/vehicles/types/vehicleDetail";

function ProgressRow({ label, percent }: { label: string; percent: number }) {
  const colorClass = percent >= 80 ? "bg-success" : percent >= 50 ? "bg-warning" : "bg-destructive";

  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{percent}%</span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export function MaintenanceHealthCard({ maintenance }: { maintenance: MaintenanceHealth }) {
  const isAlert = maintenance.tone === "alert";

  return (
    <div
      className={`flex h-full flex-col rounded-xl border bg-card p-5 ${
        isAlert ? "border-destructive/50" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="text-[13px] font-medium text-foreground">Maintenance Health</div>
        {isAlert ? (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-success" />
        )}
      </div>

      <div className="mt-4 text-[10px] font-semibold tracking-widest text-muted-foreground">
        {maintenance.alertLabel}
      </div>
      <div className="mt-1 text-[13px] font-medium text-foreground">
        {maintenance.message}{" "}
        {maintenance.highlight && <span className="text-primary">{maintenance.highlight}</span>}
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <ProgressRow label="Battery Health" percent={maintenance.batteryHealthPercent} />
        <ProgressRow label="Brake Pad Life" percent={maintenance.brakePadLifePercent} />
      </div>
    </div>
  );
}

export default MaintenanceHealthCard;