"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "./OrignalButton";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input } from "./input";

const registerSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      "Password must contain upper, lower and a number"
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMessage(null);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await res.json();

      if (!res.ok) {
        if (responseData.error === "Email already exists") {
          setErrorMessage("Email already exists");
          return;
        }
        throw new Error(responseData.error || "Something went wrong");
      }

      toast.success("Account created successfully!");

      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/verify",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4 xl:px-20"
      noValidate
    >
      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-caption md:text-body-medium text-dark-900"
        >
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className="w-full px-2 py-3 text-sm transition-all bg-transparent border placeholder:text-dark-700 outline-1 border-light-300 focus:border-dark-500"
        />
        {errors.name && (
          <span className="text-xs text-rose-400">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-caption md:text-body-medium text-dark-900"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="account@gmail.com"
          autoComplete="email"
          {...register("email")}
          className="w-full px-2 py-3 text-sm transition-all bg-transparent border placeholder:text-dark-700 outline-1 border-light-300 focus:border-dark-500"
        />
        {errors.email && (
          <span className="text-xs text-rose-400">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-caption md:text-body-medium text-dark-900"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            {...register("password")}
            className="w-full px-2 py-3 text-sm transition-all bg-transparent border placeholder:text-dark-700 outline-1 border-light-300 focus:border-dark-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-dark-900"
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

      {/* Error for existing email */}
      {errorMessage === "Email already exists" && (
        <p className="text-sm text-red-500">
          An account with this email already exists.{" "}
          <Link href="/login" className="underline text-dark-900">
            Login
          </Link>
        </p>
      )}

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} variant="dark" size="md">
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
