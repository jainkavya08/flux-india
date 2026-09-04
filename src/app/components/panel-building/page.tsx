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
  const [selectedCategory, setSelectedCategory] = useState("All Components");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeComponent, setActiveComponent] = useState<ComponentCardItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  const filteredComponents = useMemo(() => {
    return PANEL_BUILDING_COMPONENTS.filter((item) => {
      const matchesCat =
        selectedCategory === "All Components" ||
        item.subCategory === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.oemPartners.some((oem) =>
          oem.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
              <Button
                variant="outline"
                size="md"
                href="#catalog"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Component Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* REFERENCE COMPOSITION: SHOWCASE & COMPONENT CARDS GRID   */}
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

          {/* Split Reference Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Panel Board Hero Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="group relative bg-[#f8fafc] rounded-3xl p-5 sm:p-6 border-2 border-[#1b3b64]/20 hover:border-[#1a56b0] transition-all duration-300 shadow-xs flex flex-col items-center justify-between h-full">
                <div className="w-full flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#1a56b0] uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200">
                    Integration View
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    3-Bay Switchboard
                  </span>
                </div>

                {/* Main Hero Image: panel_board.png */}
                <div className="relative w-full my-auto flex items-center justify-center p-2">
                  <img
                    src="/images/panel_board.png"
                    alt="FLUX India - Fully Integrated Panel Building Components inside Industrial Switchboard"
                    className="max-h-[380px] w-auto object-contain drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Bottom Feature Badges */}
                <div className="w-full mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    IEC 61439 Type-Tested
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>100% Genuine OEM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Grid of Component Cards matching reference layout */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 auto-rows-fr">
              {PANEL_BUILDING_COMPONENTS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveComponent(item)}
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
        </div>
      </section>

      {/* ========================================================= */}
      {/* DETAILED TECHNICAL CATALOG VIEW & SEARCH                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14" id="catalog">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cable glands, insulators, lugs, conduits..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>

          {/* Quick Count */}
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-600" />
            <span>Showing {filteredComponents.length} verified panel component lines</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {PANEL_BUILDING_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs",
                selectedCategory === cat
                  ? "bg-[#0d2b4e] text-white shadow-md shadow-[#0d2b4e]/20"
                  : "bg-white text-slate-700 hover:bg-blue-50 hover:text-[#1a56b0] border border-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Catalog Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div
                  onClick={() => setActiveComponent(item)}
                  className="w-full h-44 rounded-xl bg-[#f8fafc] border border-slate-100 flex items-center justify-center p-4 mb-4 cursor-pointer hover:bg-blue-50/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-36 w-auto object-contain drop-shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#1a56b0] uppercase tracking-wider">
                    {item.subCategory}
                  </span>
                  {item.popular && <Badge variant="navy">Popular</Badge>}
                </div>

                <h3
                  onClick={() => setActiveComponent(item)}
                  className="text-base font-bold font-heading text-[#0d2b4e] hover:text-[#1a56b0] cursor-pointer transition-colors"
                >
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Spec Snippets */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">{key}:</span>
                      <span className="text-[#0d2b4e] font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setActiveComponent(item)}
                  className="flex-1 py-2 px-3 rounded-xl border border-[#bcdbf7] text-[#1a56b0] hover:bg-blue-50 text-xs font-semibold transition-colors text-center"
                >
                  View Full Specs
                </button>
                <button
                  onClick={() => setIsBOMModalOpen(true)}
                  className="py-2 px-3 rounded-xl bg-[#1a56b0] text-white hover:bg-[#0d2b4e] text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>
              </div>
            </div>
          ))}
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
    </div>
  );
}
