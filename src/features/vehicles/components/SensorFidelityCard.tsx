import { Radar, BatteryCharging, CheckCircle2 } from "lucide-react";
import type { SensorReading, SensorTone } from "@/features/vehicles/types/vehicleDetail";

const ROW_ICON: Record<string, typeof Radar> = {
  lidar: Radar,
  power: BatteryCharging,
  latency: CheckCircle2,
};

function toneClasses(tone: SensorTone) {
  return tone === "success"
    ? { box: "bg-success/15", icon: "text-success" }
    : { box: "bg-muted", icon: "text-muted-foreground" };
}

export function SensorFidelityCard({ sensors }: { sensors: SensorReading[] }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-medium text-foreground">Sensor Fidelity</div>
        <Radar className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="mt-4 space-y-4">
        {sensors.map((sensor) => {
          const Icon = ROW_ICON[sensor.id] ?? Radar;
          const tones = toneClasses(sensor.tone);
          return (
            <div key={sensor.id} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tones.box}`}>
                <Icon className={`h-4 w-4 ${tones.icon}`} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[9px] font-semibold tracking-widest text-muted-foreground">
                  {sensor.label}
                </div>
                <div className="text-[13px] font-medium text-foreground">
                  {sensor.value}{" "}
                  {sensor.sublabel && (
                    <span className="text-[11px] font-normal text-muted-foreground">
                      {sensor.sublabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SensorFidelityCard;