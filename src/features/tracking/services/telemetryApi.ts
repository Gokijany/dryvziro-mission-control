import api from "@/lib/api";
import type { VehicleLiveLocation } from "@/features/tracking/types/telemetry";

// Endpoint PROPOSED but not yet merged (see the backend proposal files:
// app/features/telemetry/{repository,service,routes,schemas}_addition.py).
// This will 404 until that lands — useLiveTelemetry() falls back to mock
// data on failure so the map stays usable in the meantime.
export async function fetchLivePositions(): Promise<VehicleLiveLocation[]> {
  const { data } = await api.get<VehicleLiveLocation[]>("/telemetry/live-positions");
  return data;
}