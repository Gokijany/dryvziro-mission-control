import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../services/analyticsApi";

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: analyticsApi.getSummary,
  });
}

export function useEmissionTrend(
  startDate: string,
  endDate: string,
) {
  return useQuery({
    queryKey: [
      "analytics",
      "emissionTrend",
      startDate,
      endDate,
    ],
    queryFn: () =>
      analyticsApi.getEmissionTrend(
        startDate,
        endDate,
      ),
  });
}

export function useFuelEfficiencyTrend(
  startDate: string,
  endDate: string,
) {
  return useQuery({
    queryKey: [
      "analytics",
      "fuelEfficiency",
      startDate,
      endDate,
    ],
    queryFn: () =>
      analyticsApi.getFuelEfficiencyTrend(
        startDate,
        endDate,
      ),
  });
}

export function useFleetScores() {
  return useQuery({
    queryKey: ["analytics", "fleetScores"],
    queryFn: analyticsApi.getFleetScores,
  });
}

export function useDriverScores() {
  return useQuery({
    queryKey: ["analytics", "driverScores"],
    queryFn: analyticsApi.getDriverScores,
  });
}