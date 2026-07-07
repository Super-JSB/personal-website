// One-time migration: reads the old content/posts/*.md files and inserts
// them into the Supabase `posts` table. Run after setting up .env.local:
//
//   node --env-file=.env.local scripts/seed-posts.mjs

import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Run with: node --env-file=.env.local scripts/seed-posts.mjs");
  process.exit(1);
}

const postsDir = path.join(process.cwd(), "content", "posts");

if (!existsSync(postsDir)) {
  console.log("No content/posts directory found — nothing to seed.");
  process.exit(0);
}

const supabase = createClient(url, serviceRoleKey);
const files = readdirSync(postsDir).filter((file) => file.endsWith(".md"));

if (files.length === 0) {
  console.log("No markdown posts found — nothing to seed.");
  process.exit(0);
}

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);

  const { error } = await supabase.from("posts").upsert(
    {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString().slice(0, 10),
      tags: data.tags ?? [],
      content: content.trim(),
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error(`Failed to seed "${slug}":`, error.message);
  } else {
    console.log(`Seeded "${slug}"`);
  }
}

console.log("Done.");
