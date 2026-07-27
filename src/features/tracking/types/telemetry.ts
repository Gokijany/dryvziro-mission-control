// PROVISIONAL — the telemetry backend is still being built by someone else.
// This shape is my best guess based on the map's UI needs (marker position +
// status color). Once app/features/telemetry/schemas.py exists, reconcile
// this against the real response shape rather than assuming it matches.

export type VehicleTrackingStatus = "optimal" | "idle" | "heavy_load" | "issue";

export interface VehiclePosition {
  vehicleId: string;
  latitude: number;
  longitude: number;
  status: VehicleTrackingStatus;
  recordedAt: string;
}