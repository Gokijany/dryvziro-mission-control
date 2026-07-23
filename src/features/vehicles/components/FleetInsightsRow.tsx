import type { FleetInsights } from "@/features/vehicles/types/fleetInsights";
import { ReliabilityInsightsCard } from "./ReliabilityInsightsCard";
import { EmissionsHotspotsCard } from "./EmissionsHotspotsCard";
import { ComplianceRadarCard } from "./ComplianceRadarCard";

export function FleetInsightsRow({ insights }: { insights: FleetInsights }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ReliabilityInsightsCard
        message={insights.reliability.message}
        reportHref={insights.reliability.reportHref}
      />
      <EmissionsHotspotsCard message={insights.hotspot.message} />
      <ComplianceRadarCard zones={insights.complianceZones} />
    </div>
  );
}

export default FleetInsightsRow;