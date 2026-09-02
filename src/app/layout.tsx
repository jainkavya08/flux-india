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
    default: "FLUX — Power Solutions & Industrial Automation | Pune, India",
    template: "%s | FLUX India",
  },
  description:
    "FLUX (est. 2021) is India's premier B2B engineering & procurement partner for panel building components, PLCs, VFDs, switchgear, and industrial automation solutions.",
  keywords: [
    "FLUX India",
    "Panel Building Components Pune",
    "Industrial Automation India",
    "Switchgear Suppliers Pune",
    "PLC VFD Dealers India",
    "BOM Consolidation Electrical",
    "Siemens Schneider ABB L&T Pune",
    "Power Solutions India",
    "Chakan Industrial Automation",
  ],
  authors: [{ name: "FLUX Industrial Power Solutions" }],
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
      "Full-service procurement and engineering for panel builders, system integrators, and industrial manufacturers across India.",
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
