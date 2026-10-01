"use client";

import React from "react";

export default function MeteringAndControlPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Metering and Control
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Explore our range of metering and control solutions. Products coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d6e8fa] shadow-card min-h-[300px] flex items-center justify-center">
          <p className="text-slate-500 text-lg">Products will be added here soon.</p>
        </div>
      </section>
    </div>
  );
}
