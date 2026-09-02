"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "blue" | "light" | "outline" | "success" | "accent";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "blue",
  size = "md",
  className,
  icon,
}: BadgeProps) {
  const variantStyles = {
    navy: "bg-[#0d2b4e] text-white",
    blue: "bg-[#eaf3fc] text-[#1a56b0] border border-[#bcdbf7]",
    light: "bg-white text-[#0d2b4e] border border-[#d6e8fa] shadow-xs",
    outline: "border border-[#1a56b0] text-[#1a56b0] bg-transparent",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    accent: "bg-[#0d2b4e] text-white shadow-xs",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium",
    md: "text-xs px-3 py-1 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
