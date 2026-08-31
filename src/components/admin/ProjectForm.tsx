"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { projectSchema, type ProjectFormValues } from "@/lib/validation/project";
import { projectHooks, type ProjectWithRelations } from "@/lib/queries/projects";
import { categoryHooks } from "@/lib/queries/categories";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { GalleryUploader } from "@/components/admin/GalleryUploader";
import { useState } from "react";

export function ProjectForm({ project }: { project?: ProjectWithRelations }) {
  const router = useRouter();
  const { data: categories } = categoryHooks.useList();
  const createMutation = projectHooks.useCreate();
  const updateMutation = projectHooks.useUpdate();

  const [gallery, setGallery] = useState<string[]>(
    project?.images.map((img) => img.url) ?? []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: yupResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          description: project.description,
          coverImage: project.coverImage,
          location: project.location ?? "",
          area: project.area ?? "",
          year: project.year ?? undefined,
          categoryId: project.categoryId ?? "",
          featured: project.featured,
          status: project.status,
        }
      : {
          status: "DRAFT",
          featured: false,
          title: "",
          slug: "",
          summary: "",
          description: "",
          coverImage: "",
        },
  });

  function onSubmit(values: ProjectFormValues) {
    const payload = { ...values, images: gallery };
    if (project) {
      updateMutation.mutate(
        { id: project.id, data: payload },
        { onSuccess: () => router.push("/admin/projects") }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => router.push("/admin/projects") });
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

      <Textarea label="Summary" rows={2} {...register("summary")} error={errors.summary?.message} />
      <Textarea label="Description" rows={5} {...register("description")} error={errors.description?.message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <Input label="Location" {...register("location")} />
        <Input label="Area" placeholder="e.g. 2,400 sq ft" {...register("area")} />
        <Input label="Year" type="number" {...register("year")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Category" {...register("categoryId")}>
          <option value="">None</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
        <Select label="Status" {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </Select>
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal">
        <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-gold" />
        Feature on homepage
      </label>

      <GalleryUploader label="Gallery" value={gallery} onChange={setGallery} />

      <Button
        type="submit"
        disabled={createMutation.isPending || updateMutation.isPending}
        className="w-fit"
      >
        {project ? "Save Changes" : "Create Project"}
      </Button>
    </form>
  );
}
