"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>

          <div>
           
            <p className="text-muted-foreground">
              Fleet performance, emissions and operational insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}