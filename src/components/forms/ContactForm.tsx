"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { contactSchema, type ContactFormValues } from "@/lib/validation/contact";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Full Renovation",
  "Single Room",
  "Consultation Only",
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) =>
      apiFetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    onSuccess: () => reset(),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full Name" placeholder="Jane Doe" {...register("name")} error={errors.name?.message} />
        <Input
          label="Email"
          type="email"
          placeholder="jane@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Phone (optional)" placeholder="+1 000 000 0000" {...register("phone")} />
        <Select label="Project Type" defaultValue="" {...register("projectType")}>
          <option value="" disabled>
            Select a type
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        label="Tell us about your project"
        placeholder="Share your vision, space, timeline and budget..."
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type="submit" size="lg" disabled={mutation.isPending} className="mt-2 w-fit">
        {mutation.isPending ? "Sending..." : "Send Inquiry"}
      </Button>

      {isSubmitSuccessful && mutation.isSuccess && (
        <p className="text-sm text-success">
          Thank you — we&apos;ve received your message and will be in touch shortly.
        </p>
      )}
      {mutation.isError && (
        <p className="text-sm text-error">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
