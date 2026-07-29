"use client";

import {
  Car,
  Fuel,
  Gauge,
  Leaf,
} from "lucide-react";

import { useAnalyticsSummary } from "../../hooks/useAnalytics";
import SummaryCard from "./SummaryCard";

export default function AnalyticsSummarySection() {
  const { data, isLoading } = useAnalyticsSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl border border-border bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Fleet Vehicles"
        value={data?.total_vehicles ?? 0}
        subtitle="Registered vehicles"
        trend={8}
        icon={Car}
      />

      <SummaryCard
        title="Total Emissions"
        value={`${(data?.total_emissions_g_co2 ?? 0).toLocaleString()} g`}
        subtitle="CO₂ emitted"
        trend={-4}
        icon={Leaf}
      />

      <SummaryCard
        title="Fuel Consumed"
        value={`${(data?.total_fuel_consumed_liters ?? 0).toLocaleString()} L`}
        subtitle="Fleet consumption"
        trend={3}
        icon={Fuel}
      />

      <SummaryCard
        title="Avg Efficiency"
        value={`${Math.round((data?.average_efficiency ?? 0) * 100)}%`}
        subtitle="Fleet performance"
        trend={5}
        icon={Gauge}
      />
    </div>
  );
}