import { Header } from "@/components/shared/Header";

import SummaryCards from "@/components/dashboard/SummaryCards";
import FleetActivityChart from "@/components/dashboard/FleetActivityChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import VehicleStatusTable from "@/components/dashboard/VehicleStatusTable";
import PerformanceMetrics from "@/components/dashboard/PerfomanceMetrics";
import EmissionsOverview from "@/components/dashboard/EmissionsOverview";
import RecentTrips from "@/components/dashboard/RecentTrips";
import AIInsights from "@/components/dashboard/AIInsights";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Mission Control" />

      <div className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8">

        {/* Fleet Summary */}
        <SummaryCards />

        {/* Fleet Activity + Alerts */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <FleetActivityChart />
          </div>

          <AlertsPanel />
        </div>

        {/* Vehicle Status + Performance */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <VehicleStatusTable />
          </div>

          <PerformanceMetrics />
        </div>

        {/* Sustainability + Operations */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <EmissionsOverview />

          <RecentTrips />

          <AIInsights />
        </div>

      </div>
    </div>
  );
}