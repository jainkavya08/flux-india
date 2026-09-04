"use client";

import React, { useState } from "react";
import { SOLUTIONS_DATA, SolutionItem } from "@/lib/data/solutions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  Sun,
  BatteryCharging,
  Factory,
  Building2,
  Droplets,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Zap,
} from "lucide-react";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState<SolutionItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  const getSolutionIcon = (id: string) => {
    switch (id) {
      case "sol-solar-renewables":
        return <Sun className="w-6 h-6 text-amber-500" />;
      case "sol-ev-infrastructure":
        return <BatteryCharging className="w-6 h-6 text-emerald-500" />;
      case "sol-automotive-assembly":
        return <Factory className="w-6 h-6 text-blue-500" />;
      case "sol-power-distribution":
        return <Building2 className="w-6 h-6 text-indigo-500" />;
      case "sol-water-process":
        return <Droplets className="w-6 h-6 text-cyan-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#1a56b0]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Domain Engineering
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Industry Solutions &amp; Architectures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Proven component blueprints, panel building configurations, and telemetry architectures engineered for the world&apos;s most demanding manufacturing and clean-energy sectors.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBOMModalOpen(true)}
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Consult on Your Solution Architecture
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Detail List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {SOLUTIONS_DATA.map((solution, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={solution.id}
              id={solution.slug}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card hover:shadow-hover transition-all duration-300 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Information Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] flex items-center justify-center shadow-xs">
                      {getSolutionIcon(solution.id)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1a56b0] bg-[#eaf3fc] border border-[#bcdbf7] px-2.5 py-0.5 rounded-full">
                        {solution.badge}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2b4e] mt-1">
                        {solution.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-[#1a56b0]">
                    {solution.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Impact Metrics Banner */}
                  <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-[#f4f8fd] rounded-2xl border border-[#e0edfa] text-center">
                    {solution.impactMetrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-base sm:text-lg font-extrabold text-[#0d2b4e]">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Flux Engineering Approach */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      FLUX Engineering Advantages
                    </h4>
                    <div className="space-y-1.5">
                      {solution.fluxApproach.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#1a56b0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setActiveSolution(solution);
                        setIsBOMModalOpen(true);
                      }}
                      leftIcon={<FileSpreadsheet className="w-4 h-4" />}
                    >
                      Request {solution.badge} BOM
                    </Button>
                  </div>
                </div>

                {/* Right Architecture & Case Highlight Column */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Architecture Diagram Box */}
                  <div className="bg-[#f0f7fd] border border-[#bcdbf7] rounded-2xl p-6 text-[#0d2b4e] shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a56b0] mb-2">
                      <Zap className="w-4 h-4 text-[#1a56b0]" />
                      <span>Data &amp; Power Architecture</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-mono bg-white p-3.5 rounded-xl border border-[#d6e8fa]">
                      {solution.architectureSummary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#d6e8fa]">
                      <div className="text-[11px] font-bold text-[#0d2b4e] mb-1.5">
                        Key Components Packaged:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {solution.componentsIncluded.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] bg-white border border-[#d6e8fa] px-2 py-0.5 rounded-md text-[#0d2b4e] font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Case Study Card */}
                  <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-100 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#0d2b4e] mb-1">
                      <span>Recent Deployment Case</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {solution.caseHighlight.location}
                      </span>
                    </div>
                    <p className="font-semibold text-[#1a56b0] text-[11px]">
                      {solution.caseHighlight.clientType}
                    </p>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">
                      &ldquo;{solution.caseHighlight.outcome}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOM Modal */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title={activeSolution ? `${activeSolution.title} Quotation` : "Solution BOM Consultation"}
        subtitle="Submit your project details for rapid engineering cross-referencing."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType={activeSolution?.title || "Industry Solution Project"}
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
