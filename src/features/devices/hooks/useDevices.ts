import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { devicesApi } from "../services/devicesApi";
import type {
  DeviceCreateRequest,
  DeviceAssignmentRequest,
} from "../types/devices";


export const deviceKeys = {
  all:["devices"] as const,

  lists:()=>[
    ...deviceKeys.all,
    "list"
  ] as const,

  details:()=>[
    ...deviceKeys.all,
    "detail"
  ] as const,

  detail:(id:string)=>[
    ...deviceKeys.details(),
    id
  ] as const,
};



export function useDevices(){
  return useQuery({
    queryKey:deviceKeys.lists(),
    queryFn:devicesApi.getDevices,
  });
}



export function useDevice(id:string | undefined){

  return useQuery({
    queryKey:deviceKeys.detail(id ?? ""),
    queryFn:()=>devicesApi.getDeviceById(id as string),
    enabled:Boolean(id),
  });

}



export function useRegisterDevice(){

 const queryClient=useQueryClient();

 return useMutation({

  mutationFn:(data:DeviceCreateRequest)=>
    devicesApi.registerDevice(data),

  onSuccess(){
    queryClient.invalidateQueries({
      queryKey:deviceKeys.lists()
    })
  }

 });

}



export function useAssignDevice(){

 const queryClient=useQueryClient();

 return useMutation({

 mutationFn:({
    deviceId,
    payload
 }:{
    deviceId:string;
    payload:DeviceAssignmentRequest
 }) =>
    devicesApi.updateAssignment(deviceId,payload),


 onSuccess(){
    queryClient.invalidateQueries({
      queryKey:deviceKeys.lists()
    })
 }

 });

}