"use client";

import {
  Leaf,
  TrendingDown,
  Factory,
} from "lucide-react";

const emissions = [
  {
    title: "Today's CO₂",
    value: "2.4 t",
    icon: Factory,
  },
  {
    title: "Weekly Reduction",
    value: "-8.3%",
    icon: TrendingDown,
  },
  {
    title: "Carbon Score",
    value: "91%",
    icon: Leaf,
  },
];

export default function EmissionsOverview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Emissions Overview
        </h2>

        <p className="text-sm text-muted-foreground">
          Environmental impact summary
        </p>
      </div>

      <div className="space-y-4">
        {emissions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon
                    size={20}
                    className="text-primary"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h3 className="font-semibold">
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}