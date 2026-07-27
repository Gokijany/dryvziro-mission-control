"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { CarbonAccountabilityCard } from "./CarbonAccountabilityCard";
import { ForecastedTrendsCard } from "./ForecastedTrendsCard";
import { AiInsightCard } from "./AiInsightCard";
import { OperatorEfficiencyRankings } from "./OperatorEfficiencyRankings";
import { AirQualityCorrelationCard } from "./AirQualityCorrelationCard";
import { ShieldCheck, Activity, Leaf } from "lucide-react";
import { useEmissionsData } from "../hooks/useEmissions";

export function EmissionsView() {
  const [activeTab, setActiveTab] = useState<"REAL-TIME" | "HISTORICAL" | "PROJECTIONS">("REAL-TIME");
  const { accountability, forecasts, airQuality, secondaryMetrics, isLoading } = useEmissionsData();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <Header title="Emissions Intelligence" />
        <div className="flex h-96 items-center justify-center text-xs font-semibold text-muted-foreground">
          Loading Emissions Intelligence...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Emissions Intelligence" />

      <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-6 border-b border-border/60 pb-2">
          {(["REAL-TIME", "HISTORICAL", "PROJECTIONS"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-semibold tracking-wider transition-colors relative pb-1 ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Top Grid: Carbon Accountability & Forecasted Trends/AI */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CarbonAccountabilityCard data={accountability.data} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4">
            <ForecastedTrendsCard items={forecasts.data ?? []} />
            <AiInsightCard />
          </div>
        </div>

        {/* Middle Grid: Operator Rankings & Air Quality */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <OperatorEfficiencyRankings />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <AirQualityCorrelationCard data={airQuality.data} />
          </div>
        </div>

        {/* Bottom Grid: Secondary Metric Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
              <Activity className="h-4 w-4" /> NOx LEVELS
            </div>
            <div className="text-2xl font-bold text-foreground tracking-tight">
              {secondaryMetrics.data?.noxLevel.split(" ")[0]} <span className="text-xs font-normal text-muted-foreground">g/kWh</span>
            </div>
            <div className="mt-2 text-[11px] font-medium text-primary">
              {secondaryMetrics.data?.noxBaseline}
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
              <Leaf className="h-4 w-4" /> CO2 OFFSET
            </div>
            <div className="text-2xl font-bold text-foreground tracking-tight">
              {secondaryMetrics.data?.co2Offset.split(" ")[0]} <span className="text-xs font-normal text-muted-foreground">Tons</span>
            </div>
            <div className="mt-2 text-[11px] font-medium text-rose-300">
              {secondaryMetrics.data?.co2Verifier}
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
              <ShieldCheck className="h-4 w-4" /> SENSOR FIDELITY
            </div>
            <div className="text-2xl font-bold text-foreground tracking-tight">
              {secondaryMetrics.data?.sensorFidelity} <span className="text-xs font-normal text-muted-foreground">%</span>
            </div>
            <div className="mt-2 text-[11px] font-medium text-muted-foreground">
              Active node count: {secondaryMetrics.data?.activeNodes.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}