"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { blogPosts } from "@/data/properties";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, User, Share2, BookOpen, Calendar, Tag } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="accent">{post.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-8">
          <BookOpen className="h-16 w-16 text-primary/25" />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none mb-8">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-foreground">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="text-lg font-semibold mt-6 mb-3 text-foreground">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("- **") || paragraph.startsWith("1. **")) {
              const items = paragraph.split("\n").filter(Boolean);
              return (
                <ul key={i} className="space-y-2 my-4 ml-4">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted-foreground text-sm leading-relaxed list-disc"
                      dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d.]+\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }}
                    />
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }}
              />
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Newsletter CTA */}
        <Card className="p-6 bg-primary/5 border-primary/10 mb-8">
          <h3 className="font-semibold mb-2">Enjoyed this article?</h3>
          <p className="text-sm text-muted-foreground mb-4">Get weekly deals and market insights in your inbox.</p>
          <NewsletterForm />
        </Card>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <Card className="p-4 hover:shadow-md transition-all h-full">
                    <Badge variant="secondary" className="mb-2 text-[10px]">{p.category}</Badge>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.author} &middot; {formatDate(p.publishedAt)}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
