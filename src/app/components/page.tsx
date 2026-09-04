"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Zap,
  Boxes,
  Gauge,
  Sliders,
} from "lucide-react";

export default function ComponentsLandingPage() {
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#1a56b0] text-xs font-bold uppercase tracking-wider mb-4 border border-[#bcdbf7] shadow-xs mx-auto">
            <Layers className="w-3.5 h-3.5 text-[#1a56b0]" />
            <span>Product Categories</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight max-w-3xl mx-auto">
            Engineered Component Categories
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Select a dedicated category below to explore technical ratings, dimensional drawings, and request consolidated BOM quotes.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBOMModalOpen(true)}
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Upload Complete BOM for Instant Consolidation
            </Button>
          </div>
        </div>
      </section>

      {/* Two Main Category Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category 1: Panel Building Components */}
          <Link
            href="/components/panel-building"
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a56b0] transform origin-left transition-transform duration-300 group-hover:scale-x-105" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-300">
                  <Layers className="w-7 h-7" />
                </div>
                <Badge variant="navy">Category 01</Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Panel Building Components
              </h2>

              <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                Type-tested, industrial-grade components for control panel fabrication, power switchboards, and cable management systems.
              </p>

              {/* Component Highlights */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Cable Glands",
                  "Support Insulators",
                  "Lugs & Terminals",
                  "Spiral Bands & Sleeves",
                  "Busbar Insulators",
                  "Flexible Conduits",
                  "Cable Ties (SS & Nylon)",
                  "Distribution Boxes",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#f4f8fd] border border-[#e0edfa] text-slate-700 group-hover:bg-[#eaf3fc] group-hover:text-[#1a56b0] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a56b0] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Preview image banner */}
              <div className="mt-8 rounded-2xl bg-[#f8fafc] p-4 border border-[#e2e8f0] flex items-center justify-center h-40">
                <img
                  src="/images/panel_board.png"
                  alt="Panel Building Components"
                  className="max-h-32 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                8 Component Lines
              </span>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#1a56b0] group-hover:translate-x-1.5 transition-transform">
                <span>Explore Panel Building</span>
                <div className="w-8 h-8 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Category 2: Automation Components */}
          <Link
            href="/components/automation"
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a56b0] transform origin-left transition-transform duration-300 group-hover:scale-x-105" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-300">
                  <Cpu className="w-7 h-7" />
                </div>
                <Badge variant="navy">Category 02</Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Automation Components
              </h2>

              <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                Precision industrial controllers, HMIs, power supplies, digital energy meters, and process instrumentation for machine and plant automation.
              </p>

              {/* Component Highlights */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "PLCs & PACs",
                  "Touchscreen HMIs",
                  "Motor Protection Devices",
                  "Digital Energy Meters",
                  "24V DIN Power Supplies",
                  "PID Temp Controllers",
                  "Control Transformers",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#f4f8fd] border border-[#e0edfa] text-slate-700 group-hover:bg-[#eaf3fc] group-hover:text-[#1a56b0] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a56b0] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Preview image banner */}
              <div className="mt-8 rounded-2xl bg-[#f8fafc] p-4 border border-[#e2e8f0] flex items-center justify-center gap-4 h-40">
                <img
                  src="/images/automation-components/PLC.png"
                  alt="PLC Controller"
                  className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="/images/automation-components/HMI.png"
                  alt="Touchscreen HMI"
                  className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                8 Component Lines
              </span>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#1a56b0] group-hover:translate-x-1.5 transition-transform">
                <span>Explore Automation</span>
                <div className="w-8 h-8 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* BOM Upload Modal */}
      {isBOMModalOpen && (
        <Modal
          isOpen={isBOMModalOpen}
          onClose={() => setIsBOMModalOpen(false)}
          title="Upload Complete BOM / Engineering Schedule"
          maxWidth="lg"
        >
          <BOMUploadForm />
        </Modal>
      )}
    </div>
  );
}
