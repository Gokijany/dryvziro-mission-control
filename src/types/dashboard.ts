export interface FleetSummary {
  totalVehicles: number;
  activeVehicles: number;
  inactiveVehicles: number;
  totalDrivers: number;
  activeTrips: number;
  criticalAlerts: number;
}

export interface FleetActivityPoint {
  day: string;
  trips: number;
  fuel: number;
}

export interface AlertItem {
  id: number;
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
  timestamp: string;
}

export interface EmissionsOverview {
  totalCO2: number;
  targetCO2: number;
  reduction: number;
}

export interface PerformanceMetric {
  id: number;
  label: string;
  value: number;
  unit: string;
  progress: number;
}

export interface VehicleStatus {
  id: number;
  registration: string;
  driver: string;
  status: "Active" | "Idle" | "Maintenance";
  location: string;
  fuel: number;
}