"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      router.push("/admin");
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-5"
    >
      <Input
        label="Email"
        type="email"
        placeholder="admin@ahinteriors.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" size="lg" disabled={mutation.isPending} className="mt-2">
        {mutation.isPending ? "Signing in..." : "Sign In"}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-error">
          {mutation.error instanceof Error ? mutation.error.message : "Login failed"}
        </p>
      )}
    </form>
  );
}
