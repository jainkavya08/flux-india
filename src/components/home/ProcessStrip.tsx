"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  FileUp,
  FileSearch,
  FileCheck,
  ShoppingCart,
  Truck,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const WORKFLOW_POPUPS: Record<string, any> = {
  "technical-review": {
    heading: "Technical Review",
    subtitle: "Ensuring accuracy, compatibility and compliance for your requirements.",
    intro: "Our technical team carefully reviews your submitted Bill of Materials to ensure that the selected components meet your project requirements.",
    listTitle: "Review Process:",
    list: [
      { title: "Part Number Verification", desc: "Validate component part numbers and product descriptions." },
      { title: "Quantity Validation", desc: "Verify requested quantities and identify any inconsistencies." },
      { title: "Technical Compatibility", desc: "Review component specifications and suitability for the intended application." },
      { title: "Requirement Clarification", desc: "Identify missing information or technical queries that may need clarification." },
      { title: "Review Completion", desc: "Prepare the verified BOM for consolidated quotation." },
    ],
    info: "Technical review is typically completed within 24 hours, subject to BOM complexity and the availability of required information.",
    buttonLabel: "Share BOM",
    buttonAction: "share-bom",
  },
  "consolidated-quotation": {
    heading: "Consolidated Quotation",
    subtitle: "Transparent pricing, unified sourcing and simplified procurement.",
    intro: "Once the technical review is complete, FLUX prepares a consolidated quotation for your requested electrical and automation components.",
    listTitle: "Quotation Includes:",
    list: [
      { title: "Product-wise Pricing", desc: "Clear unit prices for each requested component." },
      { title: "Quantity and Total", desc: "Itemized quantities, subtotals and overall quotation value." },
      { title: "Availability", desc: "Component availability and sourcing information, where confirmed." },
      { title: "Estimated Lead Time", desc: "Expected delivery timelines based on supplier confirmation." },
      { title: "Commercial Terms", desc: "Applicable payment, delivery and quotation validity terms." },
    ],
    info: "Receive a consolidated quotation with product-wise pricing and relevant commercial details after the technical review.",
    buttonLabel: "Share BOM",
    buttonAction: "share-bom",
  },
  "procurement": {
    heading: "Procurement",
    subtitle: "Reliable sourcing from trusted OEM partners.",
    intro: "After quotation approval and order confirmation, FLUX coordinates procurement to source the required components through its supplier network.",
    listTitle: "Procurement Process:",
    list: [
      { title: "Order Confirmation", desc: "Confirm the approved quotation and order requirements." },
      { title: "Supplier Coordination", desc: "Coordinate with relevant OEMs and suppliers." },
      { title: "Sourcing", desc: "Arrange sourcing of the required products." },
      { title: "Order Preparation", desc: "Coordinate product quantities and prepare the order for dispatch." },
      { title: "Dispatch Coordination", desc: "Arrange the next stage of delivery once products are ready." },
    ],
    info: "Procurement timelines depend on product availability, supplier confirmation and order requirements.",
    buttonLabel: "Request Quote",
    buttonAction: "share-bom",
  },
  "delivery": {
    heading: "Delivery",
    subtitle: "Coordinated delivery with order visibility.",
    intro: "FLUX coordinates the dispatch and delivery of procured components, helping customers stay informed about their order progress.",
    listTitle: "Delivery Process:",
    list: [
      { title: "Dispatch Preparation", desc: "Prepare and verify the order before dispatch." },
      { title: "Shipment Dispatch", desc: "Coordinate the dispatch of the order." },
      { title: "Tracking Information", desc: "Provide courier and shipment tracking details when available." },
      { title: "Delivery Updates", desc: "Share estimated delivery information and relevant status updates." },
      { title: "Delivery Confirmation", desc: "Confirm completion of delivery when information is available." },
    ],
    info: "Delivery timelines depend on product availability, order readiness, destination and logistics arrangements.",
    buttonLabel: "Contact Us",
    buttonAction: "contact",
  }
};

const getStageIndexFromStatus = (status: string) => {
  const s = status.toLowerCase();
  if (["new"].includes(s)) return 0;
  if (["under review", "reviewed", "clarification required"].includes(s)) return 1;
  if (["quotation preparing", "quoted"].includes(s)) return 2;
  if (["approved", "procurement", "ready for dispatch"].includes(s)) return 3;
  if (["dispatched", "in transit", "delivered", "closed"].includes(s)) return 4;
  return 0;
};

function ProcessStripInner() {
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const trackBomId = searchParams?.get("trackBOM");
  const trackCompany = searchParams?.get("company");
  
  const [trackedData, setTrackedData] = useState<any>(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  const fetchTrackedBom = async (bomId: string, company: string) => {
    setIsTrackingLoading(true);
    setTrackingError("");
    try {
      const res = await fetch("/api/track-bom.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: company, bomId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTrackedData(data.data);
      } else {
        setTrackingError(data.message || "Failed to load tracking data.");
      }
    } catch(err) {
      setTrackingError("Network error.");
    } finally {
      setIsTrackingLoading(false);
    }
  };

  useEffect(() => {
    if (trackBomId && trackCompany) {
      fetchTrackedBom(trackBomId, trackCompany);
    } else {
      setTrackedData(null);
      setTrackingError("");
    }
  }, [trackBomId, trackCompany]);

  const activeStageIndex = trackedData ? getStageIndexFromStatus(trackedData.status) : -1;

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

  const handleStepClick = (id: string, title: string) => {
    setActiveStep(title);
    if (id === "share-bom") {
      setIsBOMModalOpen(true);
    } else {
      setActiveWorkflowId(id);
    }
  };

  return (
    <section className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 sticky top-[60px] lg:top-[96px] z-30 shadow-xs overflow-hidden">
      {/* Tracking Summary Block */}
      {isTrackingLoading && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center text-sm text-[#1a56b0] font-semibold">
           Loading BOM status...
        </div>
      )}
      
      {trackingError && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center">
           <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 inline-block">
             {trackingError}
           </div>
        </div>
      )}

      {trackedData && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="bg-[#eaf3fc] rounded-xl border border-[#bcdbf7] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div>
                <h3 className="font-bold text-[#0d2b4e] text-lg mb-1">BOM Tracking</h3>
                <div className="text-sm text-slate-700 flex flex-wrap gap-x-4 gap-y-1">
                  <span><strong className="text-[#1a56b0]">BOM ID:</strong> {trackedData.bomId}</span>
                  <span><strong className="text-[#1a56b0]">Company:</strong> {trackedData.companyName}</span>
                  <span><strong className="text-[#1a56b0]">Current Status:</strong> {trackedData.status}</span>
                  <span><strong className="text-[#1a56b0]">Submitted:</strong> {new Date(trackedData.submittedAt).toLocaleDateString()}</span>
                  {trackedData.updatedAt && <span><strong className="text-[#1a56b0]">Updated:</strong> {new Date(trackedData.updatedAt).toLocaleDateString()}</span>}
                </div>
                {trackedData.status.toLowerCase() === "clarification required" && (
                   <p className="text-red-600 text-xs font-bold mt-2">Clarification required. Please contact our team or reply to your confirmation email.</p>
                )}
             </div>
             <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
               <Button size="sm" variant="outline" onClick={() => fetchTrackedBom(trackBomId!, trackCompany!)}>Refresh Status</Button>
               <Button size="sm" variant="ghost" onClick={() => router.push(window.location.pathname)}>Close Tracking</Button>
             </div>
          </div>
        </div>
      )}

      {/* Desktop View (>= md): Static horizontal process strip */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center justify-between min-w-[700px] lg:min-w-0 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;

              const isCompleted = trackedData ? index < activeStageIndex : false;
              const isCurrent = trackedData ? index === activeStageIndex : false;
              const isUpcoming = trackedData ? index > activeStageIndex : false;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Action Item */}
                  <button
                    onClick={() => !trackedData && handleStepClick(step.id, step.title)}
                    className={cn(
                      "group flex flex-col items-center text-center px-2 py-1 transition-all duration-200 focus:outline-none",
                      !trackedData ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default"
                    )}
                    aria-label={step.title}
                  >
                    {/* Big Prominent Icon */}
                    <div className={cn(
                       "transition-all duration-200 flex items-center justify-center",
                       !trackedData && "text-[#1a56b0] group-hover:text-[#0d2b4e] transform group-hover:scale-110",
                       isCompleted && "text-emerald-500",
                       isCurrent && "text-[#1a56b0] p-1.5 bg-blue-50 rounded-full border border-[#bcdbf7] shadow-sm",
                       isUpcoming && "text-slate-300"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2]" /> : step.icon}
                    </div>

                    {/* Bold Uppercase Title */}
                    <span className={cn(
                      "mt-1.5 text-[11px] sm:text-[12px] font-extrabold tracking-wider uppercase font-heading whitespace-nowrap transition-colors",
                      !trackedData && "text-[#0d2b4e] group-hover:text-[#1a56b0]",
                      isCompleted && "text-emerald-600",
                      isCurrent && "text-[#1a56b0]",
                      isUpcoming && "text-slate-400"
                    )}>
                      {step.title}
                      {isCurrent && <span className="block text-[9px] text-[#1a56b0] font-semibold tracking-normal mt-0.5">Current Stage</span>}
                    </span>
                  </button>

                  {/* Connecting Circle Arrow Badge between steps */}
                  {!isLast && (
                    <div className="shrink-0 flex items-center justify-center px-1">
                      <div className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200",
                        !trackedData && "bg-[#1a56b0] text-white group-hover:scale-105",
                        isCompleted && "bg-emerald-500 text-white",
                        isCurrent && "bg-[#bcdbf7] text-[#1a56b0]",
                        isUpcoming && "bg-slate-100 text-slate-300"
                      )}>
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

      {/* Mobile View (< md): Continuously rotating infinite marquee */}
      <div className="md:hidden relative w-full overflow-hidden select-none">
        {/* Subtle gradient fades on left and right edges for smooth infinite blend */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <motion.div
          className="flex w-max py-1"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 18,
              ease: "linear",
            },
          }}
        >
          {/* First loop instance */}
          <div className="flex items-center shrink-0">
            {steps.map((step, index) => {
              const isCompleted = trackedData ? index < activeStageIndex : false;
              const isCurrent = trackedData ? index === activeStageIndex : false;
              const isUpcoming = trackedData ? index > activeStageIndex : false;
              return (
              <React.Fragment key={`mobile-1-${step.id}`}>
                <button
                  type="button"
                  onClick={() => !trackedData && handleStepClick(step.id, step.title)}
                  className={cn(
                    "group flex flex-col items-center text-center px-3 py-1 transition-transform active:scale-95 focus:outline-none shrink-0",
                    !trackedData ? "cursor-pointer" : "cursor-default"
                  )}
                  aria-label={step.title}
                >
                  <div className={cn(
                     "flex items-center justify-center transition-colors",
                     !trackedData && "text-[#1a56b0]",
                     isCompleted && "text-emerald-500",
                     isCurrent && "text-[#1a56b0] p-1.5 bg-blue-50 rounded-full border border-[#bcdbf7]",
                     isUpcoming && "text-slate-300"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-8 h-8 stroke-[2]" /> : step.icon}
                  </div>
                  <span className={cn(
                    "mt-1.5 text-[11px] font-extrabold tracking-wider uppercase font-heading whitespace-nowrap",
                    !trackedData && "text-[#0d2b4e]",
                    isCompleted && "text-emerald-600",
                    isCurrent && "text-[#1a56b0]",
                    isUpcoming && "text-slate-400"
                  )}>
                    {step.title}
                    {isCurrent && <span className="block text-[8px] text-[#1a56b0] font-semibold mt-0.5">Current</span>}
                  </span>
                </button>

                <div className="shrink-0 flex items-center justify-center px-2">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shadow-xs",
                    !trackedData && "bg-[#1a56b0] text-white",
                    isCompleted && "bg-emerald-500 text-white",
                    isCurrent && "bg-[#bcdbf7] text-[#1a56b0]",
                    isUpcoming && "bg-slate-100 text-slate-300"
                  )}>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </React.Fragment>
            )})}
          </div>

          {/* Second duplicate loop instance for seamless infinite rotation */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {steps.map((step, index) => {
              const isCompleted = trackedData ? index < activeStageIndex : false;
              const isCurrent = trackedData ? index === activeStageIndex : false;
              const isUpcoming = trackedData ? index > activeStageIndex : false;
              return (
              <React.Fragment key={`mobile-2-${step.id}`}>
                <button
                  type="button"
                  onClick={() => !trackedData && handleStepClick(step.id, step.title)}
                  tabIndex={-1}
                  className={cn(
                    "group flex flex-col items-center text-center px-3 py-1 transition-transform active:scale-95 focus:outline-none shrink-0",
                    !trackedData ? "cursor-pointer" : "cursor-default"
                  )}
                  aria-label={step.title}
                >
                  <div className={cn(
                     "flex items-center justify-center transition-colors",
                     !trackedData && "text-[#1a56b0]",
                     isCompleted && "text-emerald-500",
                     isCurrent && "text-[#1a56b0] p-1.5 bg-blue-50 rounded-full border border-[#bcdbf7]",
                     isUpcoming && "text-slate-300"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-8 h-8 stroke-[2]" /> : step.icon}
                  </div>
                  <span className={cn(
                    "mt-1.5 text-[11px] font-extrabold tracking-wider uppercase font-heading whitespace-nowrap",
                    !trackedData && "text-[#0d2b4e]",
                    isCompleted && "text-emerald-600",
                    isCurrent && "text-[#1a56b0]",
                    isUpcoming && "text-slate-400"
                  )}>
                    {step.title}
                    {isCurrent && <span className="block text-[8px] text-[#1a56b0] font-semibold mt-0.5">Current</span>}
                  </span>
                </button>

                <div className="shrink-0 flex items-center justify-center px-2">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shadow-xs",
                    !trackedData && "bg-[#1a56b0] text-white",
                    isCompleted && "bg-emerald-500 text-white",
                    isCurrent && "bg-[#bcdbf7] text-[#1a56b0]",
                    isUpcoming && "bg-slate-100 text-slate-300"
                  )}>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </React.Fragment>
            )})}
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title={activeStep ? `${activeStep} • BOM Intake` : "Consolidate Your Electrical BOM"}
        subtitle="Upload your bill of materials (Excel, CSV, PDF) or paste part numbers for rapid 24h quotation."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType={activeStep || "Consolidated Sourcing"}
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>

      {/* Workflow Informational Popups */}
      {activeWorkflowId && WORKFLOW_POPUPS[activeWorkflowId] && (
        <Modal
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          title={WORKFLOW_POPUPS[activeWorkflowId].heading}
          subtitle={WORKFLOW_POPUPS[activeWorkflowId].subtitle}
          maxWidth="lg"
          hideCloseButton={true}
          headerAction={
            WORKFLOW_POPUPS[activeWorkflowId].buttonLabel && (
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap shadow-none border-blue-400/20 bg-white text-[#0d2b4e] hover:bg-slate-100 animate-button-breathe"
                onClick={() => {
                  setActiveWorkflowId(null);
                  if (WORKFLOW_POPUPS[activeWorkflowId].buttonAction === "contact") {
                    window.location.href = "/contact";
                  } else {
                    setIsBOMModalOpen(true);
                  }
                }}
              >
                {WORKFLOW_POPUPS[activeWorkflowId].buttonLabel}
              </Button>
            )
          }
        >
          <div className="space-y-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {WORKFLOW_POPUPS[activeWorkflowId].intro}
            </p>

            <div>
              <h4 className="text-xs font-bold text-[#1a56b0] uppercase tracking-wider mb-3">
                {WORKFLOW_POPUPS[activeWorkflowId].listTitle}
              </h4>
              <ul className="space-y-3">
                {WORKFLOW_POPUPS[activeWorkflowId].list.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#eaf3fc] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a56b0]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#0d2b4e] text-sm block">{item.title}</span>
                      <span className="text-sm text-slate-600 block leading-snug">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#eaf3fc] rounded-xl border border-[#bcdbf7] flex items-start gap-3 shadow-sm">
              <Info className="w-5 h-5 text-[#1a56b0] shrink-0 mt-0.5" />
              <p className="text-sm text-[#0d2b4e] font-medium leading-relaxed">
                {WORKFLOW_POPUPS[activeWorkflowId].info}
              </p>
            </div>

          </div>
        </Modal>
      )}
    </section>
  );
}

export function ProcessStrip() {
  return (
    <Suspense fallback={<div className="h-20 bg-white border-b border-slate-200"></div>}>
      <ProcessStripInner />
    </Suspense>
  );
}
