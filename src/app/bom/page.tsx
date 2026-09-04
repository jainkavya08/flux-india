"use client";

import React from "react";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_INFO } from "@/lib/data/company";
import {
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Layers,
  Cpu,
  Truck,
} from "lucide-react";

export default function BOMPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Rapid Sourcing Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Consolidate Your Electrical BOM
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Upload your Excel, CSV, or PDF bill of materials or enter part numbers. Our Pune application engineers will verify compatibility, check authorized OEM stock, and return a single unified quotation within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Process Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: BOM Upload Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold font-heading text-[#0d2b4e]">
                  Submit Bill of Materials
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-brand switchgear, controllers, VFDs, and enclosures.
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#eaf3fc] text-[#1a56b0] flex items-center justify-center border border-[#bcdbf7]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
            </div>

            <BOMUploadForm />
          </div>

          {/* Right Column: 5-Step Process Explainer & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#d6e8fa] shadow-card">
              <h3 className="text-lg font-bold font-heading text-[#0d2b4e] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1a56b0]" />
                <span>How the FLUX BOM Engine Works</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {COMPANY_INFO.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#eaf3fc] text-[#1a56b0] border border-[#bcdbf7] font-bold text-xs flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#0d2b4e]">{step.title}</h4>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing Guarantees Card */}
            <div className="bg-[#f0f7fd] border border-[#bcdbf7] rounded-3xl p-7 text-[#0d2b4e] shadow-xs space-y-4">
              <h4 className="text-base font-bold font-heading text-[#0d2b4e]">
                FLUX Procurement Guarantees
              </h4>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">100% Genuine OEM components with origin test certs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#1a56b0] shrink-0" />
                  <span className="font-medium">24-Hour turnaround for standard electrical BOMs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#1a56b0] shrink-0" />
                  <span className="font-medium">Single invoice &amp; single point of contact across 10+ brands</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Direct express logistics and solutions for panel shops all over the world</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
