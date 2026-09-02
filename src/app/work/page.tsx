import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { WORK_PROJECTS } from "@/lib/data/work";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MapPin, Zap, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Projects & Case Studies | FLUX India",
  description: "Explore turnkey electrical and automation engineering projects delivered by FLUX across India.",
};

export default function WorkIndexPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fc] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Field Implementations
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Engineering Projects &amp; Work
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            From 1500V solar collector fields and EV mega-charging hubs to high-speed automotive robotic cells and Form 4b substation switchboards.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WORK_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-xs text-[#1a56b0] text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/50">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="p-1.5 bg-[#f8fafc] rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-[#0d2b4e]">{m.value}</div>
                        <div className="text-[10px] text-slate-500 truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
                <span>View Full Case Study &amp; BOM</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
