import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post?.title ?? "Post not found" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--color-primary)] mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} /> All posts
          </Link>

          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--foreground-muted)] mb-3">
            <Calendar size={13} />
            {post.date}
          </span>
          <h1 className="font-display text-4xl font-semibold mb-3">{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-deep)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <article className="glass-card rounded-2xl p-8 prose prose-slate max-w-none prose-headings:font-display prose-a:text-[var(--color-primary)]">
            <MDXRemote source={post.content} />
          </article>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
