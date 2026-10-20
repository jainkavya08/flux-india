"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data/company";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Layers,
  Cpu,
  Send,
  CheckCircle2,
  Sparkles,
  Building,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import { FluxLogo } from "@/components/ui/FluxLogo";

export default function AboutPage() {
  const getValIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#1a56b0]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#2a5298]" />;
      case "Send":
        return <Send className="w-6 h-6 text-[#5b9bd5]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#1a56b0]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] pb-24">
      {/* Header Banner */}
      <section className="bg-[#eaf3fc] border-b border-[#bcdbf7] py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="blue" className="mb-4">
            About FLUX India
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
            Engineering Sourcing Built for Modern Industry
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Founded in 2021 in Pune, FLUX is on a mission to provide seamless electrical and automation solutions for all over the world under one agile, engineering-first roof.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Story & Founding Narrative */}
        {/* Story & Founding Narrative */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#d6e8fa] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1a56b0] bg-[#eaf3fc] border border-[#bcdbf7] px-3.5 py-1 rounded-full">
                  Founded 2021 &bull; Pune, Maharashtra
                </span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#0d2b4e] tracking-tight leading-tight">
                One Partner. Infinite Solutions.
              </h2>

              <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                Industrial panel builders, machine builders, and system integrators historically spent excessive engineering hours dealing with 10–15 fragmented component distributors, chasing long lead times, and managing multi-vendor incompatibilities.
              </p>

              <p className="mt-3.5 text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                <strong>FLUX was established to revolutionize this workflow.</strong> We operate as an integrated technical partner: our electrical engineers review single-line diagrams (SLDs) and BOMs, recommend optimized pin-compatible components from authorized OEM stock, and deliver everything in consolidated, synchronized dispatches.
              </p>

              <div className="mt-6 pt-2 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine OEM Components</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24-Hour BOM Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Solutions for All Over the World</span>
                </div>
              </div>
            </div>

            {/* Right Card / Fast Facts */}
            <div className="lg:col-span-5 bg-[#f0f7fd] border border-[#bcdbf7] rounded-3xl p-6 sm:p-8 text-[#0d2b4e] shadow-xs flex flex-col justify-between h-auto">
              <div>
                <div className="mb-5">
                  <FluxLogo size="lg" />
                </div>

                <h3 className="text-xl font-bold font-heading text-[#0d2b4e] mb-5">
                  Fast Facts &amp; Reach
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#d6e8fa]">
                    <span className="text-slate-600 shrink-0">Established</span>
                    <span className="font-bold text-[#0d2b4e] text-right">Year 2021</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#d6e8fa]">
                    <span className="text-slate-600 shrink-0">Headquarters</span>
                    <span className="font-bold text-[#0d2b4e] text-right">Pune, Maharashtra</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#d6e8fa]">
                    <span className="text-slate-600 shrink-0">Projects Delivered</span>
                    <span className="font-bold text-[#0d2b4e] text-right">650+ B2B Panels</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#d6e8fa]">
                    <span className="text-slate-600 shrink-0">OEM Product SKUs</span>
                    <span className="font-bold text-[#0d2b4e] text-right">15,000+ Active</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-600 shrink-0 pt-0.5">Target Verticals</span>
                    <span className="font-bold text-[#0d2b4e] text-right leading-snug">Solar, EV, Power, DataCenters, Agriculture</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#d6e8fa]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1a56b0] hover:text-[#0d2b4e] transition-colors"
                >
                  <span>Visit our Pune engineering office</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="blue" className="mb-2">
              Our Principles
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e]">
              Core Pillars of the FLUX Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.coreValues.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-3xl p-6 border border-[#d6e8fa] shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] flex items-center justify-center shadow-xs mb-4">
                    {getValIcon(val.icon)}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-[#0d2b4e]">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#d6e8fa] shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="navy" className="mb-2">
              Growth Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e]">
              From 2021 Inception to Solutions for All Over the World
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPANY_INFO.milestones.map((m) => (
              <div
                key={m.year}
                className="relative bg-[#f8fafc] rounded-2xl p-6 border border-[#d6e8fa] flex flex-col justify-start hover:border-[#1a56b0]/40 transition-colors shadow-xs"
              >
                <div className="text-2xl font-extrabold font-heading text-[#1a56b0] font-mono tracking-tight pb-3 mb-4 border-b border-[#e2eaf4]">
                  {m.year}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0d2b4e] font-heading min-h-[2.5rem] flex items-start mb-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-[#eaf3fc] border border-[#bcdbf7] rounded-3xl p-8 sm:p-12 text-[#0d2b4e] text-center shadow-xs">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d2b4e]">
            Ready to partner with FLUX on your next panel build?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-xl mx-auto">
            Share your bill of materials or get in touch with our technical team in Pune today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/bom" variant="primary" size="lg">
              Submit Your BOM
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Sales Desk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
