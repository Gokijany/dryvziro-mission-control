import type { DeviceResponse, DeviceStatus } from "../types/devices";
import { Link2, Unlink, ShieldCheck, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  devices: DeviceResponse[];
  onOpenAssignModal: (device: DeviceResponse) => void;
}

export function DeviceListTable({ devices, onOpenAssignModal }: Props) {
  const router = useRouter();


  const goToDetail=(device:DeviceResponse)=>{
  router.push(`/devices/${device.id}`);
  }
  const getStatusBadge = (status: DeviceStatus) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
            ACTIVE
          </span>
        );
      case "PAIRED":
        return (
          <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/20">
            PAIRED
          </span>
        );
      case "PROVISIONED":
        return (
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
            UNASSIGNED
          </span>
        );
      case "OFFLINE":
        return (
          <span className="rounded bg-zinc-500/10 px-2 py-0.5 text-[10px] font-bold text-zinc-400 border border-zinc-500/20">
            OFFLINE
          </span>
        );
      case "DECOMMISSIONED":
        return (
          <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/20">
            DECOMMISSIONED
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" /> Registered Hardware Inventory
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 text-[10px] font-bold tracking-wider text-foreground uppercase">
              <th className="py-3 px-4">SERIAL NUMBER</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4">ASSIGNED VEHICLE</th>
              <th className="py-3 px-4">FIRMWARE</th>
              <th className="py-3 px-4">CERT FINGERPRINT</th>
              <th className="py-3 px-4">LAST SEEN</th>
              <th className="py-3 px-4 text-right">PAIRING ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {devices.map((device) => (
              <tr
                key={device.id}
                role="link"
                tabIndex={0}
                onClick={() => goToDetail(device)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToDetail(device);
                  }
                }}
                className="group cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <td className="py-4 px-4 font-mono font-bold text-foreground">
                  {device.device_serial}
                </td>
                <td className="py-4 px-4">{getStatusBadge(device.status)}</td>
                <td className="py-4 px-4 font-mono">
                  {device.vehicle_id ? (
                    <span className="text-foreground">{device.vehicle_id}</span>
                  ) : (
                    <span className="text-foreground italic">None (Unassigned)</span>
                  )}
                </td>
                <td className="py-4 px-4 text-foreground font-mono">
                  {device.firmware_version || "N/A"}
                </td>
                <td className="py-4 px-4 text-foreground font-mono text-[10px]">
                  {device.cert_fingerprint
                    ? `${device.cert_fingerprint.substring(0, 12)}...`
                    : "None"}
                </td>
                <td className="py-4 px-4 text-foreground">
                  {device.last_seen_at ? new Date(device.last_seen_at).toLocaleString() : "Never"}
                </td>
                <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  {device.status !== "DECOMMISSIONED" && (
                    <button
                      onClick={() => onOpenAssignModal(device)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors shadow-sm"
                    >
                      {device.vehicle_id ? (
                        <>
                          <Unlink className="h-3.5 w-3.5 text-amber-400" /> Reassign / Unpair
                        </>
                      ) : (
                        <>
                          <Link2 className="h-3.5 w-3.5 text-primary" /> Assign to Vehicle
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
