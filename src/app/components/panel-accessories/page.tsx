"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PANEL_BUILDING_CATEGORIES,
  PANEL_BUILDING_COMPONENTS,
  ComponentCardItem,
} from "@/lib/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  Search,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  PackageCheck,
  Boxes,
  Cable,
  Component,
  SlidersHorizontal,
  ChevronRight,
  Sliders,
  Check,
  Phone,
  Tag,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Icon Renderer for Component Cards
function ComponentIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "CableGland":
      return <Cable className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "SupportInsulator":
      return <ShieldCheck className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "LugsTerminals":
      return <Zap className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "SpiralBand":
      return <Sliders className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "BusbarInsulator":
      return <Layers className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "FlexibleConduit":
      return <Component className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "CableTie":
      return <Tag className={className || "w-5 h-5 text-[#1a56b0]"} />;
    case "DistributionBox":
      return <Boxes className={className || "w-5 h-5 text-[#1a56b0]"} />;
    default:
      return <Component className={className || "w-5 h-5 text-[#1a56b0]"} />;
  }
}

export default function PanelAccessoriesPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentCardItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Panel Accessories
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              High-quality, type-tested components for reliable, safe, and efficient control panels and power distribution switchboards. Sourced directly from premier OEM partners with full batch traceability.
            </p>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* REFERENCE COMPOSITION: COMPONENT CARDS GRID              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d6e8fa] shadow-card">
          {/* Component Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
            {PANEL_BUILDING_COMPONENTS.filter(item => item.id !== "pb-distribution-boxes").map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveComponent(item);
                }}
                className="group relative bg-white rounded-xl p-3 sm:p-4 border-2 border-[#1b3b64]/30 hover:border-[#1a56b0] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-hover hover:-translate-y-0.5 flex flex-col items-center justify-center gap-2 overflow-hidden min-h-[140px]"
              >
                {/* Product Image */}
                <div className="w-full flex items-center justify-center p-1.5 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-20 sm:max-h-24 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Text Label */}
                <div className="w-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-xs sm:text-sm font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] tracking-tight leading-tight">
                    {item.shortLabel}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TECHNICAL COMPONENT DETAIL MODAL                          */}
      {/* ========================================================= */}
      {activeComponent && (
        <Modal
          isOpen={!!activeComponent}
          onClose={() => setActiveComponent(null)}
          title={activeComponent.name}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Header / Product Snapshot */}
            <div className="flex flex-col sm:flex-row gap-6 items-center bg-[#f8fafc] p-5 rounded-2xl border border-slate-200">
              <div className="w-32 h-32 shrink-0 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2">
                <img
                  src={activeComponent.image}
                  alt={activeComponent.name}
                  className="max-h-28 w-auto object-contain"
                />
              </div>
              <div className="flex-1 w-full text-center sm:text-left">
                <span className="text-xs font-bold text-[#1a56b0] uppercase tracking-wider">
                  {activeComponent.subCategory}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2b4e] mt-1 mb-1.5">
                  {activeComponent.name}
                </h3>
                {activeComponent.id === "pb-lugs-terminals" && (
                  <div className="mb-3 mt-1">
                    <a
                      href="/catalog/flux_catalog_lugs%26terminals.pdf"
                      download
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#1a56b0] to-indigo-600 hover:from-[#154690] hover:to-indigo-700 shadow-sm hover:shadow-md shadow-[#1a56b0]/20 hover:-translate-y-0.5 rounded-lg transition-all duration-200 ring-1 ring-white/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Catalog</span>
                    </a>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {activeComponent.tagline}
                </p>

              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Engineering Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeComponent.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Key Features &amp; Quality Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeComponent.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#1a56b0] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>



            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Quotes delivered with consolidated delivery schedule in &lt; 24h.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveComponent(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setActiveComponent(null);
                    setIsBOMModalOpen(true);
                  }}
                  leftIcon={<FileSpreadsheet className="w-4 h-4" />}
                >
                  Inquire Now
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* BOM Upload Modal */}
      {isBOMModalOpen && (
        <Modal
          isOpen={isBOMModalOpen}
          onClose={() => setIsBOMModalOpen(false)}
          title="Upload Panel Building BOM / Requirements"
          maxWidth="lg"
        >
          <BOMUploadForm />
        </Modal>
      )}
    </div>
  );
}
