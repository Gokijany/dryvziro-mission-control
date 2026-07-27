"use client";

import {
  ArrowRight,
  Clock3,
} from "lucide-react";

const trips = [
  {
    vehicle: "DV-201",
    from: "Nairobi",
    to: "Mombasa",
    time: "08:15 AM",
    status: "Completed",
  },
  {
    vehicle: "DV-174",
    from: "Kisumu",
    to: "Eldoret",
    time: "09:40 AM",
    status: "In Progress",
  },
  {
    vehicle: "DV-402",
    from: "Nakuru",
    to: "Naivasha",
    time: "11:30 AM",
    status: "Scheduled",
  },
];

export default function RecentTrips() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Trips
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest fleet movements
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {trips.map((trip) => (
          <div
            key={`${trip.vehicle}-${trip.time}`}
            className="rounded-xl border border-border p-4 transition hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {trip.vehicle}
              </span>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {trip.status}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              {trip.from}

              <ArrowRight
                size={15}
                className="text-primary"
              />

              {trip.to}
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 size={14} />

              {trip.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}