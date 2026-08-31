import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/sections/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on design, material and craft from the A&H Interiors studio.",
};

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title="Notes on design & craft"
        description="Thoughts on material, light and the everyday decisions behind every project."
        image="https://images.unsplash.com/photo-1600210491305-7396500b5b31?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <StaggerGroup className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-wider text-taupe">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
                <h2 className="mt-2 font-display text-2xl text-charcoal transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{post.excerpt}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {posts.length === 0 && (
          <p className="text-center text-sm text-taupe">No journal entries yet.</p>
        )}
      </section>

      <CTABanner />
    </>
  );
}
