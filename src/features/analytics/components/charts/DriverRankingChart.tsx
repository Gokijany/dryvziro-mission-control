"use client";

import { Award, UserRound } from "lucide-react";
import { useDriverScores } from "../../hooks/useAnalytics";

export default function DriverRankingChart() {
  const { data: drivers = [] } = useDriverScores();

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Driver Rankings
          </h2>

          <p className="text-[11px] text-muted-foreground">
            Best performing drivers
          </p>
        </div>

        <Award className="h-5 w-5 text-primary" />
      </div>

      <div className="space-y-4">
        {drivers.map((driver) => (
          <div
            key={driver.driver_id}
            className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 text-xs font-bold text-foreground">
                {driver.rank}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                <UserRound className="h-4 w-4" />
              </div>

              <div>
                <div className="text-sm font-medium text-foreground">
                  {driver.driver_name}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  DRIVER
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                {driver.score.toFixed(1)}%
              </div>

              <div className="text-[10px] font-bold tracking-wider text-primary">
                PERFORMANCE
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}