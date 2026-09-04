import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { WORK_PROJECTS, WorkProject } from "@/lib/data/work";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  MapPin,
  Building,
  CheckCircle2,
  Zap,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export async function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | FLUX India" };
  }

  return {
    title: `${project.title} | FLUX Engineering Project`,
    description: project.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f8fc] pb-24">
      {/* Top Breadcrumb Header */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="blue">{project.category}</Badge>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.location}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-3xl border border-[#d6e8fa] shadow-card">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center p-3 rounded-2xl bg-[#f4f8fd] border border-[#e0edfa]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0d2b4e] font-heading">
                {m.value}
              </div>
              <div className="text-xs text-slate-600 font-semibold mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Main Column: Narrative & Technical Specs */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#d6e8fa] shadow-sm">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Engineering Challenge & Solution */}
            <div className="bg-white rounded-3xl p-8 border border-[#d6e8fa] shadow-card space-y-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-[#0d2b4e] flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Engineering Challenge
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-lg font-bold font-heading text-[#0d2b4e] flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  FLUX Engineering Solution
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture Diagram Box */}
            <div className="bg-[#f0f7fd] rounded-3xl p-7 border border-[#bcdbf7] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a56b0] mb-3">
                <Zap className="w-4 h-4 text-[#1a56b0]" />
                <span>Single-Line Diagram (SLD) &amp; Power Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-mono bg-white p-4 rounded-2xl border border-[#d6e8fa] leading-relaxed">
                {project.architectureDiagram}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Packaged BOM & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Packaged BOM Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#d6e8fa] shadow-card">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a56b0] mb-4">
                <Layers className="w-4 h-4" />
                <span>Packaged OEM Components</span>
              </div>

              <div className="space-y-3">
                {project.componentsBOM.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200/80 text-xs"
                  >
                    <div className="font-bold text-[#0d2b4e]">{item.category}</div>
                    <div className="text-slate-600 mt-0.5">{item.brand}</div>
                    <div className="text-[11px] font-semibold text-[#1a56b0] mt-0.5 font-mono">
                      Rating: {item.rating}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button href="/bom" variant="primary" size="md" className="w-full justify-center">
                  Request BOM for Similar Project
                </Button>
              </div>
            </div>

            {/* Sourcing Guarantee Badge */}
            <div className="bg-[#eaf3fc] rounded-2xl p-5 border border-[#bcdbf7] text-xs space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-[#0d2b4e]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Authorized OEM Genuine</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All components delivered with original manufacturer test certificates, warranty registrations, and consolidated delivery tracking with solutions for all over the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
