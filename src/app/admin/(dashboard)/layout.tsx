import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar userName={user.name} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
