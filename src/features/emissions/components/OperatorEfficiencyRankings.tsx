"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { emissionsApi } from "../services/emissionsApi";

export function OperatorEfficiencyRankings() {
  const [rankingsTab, setRankingsTab] = useState<"EMISSIONS" | "MILEAGE">("EMISSIONS");

  const { data: rankings = [] } = useQuery({
    queryKey: ["emissions", "rankings", rankingsTab],
    queryFn: () => emissionsApi.getOperatorRankings(rankingsTab),
  });

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-foreground">Operator Efficiency Rankings</h2>
        
        <div className="flex rounded-lg bg-background p-1 border border-border">
          <button
            onClick={() => setRankingsTab("EMISSIONS")}
            className={`rounded-md px-3 py-1 text-[10px] font-semibold tracking-wider transition-colors ${
              rankingsTab === "EMISSIONS"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            EMISSIONS
          </button>
          <button
            onClick={() => setRankingsTab("MILEAGE")}
            className={`rounded-md px-3 py-1 text-[10px] font-semibold tracking-wider transition-colors ${
              rankingsTab === "MILEAGE"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            MILEAGE
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {rankings.map((item) => (
          <div key={item.rank} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-4">{item.rank}</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {item.initials}
              </div>
              <div>
                <div className="text-xs font-medium text-foreground">{item.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.fleet}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-foreground">{item.metric}</div>
              <div className="text-[10px] font-bold tracking-wider text-primary">{item.tier}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}