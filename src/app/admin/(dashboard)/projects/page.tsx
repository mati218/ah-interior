"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { projectHooks, type ProjectWithRelations } from "@/lib/queries/projects";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function ProjectsListPage() {
  const { data, isLoading } = projectHooks.useList();
  const removeMutation = projectHooks.useRemove();
  const [deleting, setDeleting] = useState<ProjectWithRelations | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Projects</h1>
        <Link href="/admin/projects/new">
          <Button size="sm">
            <Plus size={15} /> New Project
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            {
              header: "",
              className: "w-16",
              accessor: (row) => (
                <div className="relative h-10 w-10 overflow-hidden">
                  <Image src={row.coverImage} alt="" fill className="object-cover" />
                </div>
              ),
            },
            { header: "Title", accessor: (row) => row.title },
            { header: "Category", accessor: (row) => row.category?.name ?? "—" },
            {
              header: "Status",
              accessor: (row) => (
                <Badge tone={row.status === "PUBLISHED" ? "success" : "neutral"}>
                  {row.status}
                </Badge>
              ),
            },
            { header: "Featured", accessor: (row) => (row.featured ? "Yes" : "—") },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          editHref={(row) => `/admin/projects/${row.id}`}
          onDelete={(row) => setDeleting(row)}
        />
      </div>

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
