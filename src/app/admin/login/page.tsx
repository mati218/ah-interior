import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-display text-3xl text-charcoal">
            A&amp;H <span className="text-gold">Interiors</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-wider text-taupe">
            Studio Admin
          </p>
        </div>
        <div className="border border-border bg-white p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
