import { Info } from "lucide-react";
import type { AirQualityData } from "../types/emissions";

interface Props {
  data?: AirQualityData;
}

export function AirQualityCorrelationCard({ data }: Props) {
  if (!data) return null;

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Air Quality Correlation</h2>
        <Info className="h-4 w-4 text-foreground cursor-pointer" />
      </div>

      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="flex flex-col items-center justify-center rounded-xl bg-background/50 border border-border/60 p-4">
          <span className="text-[10px] font-semibold tracking-wider text-foreground mb-2">
            LOCAL AQI
          </span>
          <div className="relative flex items-center justify-center h-20 w-20">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted/30"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                strokeDasharray="75, 100"
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-lg font-bold text-foreground">{data.aqi}</span>
          </div>
          <span className="mt-2 text-[10px] font-bold tracking-wider text-primary">
            {data.status}
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-background/50 border border-border/60 p-4">
          <span className="text-[10px] font-semibold tracking-wider text-foreground">HUMIDITY</span>
          <div className="my-auto">
            <span className="text-2xl font-bold text-foreground">
              {data.humidity}
              <span className="text-sm font-normal text-foreground">%</span>
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`h-3 flex-1 rounded-sm ${bar <= 4 ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <div className="text-[9px] font-bold tracking-wider text-foreground">
              {data.humidityStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-background/50 border border-border/60 p-3 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-semibold tracking-wider text-foreground">
            PM2.5 CONCENTRATION
          </div>
          <div className="text-xs font-semibold text-foreground mt-0.5">
            {data.pm25Concentration} µg/m³
          </div>
        </div>
        <div className="flex items-end gap-1 h-6">
          {data.sparkline.map((val, idx) => (
            <div
              key={idx}
              className="w-1.5 bg-primary rounded-t-sm"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
