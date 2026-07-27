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

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  organization_id: string | null;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;

  /**
   * Lifetime of the access token in seconds.
   * Example: 3600 = 1 hour
   */
  expires_in: number;

  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}