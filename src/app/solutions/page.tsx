"use client";

import React, { useState } from "react";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { SOLUTION_CATEGORIES } from "@/lib/data/solutions";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { LayoutGrid, List } from "lucide-react";
import { trackSolutionViewMode } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function SolutionsPage() {
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery");

  const handleViewModeChange = (mode: "gallery" | "list") => {
    setViewMode(mode);
    trackSolutionViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-20">
      <ProcessStrip />

      {/* Solutions Gallery & List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Gallery Controls Header: Title, Solution Count & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a56b0]">
                Solutions Portfolio
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">
                {SOLUTION_CATEGORIES.length} Category Available
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#0d2b4e]">
              Engineered Solution Categories
            </h1>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 hidden md:inline-block">
              View:
            </span>

            <div
              className="inline-flex items-center p-1 rounded-2xl bg-white border border-[#d6e8fa] shadow-xs"
              role="group"
              aria-label="Solution Categories View Mode"
            >
              <button
                type="button"
                onClick={() => handleViewModeChange("gallery")}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 outline-none focus:ring-2 focus:ring-[#1a56b0]",
                  viewMode === "gallery"
                    ? "bg-[#1a56b0] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0d2b4e] hover:bg-slate-50"
                )}
                aria-pressed={viewMode === "gallery"}
                aria-label="Gallery View (Grid)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery View</span>
              </button>

              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 outline-none focus:ring-2 focus:ring-[#1a56b0]",
                  viewMode === "list"
                    ? "bg-[#1a56b0] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0d2b4e] hover:bg-slate-50"
                )}
                aria-pressed={viewMode === "list"}
                aria-label="List View (Rows)"
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View Presentation */}
        {viewMode === "gallery" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTION_CATEGORIES.map((category) => (
              <SolutionCard
                key={category.id}
                solution={category}
                viewMode="gallery"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {SOLUTION_CATEGORIES.map((category) => (
              <SolutionCard
                key={category.id}
                solution={category}
                viewMode="list"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
