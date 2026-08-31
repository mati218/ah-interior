"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getId: (row: T) => string;
  editHref?: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  getId,
  editHref,
  onEdit,
  onDelete,
  emptyMessage = "Nothing here yet.",
  loading,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="border border-border bg-white p-10 text-center text-sm text-taupe">
        Loading...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="border border-border bg-white p-10 text-center text-sm text-taupe">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-taupe">
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 font-normal">
                {col.header}
              </th>
            ))}
            {(editHref || onEdit || onDelete) && <th className="px-5 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={getId(row)} className="text-charcoal">
              {columns.map((col) => (
                <td key={col.header} className={`px-5 py-4 ${col.className ?? ""}`}>
                  {col.accessor(row)}
                </td>
              ))}
              {(editHref || onEdit || onDelete) && (
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3">
                    {editHref && (
                      <Link
                        href={editHref(row)}
                        className="text-taupe transition-colors hover:text-gold"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-taupe transition-colors hover:text-gold"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-taupe transition-colors hover:text-error"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
