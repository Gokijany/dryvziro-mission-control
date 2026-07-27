"use client";

import { ChevronDown, Plus } from "lucide-react";

export interface VehicleFiltersValue {
  /**
   * Maps to the backend's VehicleStatus: "active" -> status=active,
   * "archive" -> status=decommissioned. County/Operator/Route filters
   * aren't backed by any field on the Vehicle model yet, so those
   * dropdowns stay presentational until that data exists.
   */
  view: "active" | "archive";
}

interface VehicleFiltersProps {
  value: VehicleFiltersValue;
  onChange: (value: VehicleFiltersValue) => void;
  onAddVehicle?: () => void;
}

function FilterDropdown({ label }: { label: string }) {
  // Presentational for now — swap the button for a real <select> or popover
  // once filter options are wired to the counties/operators/routes endpoints.
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

export function VehicleFilters({ value, onChange, onAddVehicle }: VehicleFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown label="All Counties" />
        <FilterDropdown label="All Operators" />
        <FilterDropdown label="All Routes" />
        <FilterDropdown label="Status: Any" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
          <button
            type="button"
            onClick={() => onChange({ ...value, view: "active" })}
            className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
              value.view === "active"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, view: "archive" })}
            className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
              value.view === "archive"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Archive
          </button>
        </div>

        <button
          type="button"
          onClick={onAddVehicle}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Add Vehicle
        </button>
      </div>
    </div>
  );
}

export default VehicleFilters;