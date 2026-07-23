import { SlidersHorizontal, Download, ChevronRight } from "lucide-react";
import type { TripLogEntry } from "@/features/vehicles/types/vehicleDetail";

interface TripTimelineCardProps {
  trips: TripLogEntry[];
  onFilter?: () => void;
  onExport?: () => void;
  onSelectTrip?: (trip: TripLogEntry) => void;
}

export function TripTimelineCard({ trips, onFilter, onExport, onSelectTrip }: TripTimelineCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5">
        <div>
          <div className="text-[13px] font-medium text-foreground">Trip Timeline</div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Last 24 Hours Activity</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFilter}
            aria-label="Filter trips"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onExport}
            aria-label="Export trips"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-border">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                TIME
              </th>
              <th className="px-3 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                DESTINATION
              </th>
              <th className="px-3 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                DISTANCE
              </th>
              <th className="px-3 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                CO2 SAVED
              </th>
              <th className="px-3 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                DRIVER
              </th>
              <th className="w-10 px-5 py-2.5 text-[10px] font-semibold tracking-widest text-muted-foreground">
                TELEMETRY
              </th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                onClick={() => onSelectTrip?.(trip)}
                className={`border-b border-border/60 last:border-0 hover:bg-muted/30 ${
                  onSelectTrip ? "cursor-pointer" : ""
                }`}
              >
                <td className="px-5 py-3 text-[13px] font-medium text-foreground">{trip.time}</td>
                <td className="px-3 py-3 text-[13px] font-medium text-foreground">
                  {trip.destination}
                </td>
                <td className="px-3 py-3 text-[13px] text-muted-foreground">{trip.distanceKm} km</td>
                <td className="px-3 py-3 text-[13px] font-medium">
                  {trip.co2SavedKg > 0 ? (
                    <span className="text-success">+{trip.co2SavedKg} kg</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-[13px] text-foreground">{trip.driver}</td>
                <td className="px-5 py-3 text-right">
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TripTimelineCard;