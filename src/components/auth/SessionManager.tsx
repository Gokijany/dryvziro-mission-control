"use client";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface JwtPayload {
  exp: number;
}

export default function SessionManager() {
  const router = useRouter();

  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);

      const expiresAt = decoded.exp * 1000;

      const remainingTime = expiresAt - Date.now();

      if (remainingTime <= 0) {
        logout();
        router.replace("/login");
        return;
      }

      const timeout = setTimeout(() => {
        logout();
        router.replace("/login");
      }, remainingTime);

      return () => clearTimeout(timeout);
    } catch (error) {
      logout();
      router.replace("/login");
    }
  }, [accessToken, logout, router]);

  return null;
}