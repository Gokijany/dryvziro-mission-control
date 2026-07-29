"use client";

import { Truck } from "lucide-react";
import { useFleetScores } from "../../hooks/useAnalytics";

export default function FleetRankingTable() {
  const { data = [], isLoading } = useFleetScores();

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Fleet Rankings
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Highest performing vehicles across the fleet
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
          <Truck size={18} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
          Loading fleet rankings...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center">
          <Truck
            size={42}
            className="mb-3 text-muted-foreground/30"
          />

          <p className="text-sm text-muted-foreground">
            No fleet rankings available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((vehicle) => (
            <div
              key={vehicle.vehicle_id}
              className="flex items-center justify-between border-b border-border/40 py-2 last:border-0"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                {/* Rank */}
                <span className="w-5 text-xs font-bold text-success">
                  {String(vehicle.rank).padStart(2, "0")}
                </span>

                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-xs font-semibold text-success">
                  {vehicle.vehicle.split(" ")[0]}
                </div>

                {/* Vehicle */}
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {vehicle.vehicle}
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {vehicle.distance_km.toFixed(0)} KM •{" "}
                    {vehicle.efficiency.toFixed(1)} KM/L
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  {vehicle.score.toFixed(1)}%
                </div>

                <div
                  className={`text-[10px] font-bold tracking-wider ${
                    vehicle.score >= 95
                      ? "text-success"
                      : vehicle.score >= 90
                        ? "text-primary"
                        : "text-amber-500"
                  }`}
                >
                  {vehicle.score >= 95
                    ? "ELITE"
                    : vehicle.score >= 90
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