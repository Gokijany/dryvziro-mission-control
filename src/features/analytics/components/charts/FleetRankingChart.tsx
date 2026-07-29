"use client";

import { Trophy, Truck } from "lucide-react";

import { useFleetScores } from "../../hooks/useAnalytics";

export default function FleetRankingChart() {
  const {
    data = [],
    isLoading,
    isError,
  } = useFleetScores();

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Truck size={18} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Fleet Rankings
            </h3>

            <p className="text-sm text-muted-foreground">
              Vehicle performance overview
            </p>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        {isLoading ? (
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            Loading fleet rankings...
          </div>
        ) : isError ? (
          <div className="flex h-72 items-center justify-center text-sm text-destructive">
            Failed to load fleet rankings.
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>

            <h4 className="text-sm font-semibold text-foreground">
              No Fleet Data
            </h4>

            <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
              Rankings will appear once vehicles begin generating
              trip analytics.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((vehicle) => (
              <div
                key={vehicle.vehicle_id}
                className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {vehicle.rank}
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        {vehicle.vehicle}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {vehicle.distance_km.toFixed(1)} km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {vehicle.rank === 1 && (
                      <Trophy
                        size={16}
                        className="text-primary"
                      />
                    )}

                    <span className="text-sm font-semibold text-foreground">
                      {vehicle.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.min(vehicle.score, 100)}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Efficiency {vehicle.efficiency.toFixed(2)}
                  </span>

                  <span>
                    {vehicle.emissions_g_co2.toLocaleString()} g CO₂
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}