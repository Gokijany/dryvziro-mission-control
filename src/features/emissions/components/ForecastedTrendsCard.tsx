import type { ForecastTrendItem } from "../types/emissions";

interface Props {
  items: ForecastTrendItem[];
}

export function ForecastedTrendsCard({ items }: Props) {
  return (
    <div className="rounded-xl border border-primary/40 bg-card p-5 shadow-sm relative">
      <div className="text-[11px] font-semibold tracking-wider text-foreground mb-4">
        FORECASTED TRENDS (30D)
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-foreground font-medium">{item.label}</span>
              <span
                className={`font-semibold ${item.statusColor === "rose" ? "text-rose-400" : item.statusColor === "amber" ? "text-amber-400" : "text-primary"}`}
              >
                {item.value}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.statusColor === "rose" ? "bg-rose-400" : item.statusColor === "amber" ? "bg-amber-400" : "bg-primary"}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
