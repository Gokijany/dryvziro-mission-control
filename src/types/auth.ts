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
  user: User;
}