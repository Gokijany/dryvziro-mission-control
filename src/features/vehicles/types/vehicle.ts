export type VehicleStatus = "active" | "inactive" | "maintenance" | "decommissioned";

export interface OrganizationSummary {
  id: string;
  name: string;
}

/** Mirrors the backend's VehicleResponse schema exactly. */
export interface Vehicle {
  id: string;
  organization_id: string;
  vin: string;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  status: VehicleStatus;
  organization: OrganizationSummary | null;
}

/** Mirrors PaginatedVehicleResponse. */
export interface PaginatedVehicles {
  items: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}

export interface VehicleCreateInput {
  organization_id: string;
  vin: string;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  status?: VehicleStatus;
}

export interface VehicleUpdateInput {
  vin?: string;
  license_plate?: string;
  make?: string;
  model?: string;
  year?: number;
  status?: VehicleStatus;
}

export interface VehicleListParams {
  status?: VehicleStatus;
  search?: string;
  skip?: number;
  limit?: number;
}