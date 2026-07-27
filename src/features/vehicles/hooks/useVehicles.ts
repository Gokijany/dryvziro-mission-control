import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createVehicle,
  deleteVehicle,
  fetchVehicleById,
  fetchVehicles,
  updateVehicle,
} from "@/features/vehicles/services/vehiclesApi";
import type {
  VehicleCreateInput,
  VehicleListParams,
  VehicleUpdateInput,
} from "@/features/vehicles/types/vehicle";

export const vehicleKeys = {
  all: ["vehicles"] as const,
  lists: () => [...vehicleKeys.all, "list"] as const,
  list: (params: VehicleListParams) => [...vehicleKeys.lists(), params] as const,
  details: () => [...vehicleKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
};

export function useVehicles(params: VehicleListParams = {}) {
  return useQuery({
    queryKey: vehicleKeys.list(params),
    queryFn: () => fetchVehicles(params),
    placeholderData: keepPreviousData,
  });
}

export function useVehicle(id: string | undefined) {
  return useQuery({
    queryKey: vehicleKeys.detail(id ?? ""),
    queryFn: () => fetchVehicleById(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VehicleCreateInput) => createVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: VehicleUpdateInput }) =>
      updateVehicle(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
      queryClient.setQueryData(vehicleKeys.detail(updated.id), updated);
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVehicle(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.lists() });
      queryClient.removeQueries({ queryKey: vehicleKeys.detail(id) });
    },
  });
}