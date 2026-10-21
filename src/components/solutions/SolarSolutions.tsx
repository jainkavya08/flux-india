"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SOLAR_GROUPS, SolarGroup, SolarProduct } from "@/lib/data/solar";
import {
  Sun,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { trackBOMStart } from "@/lib/analytics";

interface SolarSolutionsProps {
  onRequestQuote: (groupTitle?: string) => void;
  showBreadcrumb?: boolean;
}

export function SolarSolutions({
  onRequestQuote,
  showBreadcrumb = true,
}: SolarSolutionsProps) {
  const [selectedGroup, setSelectedGroup] = useState<SolarGroup | null>(null);

  const getGroupIcon = (letter: string) => {
    return <Sun className="w-8 h-8 text-amber-500" />;
  };

  return (
    <section className="py-10 sm:py-16 bg-[#f4f7fa] relative overflow-hidden" id="solar-solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation to return to Solutions Gallery */}
        {showBreadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium"
          >
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a56b0] transition-colors py-1 px-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#d6e8fa]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Solutions</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0d2b4e] font-bold px-2.5 py-1 bg-white border border-[#d6e8fa] rounded-lg shadow-xs">
              Solar Solutions
            </span>
          </nav>
        )}

        {/* Section Header: Left-aligned heading with right-aligned BOM request button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#0d2b4e] tracking-tight">
              Solar Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any solution group to view all included components and request consolidated pricing.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onRequestQuote("Complete Solar Solutions");
                trackBOMStart();
              }}
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Request Solar BOM Quotation
            </Button>
          </div>
        </div>

        {/* Desktop & Tablet: Gallery View */}
        <div className="hidden md:flex md:flex-wrap gap-4 sm:gap-6">
          {SOLAR_GROUPS.map((group: SolarGroup) => {
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className="group relative bg-white rounded-2xl border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1 hover:border-[#bcdbf7] transition-all duration-300 flex flex-col w-[220px] max-w-[240px] aspect-square shrink-0 overflow-hidden text-left cursor-pointer outline-none focus:ring-2 focus:ring-[#1a56b0]"
              >
                {/* Top accent highlight bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* 1. Large consistent image area at the top */}
                <div className="relative w-full flex-1 min-h-0 bg-[#f8fbfe] border-b border-[#eaf2fa] flex items-center justify-center p-2.5 overflow-hidden">
                  {/* Item count badge in image area */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] font-bold text-amber-600 bg-white/95 backdrop-blur-xs border border-amber-200 px-2 py-0.5 rounded-full shadow-xs">
                      {group.products.length} Items
                    </span>
                  </div>

                  {group.image ? (
                    <div className="relative w-full h-full scale-105 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 240px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fbfe] to-[#edf4fc] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-14 h-14 rounded-2xl bg-white/80 border border-[#d6e8fa] flex items-center justify-center shadow-xs">
                        {getGroupIcon(group.letter)}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Solution Group name & Show Items button below image */}
                <div className="p-3 shrink-0 flex flex-col justify-between items-center text-center bg-white w-full gap-2">
                  <h3 className="text-xs sm:text-sm font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors leading-tight line-clamp-1">
                    {group.title}
                  </h3>

                  <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1a56b0] bg-[#f0f7fd] group-hover:bg-[#1a56b0] group-hover:text-white px-2.5 py-1 rounded-lg border border-[#d6e8fa] group-hover:border-[#1a56b0] transition-all duration-200 w-full justify-center">
                      <span>Show Items</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile View: List View */}
        <div className="space-y-3 md:hidden">
          {SOLAR_GROUPS.map((group: SolarGroup) => {
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className="w-full text-left bg-white rounded-2xl p-3 border border-[#d6e8fa] shadow-card active:scale-[0.99] transition-all flex items-center justify-between gap-3 cursor-pointer outline-none focus:ring-2 focus:ring-[#1a56b0]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-[#f4f8fd] border border-[#d6e8fa] flex items-center justify-center shrink-0 overflow-hidden relative p-1">
                    {group.image ? (
                      <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-500">
                        {getGroupIcon(group.letter)}
                      </div>
                    )}
                  </div>

                  {/* Title & Items badge */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        Group {group.letter}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {group.products.length} Items
                      </span>
                    </div>
                    <h3 className="text-sm font-bold font-heading text-[#0d2b4e] truncate">
                      {group.title}
                    </h3>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-1 text-xs font-bold text-[#1a56b0] shrink-0">
                  <span className="text-[11px]">Items</span>
                  <div className="w-7 h-7 rounded-full bg-[#f0f7fd] border border-[#d6e8fa] flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pop-up Modal View for Selected Group Products: Clean Header with Breadcrumb Navigation */}
      <Modal
        isOpen={!!selectedGroup}
        onClose={() => setSelectedGroup(null)}
        title={selectedGroup ? selectedGroup.title : "Solution Group Products"}
        maxWidth="xl"
        customHeader={
          selectedGroup ? (
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              {/* Breadcrumb Navigation on top of popup */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedGroup(null)}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a56b0] transition-colors py-1 px-2 rounded-lg hover:bg-[#f0f7fd]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Solutions</span>
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-[#0d2b4e] font-bold px-2.5 py-1 bg-white border border-[#d6e8fa] rounded-lg shadow-xs truncate">
                  {selectedGroup.title}
                </span>
              </div>
            </div>
          ) : undefined
        }
      >
        {selectedGroup && (
          <div className="space-y-6">
            {/* Products Gallery Grid: Image on top, Product name below (matching hand-drawn illustration) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[60vh] overflow-y-auto p-1">
              {selectedGroup.products.map((product: SolarProduct) => {
                return (
                  <div
                    key={product.id}
                    className="bg-white hover:bg-[#f8fbfe] transition-all duration-200 rounded-2xl p-3.5 border border-[#d6e8fa] hover:border-[#bcdbf7] hover:shadow-hover flex flex-col items-center justify-between text-center gap-2.5 shadow-xs group"
                  >
                    {/* Top Image / Icon (NO blue border/bg) */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 overflow-hidden relative transition-transform duration-200 group-hover:scale-105">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#1a56b0]">
                          <ShieldCheck className="w-8 h-8 text-[#1a56b0]" />
                        </div>
                      )}
                    </div>

                    {/* Product Name Centered Below */}
                    <div className="w-full">
                      <span className="text-xs sm:text-sm font-bold text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors block leading-tight line-clamp-2">
                        {product.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                Verified genuine OEM components with full compliance certifications
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedGroup(null)}
                  className="flex-1 sm:flex-initial"
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const title = selectedGroup.title;
                    setSelectedGroup(null);
                    onRequestQuote(`Solar Solutions — ${title}`);
                    trackBOMStart();
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="flex-1 sm:flex-initial"
                >
                  Quote {selectedGroup.title}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
