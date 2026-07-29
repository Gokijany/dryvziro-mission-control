import { useQuery } from "@tanstack/react-query";

import {
  fetchAnalyticsSummary,
  fetchEmissionTrend,
  fetchFleetScores,
  fetchDriverScores,
  fetchFuelEfficiencyTrend,

} from "../services/analyticsApi";

export const analyticsKeys = {
  all: ["analytics"] as const,
  summary: ["analytics", "summary"] as const,
  emissions: (
    start: string,
    end: string,
  ) => ["analytics", "emissions", start, end] as const,
  fleet: ["analytics", "fleet"] as const,
  drivers: ["analytics", "drivers"] as const,
  fuelEfficiency: (
    startDate: string,
    endDate: string,
  ): readonly string[] =>
    [
      ...analyticsKeys.all,
      "fuel-efficiency",
      startDate,
      endDate,
    ] as const,
};

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: analyticsKeys.summary,
    queryFn: fetchAnalyticsSummary,
  });
}

export function useEmissionTrend(
  start: string,
  end: string,
) {
  return useQuery({
    queryKey: analyticsKeys.emissions(start, end),
    queryFn: () => fetchEmissionTrend(start, end),
    enabled: !!start && !!end,
  });
}

export function useFleetScores() {
  return useQuery({
    queryKey: analyticsKeys.fleet,
    queryFn: fetchFleetScores,
  });
}

export function useDriverScores() {
  return useQuery({
    queryKey: analyticsKeys.drivers,
    queryFn: fetchDriverScores,
  });
}

export function useFuelEfficiencyTrend(
  startDate: string,
  endDate: string,
) {
  return useQuery({
    queryKey: analyticsKeys.fuelEfficiency(
      startDate,
      endDate,
    ),
    queryFn: () =>
      fetchFuelEfficiencyTrend(
        startDate,
        endDate,
      ),
    enabled: !!startDate && !!endDate,
  });
}