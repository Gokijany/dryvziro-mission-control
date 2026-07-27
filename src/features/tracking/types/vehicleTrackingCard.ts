import type { VehicleTrackingStatus } from "./telemetry";

// MOCK / COMPOSITE — this is NOT one real endpoint's shape. The detail
// panel needs data that will eventually come from several different
// features once they exist: Vehicles (real, already built), Drivers (not
// built), Telemetry (real endpoint proposed, not yet merged), and
// Analytics-derived climate metrics (not built). Treat this as a UI
// placeholder to be split apart and wired to real hooks feature-by-feature
// as each lands — not as a schema to replicate on any single backend
// endpoint.
//
// Everything beyond the core 4 fields is optional: once real telemetry
// data drives the map, most vehicles will only have position + status,
// not a driver name or climate metrics — the panel needs to render
// something sensible in that case, not assume every field exists.
export interface VehicleTrackingCard {
  vehicleId: string;
  latitude: number;
  longitude: number;
  status: VehicleTrackingStatus;
  registration?: string;
  fleetTier?: "premium" | "standard";
  driverName?: string;
  co2SavedKg?: number;
  efficiencyPercent?: number;
  chargePercent?: number;
  engineLoadKwh?: number;
  sensorLabel?: string;
  sensorCalibrated?: boolean;
}