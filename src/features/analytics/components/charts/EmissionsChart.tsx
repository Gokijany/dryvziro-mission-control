"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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
  } = useEmissionTrend(
    startDate,
    endDate,
  );

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
          justify-between
          border-b
          border-border
          px-6
          py-4
        "
      >
        <div className="flex items-center gap-3">
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
            <Activity size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              Emissions Trend
            </h3>

            <p className="text-sm text-muted-foreground">
              Daily CO₂ emissions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="h-[340px] p-6">
        {isLoading ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            Loading emissions...
          </div>
        ) : isError ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-destructive
            "
          >
            Failed to load emissions.
          </div>
        ) : data.length === 0 ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            No emission data available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="emissions_g_co2"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}