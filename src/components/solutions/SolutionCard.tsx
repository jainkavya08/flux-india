"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SolutionCategory } from "@/lib/data/solutions";
import { SWITCHBOARD_GROUPS } from "@/lib/data/switchboard";
import {
  Boxes,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Fan,
  ThermometerSnowflake,
  Wind,
  Sun,
  Droplets,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { trackSolutionCardClick } from "@/lib/analytics";

interface SolutionCardProps {
  solution: SolutionCategory;
  viewMode: "gallery" | "list";
}

export function SolutionCard({ solution, viewMode }: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const isSwitchboard = solution.slug === "switchboard-solutions";

  if (viewMode === "list") {
    return (
      <div
        className="relative group/list-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={solution.href}
          onClick={handleClick}
          aria-label={`View ${solution.title}`}
          className="group block bg-white rounded-2xl p-3 sm:p-4 border border-[#d6e8fa] shadow-card hover:shadow-hover hover:border-[#1a56b0]/50 transition-all duration-200 outline-none focus:ring-2 focus:ring-[#1a56b0]"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Thumbnail & Solution Title */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#f4f8fd] border border-[#d6e8fa] flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                {solution.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#1a56b0]/70">
                    {getSolutionIcon(solution.iconName, "w-7 h-7")}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors truncate">
                  {solution.title}
                </h3>
              </div>
            </div>

            {/* Right: Subtle Chevron Indicator */}
            <div className="w-8 h-8 rounded-full bg-[#f4f8fd] group-hover:bg-[#1a56b0] group-hover:text-white text-[#1a56b0] border border-[#d6e8fa] flex items-center justify-center transition-all duration-200 shrink-0">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Hover preview for Switchboard Solution groups and items */}
        {isSwitchboard && isHovered && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#bcdbf7] shadow-xl animate-in fade-in slide-in-from-top-1 duration-200 pointer-events-none">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold text-[#1a56b0] uppercase tracking-wider">
                Switchboard Architecture Groups &amp; Items
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Click card to open full blueprint
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {SWITCHBOARD_GROUPS.map((grp) => (
                <div
                  key={grp.id}
                  className="bg-[#f8fbfe] border border-[#e2edf8] rounded-lg p-2 text-left"
                >
                  <div className="text-[11px] font-bold text-[#0d2b4e] truncate">
                    {grp.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                    {grp.products.slice(0, 3).map((p) => p.name).join(", ")}
                    {grp.products.length > 3 ? "..." : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default: Gallery View Card (Matches hand-drawn reference: Image on top, centered title below)
  return (
    <div
      className="relative group/card h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={solution.href}
        onClick={handleClick}
        aria-label={`View ${solution.title}`}
        className="group relative bg-white rounded-2xl border border-[#d6e8fa] shadow-card hover:shadow-hover hover:-translate-y-1 hover:border-[#bcdbf7] transition-all duration-300 flex flex-col h-full overflow-hidden outline-none focus:ring-2 focus:ring-[#1a56b0]"
      >
        {/* Top accent highlight bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1a56b0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* 1. Large, consistent Image area at the top */}
        <div className="relative w-full aspect-square bg-[#f8fbfe] border-b border-[#eaf2fa] flex items-center justify-center p-2.5 overflow-hidden">
          {solution.image ? (
            <div className="relative w-full h-full scale-110 transition-transform duration-300 group-hover:scale-115">
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 240px"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fbfe] to-[#edf4fc] text-[#1a56b0]/60 transition-transform duration-300 group-hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-white/80 border border-[#d6e8fa] flex items-center justify-center shadow-xs">
                {getSolutionIcon(solution.iconName, "w-8 h-8 text-[#1a56b0]")}
              </div>
            </div>
          )}
        </div>

        {/* 2. Solution name centered below the image */}
        <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-center text-center bg-white">
          <h3 className="text-sm sm:text-base font-bold font-heading text-[#0d2b4e] group-hover:text-[#1a56b0] transition-colors leading-snug line-clamp-2">
            {solution.title}
          </h3>
        </div>
      </Link>

      {/* Hover preview revealing switchboard solution groups and their items */}
      {isSwitchboard && isHovered && (
        <div className="absolute top-full left-0 w-72 sm:w-80 mt-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#bcdbf7] shadow-xl animate-in fade-in slide-in-from-top-1 duration-200 pointer-events-none">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-[#1a56b0] uppercase tracking-wider">
              Switchboard Groups &amp; Items
            </span>
            <span className="text-[10px] text-slate-400">
              {SWITCHBOARD_GROUPS.length} Groups
            </span>
          </div>
          <div className="space-y-1.5 max-h-56 overflow-hidden">
            {SWITCHBOARD_GROUPS.slice(0, 5).map((grp) => (
              <div
                key={grp.id}
                className="bg-[#f8fbfe] border border-[#e2edf8] rounded-lg px-2.5 py-1.5 text-left"
              >
                <div className="text-[11px] font-bold text-[#0d2b4e] truncate">
                  {grp.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {grp.products.map((p) => p.name).join(", ")}
                </div>
              </div>
            ))}
            {SWITCHBOARD_GROUPS.length > 5 && (
              <div className="text-[10px] text-center text-[#1a56b0] font-semibold pt-0.5">
                +{SWITCHBOARD_GROUPS.length - 5} more groups (click card to view all)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
