"use client";

import { Route as RouteIcon, FileDown, FileSpreadsheet } from "lucide-react";

interface VehicleTableToolbarProps {
  selectedCount: number;
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onAssignRoute?: () => void;
  onExportPdf?: () => void;
  onExportCsv?: () => void;
}

export function VehicleTableToolbar({
  selectedCount,
  rangeStart,
  rangeEnd,
  total,
  onAssignRoute,
  onExportPdf,
  onExportCsv,
}: VehicleTableToolbarProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-border px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {selectedCount > 0 && (
          <>
            <span className="text-[12px] font-medium text-foreground">
              {selectedCount} vehicle{selectedCount === 1 ? "" : "s"} selected
            </span>
            <button
              type="button"
              onClick={onAssignRoute}
              className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RouteIcon className="h-3.5 w-3.5" />
              Assign Route
            </button>
            <button
              type="button"
              onClick={onExportPdf}
              className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileDown className="h-3.5 w-3.5" />
              Export PDF
            </button>
            <button
              type="button"
              onClick={onExportCsv}
              className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </>
        )}
      </div>

      <span className="text-[12px] text-muted-foreground">
        Showing {rangeStart}-{rangeEnd} of {total.toLocaleString()}
      </span>
    </div>
  );
}

export default VehicleTableToolbar;