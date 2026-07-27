import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserRole } from "@/lib/roles";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization_id?: string | null;
}

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;

  refreshToken: string | null;

  accessTokenExpiresAt: number | null;

  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
    expiresIn?: number,
  ) => void;

  logout: () => void;

  setUser: (user: AuthUser) => void;

  setAccessToken: (
    accessToken: string,
    expiresIn: number,
  ) => void;

  updateSession: (
    accessToken: string,
    expiresIn: number,
  ) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      refreshToken: null,

      accessTokenExpiresAt: null,

      isAuthenticated: false,

      login: (
        user,
        accessToken,
        refreshToken,
        expiresIn = 3600,
      ) =>
        set({
          user,
          accessToken,
          refreshToken,
          accessTokenExpiresAt:
            Date.now() + expiresIn * 1000,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (
        accessToken,
        expiresIn,
      ) =>
        set({
          accessToken,
          accessTokenExpiresAt:
            Date.now() + expiresIn * 1000,
          isAuthenticated: true,
        }),

      /**
       * Updates session after refreshing access token
       */
      updateSession: (
        accessToken,
        expiresIn,
      ) =>
        set({
          accessToken,
          accessTokenExpiresAt:
            Date.now() + expiresIn * 1000,
          isAuthenticated: true,
        }),
    }),
    {
      name: "dryvziro-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);