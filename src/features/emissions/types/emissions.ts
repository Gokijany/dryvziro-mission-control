export interface CarbonAccountabilityData {
  totalMTCO2e: number;
  target: number;
  percentageChange: number;
  weeklyCurve: { day: string; value: number }[];
}

export interface ForecastTrendItem {
  label: string;
  value: string;
  percentage?: number;
  statusColor: "primary" | "rose" | "amber";
}

export interface OperatorRankingItem {
  rank: string;
  initials: string;
  name: string;
  fleet: string;
  metric: string;
  tier: string;
}

export interface AirQualityData {
  aqi: number;
  status: string;
  humidity: number;
  humidityStatus: string;
  pm25Concentration: number;
  sparkline: number[];
}

export interface SecondaryMetrics {
  noxLevel: string;
  noxBaseline: string;
  co2Offset: string;
  co2Verifier: string;
  sensorFidelity: number;
  activeNodes: number;
}