import api from "@/lib/api";
import type { 
  CarbonAccountabilityData, 
  ForecastTrendItem, 
  OperatorRankingItem, 
  AirQualityData, 
  SecondaryMetrics 
} from "../types/emissions";

export const emissionsApi = {
  getAccountability: async (): Promise<CarbonAccountabilityData> => {
    // Replace with actual API endpoint when backend PostgreSQL route is connected
    return {
      totalMTCO2e: 1428.2,
      target: 1350.0,
      percentageChange: 12.4,
      weeklyCurve: [
        { day: "MON", value: 90 },
        { day: "TUE", value: 85 },
        { day: "WED", value: 95 },
        { day: "THU", value: 70 },
        { day: "FRI", value: 100 },
        { day: "SAT", value: 40 },
        { day: "SUN", value: 120 },
      ],
    };
  },

  getForecasts: async (): Promise<ForecastTrendItem[]> => {
    return [
      { label: "Efficiency Gains", value: "+8.2%", percentage: 75, statusColor: "primary" },
      { label: "Regulatory Risk", value: "Low", percentage: 25, statusColor: "rose" },
      { label: "Bio-Fuel Adoption", value: "Progressing", percentage: 50, statusColor: "amber" },
    ];
  },

  getOperatorRankings: async (_mode: "EMISSIONS" | "MILEAGE"): Promise<OperatorRankingItem[]> => {
    return [
      { rank: "01", initials: "JD", name: "Julian D. Alastair", fleet: "FLEET ALPHA • EV-HYBRID", metric: "0.12 kg/km", tier: "ELITE TIER" },
      { rank: "02", initials: "MK", name: "Marcus Kinsley", fleet: "FLEET GAMMA • DIESEL-GEN5", metric: "0.45 kg/km", tier: "AVERAGE" },
      { rank: "03", initials: "SL", name: "Sarah L'Orange", fleet: "FLEET DELTA • EV", metric: "0.05 kg/km", tier: "LEADER" },
    ];
  },

  getAirQuality: async (): Promise<AirQualityData> => {
    return {
      aqi: 42,
      status: "OPTIMAL",
      humidity: 68,
      humidityStatus: "MODERATE",
      pm25Concentration: 12.4,
      sparkline: [40, 60, 45, 80, 55, 90, 70],
    };
  },

  getSecondaryMetrics: async (): Promise<SecondaryMetrics> => {
    return {
      noxLevel: "0.024 g/kWh",
      noxBaseline: "Within Euro VI baseline",
      co2Offset: "12.8 Tons",
      co2Verifier: "Verified via Shell Environmental",
      sensorFidelity: 99.8,
      activeNodes: 1248,
    };
  },
};