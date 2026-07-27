export interface EcosystemStat {
  title: string;
  value: string;
  subtitle: string;
  iconName: string;
}

export interface AiInsightItem {
  id: string;
  category: string;
  timestamp: string;
  description: string;
}

export interface ActiveAlertItem {
  id: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  title: string;
  description: string;
  actionable?: boolean;
}

export interface DashboardData {
  ecosystemHealth: string;
  ecosystemHealthSub: string;
  liveVehiclesCount: number;
  liveVehiclesSub: string;
  liveEmissionsKg: string;
  liveEmissionsSub: string;
  fuelUsageLiters: string;
  fuelUsageSub: string;
  fleetEfficiencyPct: string;
  fleetEfficiencySub: string;
  avoidedEmissionsKg: string;
  avoidedEmissionsSub: string;
  stats: EcosystemStat[];
  insights: AiInsightItem[];
  alerts: ActiveAlertItem[];
}