"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Service } from "@prisma/client";
import Image from "next/image";
import { Plus } from "lucide-react";
import { serviceHooks } from "@/lib/queries/services";
import { serviceSchema, type ServiceFormValues } from "@/lib/validation/service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function ServicesPage() {
  const { data, isLoading } = serviceHooks.useList();
  const createMutation = serviceHooks.useCreate();
  const updateMutation = serviceHooks.useUpdate();
  const removeMutation = serviceHooks.useRemove();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({ resolver: yupResolver(serviceSchema) });

  function openCreate() {
    setEditing(null);
    reset({ title: "", slug: "", summary: "", description: "", icon: "", image: "", sortOrder: 0 });
    setModalOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    reset({
      title: service.title,
      slug: service.slug,
      summary: service.summary,
      description: service.description,
      icon: service.icon ?? "",
      image: service.image ?? "",
      sortOrder: service.sortOrder,
    });
    setModalOpen(true);
  }

  function onSubmit(values: ServiceFormValues) {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: values }, { onSuccess: () => setModalOpen(false) });
    } else {
      createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Services</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Add Service
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            {
              header: "",
              className: "w-16",
              accessor: (row) =>
                row.image ? (
                  <div className="relative h-10 w-10 overflow-hidden">
                    <Image src={row.image} alt="" fill className="object-cover" />
                  </div>
                ) : null,
            },
            { header: "Title", accessor: (row) => row.title },
            { header: "Summary", accessor: (row) => <span className="line-clamp-1">{row.summary}</span> },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onEdit={openEdit}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Service" : "New Service"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <ImageUploader label="Image" value={field.value} onChange={field.onChange} />
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" {...register("title")} error={errors.title?.message} />
            <Input label="Slug" {...register("slug")} error={errors.slug?.message} />
          </div>
          <Textarea label="Summary" rows={2} {...register("summary")} error={errors.summary?.message} />
          <Textarea label="Description" rows={4} {...register("description")} error={errors.description?.message} />
          <Input label="Icon (lucide name, optional)" {...register("icon")} />
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="mt-2">
            {editing ? "Save Changes" : "Create Service"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        description="This cannot be undone."
        onCancel={() => setDeleting(null)}
        loading={removeMutation.isPending}
        onConfirm={() => deleting && removeMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </div>
  );
}
