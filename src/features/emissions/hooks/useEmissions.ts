import { useQuery } from "@tanstack/react-query";
import { emissionsApi } from "../services/emissionsApi";

export function useEmissionsData() {
  const accountability = useQuery({
    queryKey: ["emissions", "accountability"],
    queryFn: emissionsApi.getAccountability,
  });

  const forecasts = useQuery({
    queryKey: ["emissions", "forecasts"],
    queryFn: emissionsApi.getForecasts,
  });

  const airQuality = useQuery({
    queryKey: ["emissions", "airQuality"],
    queryFn: emissionsApi.getAirQuality,
  });

  const secondaryMetrics = useQuery({
    queryKey: ["emissions", "secondaryMetrics"],
    queryFn: emissionsApi.getSecondaryMetrics,
  });

  return {
    accountability,
    forecasts,
    airQuality,
    secondaryMetrics,
    isLoading: accountability.isLoading || forecasts.isLoading || airQuality.isLoading || secondaryMetrics.isLoading,
  };
}