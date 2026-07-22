import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "@/types/auth";

interface AuthState {
  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => void;

  logout: () => void;

  setUser: (user: User) => void;

  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      refreshToken: null,

      isAuthenticated: false,

      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (token) =>
        set((state) => ({
          accessToken: token,
          isAuthenticated: !!token,
          user: token ? state.user : null,
        })),
    }),
    {
      name: "dryvziro-auth",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);