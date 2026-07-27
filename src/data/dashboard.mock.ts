import {
  AlertItem,
  EmissionsOverview,
  FleetActivityPoint,
  FleetSummary,
  PerformanceMetric,
  VehicleStatus,
} from "@/types/dashboard";

export const fleetSummary: FleetSummary = {
  totalVehicles: 126,
  activeVehicles: 118,
  inactiveVehicles: 8,
  totalDrivers: 34,
  activeTrips: 18,
  criticalAlerts: 6,
};

export const fleetActivity: FleetActivityPoint[] = [
  { day: "Mon", trips: 42, fuel: 310 },
  { day: "Tue", trips: 55, fuel: 350 },
  { day: "Wed", trips: 48, fuel: 325 },
  { day: "Thu", trips: 61, fuel: 382 },
  { day: "Fri", trips: 73, fuel: 415 },
  { day: "Sat", trips: 51, fuel: 296 },
  { day: "Sun", trips: 36, fuel: 240 },
];

export const emissionsOverview: EmissionsOverview = {
  totalCO2: 12.6,
  targetCO2: 10,
  reduction: 8.4,
};

export const alerts: AlertItem[] = [
  {
    id: 1,
    title: "Engine Warning",
    severity: "high",
    description: "Vehicle KDA 231A requires immediate inspection.",
    timestamp: "5 min ago",
  },
  {
    id: 2,
    title: "Fuel Level Low",
    severity: "medium",
    description: "Vehicle KDG 781Q fuel below 15%.",
    timestamp: "12 min ago",
  },
  {
    id: 3,
    title: "Trip Completed",
    severity: "low",
    description: "Driver John Mwangi completed Route 17.",
    timestamp: "28 min ago",
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: 1,
    label: "Fleet Utilization",
    value: 91,
    unit: "%",
    progress: 91,
  },
  {
    id: 2,
    label: "Fuel Efficiency",
    value: 84,
    unit: "%",
    progress: 84,
  },
  {
    id: 3,
    label: "Driver Safety",
    value: 96,
    unit: "%",
    progress: 96,
  },
];

export const activeVehicles: VehicleStatus[] = [
  {
    id: 1,
    registration: "KDA 231A",
    driver: "John Mwangi",
    status: "Active",
    location: "Nairobi",
    fuel: 78,
  },
  {
    id: 2,
    registration: "KDG 781Q",
    driver: "Mary Wanjiku",
    status: "Idle",
    location: "Mombasa",
    fuel: 42,
  },
  {
    id: 3,
    registration: "KCR 445X",
    driver: "David Otieno",
    status: "Maintenance",
    location: "Kisumu",
    fuel: 17,
  },
  {
    id: 4,
    registration: "KDN 123M",
    driver: "Grace Njeri",
    status: "Active",
    location: "Nakuru",
    fuel: 64,
  },
];