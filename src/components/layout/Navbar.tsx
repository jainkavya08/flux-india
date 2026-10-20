"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { FluxLogo } from "@/components/ui/FluxLogo";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/data/company";
import {
  Menu,
  X,
  Phone,
  FileSpreadsheet,
  MapPin,
} from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { trackTrackStatusStart, trackContact } from "@/lib/analytics";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackCompanyName, setTrackCompanyName] = useState("");
  const [trackBomId, setTrackBomId] = useState("");
  const [trackError, setTrackError] = useState("");
  const [isTrackLoading, setIsTrackLoading] = useState(false);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    const company = trackCompanyName.trim();
    const bomId = trackBomId.trim();
    if (!company || !bomId) {
      setTrackError("Company Name and BOM ID are required.");
      return;
    }
    
    setIsTrackLoading(true);
    try {
      const res = await fetch("/api/track-bom.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: company, bomId })
      });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok && data.success) {
          setIsTrackModalOpen(false);
          router.push(`/?trackBOM=${encodeURIComponent(bomId)}&company=${encodeURIComponent(company)}`);
        } else {
          setTrackError(data.message || "We couldn't find a BOM matching these details. Please check your company name and BOM ID.");
        }
      } else {
        const text = await res.text();
        console.error("[BOM Tracking Non-JSON Response]", res.status, text.substring(0, 200));
        setTrackError("The server returned an unexpected response. Please try again.");
      }
    } catch (err) {
      console.error("[BOM Tracking Network Error]", err);
      setTrackError("A network error occurred. Please try again.");
    } finally {
      setIsTrackLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
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
              onClick={() => trackContact('phone')}
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
                onClick={() => trackContact('whatsapp')}
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
              onClick={() => {
                setIsTrackModalOpen(true);
                trackTrackStatusStart();
              }}
              variant="primary"
              size="sm"
              rightIcon={<MapPin className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Track Status
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <Button onClick={() => { setIsTrackModalOpen(true); trackTrackStatusStart(); }} variant="outline" size="sm" className="text-xs px-3 py-1 border-[#1a56b0]/30 text-[#1a56b0] hover:bg-blue-50/50">
              Track
            </Button>
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

                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('whatsapp')}
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

      <Modal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        title="Track Your BOM"
        subtitle="Stay updated on your BOM's technical review, quotation, procurement and delivery progress."
        maxWidth="md"
      >
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0d2b4e] mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="Enter your company name"
              value={trackCompanyName}
              onChange={(e) => setTrackCompanyName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a56b0] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0d2b4e] mb-1">BOM ID</label>
            <input
              type="text"
              required
              placeholder="e.g. BOM-00001"
              value={trackBomId}
              onChange={(e) => setTrackBomId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a56b0] focus:border-transparent outline-none text-sm"
            />
          </div>
          
          {trackError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {trackError}
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsTrackModalOpen(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" isLoading={isTrackLoading}>
              Track BOM
            </Button>
          </div>
        </form>
      </Modal>
    </header>
  );
}
