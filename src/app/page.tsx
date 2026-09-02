import { ProcessStrip } from "@/components/home/ProcessStrip";
import { Hero } from "@/components/home/Hero";
import { BrowseByFlux } from "@/components/home/BrowseByFlux";
import { AboutSplit } from "@/components/home/AboutSplit";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Process Strip below header */}
      <ProcessStrip />

      {/* 3. Hero section with centered FLUX logo, wave motif & value prop */}
      <Hero />

      {/* 4. 'Browse by [Flux]' category cards with animated typing text */}
      <BrowseByFlux />

      {/* 5. About / value prop split with 3 isometric illustration panels */}
      <AboutSplit />

      {/* Industry Solutions Highlight */}
      <SolutionsPreview />

      {/* 6. Newsletter subscribe strip */}
      <NewsletterStrip />
    </div>
  );
}
