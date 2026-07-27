import type { DashboardData } from "../types/dashboard";

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    return {
      ecosystemHealth: "98.2%",
      ecosystemHealthSub: "+0.4% VS PREV 24H",
      liveVehiclesCount: 1242,
      liveVehiclesSub: "102 IDLE | 14 SERVICE",
      liveEmissionsKg: "428.5",
      liveEmissionsSub: "AVG. PER VEHICLE: 0.34KG",
      fuelUsageLiters: "8.4k",
      fuelUsageSub: "42% ELECTRIC MIX",
      fleetEfficiencyPct: "94.1%",
      fleetEfficiencySub: "OPTIMAL ROUTES: 88%",
      avoidedEmissionsKg: "2.1k",
      avoidedEmissionsSub: "TODAY'S AI SAVINGS",
      stats: [],
      insights: [
        {
          id: "1",
          category: "EMISSIONS SPIKE",
          timestamp: "2 MINS AGO",
          description: "Vehicle KDL 214M emissions up 18% above benchmark. Recommend maintenance check on fuel injectors.",
        },
        {
          id: "2",
          category: "OPTIMIZATION WIN",
          timestamp: "14 MINS AGO",
          description: "Rerouting Zone 7 fleet saved 142kg CO2. Dynamic load balancing performed optimally for current weather.",
        },
        {
          id: "3",
          category: "ROUTING PREDICTION",
          timestamp: "1 HOUR AGO",
          description: "Traffic pattern shift detected at Northern Hub. Proactive 12-minute delay mitigation applied to 42 active trips.",
        },
      ],
      alerts: [
        {
          id: "a1",
          severity: "CRITICAL",
          title: "CRITICAL FUEL LEVEL",
          description: "Carrier FLX-998 fuel levels at 4%. Distance to closest depot: 12.4km.",
          actionable: true,
        },
        {
          id: "a2",
          severity: "WARNING",
          title: "Route Divergence: Asset PRD-441",
          description: "",
        },
        {
          id: "a3",
          severity: "WARNING",
          title: "Cold Chain Breach: Asset FRZ-102",
          description: "",
        },
      ],
    };
  },
};