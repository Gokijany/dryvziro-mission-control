import api from "@/lib/api";

import {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  AuthResponse,
  RefreshTokenResponse,
} from "@/features/auth/types/auth";
export const AuthService = {
  /**
   * Login
   */
  login: async (
    data: LoginRequest,
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/login",
      data,
    );

    return response.data;
  },

  /**
   * Register
   */
  register: async (
    data: RegisterRequest,
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      data,
    );

    return response.data;
  },

  /**
   * Refresh Access Token
   */
  refreshToken: async (
    data: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> => {
    const response =
      await api.post<RefreshTokenResponse>(
        "/auth/refresh",
        data,
      );

    return response.data;
  },

  /**
   * Client-side logout.
   * (Backend token revocation can be added later.)
   */
  logout: async () => {
    return Promise.resolve();
  },
};