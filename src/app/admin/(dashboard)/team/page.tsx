"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TeamMember } from "@prisma/client";
import Image from "next/image";
import { Plus } from "lucide-react";
import { teamHooks } from "@/lib/queries/team";
import { teamMemberSchema, type TeamMemberFormValues } from "@/lib/validation/team";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function TeamPage() {
  const { data, isLoading } = teamHooks.useList();
  const createMutation = teamHooks.useCreate();
  const updateMutation = teamHooks.useUpdate();
  const removeMutation = teamHooks.useRemove();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState<TeamMember | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TeamMemberFormValues>({ resolver: yupResolver(teamMemberSchema) });

  function openCreate() {
    setEditing(null);
    reset({ name: "", role: "", bio: "", photo: "", sortOrder: 0 });
    setModalOpen(true);
  }

  function openEdit(member: TeamMember) {
    setEditing(member);
    reset({
      name: member.name,
      role: member.role,
      bio: member.bio ?? "",
      photo: member.photo ?? "",
      sortOrder: member.sortOrder,
    });
    setModalOpen(true);
  }

  function onSubmit(values: TeamMemberFormValues) {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: values }, { onSuccess: () => setModalOpen(false) });
    } else {
      createMutation.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Team</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Add Member
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            {
              header: "",
              className: "w-16",
              accessor: (row) =>
                row.photo ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={row.photo} alt="" fill className="object-cover" />
                  </div>
                ) : null,
            },
            { header: "Name", accessor: (row) => row.name },
            { header: "Role", accessor: (row) => row.role },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onEdit={openEdit}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Team Member" : "New Team Member"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="photo"
            render={({ field }) => (
              <ImageUploader label="Photo" value={field.value} onChange={field.onChange} />
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" {...register("name")} error={errors.name?.message} />
            <Input label="Role" {...register("role")} error={errors.role?.message} />
          </div>
          <Textarea label="Bio (optional)" rows={3} {...register("bio")} />
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="mt-2">
            {editing ? "Save Changes" : "Add Member"}
          </Button>
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
