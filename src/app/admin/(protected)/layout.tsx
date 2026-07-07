import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/session";
import { logoutAction } from "./actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--color-glass-border)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="font-display text-lg font-semibold cursor-pointer">
            Admin
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--color-primary)] cursor-pointer"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
