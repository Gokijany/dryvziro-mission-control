"use client";

import { Plus, Minus, LocateFixed } from "lucide-react";
import type { RefObject } from "react";
import type * as maplibregl from "maplibre-gl";

interface MapControlsProps {
  mapRef: RefObject<maplibregl.Map | null>;
}

export function MapControls({ mapRef }: MapControlsProps) {
  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      mapRef.current?.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 14,
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b100c]/90 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="h-px bg-white/10" />
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleLocate}
        aria-label="Locate me"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0b100c]/90 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
      >
        <LocateFixed className="h-4 w-4" />
      </button>
    </div>
  );
}

export default MapControls;