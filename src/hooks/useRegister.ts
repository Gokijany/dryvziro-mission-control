"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { RegisterRequest } from "@/types/auth";
import { AuthService } from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      AuthService.register(data),

    onSuccess: (response) => {
      console.log("Registration successful");
      console.log(response);

      router.push("/login");
    },

    onError: (error) => {
      console.log("Registration failed");

      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    },
  });
}