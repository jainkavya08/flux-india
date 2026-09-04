"use client";

import React from "react";
import Link from "next/link";
import { FluxLogo } from "@/components/ui/FluxLogo";
import { COMPANY_INFO } from "@/lib/data/company";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  LinkedinIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e9f3fc] text-[#0d2b4e] border-t border-[#bcdbf7] relative overflow-hidden">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-10 border-b border-[#d6e8fa]">
          {/* Column 1: Opening Hours & Socials */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[#1a56b0]">
              <Clock className="w-5 h-5 text-[#1a56b0]" />
              <h4 className="text-base font-bold uppercase tracking-wider text-[#0d2b4e]">
                Operating Hours
              </h4>
            </div>

            <div className="space-y-2.5 text-sm text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-[#d6e8fa]">
                <span className="text-slate-500">Monday – Friday</span>
                <span className="font-semibold text-[#0d2b4e]">9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#d6e8fa]">
                <span className="text-slate-500">Saturday – Sunday</span>
                <span className="font-semibold text-[#0d2b4e]">10:00 AM – 5:00 PM</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#bcdbf7] text-xs text-[#0d2b4e] flex items-center gap-2 mt-2 shadow-xs">
                <Zap className="w-4 h-4 text-[#1a56b0] shrink-0" />
                <span className="font-medium">24/7 Priority Emergency Support for Breakdown Lines</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={COMPANY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#0a66c2] flex items-center justify-center text-slate-600 hover:text-white transition-colors duration-200 border border-[#bcdbf7] shadow-xs"
                  aria-label="FLUX on LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#e1306c] flex items-center justify-center text-slate-600 hover:text-white transition-colors duration-200 border border-[#bcdbf7] shadow-xs"
                  aria-label="FLUX on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-emerald-600 flex items-center justify-center text-emerald-600 hover:text-white transition-colors duration-200 border border-emerald-200 shadow-xs"
                  aria-label="FLUX WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Centered Tagline & Brand Narrative */}
          <div className="flex flex-col items-center text-center space-y-4 md:px-4">
            <FluxLogo size="lg" />

            <div className="relative py-1">
              <p className="text-base lg:text-lg font-bold font-heading text-[#0d2b4e] italic tracking-wide">
                &ldquo;One Partner. Infinite Solutions&rdquo;
              </p>
              <span className="text-[11px] font-bold text-[#1a56b0] tracking-widest uppercase block mt-0.5">
                — FLUX
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Empowering panel builders, machine manufacturers, and EPCs with genuine OEM components, technical cross-referencing, and solutions for all over the world.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#1a56b0] pt-1">
              <Link href="/components/panel-building" className="hover:text-[#0d2b4e] hover:underline">
                Panel Building
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/components/automation" className="hover:text-[#0d2b4e] hover:underline">
                Automation
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/solutions" className="hover:text-[#0d2b4e] hover:underline">
                Solutions
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/bom" className="hover:text-[#0d2b4e] hover:underline">
                BOM Engine
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Info & Pune Location */}
          <div className="space-y-5 md:text-right flex flex-col md:items-end">
            <div className="flex items-center gap-2 text-[#1a56b0] md:justify-end">
              <MapPin className="w-5 h-5 text-[#1a56b0]" />
              <h4 className="text-base font-bold uppercase tracking-wider text-[#0d2b4e]">
                Headquarters &amp; Hub
              </h4>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3 md:justify-end">
                <div>
                  <p className="font-bold text-[#0d2b4e]">{COMPANY_INFO.location.address}</p>
                  <p className="text-xs text-slate-600">Jadhawadi, Chakan Industrial Corridor</p>
                  <p className="text-xs text-slate-600">Pune, Maharashtra 411062, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:justify-end">
                <a
                  href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-[#0d2b4e] font-bold text-[#1a56b0] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#1a56b0]" />
                  <span>{COMPANY_INFO.contact.phoneDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-3 md:justify-end">
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="hover:text-[#0d2b4e] text-slate-700 transition-colors flex items-center gap-2 text-xs font-semibold"
                >
                  <Mail className="w-4 h-4 text-[#1a56b0]" />
                  <span>{COMPANY_INFO.contact.email}</span>
                </a>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors"
            >
              <span>Get driving directions to Pune office</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p className="text-center sm:text-left">
            © {currentYear} {COMPANY_INFO.legalName}. All rights reserved. Founded 2021 in Pune, India.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Authorized OEM Genuine
            </span>
            <Link href="/contact" className="hover:text-[#0d2b4e] font-medium transition-colors">
              Privacy &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
