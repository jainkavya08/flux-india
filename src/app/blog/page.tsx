import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Insights & Technical Articles | FLUX India",
  description: "Technical articles on switchgear cross-referencing, IEC 61439 standards, VFD energy savings, and PLC modernizations.",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fc] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Technical Knowledge
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            FLUX Engineering Insights
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            In-depth guides, compliance standards, and component optimization blueprints written by practicing electrical application engineers.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-xs text-[#1a56b0] text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/50">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#f4f8fd] border border-[#d6e8fa] text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between text-xs font-bold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
