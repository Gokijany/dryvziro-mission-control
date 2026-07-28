import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { devicesApi } from "../services/devicesApi";
import type { DeviceCreateRequest, DeviceAssignmentRequest } from "../types/devices";

export function useDevices() {
  return useQuery({
    queryKey: ["devices"],
    queryFn: devicesApi.getDevices,
  });
}

export function useRegisterDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeviceCreateRequest) => devicesApi.registerDevice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}

export function useAssignDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deviceId, payload }: { deviceId: string; payload: DeviceAssignmentRequest }) =>
      devicesApi.updateAssignment(deviceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}