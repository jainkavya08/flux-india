"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sliders,
  Radio,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const TYPING_WORDS = ["FLUX", "Reliability", "Components", "Efficiency", "Automation"];

export function BrowseByFlux() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const updateSpeed = isDeleting ? 70 : 130;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="py-20 sm:py-28 bg-[#f4f7fa] relative overflow-hidden" id="browse">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Animated Typewriter Effect */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="blue" className="mb-3">
            Component Ecosystem
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Browse by{" "}
            <span className="relative inline-block text-[#1a56b0] px-2 py-0.5 rounded-lg bg-blue-100/70 border border-blue-200">
              <span className="underline decoration-[#5b9bd5] decoration-4 underline-offset-8">
                {displayText}
              </span>
              <span className="typewriter-cursor h-7 sm:h-9 align-middle" />
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered for panel builders, machine tool makers, and industrial automation integrators across India.
          </p>
        </div>

        {/* Two Large Side-by-Side Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card A: Panel Building Components */}
          <Link
            href="/components/panel-building"
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a56b0] transform origin-left transition-transform duration-300 group-hover:scale-x-105" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-300">
                  <Layers className="w-7 h-7" />
                </div>
                <Badge variant="navy">Category 01</Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Panel Building Components
              </h3>

              <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                High-quality components for reliable and efficient panel building. Everything from circuit breakers and contactors to modular enclosures and busbar distributions.
              </p>

              {/* Product Category Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Air Circuit Breakers (ACB)",
                  "MCCBs & MCBs",
                  "Magnetic Contactors",
                  "Modular IP66 Enclosures",
                  "Push-In Terminal Blocks",
                  "24V DIN Power Supplies",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#f4f8fd] border border-[#e0edfa] text-slate-700 group-hover:bg-[#eaf3fc] group-hover:text-[#1a56b0] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a56b0] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Visual Collage Preview Box in Soft Pastel Blue */}
              <div className="mt-8 rounded-2xl bg-[#f4f8fd] p-5 border border-[#d6e8fa]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <Zap className="w-5 h-5 text-[#1a56b0] mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">Switchgear</div>
                    <div className="text-[10px] text-slate-500">Up to 6300A</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <Sliders className="w-5 h-5 text-[#1a56b0] mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">Starters</div>
                    <div className="text-[10px] text-slate-500">DOL &amp; Softstart</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">Enclosures</div>
                    <div className="text-[10px] text-slate-500">IP55 / IP66</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Explore Full Catalog
              </span>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#1a56b0] group-hover:translate-x-1.5 transition-transform">
                <span>View Panel Building</span>
                <div className="w-8 h-8 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card B: Automation Components */}
          <Link
            href="/components/automation"
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a56b0] transform origin-left transition-transform duration-300 group-hover:scale-x-105" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-300">
                  <Cpu className="w-7 h-7" />
                </div>
                <Badge variant="navy">Category 02</Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                Automation Components
              </h3>

              <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                Advanced automation solutions to optimize control, monitoring and performance. Micro to enterprise PLCs, sensorless vector VFDs, HMIs, and IIoT gateways.
              </p>

              {/* Product Category Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Modular PLCs & PACs",
                  "Variable Frequency Drives",
                  "Touchscreen HMIs (4-21\")",
                  "Optical & Laser Sensors",
                  "AC Servo Multi-Axis",
                  "IIoT Edge 4G Gateways",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#f4f8fd] border border-[#e0edfa] text-slate-700 group-hover:bg-[#eaf3fc] group-hover:text-[#1a56b0] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a56b0] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Visual Collage Preview Box in Soft Pastel Blue */}
              <div className="mt-8 rounded-2xl bg-[#f4f8fd] p-5 border border-[#d6e8fa]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <Cpu className="w-5 h-5 text-[#1a56b0] mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">PLCs &amp; RTUs</div>
                    <div className="text-[10px] text-slate-500">&lt; 10ns execution</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <Gauge className="w-5 h-5 text-[#1a56b0] mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">VFD Inverters</div>
                    <div className="text-[10px] text-slate-500">0.37 to 500kW</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-[#e0edfa]">
                    <Radio className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-slate-800">IIoT Gateways</div>
                    <div className="text-[10px] text-slate-500">MQTT / OPC UA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Explore Full Catalog
              </span>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#1a56b0] group-hover:translate-x-1.5 transition-transform">
                <span>View Automation</span>
                <div className="w-8 h-8 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
