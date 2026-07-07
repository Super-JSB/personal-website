import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Posts</h1>
        <Link
          href="/admin/new"
          className="rounded-lg bg-[var(--color-primary)] text-white font-medium px-4 py-2 text-sm cursor-pointer"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 && (
        <p className="text-[var(--foreground-muted)]">No posts yet — create your first one.</p>
      )}

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass-card rounded-xl p-5 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">{post.title}</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                {post.date} · /{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={`/admin/${post.id}/edit`}
                className="text-sm text-[var(--color-primary)] font-medium cursor-pointer"
              >
                Edit
              </Link>
              <DeleteButton postId={post.id} title={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
