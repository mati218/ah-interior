"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { userHooks, type SafeUser } from "@/lib/queries/users";
import { userSchema, type UserFormValues } from "@/lib/validation/user";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";

export default function UsersPage() {
  const { data, isLoading } = userHooks.useList();
  const createMutation = userHooks.useCreate();
  const removeMutation = userHooks.useRemove();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<SafeUser | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: yupResolver(userSchema) });

  function openCreate() {
    reset({ name: "", email: "", password: "", role: "EDITOR" });
    setModalOpen(true);
  }

  function onSubmit(values: UserFormValues) {
    createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Users</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Add User
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            { header: "Name", accessor: (row) => row.name },
            { header: "Email", accessor: (row) => row.email },
            { header: "Role", accessor: (row) => <Badge tone="gold">{row.role}</Badge> },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New User">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Name" {...register("name")} error={errors.name?.message} />
          <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
          <Select label="Role" {...register("role")}>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Owner</option>
          </Select>
          <Button type="submit" disabled={createMutation.isPending} className="mt-2">
            Create User
          </Button>
          {createMutation.isError && (
            <p className="text-sm text-error">
              {createMutation.error instanceof Error ? createMutation.error.message : "Failed"}
            </p>
          )}
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Remove "${deleting?.name}"?`}
        description="This cannot be undone."
        onCancel={() => setDeleting(null)}
        loading={removeMutation.isPending}
        onConfirm={() => deleting && removeMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </div>
  );
}
