"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { apiFetch } from "@/lib/api";

export function AdminTopbar({ userName }: { userName: string }) {
  const router = useRouter();

  const logout = useMutation({
    mutationFn: () => apiFetch("/api/auth/logout", { method: "POST" }),
    onSuccess: () => {
      router.push("/admin/login");
      router.refresh();
    },
  });

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-white px-8">
      <p className="text-sm text-taupe">Welcome back, {userName}</p>
      <button
        onClick={() => logout.mutate()}
        className="flex items-center gap-2 text-sm text-charcoal/70 transition-colors hover:text-gold"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </header>
  );
}
