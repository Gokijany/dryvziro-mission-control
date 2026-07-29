import api from "@/lib/api";
import type {
  AnalyticsSummary,
  DriverScore,
  EmissionTrend,
  FleetScore,
  FuelEfficiencyTrend,
} from "../types/analytics";

export const analyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    // TODO: Replace with backend endpoint
    return {
      total_vehicles: 156,
      total_distance_km: 248736.4,
      total_emissions_g_co2: 842356,
      average_efficiency: 16.8,
      total_fuel_consumed_liters: 14832.5,
      average_speed_kmh: 63.4,
    };
  },

  getEmissionTrend: async (
    _startDate: string,
    _endDate: string,
  ): Promise<EmissionTrend[]> => {
    // TODO: Replace with backend endpoint

    return [
      { date: "2026-07-01", emissions_g_co2: 8650 },
      { date: "2026-07-02", emissions_g_co2: 8420 },
      { date: "2026-07-03", emissions_g_co2: 8250 },
      { date: "2026-07-04", emissions_g_co2: 8120 },
      { date: "2026-07-05", emissions_g_co2: 7985 },
      { date: "2026-07-06", emissions_g_co2: 7850 },
      { date: "2026-07-07", emissions_g_co2: 7715 },
      { date: "2026-07-08", emissions_g_co2: 7590 },
      { date: "2026-07-09", emissions_g_co2: 7440 },
      { date: "2026-07-10", emissions_g_co2: 7310 },
    ];
  },

  getFuelEfficiencyTrend: async (
    _startDate: string,
    _endDate: string,
  ): Promise<FuelEfficiencyTrend[]> => {
    // TODO: Replace with backend endpoint

    return [
      { date: "2026-07-01", efficiency: 15.4 },
      { date: "2026-07-02", efficiency: 15.8 },
      { date: "2026-07-03", efficiency: 16.1 },
      { date: "2026-07-04", efficiency: 16.3 },
      { date: "2026-07-05", efficiency: 16.6 },
      { date: "2026-07-06", efficiency: 16.8 },
      { date: "2026-07-07", efficiency: 17.0 },
      { date: "2026-07-08", efficiency: 17.2 },
      { date: "2026-07-09", efficiency: 17.5 },
      { date: "2026-07-10", efficiency: 17.8 },
    ];
  },

  getFleetScores: async (): Promise<FleetScore[]> => {
    // TODO: Replace with backend endpoint

    return [
      {
        rank: 1,
        vehicle_id: "VH001",
        vehicle: "KDL 345X",
        score: 97.8,
        distance_km: 4210.4,
        emissions_g_co2: 6400,
        efficiency: 19.6,
      },
      {
        rank: 2,
        vehicle_id: "VH002",
        vehicle: "KDM 812B",
        score: 95.9,
        distance_km: 3985.2,
        emissions_g_co2: 6815,
        efficiency: 18.9,
      },
      {
        rank: 3,
        vehicle_id: "VH003",
        vehicle: "KCY 447P",
        score: 94.3,
        distance_km: 3742.8,
        emissions_g_co2: 7030,
        efficiency: 18.4,
      },
      {
        rank: 4,
        vehicle_id: "VH004",
        vehicle: "KDF 124A",
        score: 91.8,
        distance_km: 3520.5,
        emissions_g_co2: 7510,
        efficiency: 17.6,
      },
      {
        rank: 5,
        vehicle_id: "VH005",
        vehicle: "KCU 992L",
        score: 88.5,
        distance_km: 3314.9,
        emissions_g_co2: 8040,
        efficiency: 16.8,
      },
    ];
  },

  getDriverScores: async (): Promise<DriverScore[]> => {
    // TODO: Replace with backend endpoint

    return [
      {
        rank: 1,
        driver_id: "DRV001",
        driver_name: "John Mwangi",
        score: 98.4,
      },
      {
        rank: 2,
        driver_id: "DRV002",
        driver_name: "Mary Wanjiku",
        score: 96.7,
      },
      {
        rank: 3,
        driver_id: "DRV003",
        driver_name: "Brian Otieno",
        score: 95.8,
      },
      {
        rank: 4,
        driver_id: "DRV004",
        driver_name: "Faith Njeri",
        score: 93.6,
      },
      {
        rank: 5,
        driver_id: "DRV005",
        driver_name: "Kevin Kiptoo",
        score: 91.4,
      },
    ];
  },
};