"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated, clearSessionCookie } from "@/lib/session";
import { createPost, updatePost, deletePost, type PostInput } from "@/lib/posts";

async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated.");
  }
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parsePostInput(formData: FormData): PostInput {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const tags = parseTags(formData.get("tags"));

  if (!title || !slug || !date) {
    throw new Error("Title, slug, and date are required.");
  }

  return { title, slug, date, content, tags };
}

export async function createPostAction(formData: FormData): Promise<void> {
  await requireAuth();
  const input = parsePostInput(formData);
  await createPost(input);
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePostAction(id: string, formData: FormData): Promise<void> {
  await requireAuth();
  const input = parsePostInput(formData);
  await updatePost(id, input);
  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePostAction(id: string): Promise<void> {
  await requireAuth();
  await deletePost(id);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}
