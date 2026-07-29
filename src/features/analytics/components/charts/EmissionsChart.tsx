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

import { Activity } from "lucide-react";
import { useEmissionTrend } from "../../hooks/useAnalytics";

interface Props {
  startDate: string;
  endDate: string;
}

export default function EmissionsChart({
  startDate,
  endDate,
}: Props) {
  const {
    data = [],
    isLoading,
    isError,
  } = useEmissionTrend(startDate, endDate);

  return (
    <div className="rounded-xl border border-primary/40 bg-card shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Activity className="h-4 w-4 text-success" />

            <span className="text-[11px] font-semibold tracking-wider text-foreground">
              EMISSIONS TREND
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Daily fleet CO₂ emissions over the selected period.
          </p>
        </div>

        <div className="rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-success">
          LIVE
        </div>
      </div>

      {/* Chart */}

      <div className="h-[340px] p-5">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading emissions...
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center text-sm text-destructive">
            Failed to load emissions.
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No emission data available.
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
                  id="emissionGradient"
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
                tick={{
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(34,197,94,.15)",
                  background: "var(--card)",
                }}
              />

              <Area
                type="monotone"
                dataKey="emissions_g_co2"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#emissionGradient)"
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