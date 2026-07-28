import api from "@/lib/api"; // or your shared axios instance path
import type { 
  DeviceResponse, 
  DeviceCreateRequest, 
  DeviceAssignmentRequest, 
  DeviceAssignmentResponse 
} from "../types/devices";

export const devicesApi = {
  getDevices: async (): Promise<DeviceResponse[]> => {
    const { data } = await api.get<DeviceResponse[]>("/devices/");
    return data;
  },

  getDeviceById: async (deviceId: string): Promise<DeviceResponse> => {
    const { data } = await api.get<DeviceResponse>(
      `/devices/${deviceId}`
    );

    return data;
},

  registerDevice: async (payload: DeviceCreateRequest): Promise<DeviceResponse> => {
    const { data } = await api.post<DeviceResponse>("/devices/", payload);
    return data;
  },

  updateAssignment: async (
    deviceId: string, 
    payload: DeviceAssignmentRequest
  ): Promise<DeviceAssignmentResponse> => {
    const { data } = await api.patch<DeviceAssignmentResponse>(`/devices/${deviceId}/assignment`, payload);
    return data;
  },
};