import { UserRole } from "@/lib/roles";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role?: UserRole;
  organization_id?: string | null;
}

/**
 * Payload sent to /auth/refresh
 */
export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization_id?: string | null;
  is_active?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;

  access_token: string;

  refresh_token: string;

  expires_in: number;

  token_type: string;

  user: User;
}

/**
 * Response returned by /auth/refresh
 */
export interface RefreshTokenResponse {
  access_token: string;

  token_type: string;

  expires_in: number;
}