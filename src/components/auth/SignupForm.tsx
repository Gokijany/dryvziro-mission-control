"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "./AuthHeader";
import {
  signupSchema,
  SignupFormData,
} from "@/schemas/signup.schema";
import { useRegister } from "@/hooks/useRegister";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    registerMutation.mutate({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <AuthHeader
        title="Create Account"
        subtitle="Join Dryvziro Mission Control and start managing your fleet."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>

          <input
            id="full_name"
            type="text"
            placeholder="Enter your full name"
            {...register("full_name")}
            className={`w-full rounded-xl border bg-[#122617] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition ${
              errors.full_name
                ? "border-red-500 focus:ring-red-500/20"
                : "border-white/10 focus:border-[#B4E920] focus:ring-2 focus:ring-[#B4E920]/20"
            }`}
          />

          {errors.full_name && (
            <p className="mt-2 text-sm text-red-400">
              {errors.full_name.message}
            </p>
          )}
        </div>

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
            className={`w-full rounded-xl border bg-[#122617] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition ${
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
              placeholder="Create a password"
              {...register("password")}
              className={`w-full rounded-xl border bg-[#122617] px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition ${
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
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`w-full rounded-xl border bg-[#122617] px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-white/10 focus:border-[#B4E920] focus:ring-2 focus:ring-[#B4E920]/20"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#B4E920]"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Backend Error */}
        {registerMutation.isError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {registerMutation.error.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="flex w-full items-center justify-center rounded-xl bg-[#B4E920] py-3 font-semibold text-[#08120B] transition hover:bg-[#C7F542] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#B4E920] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}