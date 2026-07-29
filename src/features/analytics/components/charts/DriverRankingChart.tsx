"use client";

import { Award, UserRound } from "lucide-react";

import { useDriverScores } from "../../hooks/useAnalytics";

export default function DriverRankingChart() {
  const {
    data = [],
    isLoading,
    isError,
  } = useDriverScores();

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border/60
        bg-card
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-border/60
          bg-muted/30
          px-6
          py-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <UserRound size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Driver Rankings
          </h3>

          <p className="text-sm text-muted-foreground">
            Performance leaderboard based on analytics.
          </p>
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Loading driver rankings...
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center text-sm text-destructive">
            Unable to load driver rankings.
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <UserRound
              size={44}
              className="mb-4 text-muted-foreground/30"
            />

            <h4 className="font-medium text-foreground">
              No Driver Rankings
            </h4>

            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              Driver performance analytics will appear once
              drivers are linked to completed trips.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((driver) => (
              <div
                key={driver.driver_id}
                className="
                  rounded-xl
                  border
                  border-border/50
                  bg-background
                  p-4
                  transition-all
                  duration-200
                  hover:border-primary/30
                  hover:shadow-sm
                "
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                        font-semibold
                        text-primary
                      "
                    >
                      #{driver.rank}
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">
                        {driver.driver_name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Driver Performance Score
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {driver.rank === 1 && (
                      <Award
                        size={18}
                        className="text-primary"
                      />
                    )}

                    <span className="text-lg font-semibold text-primary">
                      {driver.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.min(driver.score, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}