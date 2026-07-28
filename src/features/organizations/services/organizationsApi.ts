import api from "@/lib/api";

import type {
  Organization,
  CreateOrganizationRequest,
} from "@/features/organizations/types/organization";


// Get organizations
export async function fetchOrganizations(): Promise<Organization[]> {
  const { data } = await api.get<Organization[]>("/organizations/");
  return data;
}


// Create organization
export async function createOrganization(
  payload: CreateOrganizationRequest,
): Promise<Organization> {

  const { data } = await api.post<Organization>(
    "/organizations/",
    payload,
  );

  return data;
}