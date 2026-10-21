"use client";

import React, { useState } from "react";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { SwitchboardSolutions } from "@/components/solutions/SwitchboardSolutions";
import { HvacSolutions } from "@/components/solutions/HvacSolutions";
import { SolarSolutions } from "@/components/solutions/SolarSolutions";
import { WaterPurificationSolutions } from "@/components/solutions/WaterPurificationSolutions";
import { Modal } from "@/components/ui/Modal";
import { BOMUploadForm } from "@/components/forms/BOMUploadForm";
import { SolutionCategory } from "@/lib/data/solutions";

interface SwitchboardSolutionsDetailWrapperProps {
  category: SolutionCategory;
}

export function SwitchboardSolutionsDetailWrapper({
  category,
}: SwitchboardSolutionsDetailWrapperProps) {
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [bomProjectType, setBomProjectType] = useState(
    category.title || "Solutions Project"
  );

  const handleRequestQuote = (projectType?: string) => {
    setBomProjectType(projectType || category.title || "Solutions Project");
    setIsBOMModalOpen(true);
  };

  const isHvac =
    category.slug === "hvac-solutions" || category.slug === "hvac-solution";
  const isSolar =
    category.slug === "solar-solutions" || category.slug === "solar-solution";
  const isWater =
    category.slug === "water-purification-solutions" ||
    category.slug === "water-purification-solution";

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      <ProcessStrip />

      {/* Solution Detail Component */}
      {isHvac ? (
        <HvacSolutions
          onRequestQuote={handleRequestQuote}
          showBreadcrumb={true}
        />
      ) : isSolar ? (
        <SolarSolutions
          onRequestQuote={handleRequestQuote}
          showBreadcrumb={true}
        />
      ) : isWater ? (
        <WaterPurificationSolutions
          onRequestQuote={handleRequestQuote}
          showBreadcrumb={true}
        />
      ) : (
        <SwitchboardSolutions
          onRequestQuote={handleRequestQuote}
          showBreadcrumb={true}
        />
      )}

      {/* Modal for BOM Quotation */}
      <Modal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        title={`${bomProjectType} Quotation`}
        subtitle="Submit your part list for consolidated multi-vendor pricing and engineering verification."
        maxWidth="lg"
      >
        <BOMUploadForm
          defaultProjectType={bomProjectType}
          onSuccess={() => setIsBOMModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
