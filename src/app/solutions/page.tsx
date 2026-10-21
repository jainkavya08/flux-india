"use client";

import React from "react";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { SOLUTION_CATEGORIES } from "@/lib/data/solutions";
import { SolutionCard } from "@/components/solutions/SolutionCard";

export default function SolutionsPage() {

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-20">
      <ProcessStrip />

      {/* Solutions Gallery & List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Solutions Portfolio Header: Title & Count */}
        <div className="pb-6 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a56b0]">
              Solutions Portfolio
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              {SOLUTION_CATEGORIES.length} {SOLUTION_CATEGORIES.length === 1 ? "Category" : "Categories"} Available
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#0d2b4e]">
            Engineered Solution Categories
          </h1>
        </div>

        {/* Responsive View Presentation: Gallery View on desktop/tablet (md+), List View on mobile (<md) */}
        {/* Desktop & Tablet: Gallery View */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {SOLUTION_CATEGORIES.map((category) => (
            <SolutionCard
              key={category.id}
              solution={category}
              viewMode="gallery"
            />
          ))}
        </div>

        {/* Mobile View: List View */}
        <div className="space-y-3 md:hidden">
          {SOLUTION_CATEGORIES.map((category) => (
            <SolutionCard
              key={category.id}
              solution={category}
              viewMode="list"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
