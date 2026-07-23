import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () => dashboardService.getVehicles(),
  });
}