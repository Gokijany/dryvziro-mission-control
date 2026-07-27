import type { FleetInsights } from "@/features/vehicles/types/fleetInsights";

export const mockFleetInsights: FleetInsights = {
  reliability: {
    message:
      "AI predicts 3 vehicles in the London sector will require exhaust filtration maintenance within 14 days to remain CAZ compliant.",
    reportHref: "#",
  },
  hotspot: {
    message: "City Central route shows 15% increase in efficiency since EV transition.",
  },
  complianceZones: [
    { id: "ulez-zone-1", label: "ULEZ Zone 1", percent: 92 },
    { id: "bristol-caz", label: "Bristol CAZ", percent: 78 },
  ],
};