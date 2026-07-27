export type OrganizationType = "sacco" | "napta" | "government";

/** Mirrors the backend's OrganizationResponse schema. */
export interface Organization {
  id: string;
  name: string;
  registration_number: string;
  org_type: OrganizationType;
}