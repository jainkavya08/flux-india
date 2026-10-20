"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { COMPANY_INFO } from "@/lib/data/company";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Building,
  User,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { trackContact } from "@/lib/analytics";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  requirement: z.string().optional(),
  message: z.string().min(10, "Please describe your requirement (min 10 chars)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      requirement: "Panel Building Components",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(result.message);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
        reset();
      } else {
        setSubmitError(result.message || "Failed to submit inquiry. Please retry.");
      }
    } catch {
      setSubmitError("Network connection error. Please call or WhatsApp our desk directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            Contact FLUX Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Let&apos;s Build Your Next Solution
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Reach out to our electrical engineering and OEM procurement desk in Pune for component cross-referencing, consolidated pricing, and dispatch scheduling.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Address Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-[#f0f7fd] border border-[#bcdbf7] rounded-3xl p-7 text-[#0d2b4e] shadow-xs">
              <h3 className="text-xl font-bold font-heading text-[#0d2b4e] mb-4">
                Direct Engineering Connect
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1a56b0] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0d2b4e]">Pune Headquarters</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      {COMPANY_INFO.location.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#1a56b0] shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">Phone Support</p>
                    <a
                      href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
                      onClick={() => trackContact('phone')}
                      className="font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors"
                    >
                      {COMPANY_INFO.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1a56b0] shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">Sales Inquiries</p>
                    <a
                      href={`mailto:${COMPANY_INFO.contact.email}`}
                      onClick={() => trackContact('email')}
                      className="font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#d6e8fa]">
                  <Clock className="w-5 h-5 text-[#1a56b0] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">Operating Schedule</p>
                    <p className="text-xs text-slate-800 font-medium">
                      {COMPANY_INFO.openingHours.weekdays}
                    </p>
                    <p className="text-xs text-slate-800 font-medium">
                      {COMPANY_INFO.openingHours.weekends}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('whatsapp')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1a56b0]" />
                  Chakan Industrial Belt, Pune
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Primary Logistics Hub
                </span>
              </div>

              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                <iframe
                  title="FLUX Pune Location Map"
                  src={COMPANY_INFO.location.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

        {/* FAQs Accordion */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="blue" className="mb-2">
              Frequently Asked Questions
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e]">
              Frequently Asked Sourcing Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {COMPANY_INFO.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0d2b4e]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200",
                        isOpen && "transform rotate-180 text-[#1a56b0]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
