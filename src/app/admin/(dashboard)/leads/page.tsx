"use client";

import { useState } from "react";
import type { Lead } from "@prisma/client";
import { leadHooks } from "@/lib/queries/leads";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";

const STATUS_TONE: Record<string, "gold" | "sage" | "success"> = {
  NEW: "gold",
  CONTACTED: "sage",
  CLOSED: "success",
};

export default function LeadsPage() {
  const { data, isLoading } = leadHooks.useList();
  const updateMutation = leadHooks.useUpdate();
  const removeMutation = leadHooks.useRemove();
  const [deleting, setDeleting] = useState<Lead | null>(null);

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Inquiries</h1>

      <div className="mt-6">
        <DataTable
          columns={[
            {
              header: "Contact",
              accessor: (row) => (
                <div>
                  <p className="text-charcoal">{row.name}</p>
                  <p className="text-xs text-taupe">{row.email}</p>
                </div>
              ),
            },
            { header: "Type", accessor: (row) => row.projectType ?? "—" },
            {
              header: "Message",
              accessor: (row) => <span className="line-clamp-1 max-w-xs">{row.message}</span>,
            },
            {
              header: "Status",
              accessor: (row) => (
                <select
                  value={row.status}
                  onChange={(e) =>
                    updateMutation.mutate({ id: row.id, data: { status: e.target.value } })
                  }
                  className="border-0 bg-transparent text-xs uppercase tracking-wider text-charcoal outline-none"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              ),
            },
            {
              header: "",
              accessor: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>,
            },
          ]}
          rows={data ?? []}
          getId={(row) => row.id}
          loading={isLoading}
          onDelete={(row) => setDeleting(row)}
          emptyMessage="No inquiries yet."
        />
      </div>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete inquiry from "${deleting?.name}"?`}
        description="This cannot be undone."
        onCancel={() => setDeleting(null)}
        loading={removeMutation.isPending}
        onConfirm={() => deleting && removeMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </div>
  );
}
