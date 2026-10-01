import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Building Components",
  description:
    "Source type-tested industrial panel building components including cable glands, support & busbar insulators, lugs, terminals, spiral bands, flexible conduits, stainless steel & nylon cable ties, and distribution boxes with complete batch traceability.",
  keywords: [
    "Panel Building Components India",
    "Cable Glands Pune",
    "Support Insulators",
    "Busbar Insulators",
    "Lugs and Terminals",
    "Spiral Wrapping Bands",
    "Flexible Conduits",
    "Stainless Steel Cable Ties",
    "Nylon Cable Ties",
    "Distribution Boxes",
    "Electrical Panel Accessories",
  ],
  openGraph: {
    title: "Panel Building Components | FLUX India",
    description:
      "High-quality, type-tested components for reliable, safe, and efficient control panels and power distribution switchboards.",
    url: "https://fluxindia.in/components/panel-building",
    images: [
      {
        url: "/images/panel_board.png",
        width: 1200,
        height: 630,
        alt: "FLUX India Panel Building Components",
      },
    ],
  },
};

export default function PanelBuildingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
