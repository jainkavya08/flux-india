import { ProcessStrip } from "@/components/home/ProcessStrip";
import { Hero } from "@/components/home/Hero";
import { AboutSplit } from "@/components/home/AboutSplit";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Process Strip below header */}
      <ProcessStrip />

      {/* 3. Hero section with centered FLUX logo, wave motif & value prop */}
      <Hero />

      {/* 5. About / value prop split with 3 isometric illustration panels */}
      <AboutSplit />

    </div>
  );
}
