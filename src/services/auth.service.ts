import api from "@/lib/api";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth";

export const AuthService = {
  login: async (
    data: LoginRequest
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/login",
      data
    );

    return response.data;
  },

  register: async (
    data: RegisterRequest
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      data
    );

    return response.data;
  },
};