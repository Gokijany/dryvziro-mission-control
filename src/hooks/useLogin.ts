"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { AuthService } from "@/services/auth.service";
import { LoginRequest } from "@/types/auth";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const router = useRouter();

  const loginStore = useAuthStore(
    (state) => state.login
  );

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      AuthService.login(data),

    onSuccess: (response) => {
      loginStore(
        response.user,
        response.access_token,
        response.refresh_token
      );

      router.push("/dashboard");
    },

    onError: (error) => {
      console.error(error);
    },
  });
}