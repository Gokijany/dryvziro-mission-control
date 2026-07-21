"use client";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { JwtPayload } from "@/types/auth";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: Props) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  useEffect(() => {
    if (!accessToken) return;

    try {
      const payload = jwtDecode<JwtPayload>(
        accessToken,
      );

      const now = Date.now() / 1000;

      if (payload.exp < now) {
        logout();
      }
    } catch {
      logout();
    }
  }, [accessToken, logout]);

  return children;
}