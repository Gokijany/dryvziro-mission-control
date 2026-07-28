export type OrganizationType =
  | "sacco"
  | "napta"
  | "government";


export interface Organization {

  id: string;

  name: string;

  registration_number: string;

  org_type: OrganizationType;
}



export interface CreateOrganizationRequest {

  name: string;

  registration_number: string;

  org_type: OrganizationType;

}