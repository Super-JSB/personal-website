import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "../actions";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">New Post</h1>
      <PostForm action={createPostAction} submitLabel="Publish" />
    </div>
  );
}
