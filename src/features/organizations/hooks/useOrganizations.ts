import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchOrganizations,
  createOrganization,
} from "@/features/organizations/services/organizationsApi";

import type {
  CreateOrganizationRequest,
} from "@/features/organizations/types/organization";



export const organizationKeys = {

  all: ["organizations"] as const,

  lists: () =>
    [...organizationKeys.all, "list"] as const,

};



export function useOrganizations(enabled = true) {

  return useQuery({

    queryKey: organizationKeys.lists(),

    queryFn: fetchOrganizations,

    enabled,

    staleTime: 5 * 60 * 1000,

  });

}




export function useCreateOrganization() {

  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: (
      payload: CreateOrganizationRequest,
    ) =>
      createOrganization(payload),


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: organizationKeys.lists(),

      });

    },

  });

}