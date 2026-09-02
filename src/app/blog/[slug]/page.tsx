import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, BlogPost } from "@/lib/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found | FLUX India" };
  }

  return {
    title: `${post.title} | FLUX Engineering Insights`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f8fc] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights &amp; Overview</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="blue">{post.category}</Badge>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            {post.summary}
          </p>

          {/* Author Card */}
          <div className="mt-6 pt-6 border-t border-[#bcdbf7]/60 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#bcdbf7]">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0d2b4e]">
                {post.author.name}
              </div>
              <div className="text-xs text-slate-500">{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#d6e8fa] shadow-sm">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#d6e8fa] shadow-card space-y-8">
          {post.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2b4e]">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="p-5 rounded-2xl bg-[#f0f7fd] border-l-4 border-[#1a56b0] text-sm text-[#0d2b4e] font-medium leading-relaxed my-4">
                  {section.callout}
                </div>
              )}
            </div>
          ))}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f4f8fd] border border-[#d6e8fa] text-[#1a56b0]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#eaf3fc] rounded-3xl p-8 border border-[#bcdbf7] text-center space-y-4 shadow-xs">
          <h3 className="text-xl font-bold font-heading text-[#0d2b4e]">
            Have an electrical SLD or BOM that needs cross-referencing?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Our Pune engineering desk verifies ratings, pin-compatibilities, and returns a consolidated multi-brand quotation in under 24 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/bom" variant="primary" size="md" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>
              Submit BOM for Engineering Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
