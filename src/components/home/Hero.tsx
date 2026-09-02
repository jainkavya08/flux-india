"use client";

import React, { useState } from "react";
import { FluxLogo } from "@/components/ui/FluxLogo";
import { Button } from "@/components/ui/Button";
import { WaveMotif } from "@/components/ui/WaveMotif";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/data/company";

export function Hero() {
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white pt-12 sm:pt-16 pb-16 sm:pb-24 border-b border-slate-200/60 bg-grid-subtle">
      {/* Decorative Brand Arc / Wave Line Motif in Top-Right Corner */}
      <WaveMotif className="w-[380px] sm:w-[500px] lg:w-[640px]" />

      {/* Subtle bottom-left energy gradient */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top subtle category pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1a56b0] text-xs font-bold uppercase tracking-widest mb-6 shadow-xs animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-[#1a56b0] animate-pulse" />
          <span>India&apos;s Engineering &amp; Procurement Hub &bull; Est. 2021</span>
        </div>

        {/* Centered FLUX Logo + Wordmark */}
        <div className="flex flex-col items-center justify-center my-2 sm:my-4">
          <FluxLogo size="xl" showTagline={false} showIndiaBadge={true} className="my-2" />

          {/* Subtitle / Value Prop */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-500 mt-4 max-w-xl mx-auto font-heading">
            Powering Industrial Automation Across India
          </p>

          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#0d2b4e] tracking-tight max-w-4xl mx-auto leading-[1.15]">
            One Partner.{" "}
            <span className="text-[#1a56b0]">
              Infinite Solutions.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Consolidate your multi-vendor electrical and automation BOM. We source 100% genuine OEM components, provide deep technical review, and deliver pan-India.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setIsBOMModalOpen(true)}
            leftIcon={<FileSpreadsheet className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-8 py-4 shadow-xl shadow-[#0d2b4e]/15 text-base"
          >
            Consolidate Your BOM
          </Button>

          <Button
            size="lg"
            variant="outline"
            href="/components/panel-building"
            rightIcon={<Layers className="w-4 h-4" />}
            className="w-full sm:w-auto px-7 py-4 text-base"
          >
            Browse Components
          </Button>
        </div>

        {/* Trust Badges / Quick Stats Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {COMPANY_INFO.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-[#5b9bd5]/50 hover:shadow-md transition-all duration-200"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e]">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* OEM Trust Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Authorized OEM Channels:
            </span>
            <span className="text-[#0d2b4e] font-bold">Siemens</span>
            <span className="text-[#0d2b4e] font-bold">Schneider Electric</span>
            <span className="text-[#0d2b4e] font-bold">ABB</span>
            <span className="text-[#0d2b4e] font-bold">L&amp;T Electrical</span>
            <span className="text-[#0d2b4e] font-bold">Danfoss</span>
            <span className="text-[#0d2b4e] font-bold">Phoenix Contact</span>
            <span className="text-[#0d2b4e] font-bold">Rittal</span>
            <span className="text-[#0d2b4e] font-bold">Omron</span>
          </div>
        </div>
      </div>

      {/* Modal for Quick BOM Submission */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title="Instant BOM Sourcing & Quotation"
        subtitle="Share your part list for multi-vendor consolidation and technical verification."
        maxWidth="lg"
      >
        <BOMUploadForm onSuccess={() => setIsBOMModalOpen(false)} />
      </Modal>
    </section>
  );
}
