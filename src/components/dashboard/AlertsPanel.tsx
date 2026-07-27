"use client";

import {
  TriangleAlert,
  CircleCheck,
  Clock3,
} from "lucide-react";

const alerts = [
  {
    title: "Vehicle DV-231",
    status: "Maintenance overdue",
    icon: TriangleAlert,
    color: "text-red-500",
  },
  {
    title: "Trip #8942",
    status: "Completed successfully",
    icon: CircleCheck,
    color: "text-green-500",
  },
  {
    title: "Driver Check-in",
    status: "Awaiting confirmation",
    icon: Clock3,
    color: "text-yellow-500",
  },
];

export default function AlertsPanel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Recent Alerts
      </h2>

      <div className="space-y-5">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-border p-4 transition hover:bg-muted/40"
            >
              <div className="rounded-lg bg-background p-2">
                <Icon
                  className={alert.color}
                  size={20}
                />
              </div>

              <div className="min-w-0">
                <p className="font-medium">
                  {alert.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {alert.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}