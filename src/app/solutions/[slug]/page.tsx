import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SOLUTION_CATEGORIES } from "@/lib/data/solutions";
import { SwitchboardSolutionsDetailWrapper } from "@/components/solutions/SwitchboardSolutionsDetailWrapper";

export async function generateStaticParams() {
  return SOLUTION_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = SOLUTION_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Solution Not Found | FLUX India" };
  }

  return {
    title: `${category.title} — Blueprints & Specifications | FLUX India`,
    description: category.subtitle,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = SOLUTION_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return <SwitchboardSolutionsDetailWrapper category={category} />;
}
