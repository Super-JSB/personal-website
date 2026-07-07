import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostById } from "@/lib/posts";
import { updatePostAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Edit Post</h1>
      <PostForm
        action={updatePostAction.bind(null, id)}
        defaultValues={post}
        submitLabel="Save Changes"
      />
    </div>
  );
}
