"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Phone,
  Mail,
  Building,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";

const bomFormSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid business email is required"),
  phone: z.string().min(8, "Valid phone/mobile number is required"),
  company: z.string().min(2, "Company or Panel Shop name is required"),
  projectType: z.string().optional(),
  targetDate: z.string().optional(),
  partNumbers: z
    .string()
    .min(5, "Please enter parts list, item specs, or BOM line-items"),
  specialInstructions: z.string().optional(),
});

type BOMFormData = z.infer<typeof bomFormSchema>;

interface BOMUploadFormProps {
  onSuccess?: () => void;
  defaultProjectType?: string;
}

export function BOMUploadForm({ onSuccess, defaultProjectType }: BOMUploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BOMFormData>({
    resolver: zodResolver(bomFormSchema),
    defaultValues: {
      projectType: defaultProjectType || "Panel Building & Switchgear",
      partNumbers: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // Auto-populate helper text in part numbers box if empty
      setValue(
        "partNumbers",
        `[Attached BOM File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]\n` +
          `Project: Multi-brand electrical component inquiry.\nPlease refer to attached line-items for MCCB, ACB, contactors, PLCs and terminal counts.`
      );
    }
  };

  const onSubmit = async (data: BOMFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/bom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fileName: selectedFileName,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmittedRef(result.referenceNumber);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore confetti issues
        }
        reset();
      } else {
        setServerError(result.message || "Failed to submit BOM. Please check fields.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Network connection issue. Please retry or contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="text-center py-6 px-4 space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            BOM Received • Queue ID: #{submittedRef}
          </span>
          <h4 className="text-xl font-bold font-heading text-[#0d2b4e] mt-2">
            Technical Review In Progress
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            Our Pune engineering desk is cross-referencing your line items, verifying OEM stock availability, and calculating your consolidated quotation.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-left text-xs space-y-1.5 text-slate-700 max-w-md mx-auto">
          <p className="font-semibold text-[#0d2b4e] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#1a56b0]" />
            What happens next?
          </p>
          <p>&bull; <strong>Within 4 hours:</strong> An electrical specialist checks part compatibility &amp; lead times.</p>
          <p>&bull; <strong>Within 24 hours:</strong> Consolidated multi-vendor line-item quote delivered via email.</p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSubmittedRef(null);
              if (onSuccess) onSuccess();
            }}
          >
            Submit Another BOM
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {serverError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      {/* File Upload Drag/Drop Box */}
      <div className="relative border-2 border-dashed border-blue-200 hover:border-[#1a56b0] bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-4 sm:p-5 text-center transition-all">
        <input
          type="file"
          id="bomFileInput"
          accept=".xlsx,.xls,.csv,.pdf,.txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white text-[#1a56b0] shadow-sm flex items-center justify-center mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#0d2b4e]">
            {selectedFileName ? (
              <span className="text-emerald-700">Attached: {selectedFileName}</span>
            ) : (
              "Click to upload BOM file (Excel, CSV, PDF)"
            )}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Or simply type/paste part numbers in the box below
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Contact Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              {...register("name")}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Company / Panel Shop *
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              {...register("company")}
              placeholder="e.g. Apex Automation Pvt Ltd"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>
          {errors.company && (
            <p className="text-[11px] text-red-600 mt-1">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Business Email *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              {...register("email")}
              placeholder="rahul@company.com"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone / Mobile *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              {...register("phone")}
              placeholder="+91 98220 00000"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none"
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Part Numbers / Quantities / Requirements *
        </label>
        <textarea
          {...register("partNumbers")}
          rows={3}
          placeholder="e.g. 
1. 3P 250A 36kA MCCB Schneider (Qty: 2)
2. S7-1200 CPU 1214C DC/DC/DC Siemens (Qty: 1)
3. 2.2kW VFD Danfoss / ABB (Qty: 3)
4. Terminal blocks 2.5mm² Push-in (Qty: 200)"
          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#1a56b0] focus:ring-1 focus:ring-[#1a56b0] outline-none font-mono"
        />
        {errors.partNumbers && (
          <p className="text-[11px] text-red-600 mt-1">{errors.partNumbers.message}</p>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between gap-4">
        <span className="text-[11px] text-slate-500 hidden sm:inline-block">
          &bull; 100% Genuine OEM with Test Certificates
        </span>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          leftIcon={<FileSpreadsheet className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Submit for 24h Review
        </Button>
      </div>
    </form>
  );
}
