"use client";

import React, { useState } from "react";
import { SOLUTIONS_DATA, SolutionItem } from "@/lib/data/solutions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import {
  Sun,
  BatteryCharging,
  Factory,
  Building2,
  Droplets,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Zap,
} from "lucide-react";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState<SolutionItem | null>(null);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);

  const getSolutionIcon = (id: string) => {
    switch (id) {
      case "sol-solar-renewables":
        return <Sun className="w-6 h-6 text-amber-500" />;
      case "sol-ev-infrastructure":
        return <BatteryCharging className="w-6 h-6 text-emerald-500" />;
      case "sol-automotive-assembly":
        return <Factory className="w-6 h-6 text-blue-500" />;
      case "sol-power-distribution":
        return <Building2 className="w-6 h-6 text-indigo-500" />;
      case "sol-water-process":
        return <Droplets className="w-6 h-6 text-cyan-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#1a56b0]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-6 sm:py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Domain Engineering
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Industry Solutions &amp; Architectures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Proven component blueprints, panel building configurations, and telemetry architectures engineered for the world&apos;s most demanding manufacturing and clean-energy sectors.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBOMModalOpen(true)}
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Consult on Your Solution Architecture
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Detail List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-600">Finding solutions soon...</h2>
      </div>

      {/* BOM Modal */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title={activeSolution ? `${activeSolution.title} Quotation` : "Solution BOM Consultation"}
        subtitle="Submit your project details for rapid engineering cross-referencing."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType={activeSolution?.title || "Industry Solution Project"}
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
