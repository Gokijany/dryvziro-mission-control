"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import type { RefObject } from "react";
import type { VehicleTrackingCard } from "@/features/tracking/types/vehicleTrackingCard";
import { STATUS_COLORS } from "@/features/tracking/components/MapLegend";

function createMarkerElement(status: VehicleTrackingCard["status"]): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "vehicle-marker";
  el.style.width = "28px";
  el.style.height = "28px";
  el.style.borderRadius = "9999px";
  el.style.backgroundColor = STATUS_COLORS[status];
  el.style.border = "2px solid rgba(255,255,255,0.85)";
  el.style.boxShadow = "0 0 0 4px rgba(0,0,0,0.25)";
  el.style.cursor = "pointer";
  el.style.transition = "transform 150ms ease";
  return el;
}

interface UseVehicleMarkersArgs {
  mapRef: RefObject<maplibregl.Map | null>;
  vehicles: VehicleTrackingCard[];
  selectedVehicleId: string | null;
  onSelect: (vehicleId: string) => void;
  mapLoaded: boolean;
}

export function useVehicleMarkers({
  mapRef,
  vehicles,
  selectedVehicleId,
  onSelect,
  mapLoaded,
}: UseVehicleMarkersArgs) {
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());

  // Add / move / remove markers whenever the vehicle list changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const markers = markersRef.current;
    const incomingIds = new Set(vehicles.map((v) => v.vehicleId));

    // Remove markers for vehicles no longer present.
    for (const [id, marker] of markers.entries()) {
      if (!incomingIds.has(id)) {
        marker.remove();
        markers.delete(id);
      }
    }

    // Add new markers, move existing ones to their latest position.
    for (const vehicle of vehicles) {
      const existing = markers.get(vehicle.vehicleId);

      if (existing) {
        existing.setLngLat([vehicle.longitude, vehicle.latitude]);
        continue;
      }

      const element = createMarkerElement(vehicle.status);
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(vehicle.vehicleId);
      });

      const marker = new maplibregl.Marker({ element })
        .setLngLat([vehicle.longitude, vehicle.latitude])
        .addTo(map);

      markers.set(vehicle.vehicleId, marker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles, mapLoaded]);

  // Highlight the selected marker separately, so selection changes don't
  // trigger the add/remove diffing above.
  useEffect(() => {
    for (const [id, marker] of markersRef.current.entries()) {
      const el = marker.getElement();
      const isSelected = id === selectedVehicleId;
      el.style.transform = isSelected ? "scale(1.3)" : "scale(1)";
      el.style.zIndex = isSelected ? "10" : "1";
    }
  }, [selectedVehicleId]);

  // Clean up all markers on unmount.
  useEffect(() => {
    const markers = markersRef.current;
    return () => {
      for (const marker of markers.values()) marker.remove();
      markers.clear();
    };
  }, []);
}