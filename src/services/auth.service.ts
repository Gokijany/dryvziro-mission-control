import { jwtDecode } from "jwt-decode";

import api from "@/lib/api";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  JwtPayload,
  AuthUser,
} from "@/types/auth";

import { useAuthStore } from "@/store/auth.store";

export const AuthService = {
  /**
   * Authenticate user.
   */
  async login(data: LoginRequest): Promise<AuthUser> {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data,
    );

    const { access_token } = response.data;

    const payload = jwtDecode<JwtPayload>(access_token);

    const user: AuthUser = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    useAuthStore.getState().login(
      user,
      access_token,
    );

    return user;
  },

  /**
   * Admin creates a user.
   */
  async register(data: RegisterRequest) {
    const response = await api.post(
      "/auth/register",
      data,
    );

    return response.data;
  },

  /**
   * Logout.
   */
  logout() {
    useAuthStore.getState().logout();
  },
};