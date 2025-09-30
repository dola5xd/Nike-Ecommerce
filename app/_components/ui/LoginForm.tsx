"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "./OrignalButton";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Input } from "./input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        if (res.error === "Email not verified") {
          toast.error(
            <>
              Please verify your email.{" "}
              <Link href="/verify" className="text-blue-500 underline">
                Resend
              </Link>
            </>
          );
        } else {
          toast.error(res.error);
        }
      } else {
        toast.success("Welcome back!");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4 lg:gap-6 xl:max-w-md"
      noValidate
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-body-medium text-light-100">
          Email
        </label>

        <Input
          id="email"
          type="email"
          placeholder="account@gmail.com"
          autoComplete="email"
          {...register("email")}
          className="px-3 py-3 lg:py-6 placeholder:text-light-400 text-light-100 border-dark-500 focus:border-light-100"
        />
        {errors.email && (
          <span className="text-xs text-rose-400">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-body-medium text-light-100">
          Password
        </label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="minimum 8 characters"
            autoComplete="current-password"
            {...register("password")}
            className="px-3 py-3 lg:py-6 placeholder:text-light-400 text-light-100 border-dark-500 focus:border-light-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-light-100"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
          </button>
        </div>

        {errors.password && (
          <span className="text-xs text-rose-400">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" disabled={isSubmitting} variant="light" size="sm">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
