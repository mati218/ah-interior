"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { categoryHooks } from "@/lib/queries/categories";
import { categorySchema, type CategoryFormValues } from "@/lib/validation/category";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function CategoriesPage() {
  const { data, isLoading } = categoryHooks.useList();
  const createMutation = categoryHooks.useCreate();
  const updateMutation = categoryHooks.useUpdate();
  const removeMutation = categoryHooks.useRemove();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({ resolver: yupResolver(categorySchema) });

  function openCreate() {
    setEditing(null);
    reset({ name: "", slug: "" });
    setModalOpen(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    reset({ name: category.name, slug: category.slug });
    setModalOpen(true);
  }

  function onSubmit(values: CategoryFormValues) {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, data: values },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Categories</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Add Category
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            { header: "Name", accessor: (row) => row.name },
            { header: "Slug", accessor: (row) => row.slug },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onEdit={openEdit}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Category" : "New Category"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Name" {...register("name")} error={errors.name?.message} />
          <Input label="Slug" {...register("slug")} error={errors.slug?.message} />
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="mt-2"
          >
            {editing ? "Save Changes" : "Create Category"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete "${deleting?.name}"?`}
        description="This cannot be undone."
        onCancel={() => setDeleting(null)}
        loading={removeMutation.isPending}
        onConfirm={() =>
          deleting &&
          removeMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })
        }
      />
    </div>
  );
}
