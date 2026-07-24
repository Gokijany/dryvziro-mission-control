export type ConnectionStatus = "connected" | "disconnected";

export interface EmissionsChartPoint {
  label: string;
  value: number;
}

export interface EmissionsProfile {
  netImpactKgPerDay: number;
  impactLabel: string;
  chart: EmissionsChartPoint[];
}

export type MaintenanceTone = "alert" | "nominal";

export interface MaintenanceHealth {
  tone: MaintenanceTone;
  alertLabel: string;
  message: string;
  highlight: string;
  batteryHealthPercent: number;
  brakePadLifePercent: number;
}

export type SensorTone = "default" | "success";

export interface SensorReading {
  id: string;
  label: string;
  sublabel: string;
  value: string;
  tone: SensorTone;
}

export type TelemetryStatus = "good" | "warning" | "offline";

export interface TripLogEntry {
  id: string;
  time: string;
  destination: string;
  distanceKm: number;
  co2SavedKg: number;
  driver: string;
  telemetryStatus: TelemetryStatus;
}

export interface VehicleDetail {
  connectionStatus: ConnectionStatus;
  emissions: EmissionsProfile;
  maintenance: MaintenanceHealth;
  sensors: SensorReading[];
  trips: TripLogEntry[];
}