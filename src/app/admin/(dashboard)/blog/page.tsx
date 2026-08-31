"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { Plus } from "lucide-react";
import { blogHooks } from "@/lib/queries/blog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function BlogListPage() {
  const { data, isLoading } = blogHooks.useList();
  const removeMutation = blogHooks.useRemove();
  const [deleting, setDeleting] = useState<BlogPost | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Journal</h1>
        <Link href="/admin/blog/new">
          <Button size="sm">
            <Plus size={15} /> New Post
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={[
            { header: "Title", accessor: (row) => row.title },
            {
              header: "Status",
              accessor: (row) => (
                <Badge tone={row.status === "PUBLISHED" ? "success" : "neutral"}>
                  {row.status}
                </Badge>
              ),
            },
            {
              header: "Created",
              accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
            },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          editHref={(row) => `/admin/blog/${row.id}`}
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
