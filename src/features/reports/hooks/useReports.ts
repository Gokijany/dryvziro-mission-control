import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../services/reportsApi";

export function useReportsData() {
  return useQuery({
    queryKey: ["reports", "overview"],
    queryFn: reportsApi.getReportsData,
  });
}