"use client";

import { Trophy } from "lucide-react";
import { useDriverScores } from "../../hooks/useAnalytics";

export default function DriverRankingTable() {
  const { data = [], isLoading } = useDriverScores();

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Driver Rankings
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Top performing drivers across the fleet
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
          <Trophy size={18} />
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
          Loading driver rankings...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center">
          <Trophy
            size={42}
            className="mb-3 text-muted-foreground/30"
          />

          <p className="text-sm text-muted-foreground">
            No driver rankings available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((driver) => (
            <div
              key={driver.driver_id}
              className="flex items-center justify-between border-b border-border/40 py-2 last:border-0"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                {/* Rank */}
                <span className="w-5 text-xs font-bold text-success">
                  {String(driver.rank).padStart(2, "0")}
                </span>

                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-sm font-semibold text-success">
                  {driver.driver_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Driver */}
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {driver.driver_name}
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Fleet Driver
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  {driver.score.toFixed(1)}%
                </div>

                <div
                  className={`text-[10px] font-bold tracking-wider ${
                    driver.score >= 95
                      ? "text-success"
                      : driver.score >= 90
                        ? "text-primary"
                        : "text-amber-500"
                  }`}
                >
                  {driver.score >= 95
                    ? "ELITE"
                    : driver.score >= 90
                      ? "EXCELLENT"
                      : "GOOD"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}