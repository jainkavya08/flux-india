"use client";

import React from "react";
import Link from "next/link";
import { SOLUTIONS_DATA } from "@/lib/data/solutions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Sparkles, Sun, BatteryCharging, Factory, Building2, Droplets } from "lucide-react";

export function SolutionsPreview() {
  const getSolutionIcon = (id: string) => {
    switch (id) {
      case "sol-solar-renewables":
        return <Sun className="w-5 h-5 text-amber-500" />;
      case "sol-ev-infrastructure":
        return <BatteryCharging className="w-5 h-5 text-emerald-500" />;
      case "sol-automotive-assembly":
        return <Factory className="w-5 h-5 text-blue-500" />;
      case "sol-power-distribution":
        return <Building2 className="w-5 h-5 text-indigo-500" />;
      case "sol-water-process":
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#1a56b0]" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f4f7fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="blue" className="mb-3">
              Application Architectures
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0d2b4e] tracking-tight">
              Turnkey Industrial Solutions
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Cross-disciplinary electrical engineering and component packaging tailored for high-stakes manufacturing and utilities.
            </p>
          </div>

          <Button
            href="/solutions"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All Solutions
          </Button>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.slice(0, 3).map((solution) => (
            <Link
              key={solution.id}
              href={`/solutions#${solution.slug}`}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#eaf3fc] border border-[#bcdbf7] flex items-center justify-center shadow-xs">
                    {getSolutionIcon(solution.id)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1a56b0] bg-[#eaf3fc] border border-[#bcdbf7] px-2.5 py-1 rounded-full">
                    {solution.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                  {solution.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-700 line-clamp-3 leading-relaxed">
                  {solution.description}
                </p>

                {/* Impact Metrics in Soft Pastel Blue */}
                <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-2 bg-[#f4f8fd] rounded-xl text-center border border-[#e0edfa]">
                  {solution.impactMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-xs sm:text-sm font-extrabold text-[#0d2b4e]">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
                <span>View Engineering Specs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
