"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { blogPosts } from "@/data/properties";
import { formatDate } from "@/lib/utils";
import { BookOpen, Clock, ArrowRight, User } from "lucide-react";

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            DealFinder Blog
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Real Estate Investment Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert analysis, market reports, and strategies to help you make better investment decisions.
          </p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${featured.slug}`}>
          <Card className="overflow-hidden mb-10 hover:shadow-lg transition-all group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-48 md:h-auto bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary/30" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="accent">{featured.category}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featured.readTime} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{featured.author}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(featured.publishedAt)}</p>
                    </div>
                  </div>
                  <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group h-full">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-primary/20" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span>&middot;</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-2">Weekly Market Deals Newsletter</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Get the top deals, market insights, and investment strategies delivered to your inbox every week.
            </p>
            <NewsletterForm />
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
