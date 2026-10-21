"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  headerAction?: React.ReactNode;
  hideCloseButton?: boolean;
  headerVariant?: "navy" | "light" | "custom";
  customHeader?: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
  headerAction,
  hideCloseButton = false,
  headerVariant = "navy",
  customHeader,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const maxWidthStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0d2b4e]/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Box */}
      <div
        className={cn(
          "relative w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 z-10 my-8",
          maxWidthStyles[maxWidth]
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        {customHeader ? (
          <div className="relative border-b border-slate-100 bg-white">
            {customHeader}
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : headerVariant === "light" ? (
          <div className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#0d2b4e] tracking-tight truncate">{title}</h3>
              {subtitle && <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
              {headerAction}
              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 bg-[#0d2b4e] border-b border-[#1b3b64] text-white flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img src="/b&w.svg" alt="FLUX" className="h-7 w-auto object-contain shrink-0" />
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">{title}</h3>
                {subtitle && <p className="text-[10px] sm:text-xs text-blue-100/80 mt-0.5 truncate">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
              {headerAction}
              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}
