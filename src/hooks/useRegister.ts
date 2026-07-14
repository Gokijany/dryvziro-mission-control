"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { RegisterRequest } from "@/types/auth";
import { AuthService } from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      AuthService.register(data),

    onSuccess: () => {
      router.push("/login");
    },

    onError: (error) => {
      console.error(error);
    },
  });
}