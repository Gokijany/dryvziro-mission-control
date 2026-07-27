export enum UserRole {
  GOKIJANY_ADMIN = "gokijany_admin",

  SACCO_ADMIN = "sacco_admin",

  DRIVER = "driver",

  NAPTA_ADMIN = "napta_admin",

  GOVERNMENT_AUDITOR = "government_auditor",
}

// Mirrors is_cross_organization_role() in
// app/features/authorization/domain/ownership.py — keep these two in sync.
const CROSS_ORGANIZATION_ROLES: readonly UserRole[] = [
  UserRole.GOKIJANY_ADMIN,
  UserRole.NAPTA_ADMIN,
  UserRole.GOVERNMENT_AUDITOR,
];

export function isCrossOrganizationRole(role: UserRole | undefined): boolean {
  return !!role && CROSS_ORGANIZATION_ROLES.includes(role);
}