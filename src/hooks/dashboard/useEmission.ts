import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useEmissions() {
  return useQuery({
    queryKey: ["emissions"],
    queryFn: () => dashboardService.getEmissions(),
  });
}