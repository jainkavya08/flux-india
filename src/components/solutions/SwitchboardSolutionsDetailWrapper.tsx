"use client";

import React, { useState } from "react";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { SwitchboardSolutions } from "@/components/solutions/SwitchboardSolutions";
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
    category.title || "Switchboard Solutions Project"
  );

  const handleRequestQuote = (projectType?: string) => {
    setBomProjectType(projectType || category.title || "Switchboard Solutions Project");
    setIsBOMModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      <ProcessStrip />

      {/* Switchboard Solutions Detail Component */}
      <SwitchboardSolutions
        onRequestQuote={handleRequestQuote}
        showBreadcrumb={true}
      />

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
