import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--background)]">
      <LoginForm />
    </div>
  );
}
