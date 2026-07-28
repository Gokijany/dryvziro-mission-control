"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { DeviceListTable } from "./DeviceListTable";
import { RegisterDeviceModal } from "./RegisterDeviceModal";
import { AssignDeviceModal } from "./AssignDeviceModal";
import { useDevices } from "../hooks/useDevices";
import type { DeviceResponse } from "../types/devices";
import { Cpu, Plus, Radio, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export function DevicesView() {
  const { data: devices, isLoading, isError } = useDevices();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedDeviceForAssignment, setSelectedDeviceForAssignment] =
    useState<DeviceResponse | null>(null);

  const totalCount = devices?.length || 0;
  const activeCount = devices?.filter((d) => d.status === "ACTIVE").length || 0;
  const provisionedCount = devices?.filter((d) => d.status === "PROVISIONED").length || 0;
  const pairedCount = devices?.filter((d) => d.status === "PAIRED").length || 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border/80 px-4 sm:px-6 lg:px-8 py-4">
        <Header
          title="Device Hardware Fleet"
          searchPlaceholder="Search serials or vehicle IDs..."
        />
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-foreground shadow-sm hover:opacity-90 transition-opacity ml-4 shrink-0"
        >
          <Plus className="h-4 w-4" /> Provision New Device
        </button>
      </div>

      <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                Total Devices
              </span>
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{totalCount}</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                Active (Live)
              </span>
              <Radio className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{activeCount}</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                Paired Vehicles
              </span>
              <CheckCircle2 className="h-4 w-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{pairedCount}</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                Provisioned (Unassigned)
              </span>
              <ShieldCheck className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{provisionedCount}</p>
          </div>
        </div>

        {/* Device Table */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center text-xs font-semibold text-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading hardware registry...
          </div>
        ) : isError ? (
          <div className="flex h-64 flex-col items-center justify-center text-xs font-semibold text-rose-400">
            <AlertCircle className="h-6 w-6 mb-2" />
            Failed to load hardware devices. Please check endpoint connectivity.
          </div>
        ) : (
          <DeviceListTable
            devices={devices || []}
            onOpenAssignModal={(device) => setSelectedDeviceForAssignment(device)}
          />
        )}
      </div>

      {/* Modals */}
      {isRegisterOpen && <RegisterDeviceModal onClose={() => setIsRegisterOpen(false)} />}
      {selectedDeviceForAssignment && (
        <AssignDeviceModal
          device={selectedDeviceForAssignment}
          onClose={() => setSelectedDeviceForAssignment(null)}
        />
      )}
    </div>
  );
}
