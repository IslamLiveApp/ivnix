import { notFound } from "next/navigation";
import { findCategory } from "@/data/navigation";
import { CalculatorBody } from "@/components/calculator/calculator-body";

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = findCategory(category);
  const exists = cat?.calculators.some((c) => c.slug === slug);
  if (!cat || !exists) notFound();

  return <CalculatorBody category={category} slug={slug} />;
}
