import { AlertTriangle, ArrowRight } from "lucide-react";
import type { ActiveAlertItem } from "../types/dashboard";

interface Props {
  alerts: ActiveAlertItem[];
}

export function ActiveAlertsCard({ alerts }: Props) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-rose-400" /> Active Alerts
        </h2>
        <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400">3 CRITICAL</span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`rounded-lg border p-4 ${alert.severity === "CRITICAL" ? "border-rose-500/40 bg-rose-500/5" : "border-border/50 bg-background/50"}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold tracking-wider ${alert.severity === "CRITICAL" ? "text-rose-400" : "text-amber-400"}`}>
                {alert.title}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>

            {alert.description && (
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {alert.description}
              </p>
            )}

            {alert.actionable && (
              <div className="mt-3 flex items-center gap-2">
                <button className="rounded bg-rose-400/20 px-3 py-1 text-[10px] font-bold text-rose-300 hover:bg-rose-400/30 transition-colors">
                  DISPATCH ASSISTANCE
                </button>
                <button className="rounded px-3 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  IGNORE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-2 border-t border-border/40 text-center">
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          VIEW ALL ACTIVE ALERTS <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}