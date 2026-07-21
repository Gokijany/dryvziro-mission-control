export enum UserRole {
  GOKIJANY_ADMIN = "gokijany_admin",
  SACCO_ADMIN = "sacco_admin",
  DRIVER = "driver",
  NAPTA_ADMIN = "napta_admin",
  GOVERNMENT_AUDITOR = "government_auditor",
}

/**
 * Roles with unrestricted access across all organizations.
 */
export const CROSS_ORGANIZATION_ROLES: UserRole[] = [
  UserRole.GOKIJANY_ADMIN,
  UserRole.NAPTA_ADMIN,
  UserRole.GOVERNMENT_AUDITOR,
];

/**
 * Returns true if the role belongs to the platform operator.
 */
export function isPlatformAdmin(role: UserRole): boolean {
  return role === UserRole.GOKIJANY_ADMIN;
}

/**
 * Returns true if the role can access resources across organizations.
 */
export function isCrossOrganizationRole(role: UserRole): boolean {
  return CROSS_ORGANIZATION_ROLES.includes(role);
}