"use client";

import { cn } from "@/lib/utils";

interface WaveMotifProps {
  className?: string;
  variant?: "blue" | "subtle" | "dark";
}

export function WaveMotif({ className, variant = "blue" }: WaveMotifProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-0 top-0 overflow-hidden select-none -z-0",
        className
      )}
      aria-hidden="true"
    >
      <svg
        width="620"
        height="540"
        viewBox="0 0 620 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-75 max-w-[500px] lg:max-w-[620px]"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b9bd5" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#1a56b0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0d2b4e" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#5b9bd5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2a5298" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGradGlow" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5b9bd5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1a56b0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer sweeping arc */}
        <path
          d="M 650 20 C 450 30 320 120 260 230 C 200 340 120 420 -20 480"
          stroke="url(#waveGrad1)"
          strokeWidth="2.5"
          strokeDasharray="6 8"
        />

        {/* Primary bold sweeping wave */}
        <path
          d="M 640 60 C 460 70 340 160 290 270 C 240 370 160 450 10 500"
          stroke="url(#waveGrad2)"
          strokeWidth="3.5"
        />

        {/* Secondary parallel wave */}
        <path
          d="M 660 110 C 500 120 380 200 340 300 C 300 390 220 470 50 530"
          stroke="url(#waveGrad1)"
          strokeWidth="2"
        />

        {/* Tertiary subtle echo wave */}
        <path
          d="M 680 160 C 540 170 430 240 390 330 C 350 420 280 490 100 550"
          stroke="url(#waveGrad1)"
          strokeWidth="1.5"
        />

        {/* Glow arc accents */}
        <circle cx="340" cy="300" r="4" fill="#5b9bd5" className="animate-ping" />
        <circle cx="340" cy="300" r="3" fill="#1a56b0" />
        <circle cx="290" cy="270" r="3.5" fill="#5b9bd5" />
        <circle cx="460" cy="70" r="3" fill="#5b9bd5" />
      </svg>
    </div>
  );
}
