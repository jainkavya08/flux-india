"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PANEL_BUILDING_CATEGORIES,
  PANEL_BUILDING_COMPONENTS,
  ComponentCardItem,
  METAL_ENCLOSURES,
  NON_METAL_ENCLOSURES,
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

export default function PanelBuildingPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentCardItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isEnclosureSelectionOpen, setIsEnclosureSelectionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#1a56b0] text-xs font-bold uppercase tracking-wider mb-4 border border-[#bcdbf7] shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#1a56b0]" />
              <span>Components &bull; Category 01</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Panel Building Components
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              High-quality, type-tested components for reliable, safe, and efficient control panels and power distribution switchboards. Sourced directly from premier OEM partners with full batch traceability.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsBOMModalOpen(true)}
                leftIcon={<FileSpreadsheet className="w-4 h-4" />}
              >
                Upload Panel BOM for Fast Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* REFERENCE COMPOSITION: COMPONENT CARDS GRID              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d6e8fa] shadow-card">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Panel Building Components
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              Click any component line below for technical ratings, dimension charts, and immediate BOM quote consolidation.
            </p>
          </div>

          {/* Component Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            {PANEL_BUILDING_COMPONENTS.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.id === "pb-distribution-boxes") {
                    setIsEnclosureSelectionOpen(true);
                  } else {
                    setActiveComponent(item);
                  }
                }}
                className="group relative bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-[#1b3b64]/30 hover:border-[#1a56b0] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-hover hover:-translate-y-0.5 flex items-center justify-between gap-3 overflow-hidden"
              >
                {/* Left Half: Icon & Text Label */}
                <div className="w-1/2 flex flex-col justify-center items-center text-center pr-2 border-r border-slate-200">
                  <div className="mb-2 p-1.5 rounded-lg bg-blue-50 group-hover:bg-[#1a56b0] text-[#1a56b0] group-hover:text-white transition-colors">
                    <ComponentIcon name={item.iconName} className="w-5 h-5" />
                  </div>

                  <div className="w-6 h-0.5 bg-[#1a56b0]/30 mb-2 rounded-full" />

                  <h3 className="text-xs font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] tracking-tight leading-tight line-clamp-2">
                    {item.shortLabel}
                  </h3>
                </div>

                {/* Right Half: Clean Product Image */}
                <div className="w-1/2 flex items-center justify-center p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-20 sm:max-h-24 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
                  />
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
              <div>
                <span className="text-xs font-bold text-[#1a56b0] uppercase tracking-wider">
                  {activeComponent.subCategory}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2b4e] mt-1">
                  {activeComponent.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {activeComponent.tagline}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Authorized OEM Stock Ready
                  </span>
                </div>
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

            {/* Technical Specifications Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Technical Specifications
              </h4>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {Object.entries(activeComponent.specs).map(([k, v], idx) => (
                      <tr
                        key={k}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="px-4 py-2.5 font-bold text-slate-700 w-1/3 border-r border-slate-200">
                          {k}
                        </td>
                        <td className="px-4 py-2.5 text-slate-800 font-medium">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* OEM Partners */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Supplied OEM Brands
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeComponent.oemPartners.map((oem) => (
                  <span
                    key={oem}
                    className="px-3 py-1 bg-[#eaf3fc] text-[#1a56b0] text-xs font-bold rounded-lg border border-[#bcdbf7]"
                  >
                    {oem}
                  </span>
                ))}
              </div>
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
                  Inquire in BOM
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

      {/* Enclosure Selection Modal */}
      {isEnclosureSelectionOpen && (
        <Modal
          isOpen={isEnclosureSelectionOpen}
          onClose={() => setIsEnclosureSelectionOpen(false)}
          title="Choose between the two what you want :"
          maxWidth="md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-2">
            <div
              onClick={() => {
                setIsEnclosureSelectionOpen(false);
                setActiveComponent(METAL_ENCLOSURES);
              }}
              className="group cursor-pointer bg-white border border-slate-200 hover:border-[#1a56b0] hover:shadow-md transition-all duration-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[200px]"
            >
              <img src="/images/panel-components/metal_enclosure_group.png" alt="Metal Enclosure" className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              <h3 className="text-lg font-extrabold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Metal Enclosure
              </h3>
            </div>
            <div
              onClick={() => {
                setIsEnclosureSelectionOpen(false);
                setActiveComponent(NON_METAL_ENCLOSURES);
              }}
              className="group cursor-pointer bg-white border border-slate-200 hover:border-[#1a56b0] hover:shadow-md transition-all duration-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[200px]"
            >
              <img src="/images/panel-components/nonmetal_enclosure_group.png" alt="Non-Metal Enclosure" className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              <h3 className="text-lg font-extrabold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Non - Metal Enclosure
              </h3>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
