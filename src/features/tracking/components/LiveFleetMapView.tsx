"use client";

import { Header } from "@/components/shared/Header";
import { FleetMap } from "@/features/tracking/components/FleetMap";

export function LiveFleetMapView() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Mission Control" searchPlaceholder="Search vehicle, driver or route..." />
      <div className="min-h-[600px] flex-1 p-4">
        <FleetMap />
      </div>
    </div>
  );
}

export default LiveFleetMapView;