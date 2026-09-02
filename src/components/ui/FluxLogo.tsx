"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FluxLogoProps {
  variant?: "default" | "light" | "footer";
  showTagline?: boolean;
  showIndiaBadge?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  markOnly?: boolean;
}

export function FluxLogo({
  variant = "default",
  showTagline = false,
  showIndiaBadge = true,
  className,
  size = "md",
  markOnly = false,
}: FluxLogoProps) {
  const isLight = variant === "light" || variant === "footer";

  // Height mappings for logo rendering
  const heightStyles = {
    sm: "h-7 w-auto",
    md: "h-9 sm:h-10 w-auto",
    lg: "h-12 sm:h-14 w-auto",
    xl: "h-16 sm:h-20 lg:h-24 w-auto",
  };

  const imageSrc = markOnly
    ? "/images/flux-mark.png"
    : isLight
    ? "/images/flux-logo-white.png"
    : "/images/flux-logo.png";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col items-start focus:outline-none transition-transform duration-200",
        className
      )}
      aria-label="FLUX Home"
    >
      <div className="flex items-center gap-2">
        {/* Official FLUX 3D Ribbon Logo */}
        <div className="relative inline-flex items-center">
          <Image
            src={imageSrc}
            alt="FLUX — Power Solutions & Industrial Automation"
            width={markOnly ? 282 : 807}
            height={246}
            priority
            className={cn(
              "object-contain transition-transform duration-300 group-hover:scale-[1.02]",
              heightStyles[size]
            )}
          />
        </div>

        {/* Optional "INDIA" badge pill matching brand standard */}
        {showIndiaBadge && !markOnly && (
          <span
            className={cn(
              "text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
              isLight
                ? "text-blue-200 border-blue-400/40 bg-white/10"
                : "text-[#1a56b0] border-blue-200 bg-blue-50/70"
            )}
          >
            India
          </span>
        )}
      </div>

      {/* Subtitle Tagline */}
      {showTagline && (
        <span
          className={cn(
            "text-[9px] sm:text-[11px] font-semibold tracking-widest uppercase mt-1 pl-0.5",
            isLight ? "text-blue-200/90" : "text-slate-500"
          )}
        >
          One Partner. Infinite Solutions
        </span>
      )}
    </Link>
  );
}
