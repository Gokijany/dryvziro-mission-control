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

const data = [
  { day: "Mon", trips: 90 },
  { day: "Tue", trips: 115 },
  { day: "Wed", trips: 130 },
  { day: "Thu", trips: 118 },
  { day: "Fri", trips: 165 },
  { day: "Sat", trips: 142 },
  { day: "Sun", trips: 155 },
];

export default function FleetActivityChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Fleet Activity
          </h2>

          <p className="text-sm text-muted-foreground">
            Vehicle trips over the last 7 days
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Live
        </span>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="fleetGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#05A653"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#05A653"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.1}
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="trips"
              stroke="#05A653"
              strokeWidth={3}
              fill="url(#fleetGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}