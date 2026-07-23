import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function usePerformanceMetrics() {
  return useQuery({
    queryKey: ["performance-metrics"],
    queryFn: () => dashboardService.getPerformanceMetrics(),
  });
}