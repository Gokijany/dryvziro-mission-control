export interface DateFilter {
  startDate: string;
  endDate: string;
}

export interface EmissionsTrend {
  date: string;
  emissions: number;
}

export interface FuelEfficiency {
  vehicle: string;
  efficiency: number;
}

export interface DriverRanking {
  driver: string;
  score: number;
}

export interface FleetComparison {
  fleet: string;
  fuelUsage: number;
  emissions: number;
}

export interface AnalyticsResponse {
  emissions: EmissionsTrend[];
  fuelEfficiency: FuelEfficiency[];
  driverRanking: DriverRanking[];
  fleetComparison: FleetComparison[];
}