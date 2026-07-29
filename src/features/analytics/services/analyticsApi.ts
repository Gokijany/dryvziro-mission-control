import api from "@/lib/api";
import {
  AnalyticsSummary,
  EmissionTrend,
  FleetScore,
  DriverScore,
  FuelEfficiencyTrend,
} from "../types/analytics";

export async function fetchAnalyticsSummary() {
  const { data } = await api.get<AnalyticsSummary>(
    "/analytics/summary",
  );

  return data;
}

export async function fetchEmissionTrend(
  startDate: string,
  endDate: string,
) {
  const { data } = await api.get<EmissionTrend[]>(
    "/analytics/emissions",
    {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    },
  );

  return data;
}

export async function fetchFuelEfficiencyTrend(
  startDate: string,
  endDate: string,
) {
  const { data } = await api.get<FuelEfficiencyTrend[]>(
    "/analytics/fuel-efficiency",
    {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    },
  );

  return data;
}

export async function fetchFleetScores() {
  const { data } = await api.get<FleetScore[]>(
    "/analytics/fleet-scores",
  );

  return data;
}

export async function fetchDriverScores() {
  const { data } = await api.get<DriverScore[]>(
    "/analytics/driver-scores",
  );

  return data;
}