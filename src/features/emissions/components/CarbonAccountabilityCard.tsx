import { TrendingUp } from "lucide-react";
import type { CarbonAccountabilityData } from "../types/emissions";

interface Props {
  data?: CarbonAccountabilityData;
}

export function CarbonAccountabilityCard({ data }: Props) {
  if (!data) return null;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-foreground">
            TOTAL CARBON ACCOUNTABILITY
          </span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              <TrendingUp className="h-3 w-3" /> +{data.percentageChange}%
            </span>
            <span className="text-[11px] text-foreground">Target: {data.target}</span>
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.totalMTCO2e}
          </span>
          <span className="text-sm font-medium text-foreground">MT CO2e</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative h-32 w-full">
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 700 120"
          >
            <defs>
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#05A653" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#05A653" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 90 Q 100 85, 200 95 T 400 70 T 550 100 T 700 40 L 700 120 L 0 120 Z"
              fill="url(#carbonGradient)"
            />
            <path
              d="M 0 90 Q 100 85, 200 95 T 400 70 T 550 100 T 700 40"
              fill="none"
              stroke="#05A653"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-2 flex justify-between text-[10px] font-medium text-foreground">
          {data.weeklyCurve.map((item) => (
            <span key={item.day}>{item.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
