"use client";
import EmissionsChart from "../charts/EmissionsChart";
import FuelEfficiencyChart from "../charts/FuelEfficiencyChart";
import FleetRankingChart from "../charts/FleetRankingChart";
import DriverRankingChart from "../charts/DriverRankingChart";
import FleetComparisonChart from "../FleetComparisonChart";

interface Props {
  startDate: string;
  endDate: string;
}

export default function AnalyticsChartsSection({
  startDate,
  endDate,
}: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Analytics Overview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Visualize emissions, fuel efficiency, fleet performance, and
          driver insights.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        <EmissionsChart
          startDate={startDate}
          endDate={endDate}
        />

        <FuelEfficiencyChart
          startDate={startDate}
          endDate={endDate}
        />

        <FleetRankingChart />

        <DriverRankingChart />
      </div>

      <FleetComparisonChart />
    </section>
  );
}