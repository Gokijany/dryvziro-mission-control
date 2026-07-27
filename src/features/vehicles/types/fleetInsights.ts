export interface ComplianceZone {
  id: string;
  label: string;
  percent: number;
}

export interface FleetInsights {
  reliability: {
    message: string;
    reportHref: string;
  };
  hotspot: {
    message: string;
  };
  complianceZones: ComplianceZone[];
}