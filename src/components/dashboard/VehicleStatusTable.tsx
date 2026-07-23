"use client";

const vehicles = [
  {
    id: "DRV-001",
    driver: "John Kamau",
    location: "Nairobi",
    status: "Active",
    speed: "68 km/h",
  },
  {
    id: "DRV-014",
    driver: "Mary Wanjiku",
    location: "Mombasa",
    status: "Idle",
    speed: "0 km/h",
  },
  {
    id: "DRV-023",
    driver: "Brian Otieno",
    location: "Kisumu",
    status: "Maintenance",
    speed: "--",
  },
  {
    id: "DRV-031",
    driver: "Faith Njeri",
    location: "Nakuru",
    status: "Active",
    speed: "72 km/h",
  },
];

function badge(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-500/15 text-green-400";

    case "Idle":
      return "bg-yellow-500/15 text-yellow-400";

    case "Maintenance":
      return "bg-red-500/15 text-red-400";

    default:
      return "bg-gray-500/15 text-gray-400";
  }
}

export default function VehicleStatusTable() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-lg font-semibold">
          Vehicle Status
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Live operational status of the fleet.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/30">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Speed</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b border-border transition hover:bg-muted/20"
              >
                <td className="px-6 py-5 font-semibold">
                  {vehicle.id}
                </td>

                <td className="px-6 py-5">
                  {vehicle.driver}
                </td>

                <td className="px-6 py-5">
                  {vehicle.location}
                </td>

                <td className="px-6 py-5">
                  {vehicle.speed}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(vehicle.status)}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 lg:hidden">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="rounded-xl border border-border bg-background p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {vehicle.id}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(vehicle.status)}`}
              >
                {vehicle.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">
                  Driver
                </p>

                <p>{vehicle.driver}</p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Location
                </p>

                <p>{vehicle.location}</p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Speed
                </p>

                <p>{vehicle.speed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}