import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;

  accessToken: string | null;

  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    accessToken: string,
  ) => void;

  logout: () => void;

  setUser: (user: AuthUser) => void;

  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      isAuthenticated: false,

      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: !!token,
        }),
    }),
    {
      name: "dryvziro-auth",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);