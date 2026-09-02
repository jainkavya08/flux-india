"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  FileUp,
  FileSearch,
  FileCheck,
  ShoppingCart,
  Truck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export function ProcessStrip() {
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps: StepItem[] = [
    {
      id: "share-bom",
      title: "SHARE BOM",
      icon: <FileUp className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.6]" />,
    },
    {
      id: "technical-review",
      title: "TECHNICAL REVIEW",
      icon: <FileSearch className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.6]" />,
    },
    {
      id: "consolidated-quotation",
      title: "CONSOLIDATED QUOTATION",
      icon: <FileCheck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.6]" />,
    },
    {
      id: "procurement",
      title: "PROCUREMENT",
      icon: <ShoppingCart className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.6]" />,
    },
    {
      id: "delivery",
      title: "DELIVERY",
      icon: <Truck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.6]" />,
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 relative z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Process Container */}
        <div className="overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center justify-between min-w-[700px] lg:min-w-0 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Action Item */}
                  <button
                    onClick={() => {
                      setActiveStep(step.title);
                      setIsBOMModalOpen(true);
                    }}
                    className={cn(
                      "group flex flex-col items-center text-center px-2 py-1 transition-all duration-200 cursor-pointer focus:outline-none",
                      "hover:-translate-y-0.5"
                    )}
                    aria-label={`${step.title} — Click to upload BOM`}
                  >
                    {/* Big Prominent Icon */}
                    <div className="text-[#1a56b0] group-hover:text-[#0d2b4e] transition-all duration-200 transform group-hover:scale-110 flex items-center justify-center">
                      {step.icon}
                    </div>

                    {/* Bold Uppercase Title */}
                    <span className="mt-1.5 text-[11px] sm:text-[12px] font-extrabold tracking-wider uppercase text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors font-heading whitespace-nowrap">
                      {step.title}
                    </span>
                  </button>

                  {/* Connecting Circle Arrow Badge between steps */}
                  {!isLast && (
                    <div className="shrink-0 flex items-center justify-center px-1">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Quick BOM Submission on Step Click */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title={activeStep ? `${activeStep} &bull; BOM Intake` : "Consolidate Your Electrical BOM"}
        subtitle="Upload your bill of materials (Excel, CSV, PDF) or paste part numbers for rapid 24h quotation."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType={activeStep || "Consolidated Sourcing"}
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>
    </section>
  );
}
