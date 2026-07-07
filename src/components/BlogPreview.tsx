import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import SectionBackground from "@/components/SectionBackground";

export default async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 px-6">
      <SectionBackground src="/images/background-3.jpg" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">
                Notes
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">Blog</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:gap-2 transition-all cursor-pointer"
            >
              View all posts <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 h-full flex flex-col cursor-pointer group hover:-translate-y-1.5 transition-transform duration-300"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--foreground-muted)] mb-3">
                  <Calendar size={13} />
                  {post.date}
                </span>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
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
      </div>
    </section>
  );
}
