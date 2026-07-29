"use client";

import { useState } from "react";
import { Calendar, Check, SlidersHorizontal } from "lucide-react";

export function DynamicReportGeneratorCard() {
  const [selectedModule, setSelectedModule] = useState("Emissions");
  const [includeAuditTrail, setIncludeAuditTrail] = useState(false);

  const modules = ["Emissions", "Fuel Efficiency", "Maintenance Costs", "Route Compliance"];

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-widest text-primary">
            DYNAMIC GENERATOR
          </span>
          <h2 className="text-xl font-bold text-foreground mt-1">
            Create Custom Intelligence Report
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Timeframe Range */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              TIMEFRAME RANGE
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground shadow-sm">
                <span>mm/dd/yy</span>
                <Calendar className="h-3.5 w-3.5 text-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground shadow-sm">
                <span>mm/dd/yy</span>
                <Calendar className="h-3.5 w-3.5 text-foreground" />
              </div>
            </div>
          </div>

          {/* Target Modules */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              TARGET MODULES
            </label>
            <div className="flex flex-wrap gap-2">
              {modules.map((mod) => {
                const isSelected = selectedModule === mod;
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setSelectedModule(mod)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all shadow-sm ${
                      isSelected
                        ? "border border-primary bg-primary/10 text-primary"
                        : "border border-border/80 bg-background text-foreground hover:border-border"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-primary" />}
                    {mod}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border/40 gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground select-none">
          <input
            type="checkbox"
            checked={includeAuditTrail}
            onChange={(e) => setIncludeAuditTrail(e.target.checked)}
            className="rounded border-border bg-background text-primary focus:ring-0"
          />
          Include MRV-Ready Audit Trail
        </label>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-bold text-foreground hover:opacity-95 transition-opacity shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4" /> Generate Intelligence
        </button>
      </div>
    </div>
  );
}
