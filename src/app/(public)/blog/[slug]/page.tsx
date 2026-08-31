import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="pt-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-taupe hover:text-gold"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          <p className="mt-6 text-xs uppercase tracking-wider text-taupe">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">{post.title}</h1>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-10 aspect-[16/9] overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="prose prose-neutral mt-12 max-w-none pb-32 prose-headings:font-display prose-headings:text-charcoal prose-p:text-taupe prose-p:leading-relaxed prose-a:text-gold-dark"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </FadeIn>
      </div>
    </article>
  );
}
