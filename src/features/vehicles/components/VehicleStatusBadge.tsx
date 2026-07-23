import type { VehicleStatus } from "@/features/vehicles/types/vehicle";

const STATUS_LABEL: Record<VehicleStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  maintenance: "Maintenance",
  decommissioned: "Decommissioned",
};

const STATUS_CLASS: Record<VehicleStatus, string> = {
  active: "bg-success/15 text-success",
  inactive: "bg-muted text-muted-foreground",
  maintenance: "bg-warning/15 text-warning",
  decommissioned: "bg-destructive/15 text-destructive",
};

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export default VehicleStatusBadge;