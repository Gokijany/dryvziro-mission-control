import { MapPin } from "lucide-react";

interface EmissionsHotspotsCardProps {
  message: string;
}

// Decorative placeholder dots standing in for a real geo-heatmap until the
// Analytics context exposes actual route/hotspot coordinates.
const HOTSPOT_DOTS = [
  { top: "22%", left: "18%", size: 8, opacity: 0.9 },
  { top: "38%", left: "42%", size: 14, opacity: 1 },
  { top: "60%", left: "28%", size: 6, opacity: 0.6 },
  { top: "48%", left: "68%", size: 10, opacity: 0.8 },
  { top: "70%", left: "60%", size: 7, opacity: 0.5 },
  { top: "30%", left: "78%", size: 6, opacity: 0.6 },
];

export function EmissionsHotspotsCard({ message }: EmissionsHotspotsCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
          EMISSIONS HOTSPOTS
        </div>
        <MapPin className="h-4 w-4 text-primary" />
      </div>

      <div className="relative mt-3 h-28 overflow-hidden rounded-lg bg-background">
        {HOTSPOT_DOTS.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary blur-[1px]"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{message}</p>
    </div>
  );
}

export default EmissionsHotspotsCard;