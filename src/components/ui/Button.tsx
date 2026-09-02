"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPill?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      isPill = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56b0] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-pointer shadow-sm";

    const variantStyles = {
      primary:
        "bg-[#0d2b4e] hover:bg-[#1a56b0] text-white hover:shadow-lg hover:shadow-[#0d2b4e]/20 hover:-translate-y-0.5",
      secondary:
        "bg-[#1a56b0] hover:bg-[#2a5298] text-white hover:shadow-lg hover:shadow-[#1a56b0]/25 hover:-translate-y-0.5",
      outline:
        "border-2 border-[#1a56b0] text-[#1a56b0] bg-transparent hover:bg-[#1a56b0] hover:text-white hover:shadow-md",
      ghost:
        "text-[#0d2b4e] hover:bg-blue-50/80 hover:text-[#1a56b0] shadow-none",
      light:
        "bg-white text-[#0d2b4e] hover:bg-slate-100 hover:text-[#1a56b0] shadow-md hover:shadow-xl",
      danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-red-600/20",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
      xl: "text-lg px-8 py-4 gap-3 font-semibold",
    };

    const pillStyle = isPill ? "rounded-full" : "rounded-xl";

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-1">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            pillStyle,
            className
          )}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          pillStyle,
          className
        )}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
