"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/session";

export interface LoginState {
  error?: string;
}

function passwordsMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "Server is not configured — ADMIN_PASSWORD is missing." };
  }

  if (!password || !passwordsMatch(password, expected)) {
    return { error: "Incorrect password." };
  }

  await setSessionCookie();
  redirect("/admin");
}
