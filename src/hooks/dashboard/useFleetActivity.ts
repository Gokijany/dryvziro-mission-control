import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useFleetActivity() {
  return useQuery({
    queryKey: ["fleet-activity"],
    queryFn: () => dashboardService.getFleetActivity(),
  });
}