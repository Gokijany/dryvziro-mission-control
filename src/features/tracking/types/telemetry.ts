// This mirrors a PROPOSED (not yet merged) GET /telemetry/live-positions
// endpoint — a real agreed contract we drafted together, not a wild guess
// like the original version of this file. Still update this if the
// teammate's actual implementation differs once merged, especially
// VehicleTrackingStatus's "heavy_load" case, which is a placeholder
// threshold pending her review.

export type VehicleTrackingStatus = "optimal" | "idle" | "heavy_load" | "issue";

/**
 * Raw API response shape. Pydantic's Decimal fields commonly serialize to
 * JSON as strings (not bare numbers) unless the backend overrides that —
 * we don't know yet which this backend does, so both are typed and the
 * mapper below coerces defensively either way.
 */
export interface VehicleLiveLocation {
  vehicle_id: string;
  latitude: number | string;
  longitude: number | string;
  speed_kmh: number | string | null;
  engine_load_pct: number | string | null;
  status: VehicleTrackingStatus;
  timestamp: string;
}

/**
 * Everything a map marker actually needs — nothing else. Deliberately
 * decoupled from the rich VehicleTrackingCard shape (driver name, climate
 * metrics, etc.) so real telemetry data — which will never have a driver
 * name — can drive markers immediately, without waiting on Drivers or
 * Analytics to exist.
 */
export interface MapMarkerData {
  vehicleId: string;
  latitude: number;
  longitude: number;
  status: VehicleTrackingStatus;
}

export function toMapMarkerData(location: VehicleLiveLocation): MapMarkerData {
  return {
    vehicleId: location.vehicle_id,
    latitude: Number(location.latitude),
    longitude: Number(location.longitude),
    status: location.status,
  };
}