"use client";

import React, { useState } from "react";
import {
  PANEL_BUILDING_COMPONENTS,
  ComponentCardItem,
  METAL_ENCLOSURES,
  NON_METAL_ENCLOSURES,
  SOCKET_BOXES,
  JUNCTION_BOXES,
} from "@/lib/data/products";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  CheckCircle2,
  FileSpreadsheet,
  Check,
  Boxes,
  Component,
  Download,
  X,
} from "lucide-react";

const getCatalogDetails = (id: string) => {
  switch (id) {
    case "pb-enclosures-non-metal":
    case "pb-distribution-boxes":
      return { title: "Distribution Boxes", url: "/catalog/distributionboxes_catalog_flux.pdf" };
    case "pb-socket-boxes":
      return { title: "Socket Boxes", url: "/catalog/socket boxes.pdf" };
    case "pb-junction-boxes":
      return { title: "Junction Boxes", url: "/catalog/junction boxes.pdf" };
    default:
      return null;
  }
};

export default function PanelsAndEnclosuresPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentCardItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Panels and Enclosures
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              High-quality enclosures for reliable, safe, and efficient control panels and power distribution switchboards.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d6e8fa] shadow-card">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
            {[METAL_ENCLOSURES, NON_METAL_ENCLOSURES, SOCKET_BOXES, JUNCTION_BOXES].map((product, idx) => (
              <div
                key={idx}
                onClick={() => setActiveComponent(product)}
                className="group relative bg-white rounded-xl p-3 sm:p-4 border-2 border-[#1b3b64]/30 hover:border-[#1a56b0] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-hover hover:-translate-y-0.5 flex flex-col items-center justify-center gap-2 overflow-hidden min-h-[140px]"
              >
                <div className="w-full flex items-center justify-center p-1.5 flex-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-20 sm:max-h-24 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center text-center">
                  <h3 className="text-xs sm:text-sm font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] tracking-tight leading-tight">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeComponent && (
        <Modal
          isOpen={!!activeComponent}
          onClose={() => setActiveComponent(null)}
          title={activeComponent.name}
          maxWidth="lg"
        >
          <div className="space-y-6">
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
                {getCatalogDetails(activeComponent.id) && (
                  <div className="mb-3 mt-1">
                    <button
                      onClick={() => setIsPdfViewerOpen(true)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#1a56b0] to-indigo-600 hover:from-[#154690] hover:to-indigo-700 shadow-sm hover:shadow-md shadow-[#1a56b0]/20 hover:-translate-y-0.5 rounded-lg transition-all duration-200 ring-1 ring-white/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Catalog</span>
                    </button>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {activeComponent.tagline}
                </p>

              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Engineering Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeComponent.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Key Features & Quality Highlights
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

      {isBOMModalOpen && (
        <Modal
          isOpen={isBOMModalOpen}
          onClose={() => setIsBOMModalOpen(false)}
          title="Upload BOM / Requirements"
          maxWidth="lg"
        >
          <BOMUploadForm />
        </Modal>
      )}

      {/* Full Screen PDF Viewer */}
      {isPdfViewerOpen && activeComponent && getCatalogDetails(activeComponent.id) && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95 backdrop-blur-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
            <h2 className="text-sm sm:text-base font-bold text-[#0d2b4e] truncate">
              FLUX Catalog: {getCatalogDetails(activeComponent.id)!.title}
            </h2>
            <div className="flex items-center gap-3">
              <a
                href={getCatalogDetails(activeComponent.id)!.url}
                download
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#1a56b0] hover:bg-[#154690] rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                onClick={() => setIsPdfViewerOpen(false)}
                className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          
          {/* PDF Container */}
          <div className="flex-1 w-full p-2 sm:p-6 overflow-hidden flex justify-center">
            <div className="w-full max-w-5xl h-full bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
              <iframe 
                src={`${getCatalogDetails(activeComponent.id)!.url}#toolbar=0`} 
                className="w-full h-full border-0"
                title={`${getCatalogDetails(activeComponent.id)!.title} Catalog PDF`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
