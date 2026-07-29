"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapControls } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { MapFilters } from "./MapFilters";
import { VehicleDetailPanel } from "./VehicleDetailPanel";
import { useVehicleMarkers } from "@/features/tracking/hooks/useVehicleMarkers";
import { mockVehicleTracking } from "@/features/tracking/data/mockVehiclePositions";

// Nairobi — Dryvziro operates in Kenya's urban transport ecosystem per the
// handbook, not the London example shown in the reference mockup.
const DEFAULT_CENTER: [number, number] = [36.8219, -1.2921];
const DEFAULT_ZOOM = 12;

// OpenFreeMap: free, no API key, no signup, no rate limits — a genuine
// open alternative, not a trial/demo tier. https://openfreemap.org
const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/dark";

// Next.js's Turbopack dev server fails to correctly serve MapLibre's
// dynamically-loaded web worker script (confirmed bug:
// https://github.com/vercel/next.js/issues/86495 — no console errors,
// map just never fires "load"). Pointing the worker at a CDN copy
// matching the exact installed version sidesteps the bundler entirely.
maplibregl.setWorkerUrl(
  "https://cdn.jsdelivr.net/npm/maplibre-gl@6.0.0/dist/maplibre-gl-worker.mjs",
);

export function FleetMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      attributionControl: false,
    });

    map.on("load", () => {
      console.info("[FleetMap] map load event fired — style + initial tiles ready");
      setMapLoaded(true);
    });

    map.on("error", (e: maplibregl.ErrorEvent) => {
      console.error("[FleetMap] MapLibre error event:", e.error);
      setMapError(e.error?.message ?? "Failed to load the map.");
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // TODO: swap mockVehicleTracking for a polling hook against GET
  // /telemetry once that endpoint exists (checklist item: realtime updates).
  useVehicleMarkers({
    mapRef,
    vehicles: mockVehicleTracking,
    selectedVehicleId,
    onSelect: setSelectedVehicleId,
    mapLoaded,
  });

  const selectedVehicle =
    mockVehicleTracking.find((v) => v.vehicleId === selectedVehicleId) ?? null;

  if (mapError) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-destructive/40 bg-card/50 p-8 text-center">
        <p className="max-w-sm text-[13px] text-foreground">{mapError}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <div ref={containerRef} className="h-full w-full" />

      {!mapLoaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0c0c0c]">
          <div className="flex items-center gap-2 text-[13px] text-white/50">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Loading map...
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col p-4">
        <div className="pointer-events-auto flex items-start justify-between gap-4">
          <MapFilters />

          {selectedVehicle && (
            <div className="h-140 w-full max-w-80">
              <VehicleDetailPanel
                vehicle={selectedVehicle}
                onClose={() => setSelectedVehicleId(null)}
              />
            </div>
          )}
        </div>

        <div className="pointer-events-auto absolute bottom-4 left-4">
          <MapControls mapRef={mapRef} />
        </div>

        <div className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2">
          <MapLegend />
        </div>
      </div>
    </div>
  );
}

export default FleetMap;
