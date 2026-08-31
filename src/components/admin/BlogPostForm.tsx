"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@prisma/client";
import { blogHooks } from "@/lib/queries/blog";
import { blogPostSchema, type BlogPostFormValues } from "@/lib/validation/blog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const createMutation = blogHooks.useCreate();
  const updateMutation = blogHooks.useUpdate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: yupResolver(blogPostSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          status: post.status,
        }
      : { status: "DRAFT", title: "", slug: "", excerpt: "", content: "", coverImage: "" },
  });

  function onSubmit(values: BlogPostFormValues) {
    if (post) {
      updateMutation.mutate(
        { id: post.id, data: values },
        { onSuccess: () => router.push("/admin/blog") }
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => router.push("/admin/blog") });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-3xl flex-col gap-5">
      <Controller
        control={control}
        name="coverImage"
        render={({ field }) => (
          <ImageUploader label="Cover Image" value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.coverImage && <p className="text-xs text-error">{errors.coverImage.message}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Title" {...register("title")} error={errors.title?.message} />
        <Input label="Slug" {...register("slug")} error={errors.slug?.message} />
      </div>

      <Textarea label="Excerpt" rows={2} {...register("excerpt")} error={errors.excerpt?.message} />

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <RichTextEditor label="Content" value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.content && <p className="text-xs text-error">{errors.content.message}</p>}

      <Select label="Status" {...register("status")}>
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Published</option>
      </Select>

      <Button
        type="submit"
        disabled={createMutation.isPending || updateMutation.isPending}
        className="w-fit"
      >
        {post ? "Save Changes" : "Create Post"}
      </Button>
    </form>
  );
}
