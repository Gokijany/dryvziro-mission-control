"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertTriangle, Pencil, Trash2 } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { useVehicle } from "@/features/vehicles/hooks/useVehicles";
import { VehicleHeroCard } from "@/features/vehicles/components/VehicleHeroCard";
import {
  VehicleDetailTabs,
  type VehicleDetailTab,
} from "@/features/vehicles/components/VehicleDetailTabs";
import { VehicleDetailTabPlaceholder } from "@/features/vehicles/components/VehicleDetailTabPlaceholder";
import { TelemetryPendingPanel } from "@/features/vehicles/components/TelemetryPendingPanel";
import { EditVehicleModal } from "@/features/vehicles/components/EditVehicleModal";
import { DeleteVehicleDialog } from "@/features/vehicles/components/DeleteVehicleDialog";
import type { Vehicle } from "@/features/vehicles/types/vehicle";

interface VehicleDetailViewProps {
  vehicleId: string;
}

const TAB_LABELS: Record<VehicleDetailTab, string> = {
  overview: "Overview",
  trips: "Trips",
  emissions: "Emissions",
  fuel: "Fuel",
  maintenance: "Maintenance",
  sensor: "Sensor",
  documents: "Documents",
};

export function VehicleDetailView({ vehicleId }: VehicleDetailViewProps) {
  const router = useRouter();
  const { data: vehicle, isLoading, isError, error } = useVehicle(vehicleId);
  const [activeTab, setActiveTab] = useState<VehicleDetailTab>("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <Header title="Vehicles" />
        <div className="flex flex-1 items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading vehicle...
        </div>
      </div>
    );
  }

  if (isError || !vehicle) {
    const notFound =
      (error as { response?: { status?: number } } | undefined)?.response?.status === 404;

    return (
      <div className="flex flex-1 flex-col">
        <Header title={`Vehicles / ${vehicleId}`} />
        <div className="flex-1 p-4 sm:p-6">
          <Link
            href="/vehicles"
            className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicle Directory
          </Link>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            {notFound
              ? "This vehicle doesn't exist, or you don't have access to it."
              : "Something went wrong loading this vehicle."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title={`Vehicles / ${vehicle.license_plate}`} searchPlaceholder="Search fleet..." />

      <div className="flex-1 space-y-5 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Vehicle Directory
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-primary/30"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setIsDeleting(true)}
              className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-[12px] font-medium text-destructive transition-colors hover:bg-destructive/15"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>

        <VehicleHeroCard vehicle={vehicle} />

        <VehicleDetailTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" ? (
          <TelemetryPendingPanel />
        ) : (
          <VehicleDetailTabPlaceholder tabLabel={TAB_LABELS[activeTab]} />
        )}
      </div>

      <EditVehicleModal vehicle={isEditing ? (vehicle as Vehicle) : null} onClose={() => setIsEditing(false)} />
      <DeleteVehicleDialog
        vehicle={isDeleting ? (vehicle as Vehicle) : null}
        onClose={() => setIsDeleting(false)}
        onDeleted={() => router.push("/vehicles")}
      />
    </div>
  );
}

export default VehicleDetailView;