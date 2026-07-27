import api from "@/lib/api";
import type {
  PaginatedVehicles,
  Vehicle,
  VehicleCreateInput,
  VehicleListParams,
  VehicleUpdateInput,
} from "@/features/vehicles/types/vehicle";

// NOTE: assumes NEXT_PUBLIC_API_URL already includes any versioned prefix
// (e.g. http://localhost:8000/api/v1) that app/main.py mounts the vehicles
// router under. Adjust the paths below if that assumption is wrong.

export async function fetchVehicles(
  params: VehicleListParams = {},
): Promise<PaginatedVehicles> {
  const { data } = await api.get<PaginatedVehicles>("/vehicles/", { params });
  return data;
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const { data } = await api.get<Vehicle>(`/vehicles/${id}`);
  return data;
}

export async function createVehicle(payload: VehicleCreateInput): Promise<Vehicle> {
  const { data } = await api.post<Vehicle>("/vehicles/", payload);
  return data;
}

export async function updateVehicle(
  id: string,
  payload: VehicleUpdateInput,
): Promise<Vehicle> {
  const { data } = await api.patch<Vehicle>(`/vehicles/${id}`, payload);
  return data;
}

export async function deleteVehicle(id: string): Promise<void> {
  await api.delete(`/vehicles/${id}`);
}