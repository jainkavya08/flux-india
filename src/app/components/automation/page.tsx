"use client";

import React, { useState, useMemo } from "react";
import {
  AUTOMATION_CATEGORIES,
  AUTOMATION_PRODUCTS,
  ProductItem,
} from "@/lib/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  Search,
  Cpu,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  PackageCheck,
  Radio,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AutomationPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return AUTOMATION_PRODUCTS.filter((prod) => {
      const matchesCat =
        selectedCategory === "All Categories" ||
        prod.subCategory === selectedCategory;
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.oemPartners.some((oem) =>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1a56b0] text-xs font-bold uppercase tracking-widest mb-4 border border-[#bcdbf7] shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-[#1a56b0]" />
              <span>Catalog &bull; Category 02</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Industrial Automation Components
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Advanced controllers, deterministic motion drives, intelligent sensors, and edge gateways to optimize process control, telemetry, and machine cycle performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsBOMModalOpen(true)}
                leftIcon={<FileSpreadsheet className="w-4 h-4" />}
              >
                Request Automation BOM Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Siemens S7-1200, Danfoss VFD, Weintek HMI..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>

          {/* Quick Count */}
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-600" />
            <span>Showing {filteredProducts.length} verified automation lines</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {AUTOMATION_CATEGORIES.map((cat) => (
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

        {/* Products Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a56b0] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {prod.subCategory}
                  </span>
                  {prod.popular && (
                    <Badge variant="accent" size="sm">
                      Top Specified
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2b4e]">
                  {prod.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-[#1a56b0]">
                  {prod.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {prod.description}
                </p>

                {/* Key Features preview */}
                <div className="mt-4 space-y-1.5">
                  {prod.features.slice(0, 3).map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>

                {/* OEM brands */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">OEM Lines:</span>
                  {prod.oemPartners.join(", ")}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveProduct(prod)}
                  className="text-xs font-bold text-[#1a56b0] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Technical Specs</span>
                </button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setIsBOMModalOpen(true)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Add to Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specs Modal */}
      {activeProduct && (
        <Modal
          isOpen={!!activeProduct}
          onClose={() => setActiveProduct(null)}
          title={activeProduct.name}
          subtitle={`Category: ${activeProduct.subCategory} • 100% Genuine OEM`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-left">
            <div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            {/* Technical Parameters Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Technical Specifications &amp; Interfaces
              </h4>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <table className="w-full text-xs">
                  <tbody>
                    {Object.entries(activeProduct.specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-200/60 last:border-0">
                        <td className="py-2 font-semibold text-slate-700 w-1/3">{k}</td>
                        <td className="py-2 text-slate-900 font-mono">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Applications & OEM Sourcing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <h5 className="text-xs font-bold text-[#0d2b4e] mb-1.5">Common Integrations</h5>
                <ul className="text-xs text-slate-600 space-y-1">
                  {activeProduct.applications.map((app) => (
                    <li key={app}>&bull; {app}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <h5 className="text-xs font-bold text-[#0d2b4e] mb-1.5">OEM Series Supported</h5>
                <p className="text-xs text-slate-600">
                  {activeProduct.oemPartners.join(" • ")}
                </p>
                <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Includes Firmware &amp; Programming Support</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setActiveProduct(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setActiveProduct(null);
                  setIsBOMModalOpen(true);
                }}
                leftIcon={<FileSpreadsheet className="w-4 h-4" />}
              >
                Request Quotation
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* BOM Submission Modal */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title="Automation BOM Quotation"
        subtitle="Submit your PLC, VFD, or sensor line items for consolidated sourcing."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType="Industrial Automation & Motion"
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
