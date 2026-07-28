"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Cpu } from "lucide-react";

import { Header } from "@/components/shared/Header";
import { useDevice } from "../hooks/useDevices";
import { useVehicle } from "@/features/vehicles/hooks/useVehicles";

interface Props {
  deviceId: string;
}

export function DeviceDetailView({ deviceId }: Props) {
  const { data: device, isLoading } = useDevice(deviceId);

  // Fetch the assigned vehicle separately
  const { data: vehicle } = useVehicle(device?.vehicle_id);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading device...</span>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex flex-1 flex-col">
        <Header title="Device" />

        <div className="p-6">
          <div className="rounded-xl border border-border bg-card p-6">
            Device not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title={`Devices / ${device.device_serial}`} />

      <div className="space-y-6 p-6">
        <Link
          href="/devices"
          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Device Inventory
        </Link>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Device Details</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Detail label="Device ID" value={device.id} />

            <Detail
              label="Serial Number"
              value={device.device_serial}
            />

            <Detail
              label="Status"
              value={device.status.toUpperCase()}
            />

            <Detail
              label="Firmware Version"
              value={device.firmware_version ?? "N/A"}
            />

            <Detail
              label="Assigned Vehicle"
              value={
                device.vehicle_id
                  ? vehicle?.license_plate ?? "Loading..."
                  : "Unassigned"
              }
            />

            <Detail
              label="Vehicle ID"
              value={device.vehicle_id ?? "N/A"}
            />

            <Detail
              label="Organization ID"
              value={device.organization_id}
            />

            <Detail
              label="Certificate Serial"
              value={device.cert_serial ?? "N/A"}
            />

            <Detail
              label="Certificate Fingerprint"
              value={device.cert_fingerprint ?? "N/A"}
            />

            <Detail
              label="Certificate Issued"
              value={
                device.cert_issued_at
                  ? new Date(device.cert_issued_at).toLocaleString()
                  : "N/A"
              }
            />

            <Detail
              label="Certificate Expires"
              value={
                device.cert_expires_at
                  ? new Date(device.cert_expires_at).toLocaleString()
                  : "N/A"
              }
            />

            <Detail
              label="Certificate Revoked"
              value={
                device.cert_revoked_at
                  ? new Date(device.cert_revoked_at).toLocaleString()
                  : "Not Revoked"
              }
            />

            <Detail
              label="Last Seen"
              value={
                device.last_seen_at
                  ? new Date(device.last_seen_at).toLocaleString()
                  : "Never"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailProps {
  label: string;
  value: string;
}

function Detail({ label, value }: DetailProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="break-all text-sm text-foreground">
        {value}
      </p>
    </div>
  );
}

export default DeviceDetailView;