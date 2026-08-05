import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostsData } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const post = blogPostsData.find((b) => b.slug === resolvedParams.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Athletic Journal`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const post = blogPostsData.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal Articles</span>
        </Link>

        <article className="space-y-8">
          <div className="space-y-4">
            <Badge variant="primary">{post.category}</Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase font-heading text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-surface-border text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-primary">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-white">{post.author.name}</span>
                <span className="text-zinc-500">({post.author.role})</span>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> {post.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> {post.readTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[440px] w-full rounded-2xl overflow-hidden border border-surface-border shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Text Content */}
          <Card className="p-8 sm:p-12 bg-surface-card border-surface-border">
            <div className="prose prose-invert max-w-none space-y-6 text-sm text-zinc-300 leading-relaxed font-normal">
              {post.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl font-bold uppercase font-heading text-white pt-4 border-b border-surface-border pb-2">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </Card>

          {/* Bottom Callout Banner */}
          <div className="p-8 glass-card rounded-2xl border border-primary/40 text-center space-y-4">
            <h3 className="text-xl font-black uppercase font-heading text-white">
              READY TO PUT THIS SCIENCE INTO PRACTICE?
            </h3>
            <p className="text-xs text-zinc-300 max-w-lg mx-auto">
              Join Vortex Athletic Club today and work directly with our master coaching staff.
            </p>
            <Button href="/pricing" variant="primary" size="lg">
              Start Your Free 7-Day Pass
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
