import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Components",
  description:
    "Procure industrial automation components including programmable logic controllers (PLCs), touchscreen HMIs, motor protection relays, digital energy meters, 24V DIN power supplies, and PID temperature controllers.",
  keywords: [
    "Automation Components India",
    "PLCs and PACs Pune",
    "Touchscreen HMI India",
    "Motor Protection Devices",
    "Digital Panel Meters",
    "24V DIN Power Supplies",
    "PID Temperature Controllers",
    "Industrial Timers",
    "Control Transformers",
  ],
  openGraph: {
    title: "Automation Components | FLUX India",
    description:
      "Advanced controllers, HMIs, protection relays, and power modules for industrial automation and process engineering.",
    url: "https://fluxindia.in/components/automation",
    images: [
      {
        url: "/images/automation-components/PLC.png",
        width: 800,
        height: 600,
        alt: "FLUX India Automation Components",
      },
    ],
  },
};

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
