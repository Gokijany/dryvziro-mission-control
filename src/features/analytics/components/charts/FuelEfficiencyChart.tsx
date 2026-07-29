"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Gauge } from "lucide-react";

import { useFuelEfficiencyTrend } from "../../hooks/useAnalytics";

interface Props {
  startDate: string;
  endDate: string;
}

export default function FuelEfficiencyChart({
  startDate,
  endDate,
}: Props) {
  const {
    data = [],
    isLoading,
    isError,
  } = useFuelEfficiencyTrend(
    startDate,
    endDate,
  );

  const latestEfficiency =
    data.length > 0
      ? data[data.length - 1].efficiency
      : 0;

  return (
    <div className="rounded-xl border border-primary/40 bg-card shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-success" />

            <span className="text-[11px] font-semibold tracking-wider text-foreground">
              FUEL EFFICIENCY TREND
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Average fleet fuel efficiency over the selected period.
          </p>
        </div>

        {!isLoading && data.length > 0 && (
          <div className="rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-success">
            {latestEfficiency.toFixed(1)} km/L
          </div>
        )}
      </div>

      {/* Chart */}

      <div className="h-[340px] p-5">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading fuel efficiency...
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center text-sm text-destructive">
            Failed to load fuel efficiency.
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No fuel efficiency data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="efficiencyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(34 197 94)"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="rgb(34 197 94)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.15}
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(34,197,94,.15)",
                  background: "var(--card)",
                }}
                formatter={(value) => [
  `${Number(value).toFixed(1)} km/L`,
  "Efficiency",
]}
              />

              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#efficiencyGradient)"
                dot={{
                  r: 4,
                  fill: "#22c55e",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}