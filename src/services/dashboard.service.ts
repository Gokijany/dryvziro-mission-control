import {
  activeVehicles,
  alerts,
  emissionsOverview,
  fleetActivity,
  fleetSummary,
  performanceMetrics,
} from "@/data/dashboard.mock";

import {
  AlertItem,
  EmissionsOverview,
  FleetActivityPoint,
  FleetSummary,
  PerformanceMetric,
  VehicleStatus,
} from "@/types/dashboard";

/**
 * Simulates an API delay
 */
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class DashboardService {
  async getFleetSummary(): Promise<FleetSummary> {
    await delay(500);
    return fleetSummary;
  }

  async getFleetActivity(): Promise<FleetActivityPoint[]> {
    await delay(500);
    return fleetActivity;
  }

  async getAlerts(): Promise<AlertItem[]> {
    await delay(500);
    return alerts;
  }

  async getEmissions(): Promise<EmissionsOverview> {
    await delay(500);
    return emissionsOverview;
  }

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    await delay(500);
    return performanceMetrics;
  }

  async getVehicles(): Promise<VehicleStatus[]> {
    await delay(500);
    return activeVehicles;
  }
}

export const dashboardService = new DashboardService();