export interface AnalyticsSummary {
  total_vehicles: number;
  total_distance_km: number;
  total_emissions_g_co2: number;
  average_efficiency: number | null;
  total_fuel_consumed_liters: number | null;
  average_speed_kmh: number | null;
}

export interface EmissionTrend {
  date: string;
  emissions_g_co2: number;
}

export interface FuelEfficiencyTrend {
  date: string;
  efficiency: number;
}

export interface FleetScore {
  rank: number;
  vehicle_id: string;
  vehicle: string;
  score: number;
  distance_km: number;
  emissions_g_co2: number;
  efficiency: number;
}

export interface DriverScore {
  rank: number;
  driver_id: string;
  driver_name: string;
  score: number;
}