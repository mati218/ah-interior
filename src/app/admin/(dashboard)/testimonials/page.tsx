"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Testimonial } from "@prisma/client";
import { Plus, Star } from "lucide-react";
import { testimonialHooks } from "@/lib/queries/testimonials";
import { testimonialSchema, type TestimonialFormValues } from "@/lib/validation/testimonial";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function TestimonialsPage() {
  const { data, isLoading } = testimonialHooks.useList();
  const createMutation = testimonialHooks.useCreate();
  const updateMutation = testimonialHooks.useUpdate();
  const removeMutation = testimonialHooks.useRemove();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TestimonialFormValues>({ resolver: yupResolver(testimonialSchema) });

  function openCreate() {
    setEditing(null);
    reset({ clientName: "", role: "", message: "", avatar: "", rating: 5, featured: false });
    setModalOpen(true);
  }

  function openEdit(testimonial: Testimonial) {
    setEditing(testimonial);
    reset({
      clientName: testimonial.clientName,
      role: testimonial.role ?? "",
      message: testimonial.message,
      avatar: testimonial.avatar ?? "",
      rating: testimonial.rating,
      featured: testimonial.featured,
    });
    setModalOpen(true);
  }

  function onSubmit(values: TestimonialFormValues) {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: values }, { onSuccess: () => setModalOpen(false) });
    } else {
      createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Testimonials</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Add Testimonial
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            { header: "Client", accessor: (row) => row.clientName },
            { header: "Message", accessor: (row) => <span className="line-clamp-1">{row.message}</span> },
            {
              header: "Rating",
              accessor: (row) => (
                <span className="flex items-center gap-1 text-gold">
                  {row.rating} <Star size={13} fill="currentColor" />
                </span>
              ),
            },
            { header: "Featured", accessor: (row) => (row.featured ? "Yes" : "—") },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onEdit={openEdit}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Testimonial" : "New Testimonial"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="avatar"
            render={({ field }) => (
              <ImageUploader label="Avatar (optional)" value={field.value} onChange={field.onChange} />
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Client Name" {...register("clientName")} error={errors.clientName?.message} />
            <Input label="Role (optional)" {...register("role")} />
          </div>
          <Textarea label="Message" rows={4} {...register("message")} error={errors.message?.message} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Rating (1-5)" type="number" min={1} max={5} {...register("rating")} />
            <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-charcoal">
              <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-gold" />
              Featured on homepage
            </label>
          </div>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="mt-2">
            {editing ? "Save Changes" : "Create Testimonial"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete testimonial from "${deleting?.clientName}"?`}
        description="This cannot be undone."
        onCancel={() => setDeleting(null)}
        loading={removeMutation.isPending}
        onConfirm={() => deleting && removeMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </div>
  );
}
