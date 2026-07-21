import { UserRole } from "@/lib/roles";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  organization_id: string | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp: number;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}