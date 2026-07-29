"use client";

import { useState } from "react";
import dayjs from "dayjs";

import AnalyticsPageHeader from "./AnalyticsPageHeader";
import AnalyticsSummarySection from "./cards/AnalyticsSummarySection";
import AnalyticsFilters from "./AnalyticsFilters";

import EmissionsChart from "./charts/EmissionsChart";
import FuelEfficiencyChart from "./charts/FuelEfficiencyChart";

import FleetRankingTable from "./tables/FleetRankingTable";
import DriverRankingTable from "./tables/DriverRankingTable";
export default function AnalyticsDashboard() {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD"),
  );

  const [endDate, setEndDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  return (
    <div className="space-y-6">
      <AnalyticsPageHeader />

<AnalyticsSummarySection />

      <AnalyticsFilters
        startDate={startDate}
        endDate={endDate}
        onChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <EmissionsChart
          startDate={startDate}
          endDate={endDate}
        />

        <FuelEfficiencyChart
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      <FleetRankingTable />

      <DriverRankingTable />
    </div>
  );
}