"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FluxLogo } from "@/components/ui/FluxLogo";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/data/company";
import {
  ChevronDown,
  Menu,
  X,
  Layers,
  Cpu,
  Zap,
  Phone,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [componentsOpen, setComponentsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setComponentsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Solutions", href: "/solutions" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-[#0d2b4e]/5 border-b border-slate-200/80 py-2.5"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-3.5"
      )}
    >
      {/* Top micro-bar for quick contact / social icons */}
      <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              One Partner. Infinite Solutions
            </span>
            <span className="text-slate-300">|</span>
            <span>Quotes in &lt; 24 Hours</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#1a56b0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1a56b0]" />
              <span>{COMPANY_INFO.contact.phoneDisplay}</span>
            </a>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0a66c2] transition-colors"
                aria-label="FLUX LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#e1306c] transition-colors"
                aria-label="FLUX Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                aria-label="WhatsApp Instant Chat"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <FluxLogo showIndiaBadge={false} showTagline={false} size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Components Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setComponentsOpen(true)}
              onMouseLeave={() => setComponentsOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  pathname.startsWith("/components")
                    ? "text-[#1a56b0] bg-blue-50/80"
                    : "text-slate-700 hover:text-[#0d2b4e] hover:bg-slate-100/80"
                )}
                onClick={() => setComponentsOpen(!componentsOpen)}
                aria-expanded={componentsOpen}
              >
                <span>Components</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200",
                    componentsOpen && "transform rotate-180 text-[#1a56b0]"
                  )}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {componentsOpen && (
                <div className="absolute left-0 top-full pt-2 w-[580px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 grid grid-cols-2 gap-4">
                    {/* Panel Building Category */}
                    <Link
                      href="/components/panel-building"
                      className="group p-3.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-[#0d2b4e] font-bold group-hover:text-[#1a56b0]">
                          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-[#1a56b0] flex items-center justify-center shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-heading">Panel Building</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Switchgear, ACBs, MCCBs, contactors, modular enclosures &amp; terminal busbars.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center text-xs font-semibold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
                        <span>Explore Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </Link>

                    {/* Automation Category */}
                    <Link
                      href="/components/automation"
                      className="group p-3.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-[#0d2b4e] font-bold group-hover:text-[#1a56b0]">
                          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-[#1a56b0] flex items-center justify-center shrink-0">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-heading">Industrial Automation</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          PLCs, VFDs, HMIs, sensors, servo motion &amp; IIoT edge connectivity.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center text-xs font-semibold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
                        <span>Explore Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </Link>

                    {/* Dropdown Footer Banner */}
                    <div className="col-span-2 bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>100% Genuine Authorized OEM Stock</span>
                      </div>
                      <Link
                        href="/bom"
                        className="text-xs font-semibold text-[#1a56b0] hover:underline"
                      >
                        Consolidate BOM →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "text-[#1a56b0] bg-blue-50/80"
                      : "text-slate-700 hover:text-[#0d2b4e] hover:bg-slate-100/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href="/bom"
              variant="outline"
              size="sm"
              leftIcon={<FileSpreadsheet className="w-3.5 h-3.5" />}
              className="font-semibold text-xs"
            >
              Share BOM
            </Button>

            <Button
              href="/contact"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button href="/bom" variant="secondary" size="sm" className="text-xs px-3 py-1">
              BOM
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
          <div className="border-b border-slate-100 pb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Component Catalogs
            </p>
            <Link
              href="/components/panel-building"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-medium text-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a56b0] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Panel Building Components</div>
                <div className="text-xs text-slate-500">Switchgear, Enclosures &amp; Busbars</div>
              </div>
            </Link>

            <Link
              href="/components/automation"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-medium text-sm mt-1"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a56b0] flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Industrial Automation</div>
                <div className="text-xs text-slate-500">PLCs, VFDs, HMIs &amp; Sensors</div>
              </div>
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-xl text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 text-[#1a56b0]"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Button href="/bom" variant="outline" size="md" className="w-full justify-center">
              Share BOM / Part List
            </Button>
            <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
              Request Consolidated Quote
            </Button>
            <a
              href={COMPANY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Instant WhatsApp Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
