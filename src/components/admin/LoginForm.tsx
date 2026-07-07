"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="glass-card rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
    >
      <h1 className="font-display text-2xl font-semibold">Admin Login</h1>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        autoFocus
        className="rounded-lg border border-[var(--color-glass-border)] bg-white/70 px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--color-primary)] text-white font-medium py-2.5 disabled:opacity-60 cursor-pointer"
      >
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
