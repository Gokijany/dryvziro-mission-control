"use client";

import { Header } from "@/components/shared/Header";
import { EcosystemHeroHeader } from "./EcosystemHeroHeader";
import { EcosystemStatsGrid } from "./EcosystemStatsGrid";
import { TransportHealthOverviewCard } from "./TransportHealthOverviewCard";
import { LiveFleetMapCard } from "./LiveFleetMapCard";
import { RecentAiInsightsCard } from "./RecentAiInsightsCard";
import { ActiveAlertsCard } from "./ActiveAlertsCard";
import { useDashboardData } from "../hooks/useDashboard";
import { Loader2 } from "lucide-react";

export function DashboardView() {
  const { data, isLoading } = useDashboardData();

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 flex-col">
        <Header title="Mission Control" />
        <div className="flex h-96 items-center justify-center text-xs font-semibold text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading Mission Control...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Mission Control" searchPlaceholder="Search fleet data..." />

      <div className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
        <EcosystemHeroHeader />

        <EcosystemStatsGrid data={data} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <TransportHealthOverviewCard />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <LiveFleetMapCard />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RecentAiInsightsCard insights={data.insights} />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <ActiveAlertsCard alerts={data.alerts} />
          </div>
        </div>
      </div>
    </div>
  );
}