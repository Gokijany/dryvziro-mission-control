import { useQuery } from "@tanstack/react-query";
import { fetchOrganizations } from "@/features/organizations/services/organizationsApi";

export const organizationKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationKeys.all, "list"] as const,
};

export function useOrganizations(enabled = true) {
  return useQuery({
    queryKey: organizationKeys.lists(),
    queryFn: fetchOrganizations,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}