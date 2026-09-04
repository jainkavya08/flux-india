"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
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

  const normalizedPath = (pathname || "").replace(/\/$/, "") || "/";

  const isLinkActive = (href: string) => {
    if (href === "/") return normalizedPath === "/";
    return normalizedPath === href || normalizedPath.startsWith(href + "/");
  };

  const isComponentsActive = normalizedPath.startsWith("/components");

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
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {/* Components Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                setComponentsOpen(true);
                setHoveredPath("/components");
              }}
              onMouseLeave={() => {
                setComponentsOpen(false);
              }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 outline-none select-none",
                  isComponentsActive
                    ? "text-[#1a56b0] font-bold"
                    : "text-slate-700 hover:text-[#0d2b4e]"
                )}
                onClick={() => setComponentsOpen(!componentsOpen)}
                aria-expanded={componentsOpen}
              >
                {/* Active liquidy sliding indicator */}
                {isComponentsActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#eaf3fc] border border-[#bcdbf7] rounded-full shadow-xs"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 26,
                      mass: 0.85,
                    }}
                  />
                )}

                {/* Hover floating bubble */}
                {hoveredPath === "/components" && !isComponentsActive && (
                  <motion.span
                    layoutId="navbar-hover-bubble"
                    className="absolute inset-0 bg-slate-100/80 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">Components</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 relative z-10",
                    componentsOpen && "transform rotate-180",
                    isComponentsActive ? "text-[#1a56b0]" : "text-slate-400"
                  )}
                />
              </motion.button>

              {/* Mega Dropdown Menu */}
              <AnimatePresence>
                {componentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute left-0 top-full pt-2 w-[580px] z-50"
                  >
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
                            Cable glands, insulators, lugs, terminals, conduits &amp; distribution boxes.
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
                            <span className="text-sm font-heading">Automation Components</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            PLCs, HMIs, energy meters, 24V power supplies, PID &amp; timers.
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const isHovered = hoveredPath === link.href;

              return (
                <motion.div
                  key={link.href}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 outline-none select-none",
                      isActive
                        ? "text-[#1a56b0] font-bold"
                        : "text-slate-700 hover:text-[#0d2b4e]"
                    )}
                  >
                    {/* Active liquidy sliding indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-[#eaf3fc] border border-[#bcdbf7] rounded-full shadow-xs"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 26,
                          mass: 0.85,
                        }}
                      />
                    )}

                    {/* Hover floating bubble */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="navbar-hover-bubble"
                        className="absolute inset-0 bg-slate-100/80 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </motion.div>
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-6 h-6 text-[#1a56b0]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 30,
              mass: 0.9,
            }}
            className="md:hidden overflow-hidden bg-white border-b border-slate-200/90 shadow-xl"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.02,
                  },
                },
              }}
              className="px-4 pt-3 pb-6 space-y-3"
            >
              {/* Component Catalogs Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
                }}
                className="border-b border-slate-100 pb-2"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Component Catalogs
                </p>
                <Link
                  href="/components/panel-building"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 font-medium text-sm transition-all border",
                    normalizedPath === "/components/panel-building"
                      ? "bg-blue-50/90 text-[#1a56b0] border-[#bcdbf7] font-bold shadow-xs"
                      : "hover:bg-blue-50 border-transparent"
                  )}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a56b0] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Panel Building Components</div>
                    <div className="text-xs text-slate-500">Glands, Insulators, Lugs &amp; Sleeves</div>
                  </div>
                </Link>

                <Link
                  href="/components/automation"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 font-medium text-sm transition-all mt-1 border",
                    normalizedPath === "/components/automation"
                      ? "bg-blue-50/90 text-[#1a56b0] border-[#bcdbf7] font-bold shadow-xs"
                      : "hover:bg-blue-50 border-transparent"
                  )}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a56b0] flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Automation Components</div>
                    <div className="text-xs text-slate-500">PLCs, HMIs, Meters &amp; Power Supplies</div>
                  </div>
                </Link>
              </motion.div>

              {/* Main Nav Links */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 },
                  },
                }}
                className="space-y-1"
              >
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
                      }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
                          isActive
                            ? "bg-blue-50/90 text-[#1a56b0] font-bold border-[#bcdbf7] shadow-xs"
                            : "text-slate-700 hover:bg-slate-50 border-transparent"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
                }}
                className="pt-2 border-t border-slate-100 flex flex-col gap-2"
              >
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
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold hover:bg-emerald-100/70 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Instant WhatsApp Inquiry
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
