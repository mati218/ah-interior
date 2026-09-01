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

      <section className="relative overflow-hidden bg-ivory py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,195,147,0.10),transparent_35%)]" />
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">Inspiration</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Essays, materials, and observations from the studio.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-taupe">
              {['Material', 'Light', 'Craft', 'Daily Life'].map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-white px-3 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="group h-full overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_20px_60px_rgba(17,17,17,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_80px_rgba(17,17,17,0.08)]">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-obsidian/50 to-transparent" />
                    </div>

                    <div className="p-6 sm:p-7">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </p>
                      <h3 className="mt-4 font-display text-3xl leading-tight text-charcoal transition-colors group-hover:text-gold">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-taupe">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {posts.length === 0 && (
            <p className="text-center text-sm text-taupe">No journal entries yet.</p>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
