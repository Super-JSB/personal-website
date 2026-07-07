"use client";

import { useState } from "react";
import type { Post } from "@/lib/posts";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputClass =
  "rounded-lg border border-[var(--color-glass-border)] bg-white/70 px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

export default function PostForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<Post>;
  submitLabel: string;
}) {
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.slug));

  return (
    <form action={action} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Title</span>
        <input
          name="title"
          required
          defaultValue={defaultValues?.title ?? ""}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Slug</span>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={`${inputClass} font-mono text-sm`}
        />
        <span className="text-xs text-[var(--foreground-muted)]">
          This becomes the post&apos;s URL: /blog/{slug || "your-slug"}
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Date</span>
        <input
          type="date"
          name="date"
          required
          defaultValue={defaultValues?.date ?? new Date().toISOString().slice(0, 10)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Tags</span>
        <input
          name="tags"
          defaultValue={defaultValues?.tags?.join(", ") ?? ""}
          placeholder="cs, meta"
          className={inputClass}
        />
        <span className="text-xs text-[var(--foreground-muted)]">Comma-separated</span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Content</span>
        <textarea
          name="content"
          required
          rows={16}
          defaultValue={defaultValues?.content ?? ""}
          className={`${inputClass} font-mono text-sm leading-relaxed`}
        />
        <span className="text-xs text-[var(--foreground-muted)]">
          Plain text or Markdown (headings with #, **bold**, lists with -, etc.)
        </span>
      </label>

      <button
        type="submit"
        className="self-start rounded-lg bg-[var(--color-primary)] text-white font-medium px-6 py-2.5 cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
}
