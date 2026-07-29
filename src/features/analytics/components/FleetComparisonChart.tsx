"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BarChart3 } from "lucide-react";

import { useFleetScores } from "../hooks/useAnalytics";

export default function FleetComparisonChart() {
  const {
    data = [],
    isLoading,
    isError,
  } = useFleetScores();

  return (
    <div
      className="
        rounded-2xl
        border
        border-border
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
          border-border
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
          <BarChart3 size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Fleet Comparison
          </h3>

          <p className="text-sm text-muted-foreground">
            Compare fleet performance scores
          </p>
        </div>
      </div>

      <div className="h-[420px] p-6">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Loading fleet comparison...
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center text-destructive">
            Failed to load comparison.
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No fleet comparison data available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                domain={[0, 100]}
              />

              <YAxis
                type="category"
                dataKey="vehicle"
                width={160}
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip />

              <Bar
                dataKey="score"
                radius={[0, 8, 8, 0]}
                fill="hsl(var(--primary))"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}