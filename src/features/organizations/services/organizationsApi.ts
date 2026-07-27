import api from "@/lib/api";
import type { Organization } from "@/features/organizations/types/organization";

// Note: unlike /vehicles, /organizations/ returns a plain array, not a
// paginated { items, total } shape.
export async function fetchOrganizations(): Promise<Organization[]> {
  const { data } = await api.get<Organization[]>("/organizations/");
  return data;
}