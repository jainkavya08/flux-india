"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  WATER_PURIFICATION_GROUPS,
  WaterPurificationGroup,
  WaterPurificationProduct,
} from "@/lib/data/water-purification";
import {
  Droplets,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { trackBOMStart } from "@/lib/analytics";

interface WaterPurificationSolutionsProps {
  onRequestQuote: (groupTitle?: string) => void;
  showBreadcrumb?: boolean;
}

export function WaterPurificationSolutions({
  onRequestQuote,
  showBreadcrumb = true,
}: WaterPurificationSolutionsProps) {
  // Expanded by default for direct visibility of chemicals items
  const [expandedGroupIds, setExpandedGroupIds] = useState<Record<string, boolean>>({
    chemicals: true,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroupIds((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const getGroupIcon = (letter: string) => {
    return <Droplets className="w-5 h-5 text-cyan-600" />;
  };

  return (
    <section
      className="py-12 sm:py-20 bg-[#f4f7fa] relative overflow-hidden"
      id="water-purification-solutions"
    >
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
              Water Purification Solutions
            </span>
          </nav>
        )}

        {/* Section Header: Left-aligned heading with right-aligned BOM request button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#0d2b4e] tracking-tight">
              Water Purification Solutions
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl">
              Industrial water treatment process chemicals, reverse osmosis antiscalants, membrane biocides, and purification consumables.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onRequestQuote("Complete Water Purification Solutions");
                trackBOMStart();
              }}
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Request Water Purification BOM Quotation
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {WATER_PURIFICATION_GROUPS.map((group: WaterPurificationGroup) => {
            const isExpanded = !!expandedGroupIds[group.id];

            return (
              <div
                key={group.id}
                className="bg-white rounded-3xl border border-[#d6e8fa] shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden lg:col-span-2"
              >
                {/* Clickable Group Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`group-content-${group.id}`}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 transition-colors hover:bg-[#f8fbfe] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56b0] focus-visible:ring-inset cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 shadow-xs">
                      {getGroupIcon(group.letter)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-full">
                          Group {group.letter}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {group.products.length} {group.products.length === 1 ? "Item" : "Items"}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2b4e] truncate">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expand / Collapse Chevron Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs font-semibold text-slate-500">
                      {isExpanded ? "Collapse" : "View Items"}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                        isExpanded
                          ? "bg-[#1a56b0] border-[#1a56b0] text-white"
                          : "bg-[#f8fbfe] border-[#d6e8fa] text-slate-500 hover:text-[#1a56b0]"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  id={`group-content-${group.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-slate-100">
                      {/* Product List / Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-3">
                        {group.products.map((product: WaterPurificationProduct, index: number) => {
                          const itemNumber = (index + 1).toString().padStart(2, "0");

                          return (
                            <div
                              key={product.id}
                              className="relative bg-[#f8fbfe] rounded-2xl p-4 border border-[#e2edf8] flex flex-col justify-between h-full select-none hover:border-[#1a56b0]/40 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="w-6 h-6 rounded-lg bg-white border border-[#d6e8fa] text-[11px] font-bold text-[#1a56b0] flex items-center justify-center shrink-0">
                                    {itemNumber}
                                  </span>
                                  <span className="text-sm font-bold text-slate-800">
                                    {product.name}
                                  </span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
                              </div>

                              {product.description && (
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Group Bottom Action */}
                      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified Genuine OEM Sourcing
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onRequestQuote(`Water Purification Solutions — ${group.title}`);
                            trackBOMStart();
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors cursor-pointer"
                        >
                          <span>Quote {group.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
