"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { VehicleStatsCards } from "@/features/vehicles/components/VehicleStatsCards";
import {
  VehicleFilters,
  type VehicleFiltersValue,
} from "@/features/vehicles/components/VehicleFilters";
import { VehicleTableToolbar } from "@/features/vehicles/components/VehicleTableToolbar";
import { VehicleTable } from "@/features/vehicles/components/VehicleTable";
import { VehicleTablePagination } from "@/features/vehicles/components/VehicleTablePagination";
import { FleetInsightsRow } from "@/features/vehicles/components/FleetInsightsRow";
import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import { EditVehicleModal } from "@/features/vehicles/components/EditVehicleModal";
import { DeleteVehicleDialog } from "@/features/vehicles/components/DeleteVehicleDialog";
import { mockFleetInsights } from "@/features/vehicles/data/mockFleetInsights";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import type { Vehicle } from "@/features/vehicles/types/vehicle";

const ITEMS_PER_PAGE = 12;

export function VehiclesView() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<VehicleFiltersValue>({ view: "active" });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);

  // Debounce search input so we're not firing a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput.trim()), 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Reset to page 1 whenever the effective query changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.view]);

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, isError, error, isFetching } = useVehicles({
    status: filters.view === "active" ? "active" : "decommissioned",
    search: debouncedSearch || undefined,
    skip,
    limit: ITEMS_PER_PAGE,
  });

  const vehicles: Vehicle[] = data?.items ?? [];
  const total = data?.total ?? 0;
  const activeCount = vehicles.filter((v) => v.status === "active").length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const rangeStart = vehicles.length === 0 ? 0 : skip + 1;
  const rangeEnd = skip + vehicles.length;

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === vehicles.length ? new Set() : new Set(vehicles.map((v) => v.id))
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Vehicle Directory"
        searchPlaceholder="Search VIN, plate, make, or model..."
        onSearchChange={setSearchInput}
      />

      <div className="flex-1 space-y-5 p-4 sm:p-6">
        <VehicleStatsCards totalVehicles={total} activeVehicles={activeCount} />

        <VehicleFilters
          value={filters}
          onChange={setFilters}
          onAddVehicle={() => setIsAddModalOpen(true)}
        />

        <div className="rounded-xl border border-border bg-card">
          <VehicleTableToolbar
            selectedCount={selectedIds.size}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={total}
          />

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading vehicles...
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-2 p-12 text-center text-sm text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {error instanceof Error ? error.message : "Failed to load vehicles."}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No vehicles match the current filters.
            </div>
          ) : (
            <div className={`overflow-x-auto transition-opacity ${isFetching ? "opacity-60" : ""}`}>
              <VehicleTable
                vehicles={vehicles}
                selectedIds={selectedIds}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
                onEdit={setEditingVehicle}
                onDelete={setDeletingVehicle}
              />
            </div>
          )}

          <VehicleTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>

        <FleetInsightsRow insights={mockFleetInsights} />
      </div>

      <AddVehicleModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditVehicleModal vehicle={editingVehicle} onClose={() => setEditingVehicle(null)} />
      <DeleteVehicleDialog
        vehicle={deletingVehicle}
        onClose={() => setDeletingVehicle(null)}
        onDeleted={() => setSelectedIds(new Set())}
      />
    </div>
  );
}

export default VehiclesView;