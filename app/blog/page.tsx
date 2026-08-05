import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPostsData } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Fitness & Athletic Performance Journal | Blog",
  description: "Evidence-based articles on hypertrophy rep ranges, contrast thermal recovery, and pre-workout nutrition.",
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          ATHLETIC JOURNAL & KNOWLEDGE
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          TRAINING & <span className="text-primary accent-glow-text">RECOVERY JOURNAL</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Deep dives into physiological science, nutrition strategies, and training programming from our head coaches.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <FadeIn key={post.id}>
              <Card className="h-full flex flex-col justify-between p-0 overflow-hidden group bg-surface-card border-surface-border">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="text-xl font-black uppercase font-heading text-white group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-3 font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-primary/50">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-zinc-200">{post.author.name}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                        Read
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
