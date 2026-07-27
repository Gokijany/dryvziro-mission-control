import { Activity, Truck, Cloud, Zap, Cpu, Leaf } from "lucide-react";
import type { DashboardData } from "../types/dashboard";

interface Props {
  data: DashboardData;
}

export function EcosystemStatsGrid({ data }: Props) {
  const cards = [
    { title: "ECOSYSTEM HEALTH", value: data.ecosystemHealth, sub: data.ecosystemHealthSub, icon: Activity, color: "text-primary" },
    { title: "LIVE VEHICLES", value: data.liveVehiclesCount.toLocaleString(), sub: data.liveVehiclesSub, icon: Truck, color: "text-foreground" },
    { title: "LIVE EMISSIONS", value: `${data.liveEmissionsKg} KG`, sub: data.liveEmissionsSub, icon: Cloud, color: "text-foreground" },
    { title: "FUEL USAGE", value: `${data.fuelUsageLiters} L`, sub: data.fuelUsageSub, icon: Zap, color: "text-foreground" },
    { title: "FLEET EFFICIENCY", value: data.fleetEfficiencyPct, sub: data.fleetEfficiencySub, icon: Cpu, color: "text-foreground" },
    { title: "AVOIDED EMISSIONS", value: `${data.avoidedEmissionsKg} KG`, sub: data.avoidedEmissionsSub, icon: Leaf, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">{card.title}</span>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold tracking-tight ${card.color}`}>{card.value}</div>
              <div className="mt-1 text-[9px] font-semibold tracking-wider text-muted-foreground">{card.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}