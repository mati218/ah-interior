"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsSchema, type SettingsFormValues } from "@/lib/validation/settings";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => apiFetch<Record<string, string>>("/api/settings"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SettingsFormValues>({ resolver: yupResolver(settingsSchema) });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (values: SettingsFormValues) =>
      apiFetch("/api/settings", { method: "PUT", body: JSON.stringify(values) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });

  if (isLoading) return <p className="text-sm text-taupe">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Site Settings</h1>

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="mt-6 flex max-w-2xl flex-col gap-8"
      >
        <section className="flex flex-col gap-4 border border-border bg-white p-6">
          <h2 className="font-display text-xl text-charcoal">Company Info</h2>
          <Input label="Phone" {...register("companyPhone")} error={errors.companyPhone?.message} />
          <Input label="Email" {...register("companyEmail")} error={errors.companyEmail?.message} />
          <Input label="Address" {...register("companyAddress")} />
        </section>

        <section className="flex flex-col gap-4 border border-border bg-white p-6">
          <h2 className="font-display text-xl text-charcoal">Social Links</h2>
          <Input label="Instagram URL" {...register("instagram")} />
          <Input label="Facebook URL" {...register("facebook")} />
          <Input label="LinkedIn URL" {...register("linkedin")} />
          <Input label="Pinterest URL" {...register("pinterest")} />
        </section>

        <Button type="submit" disabled={mutation.isPending} className="w-fit">
          {mutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
        {isSubmitSuccessful && mutation.isSuccess && (
          <p className="text-sm text-success">Settings saved.</p>
        )}
      </form>
    </div>
  );
}
