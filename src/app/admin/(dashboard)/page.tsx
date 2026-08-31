import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [projectCount, publishedCount, leadCount, newLeadCount, recentLeads] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total Projects", value: projectCount },
    { label: "Published Projects", value: publishedCount },
    { label: "Total Inquiries", value: leadCount },
    { label: "New Inquiries", value: newLeadCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-taupe">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-4xl text-charcoal">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-xl text-charcoal">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs uppercase tracking-wider text-gold-dark hover:underline"
          >
            View all
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="p-6 text-sm text-taupe">No inquiries yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <li
                key={lead.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="text-sm text-charcoal">{lead.name}</p>
                  <p className="text-xs text-taupe">{lead.email}</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-taupe">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
