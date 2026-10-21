"use client";

import React from "react";
import Link from "next/link";
import { SolutionCategory } from "@/lib/data/solutions";
import { Badge } from "@/components/ui/Badge";
import {
  Boxes,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Fan,
  ThermometerSnowflake,
  Wind,
  Sun,
  Droplets,
} from "lucide-react";
import { trackSolutionCardClick } from "@/lib/analytics";

interface SolutionCardProps {
  solution: SolutionCategory;
  viewMode: "gallery" | "list";
}

export function SolutionCard({ solution, viewMode }: SolutionCardProps) {
  const getSolutionIcon = (iconName: string, className?: string) => {
    const classes = className || "w-6 h-6";
    switch (iconName) {
      case "Boxes":
        return <Boxes className={classes} />;
      case "Cpu":
        return <Cpu className={classes} />;
      case "Layers":
        return <Layers className={classes} />;
      case "Zap":
        return <Zap className={classes} />;
      case "Fan":
        return <Fan className={classes} />;
      case "ThermometerSnowflake":
        return <ThermometerSnowflake className={classes} />;
      case "Wind":
        return <Wind className={classes} />;
      case "Sun":
        return <Sun className={classes} />;
      case "Droplets":
        return <Droplets className={classes} />;
      default:
        return <ShieldCheck className={classes} />;
    }
  };

  const handleClick = () => {
    trackSolutionCardClick(solution.title);
  };

  if (viewMode === "list") {
    return (
      <Link
        href={solution.href}
        onClick={handleClick}
        className="group block bg-white rounded-2xl p-5 sm:p-6 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:border-[#1a56b0]/50 transition-all duration-200 outline-none focus:ring-2 focus:ring-[#1a56b0]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Icon & Info */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-200">
              {getSolutionIcon(solution.iconName, "w-6 h-6")}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors">
                  {solution.title}
                </h3>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1a56b0] bg-[#eaf3fc] border border-[#bcdbf7] px-2.5 py-0.5 rounded-full">
                  {solution.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {solution.subtitle}
              </p>

              {/* Group tags preview on list view */}
              <div className="mt-2.5 hidden sm:flex flex-wrap gap-1.5">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f4f8fd] border border-[#e0edfa] text-slate-600"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#1a56b0]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Item counts & CTA Button */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              {solution.groupCount} Groups • {solution.itemCount} Items
            </span>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#1a56b0] group-hover:bg-[#1a56b0] group-hover:text-white text-xs font-bold transition-all duration-200 shrink-0">
              <span>Explore Solution</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default: Gallery View Card
  return (
    <Link
      href={solution.href}
      onClick={handleClick}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden outline-none focus:ring-2 focus:ring-[#1a56b0]"
    >
      {/* Top accent highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1a56b0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#eaf3fc] border border-[#bcdbf7] text-[#1a56b0] flex items-center justify-center shadow-xs group-hover:bg-[#1a56b0] group-hover:text-white transition-colors duration-300 shrink-0">
            {getSolutionIcon(solution.iconName, "w-5 h-5 sm:w-6 sm:h-6")}
          </div>

          <div className="text-right flex flex-col items-end gap-0.5">
            <Badge variant="navy">{solution.badge}</Badge>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500">
              {solution.groupCount} Groups • {solution.itemCount} Items
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors leading-tight">
          {solution.title}
        </h3>

        <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {solution.subtitle}
        </p>

        {/* Included Group Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {solution.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#f4f8fd] border border-[#e0edfa] text-slate-700 group-hover:bg-[#eaf3fc] group-hover:text-[#1a56b0] transition-colors"
            >
              <CheckCircle2 className="w-3 h-3 text-[#1a56b0] shrink-0" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#1a56b0] transition-colors">
          Explore Solution
        </span>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a56b0] group-hover:translate-x-1 transition-transform">
          <span>View Blueprint</span>
          <div className="w-7 h-7 rounded-full bg-[#1a56b0] text-white flex items-center justify-center shadow-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
