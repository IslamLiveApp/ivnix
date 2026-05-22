import Link from "next/link";
import { notFound } from "next/navigation";
import { findCategory } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  return (
    <div className="text-center">
      <h1 className="text-xl font-semibold">{cat.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose a calculator in this category.
      </p>
      <ul className="mt-6 space-y-2">
        {cat.calculators.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${cat.slug}/${c.slug}`}
              className={cn(
                "block rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground shadow-none no-underline transition-colors",
                "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
