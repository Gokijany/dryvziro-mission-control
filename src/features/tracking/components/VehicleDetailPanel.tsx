"use client";

import { X, Car, BatteryCharging, Gauge, Radio, CheckCircle2, User } from "lucide-react";
import type { VehicleTrackingCard } from "@/features/tracking/types/vehicleTrackingCard";

interface VehicleDetailPanelProps {
  vehicle: VehicleTrackingCard;
  onClose: () => void;
  onViewProfile?: (vehicleId: string) => void;
}

export function VehicleDetailPanel({ vehicle, onClose, onViewProfile }: VehicleDetailPanelProps) {
  const improving = vehicle.efficiencyPercent >= 0;

  return (
    <div className="pointer-events-auto flex h-full w-full max-w-80 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b100c]/95 backdrop-blur-sm">
      {/* Image placeholder header */}
      <div className="relative h-40 shrink-0 overflow-hidden bg-gradient-to-br from-[#1a2b1c] to-[#0b100c]">
        <div className="flex h-full w-full items-center justify-center">
          <Car className="h-14 w-14 text-white/15" strokeWidth={1} />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        {vehicle.fleetTier === "premium" && (
          <span className="absolute bottom-3 left-3 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground">
            PREMIUM FLEET
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold text-white">{vehicle.registration}</h2>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-1 text-[9px] font-semibold tracking-widest text-white/40">
              <User className="h-2.5 w-2.5" />
              DRIVER
            </div>
            <div className="mt-0.5 text-[13px] font-medium text-white">{vehicle.driverName}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold tracking-widest text-white/40">
              REGISTRATION
            </div>
            <div className="mt-0.5 text-[13px] font-medium text-white">{vehicle.registration}</div>
          </div>
        </div>

        {/* Climate metrics */}
        <div className="mt-4 rounded-lg border border-white/10 bg-white/3 p-3">
          <div className="text-[10px] font-semibold tracking-widest text-primary">
            CLIMATE METRICS
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="text-[11px] text-white/50">Estimated CO2 Saved</div>
              <div className="text-xl font-semibold text-primary">
                {vehicle.co2SavedKg.toLocaleString()} <span className="text-[12px]">kg</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40">Efficiency</div>
              <div className={`text-[13px] font-medium ${improving ? "text-primary" : "text-destructive"}`}>
                {improving ? "+" : ""}
                {vehicle.efficiencyPercent}%
              </div>
            </div>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min(100, Math.max(4, vehicle.chargePercent))}%` }}
            />
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/3 p-3">
            <BatteryCharging className="h-4 w-4 text-primary" />
            <div className="mt-1.5 text-base font-semibold text-white">
              {vehicle.chargePercent}%
            </div>
            <div className="text-[10px] text-white/40">Charge Status</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/3 p-3">
            <Gauge className="h-4 w-4 text-primary" />
            <div className="mt-1.5 text-base font-semibold text-white">
              {vehicle.engineLoadKwh} <span className="text-[11px] font-normal">kWh</span>
            </div>
            <div className="text-[10px] text-white/40">Engine Load</div>
          </div>
        </div>

        {/* Sensor status */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-white/50" />
            <div>
              <div className="text-[12px] font-medium text-white">{vehicle.sensorLabel}</div>
              <div className="text-[10px] text-white/40">
                {vehicle.sensorCalibrated ? "Calibrated & Streaming" : "Calibration Needed"}
              </div>
            </div>
          </div>
          {vehicle.sensorCalibrated ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-destructive" />
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <button
          type="button"
          onClick={() => onViewProfile?.(vehicle.vehicleId)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <User className="h-4 w-4" />
          View Profile
        </button>
      </div>
    </div>
  );
}

export default VehicleDetailPanel;