"use client";

"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "./AuthHeader";
import { loginSchema, LoginFormData } from "@/schemas/login.schema";
import { useLogin } from "@/hooks/useLogin";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
  loginMutation.mutate(data);
};

  return (
    <>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue to Dryvziro Mission Control"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full rounded-xl border bg-[#122617] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:border-[#B4E920] focus:ring-2 focus:ring-[#B4E920]/20"
              }`}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full rounded-xl border bg-[#122617] px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-white/10 focus:border-[#B4E920] focus:ring-2 focus:ring-[#B4E920]/20"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#B4E920]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              className="rounded border-gray-600 bg-[#122617]"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-[#B4E920] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
       <button
  type="submit"
  disabled={loginMutation.isPending}
  className="flex w-full items-center justify-center rounded-xl bg-[#B4E920] py-3 font-semibold text-[#08120B] transition hover:bg-[#C7F542] disabled:cursor-not-allowed disabled:opacity-70"
>
  {loginMutation.isPending ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Signing In...
    </>
  ) : (
    "Sign In"
  )}
</button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#B4E920] hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </>
  );
}