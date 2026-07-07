import "server-only";
import { getSupabaseClient } from "@/lib/supabase";

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface PostInput {
  title: string;
  slug: string;
  date: string;
  content: string;
  tags: string[];
}

const SELECT_COLUMNS = "id, title, slug, date, content, tags";

// There's no `excerpt` column — the field list is intentionally just
// title/slug/date/content/tags, so preview cards get a short excerpt
// derived from the post content instead.
function makeExcerpt(content: string, maxLength = 140): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_>`~]/g, "")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > maxLength ? `${plain.slice(0, maxLength).trim()}…` : plain;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(SELECT_COLUMNS)
    .order("date", { ascending: false });

  if (error) throw new Error(`Failed to load posts: ${error.message}`);

  return (data ?? []).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags ?? [],
    excerpt: makeExcerpt(post.content ?? ""),
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load post: ${error.message}`);
  if (!data) return null;
  return { ...data, tags: data.tags ?? [] };
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Failed to load post: ${error.message}`);
  if (!data) return null;
  return { ...data, tags: data.tags ?? [] };
}

export async function createPost(input: PostInput): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("posts").insert(input);
  if (error) throw new Error(`Failed to create post: ${error.message}`);
}

export async function updatePost(id: string, input: PostInput): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("posts").update(input).eq("id", id);
  if (error) throw new Error(`Failed to update post: ${error.message}`);
}

export async function deletePost(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete post: ${error.message}`);
}
