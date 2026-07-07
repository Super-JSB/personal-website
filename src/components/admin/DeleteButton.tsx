"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/app/admin/(protected)/actions";

export default function DeleteButton({ postId, title }: { postId: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
          startTransition(() => {
            void deletePostAction(postId);
          });
        }
      }}
      className="text-sm text-red-600 font-medium cursor-pointer disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
