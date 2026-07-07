import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <Reveal>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--color-primary)] mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back home
          </Link>
          <h1 className="font-display text-4xl font-semibold mb-10">Blog</h1>
        </Reveal>

        <div className="flex flex-col gap-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 flex flex-col gap-2 cursor-pointer hover:-translate-y-1 transition-transform duration-300 block"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--foreground-muted)]">
                  <Calendar size={13} />
                  {post.date}
                </span>
                <h2 className="font-display font-semibold text-xl">{post.title}</h2>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
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
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
