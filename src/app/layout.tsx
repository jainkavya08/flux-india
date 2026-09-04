import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/lib/data/company";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d2b4e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxindia.in"),
  title: {
    default: "FLUX — One Partner. Infinite Solutions.",
    template: "%s | FLUX India",
  },
  description:
    "FLUX (est. 2021) is a premier B2B engineering & procurement partner providing solutions for all over the world in panel building components, PLCs, VFDs, switchgear, and industrial automation.",
  keywords: [
    "FLUX India",
    "Panel Building Components",
    "Industrial Automation Global Solutions",
    "Switchgear Suppliers",
    "PLC VFD Dealers",
    "BOM Consolidation Electrical",
    "Siemens Schneider ABB L&T",
    "Power Solutions Worldwide",
    "Industrial Automation Solutions",
  ],
  authors: [{ name: "FLUX" }],
  creator: "FLUX India",
  publisher: "FLUX India",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fluxindia.in",
    siteName: "FLUX India",
    title: "FLUX — One Partner. Infinite Solutions.",
    description:
      "Full-service procurement and engineering solutions for panel builders, system integrators, and industrial manufacturers all over the world.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLUX — Power Solutions and Industrial Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLUX — Power Solutions & Industrial Automation",
    description: "One Partner. Infinite Solutions. Comprehensive electrical & automation supply.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: "https://fluxindia.in",
    telephone: COMPANY_INFO.contact.phone,
    email: COMPANY_INFO.contact.email,
    foundingDate: "2021",
    slogan: COMPANY_INFO.tagline,
    description: COMPANY_INFO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.location.address,
      addressLocality: COMPANY_INFO.location.city,
      addressRegion: COMPANY_INFO.location.state,
      postalCode: COMPANY_INFO.location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.7563,
      longitude: 73.8444,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body bg-[#f4f7fa] text-slate-800 antialiased selection:bg-[#1a56b0] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
