import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboardApi";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: dashboardApi.getDashboardData,
  });
}