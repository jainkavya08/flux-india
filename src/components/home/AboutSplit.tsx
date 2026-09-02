"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sun,
  Wind,
  BatteryCharging,
  Radio,
  Sparkles,
  Building2,
  Factory,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/data/company";

export function AboutSplit() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-y border-slate-200/80">
      {/* Subtle background glow */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Copy, Pill CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="blue">Our Heritage &amp; Vision</Badge>
              <span className="text-xs font-semibold text-slate-400">Est. 2021 &bull; Pune, India</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0d2b4e] tracking-tight leading-[1.15]">
              Powering Progress with Intelligent Solutions
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                Founded in 2021 in Pune&apos;s industrial hub, <strong>FLUX</strong> was built to solve the challenges of component fragmentation, extended lead times, and uncoordinated procurement faced by panel builders and automation engineers across India.
              </p>
              <p>
                We bridge the gap between world-class OEM manufacturers and modern production facilities. By pairing multi-brand component aggregation with dedicated electrical application engineering, we provide customized, type-tested power distribution and intelligent automation architectures that drive efficiency and zero-downtime reliability.
              </p>
            </div>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="font-extrabold text-2xl font-heading text-[#0d2b4e]">
                  650+
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Industrial Projects Empowered
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="font-extrabold text-2xl font-heading text-[#0d2b4e]">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Genuine Factory OEM Warranted
                </div>
              </div>
            </div>

            {/* Learn More Pill Button */}
            <div className="pt-4 flex items-center gap-4">
              <Button
                href="/about"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="px-8"
              >
                Learn More
              </Button>
              <Link
                href="/contact"
                className="text-sm font-semibold text-[#1a56b0] hover:text-[#0d2b4e] hover:underline"
              >
                Connect with our Engineers →
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Tall Illustration Panels in Pastel Tones */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Panel 1: Solar + Wind + Factory Clean Energy Grid */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1a56b0] flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <Sun className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1a56b0] bg-white px-2 py-0.5 rounded-md border border-[#bcdbf7]">
                  Clean Power
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  Solar &amp; Wind Grid
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  1500V DC disconnects, smart string telemetry &amp; utility-scale combiner architectures.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <Sun className="w-5 h-5 text-amber-500" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <Wind className="w-5 h-5 text-[#1a56b0]" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <Factory className="w-5 h-5 text-[#0d2b4e]" />
              </div>

              <div className="text-[11px] font-bold text-[#1a56b0] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1a56b0]" />
                <span>350+ MW Supported</span>
              </div>
            </div>

            {/* Panel 2: EV Charging & Control Panel Station */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa] sm:translate-y-3">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  E-Mobility
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  EV Fast Charging
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  High-power DC contactors, Type-B RCD isolation &amp; dynamic OCPP load balancers.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <Zap className="w-5 h-5 text-amber-500" />
                <div className="h-0.5 w-5 bg-emerald-400" />
                <BatteryCharging className="w-5 h-5 text-emerald-600" />
                <div className="h-0.5 w-5 bg-emerald-400" />
                <Radio className="w-5 h-5 text-[#1a56b0]" />
              </div>

              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IEC 61851 Certified</span>
              </div>
            </div>

            {/* Panel 3: High-Voltage Transmission & Substation Distribution */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa] sm:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1a56b0] flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0d2b4e] bg-white px-2 py-0.5 rounded-md border border-[#bcdbf7]">
                  Transmission
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  PCC &amp; Substations
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  ACBs up to 6300A, APFC detuned harmonic capacitors &amp; Form 4b heavy switchgear.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <Zap className="w-5 h-5 text-amber-500" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <Building2 className="w-5 h-5 text-[#1a56b0]" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="text-[11px] font-bold text-[#0d2b4e] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1a56b0]" />
                <span>65kA Fault Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
