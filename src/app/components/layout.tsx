import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Categories",
  description:
    "Explore FLUX India's engineered product categories: Panel Building Components and Industrial Automation Components. Genuine OEM supply with complete technical support.",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
