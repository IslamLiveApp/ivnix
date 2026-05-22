import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-lg font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        That calculator or category does not exist.
      </p>
      <Link
        href="/paid-growth/roas"
        className="mt-6 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Go to ROAS calculator
      </Link>
    </div>
  );
}
