import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">New Post</h1>
      <div className="mt-6">
        <BlogPostForm />
      </div>
    </div>
  );
}
